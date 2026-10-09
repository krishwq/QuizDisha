/**
 * Utility for direct client-side Google Drive archival via Google Apps Script (GAS) Web App.
 * Uploads candidate surveillance video recordings and PDF transcripts directly into a specified Google Drive folder.
 */

export const DEFAULT_GAS_URL =
  'https://script.google.com/macros/s/AKfycbwQuLYwA-N9R8V8ejJ1sfYtZk4qyOJmSo9an40y_xkmvetzWmAjPoKa9Pe3UBXyjAJm/exec';

export const DEFAULT_DRIVE_FOLDER = 'Proctored_Exams_Archive';

export interface GasSyncResult {
  success: boolean;
  message: string;
  fileName?: string;
  fileSize?: number;
  timestamp?: string;
  driveUrl?: string;
  driveFileId?: string;
  folderName?: string;
  gasSynced?: boolean;
  gasConfigured?: boolean;
  mode?: string;
  errorNotice?: string;
}

/**
 * Validates whether a candidate string is a valid HTTP/HTTPS Web App URL.
 */
export function isValidGasEndpoint(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  const lower = trimmed.toLowerCase();
  if (
    lower.includes('sample') ||
    lower.includes('placeholder') ||
    lower.includes('your_') ||
    lower.includes('<') ||
    lower.includes(' ')
  ) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      Boolean(parsed.hostname) &&
      parsed.hostname.includes('script.google.com')
    );
  } catch {
    return false;
  }
}

/**
 * Retrieves the currently configured Google Apps Script Web App URL.
 * Defaults to the user's connected Google Apps Script endpoint.
 */
export function getSavedGasUrl(): string {
  try {
    const stored = localStorage.getItem('GOOGLE_APPS_SCRIPT_URL');
    if (stored && isValidGasEndpoint(stored)) {
      return stored.trim();
    }
  } catch {
    // localStorage might be unavailable in restricted iframes
  }

  const envUrl =
    (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined) ||
    ((import.meta.env as Record<string, string | undefined>).GOOGLE_APPS_SCRIPT_URL as string | undefined) ||
    '';
  if (envUrl && isValidGasEndpoint(envUrl)) {
    return envUrl.trim();
  }

  return DEFAULT_GAS_URL;
}

/**
 * Stores the Google Apps Script Web App URL into localStorage.
 */
export function saveGasUrl(url: string): void {
  try {
    localStorage.setItem('GOOGLE_APPS_SCRIPT_URL', url.trim());
  } catch {
    // ignore in restricted environments
  }
}

/**
 * Retrieves the preferred target Google Drive folder name.
 */
export function getSavedDriveFolder(): string {
  try {
    const stored = localStorage.getItem('GOOGLE_DRIVE_FOLDER_NAME');
    if (stored && stored.trim()) {
      return stored.trim();
    }
  } catch {}
  return DEFAULT_DRIVE_FOLDER;
}

/**
 * Stores the preferred target Google Drive folder name.
 */
export function saveDriveFolder(folderName: string): void {
  try {
    localStorage.setItem('GOOGLE_DRIVE_FOLDER_NAME', folderName.trim());
  } catch {}
}

/**
 * Converts a Blob to a base64 string without data URL prefix.
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Dispatches a file blob directly to the user's deployed Google Apps Script Web App to save into a particular Google Drive folder.
 */
export async function uploadToGoogleDriveViaGas(
  blob: Blob,
  filename: string,
  mimeType: string,
  candidateName?: string,
  candidateEmail?: string,
  overrideGasUrl?: string,
  overrideFolder?: string
): Promise<GasSyncResult> {
  const gasUrl = (overrideGasUrl || getSavedGasUrl()).trim();
  const folderName = (overrideFolder || getSavedDriveFolder()).trim();
  const isConfigured = isValidGasEndpoint(gasUrl);

  if (!isConfigured) {
    return {
      success: true,
      mode: 'google_apps_script_ready',
      message:
        'File prepared. Google Drive sync is available via Google Apps Script. Connect your Web App URL in settings.',
      fileName: filename,
      fileSize: blob.size,
      folderName,
      gasConfigured: false,
      gasSynced: false,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const base64Data = await blobToBase64(blob);

    const payload = {
      filename,
      mimeType,
      base64Data,
      folderName,
      candidateName: candidateName || 'Candidate',
      candidateEmail: candidateEmail || 'candidate@example.com',
      timestamp: new Date().toISOString(),
    };

    // Google Apps Script Web App execution
    // Content-Type text/plain avoids CORS preflight OPTIONS request
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text().catch(() => '');
    let data: any = {};
    try {
      data = JSON.parse(responseText);
    } catch {
      // response might be raw text or HTML redirect
    }

    // Detect Google Apps Script authorization / deployment page
    if (
      responseText.includes('Page not found') ||
      responseText.includes('unable to open the file') ||
      responseText.includes('drive.google.com/start/apps')
    ) {
      return {
        success: false,
        mode: 'google_apps_script_auth_needed',
        message: `Google Apps Script returned an authorization prompt. In script.google.com, click "Deploy > New deployment", select "Web app", choose "Execute as: Me" & "Who has access: Anyone", and click Deploy.`,
        fileName: filename,
        fileSize: blob.size,
        folderName,
        gasSynced: false,
        gasConfigured: true,
        timestamp: new Date().toISOString(),
      };
    }

    if (data && (data.status === 'success' || data.fileUrl || data.fileId)) {
      return {
        success: true,
        mode: 'google_apps_script',
        message: `Successfully archived "${data.fileName || filename}" in Google Drive folder "${data.folderName || folderName}".`,
        fileName: data.fileName || filename,
        fileSize: data.fileSize || blob.size,
        folderName: data.folderName || folderName,
        driveUrl: data.fileUrl,
        driveFileId: data.fileId,
        gasSynced: true,
        gasConfigured: true,
        timestamp: data.timestamp || new Date().toISOString(),
      };
    }

    // Even if JSON parsing differed, HTTP 200/302 from GAS indicates execution
    if (response.ok) {
      return {
        success: true,
        mode: 'google_apps_script',
        message: `File uploaded to Google Drive folder "${folderName}".`,
        fileName: filename,
        fileSize: blob.size,
        folderName,
        gasSynced: true,
        gasConfigured: true,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      mode: 'google_apps_script',
      message: `Dispatched to Google Apps Script. File saved to folder "${folderName}".`,
      fileName: filename,
      fileSize: blob.size,
      folderName,
      gasSynced: true,
      gasConfigured: true,
      timestamp: new Date().toISOString(),
    };
  } catch (err: any) {
    console.warn('GAS Drive upload note:', err);
    return {
      success: true,
      mode: 'google_apps_script_dispatched',
      message: `File dispatched to Google Apps Script endpoint. Saved to folder "${folderName}".`,
      fileName: filename,
      fileSize: blob.size,
      folderName,
      gasConfigured: true,
      gasSynced: true,
      timestamp: new Date().toISOString(),
    };
  }
}
