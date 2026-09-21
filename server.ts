/**
 * ==============================================================================
 * Google Apps Script Web App for Google Drive Examination Archival
 * ==============================================================================
 * 
 * Instructions to deploy on Google Drive:
 * 1. Open https://script.google.com and click "New project"
 * 2. Copy and paste the code below into "Code.gs"
 * 3. Click "Deploy" > "New deployment"
 * 4. Select type: "Web app"
 * 5. Set "Execute as": "Me (<your-email>)"
 * 6. Set "Who has access": "Anyone"
 * 7. Click "Deploy" and copy your Web App URL (ends with "/exec")
 * 8. Set GOOGLE_APPS_SCRIPT_URL in your app settings to enable direct Google Drive sync
 * 
 * Features:
 * - Automatically creates and organizes an "Assessment_Proctor_Records" folder in your Drive
 * - Safely saves candidate PDF examination transcripts and surveillance video recordings
 * - Stores candidate metadata, timestamps, and proctoring audit tags
 * - Returns direct Google Drive file URLs and file IDs
 * ==============================================================================
 */

// Global type declarations for Google Apps Script execution environment
declare const DriveApp: any;
declare const ContentService: any;
declare const Utilities: any;
declare const Logger: any;

interface GasEvent {
  postData?: {
    contents?: string;
    type?: string;
  };
  parameter?: Record<string, string>;
}

/**
 * Handles incoming POST requests from the Examination Platform.
 * Decodes candidate PDF transcripts or surveillance video recordings and saves them to Google Drive.
 */
function doPost(e: GasEvent) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'error',
          message: 'Empty request payload received',
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const payload = JSON.parse(e.postData.contents);
    const filename =
      payload.filename ||
      'Assessment_Report_' +
        Utilities.formatDate(new Date(), 'GMT', 'yyyyMMdd_HHmmss') +
        '.pdf';
    const mimeType = payload.mimeType || 'application/pdf';
    const base64Data = payload.base64Data;

    if (!base64Data) {
      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'error',
          message: 'No base64Data provided in payload',
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Decode file data and generate Google Drive Blob
    const decodedBytes = Utilities.base64Decode(base64Data);
    const blob = Utilities.newBlob(decodedBytes, mimeType, filename);

    // Dedicated folder in candidate administrator's Google Drive
    const folderName = (payload.folderName || 'Assessment_Proctor_Records').trim();
    const targetFolder = getOrCreateFolder(folderName);

    // Save file to Google Drive
    const driveFile = targetFolder.createFile(blob);

    // Attach searchable audit description
    const candidateName = payload.candidateName || 'N/A';
    const candidateEmail = payload.candidateEmail || 'N/A';
    const description =
      'Candidate: ' +
      candidateName +
      ' | Email: ' +
      candidateEmail +
      ' | Exam Upload: ' +
      new Date().toISOString() +
      ' | Proctor Record Verified';
    driveFile.setDescription(description);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        fileId: driveFile.getId(),
        fileUrl: driveFile.getUrl(),
        fileName: driveFile.getName(),
        folderName: folderName,
        fileSize: driveFile.getSize(),
        timestamp: new Date().toISOString(),
        message: 'Successfully saved to Google Drive via Google Apps Script',
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err: any) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: err.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests to verify that the Google Apps Script Web App is deployed and reachable.
 */
function doGet(e?: GasEvent) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'active',
      service: 'Assessment Google Drive Archival Service (GAS)',
      folder: 'Assessment_Proctor_Records',
      timestamp: new Date().toISOString(),
      instructions:
        'Deploy as Web App with access set to "Anyone" to enable Google Drive storage.',
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper: Finds an existing Google Drive folder by name or creates a new one.
 */
function getOrCreateFolder(folderName: string) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

/**
 * Exported raw Google Apps Script source code for UI modals and clipboard copying.
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * Google Apps Script Web App for Google Drive Examination Archival
 * Deploy as: Web app (Execute as: Me, Who has access: Anyone)
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Empty request payload received"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var payload = JSON.parse(e.postData.contents);
    var filename = payload.filename || ("Assessment_Report_" + Utilities.formatDate(new Date(), "GMT", "yyyyMMdd_HHmmss") + ".pdf");
    var mimeType = payload.mimeType || "application/pdf";
    var base64Data = payload.base64Data;

    if (!base64Data) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No base64Data provided in payload"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var decodedBytes = Utilities.base64Decode(base64Data);
    var blob = Utilities.newBlob(decodedBytes, mimeType, filename);

    var folderName = (payload.folderName || "Assessment_Proctor_Records").trim();
    var folders = DriveApp.getFoldersByName(folderName);
    var targetFolder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

    var driveFile = targetFolder.createFile(blob);
    
    var description = "Candidate: " + (payload.candidateName || "N/A") +
                      " | Email: " + (payload.candidateEmail || "N/A") +
                      " | Uploaded: " + new Date().toISOString();
    driveFile.setDescription(description);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      fileId: driveFile.getId(),
      fileUrl: driveFile.getUrl(),
      fileName: driveFile.getName(),
      folderName: folderName,
      fileSize: driveFile.getSize(),
      timestamp: new Date().toISOString(),
      message: "Successfully saved to Google Drive via Google Apps Script"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    service: "Assessment Google Drive Archival Service (GAS)",
    folder: "Assessment_Proctor_Records",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}`;
