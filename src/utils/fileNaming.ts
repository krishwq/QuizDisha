/**
 * Generates unified, consistent assessment file names for PDF reports and surveillance videos.
 * Ensures the video file name matches the PDF file name format (e.g. Candidate_Name-YYYY-MM-DD.pdf & Candidate_Name-YYYY-MM-DD.webm).
 */
export function getAssessmentFileNames(candidateName?: string, date: Date = new Date()): {
  baseName: string;
  pdfFileName: string;
  videoFileName: string;
} {
  const name = candidateName?.trim() || 'Candidate';
  const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
  const dateStr = date.toISOString().split('T')[0];
  const baseName = `${sanitizedName}-${dateStr}`;

  return {
    baseName,
    pdfFileName: `${baseName}.pdf`,
    videoFileName: `${baseName}.webm`,
  };
}
