import { jsPDF } from "jspdf";
import { QuizReportData, ProctorViolation } from "../types";
import { formatTime } from "./scoring";
import { getAssessmentFileNames } from "./fileNaming";
import { getOptionDisplayText } from "./questionUtils";

/**
 * Generates an executive, certified PDF examination transcript.
 *
 * Features:
 * - Dynamic line wrapping
 * - Dynamic block heights
 * - Automatic multi-page pagination
 * - Safe column sizing
 * - Repeated headers on continuation pages
 * - Proctoring audit trail
 * - Question-by-question evaluation
 * - Overflow protection
 */
export function generateQuizPdfReport(report: QuizReportData): {
  blob: Blob;
  fileName: string;
} {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // ============================================================================
  // PAGE CONSTANTS
  // ============================================================================

  const pageWidth = 210;
  const pageHeight = 297;

  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Keep content away from footer.
  const pageBottomLimit = pageHeight - 19;

  let currentY = margin;

  // ============================================================================
  // BASIC DATA
  // ============================================================================

  const candidateName = report.candidate?.name?.trim() || "Candidate";

  const candidateEmail =
    report.candidate?.email?.trim() || "candidate@example.com";

  const now = new Date();

  const dateStr = now.toISOString().split("T")[0];

  const sanitizedName = candidateName
    .replace(/[^a-zA-Z0-9]/g, "_")
    .slice(0, 50);

  const timeFormatted = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const { pdfFileName: fileName } = getAssessmentFileNames(candidateName, now);

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Safely converts values into printable strings.
   */
  const sanitize = (
    val: string | number | number[] | undefined | null,
  ): string => {
    if (val === null || val === undefined) return "";

    const strVal = Array.isArray(val) ? val.join(", ") : String(val);

    return strVal
      .replace(/\u00A0/g, " ")
      .replace(/\r/g, "")
      .trim();
  };

  /**
   * Converts special Unicode symbols that standard Helvetica may not
   * render consistently in jsPDF.
   */
  const safePdfText = (
    value: string | number | number[] | null | undefined,
  ): string => {
    if (value === null || value === undefined) return "";

    const text = Array.isArray(value) ? value.join(", ") : String(value);

    return text
      .replace(/\u00A0/g, " ")
      .replace(/\r/g, "")
      .replace(/✓/g, "[OK]")
      .replace(/✗/g, "[X]")
      .replace(/★/g, "[KEY]")
      .replace(/○/g, "[ ]")
      .replace(/→/g, "->")
      .replace(/±/g, "+/-")
      .replace(/•/g, "-")
      .replace(/—/g, "-")
      .replace(/–/g, "-")
      .trim();
  };

  /**
   * Returns text wrapped to a maximum width.
   */
  const wrapText = (text: string, width: number): string[] => {
    const safe = safePdfText(text);

    if (!safe) return [""];

    return doc.splitTextToSize(safe, Math.max(5, width)) as string[];
  };

  /**
   * Draws wrapped text and returns the height used.
   */
  const drawWrappedText = (
    text: string,
    x: number,
    y: number,
    width: number,
    lineHeight: number,
  ): number => {
    const lines = wrapText(text, width);

    lines.forEach((line, index) => {
      doc.text(line, x, y + index * lineHeight);
    });

    return lines.length * lineHeight;
  };

  /**
   * Draws a single-line string but truncates it if it does not fit.
   */
  const fitSingleLine = (text: string, maxWidth: number): string => {
    let value = safePdfText(text);

    if (doc.getTextWidth(value) <= maxWidth) {
      return value;
    }

    const ellipsis = "...";

    while (value.length > 0 && doc.getTextWidth(value + ellipsis) > maxWidth) {
      value = value.slice(0, -1);
    }

    return value + ellipsis;
  };

  /**
   * Draws a wrapped label/value pair.
   */
  const drawLabelValue = (
    label: string,
    value: string,
    x: number,
    y: number,
    labelWidth: number,
    valueWidth: number,
    lineHeight = 3.5,
  ): number => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);

    doc.text(safePdfText(label), x, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);

    const lines = wrapText(value, valueWidth);

    lines.forEach((line, index) => {
      doc.text(line, x + labelWidth, y + index * lineHeight);
    });

    return Math.max(1, lines.length) * lineHeight;
  };

  // ============================================================================
  // PAGE HEADER
  // ============================================================================

  const drawPageHeader = (isContinuation: boolean = false) => {
    const headerHeight = isContinuation ? 12 : 23;

    // Header background (Theme Dark #1C1917)
    doc.setFillColor(28, 25, 23);

    doc.rect(margin, currentY, contentWidth, headerHeight, "F");

    // Primary accent line (Theme Primary #4338CA)
    doc.setFillColor(67, 56, 202);

    doc.rect(margin, currentY + headerHeight - 1.2, contentWidth, 1.2, "F");

    // Header title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(isContinuation ? 9.2 : 12);

    const testHeaderTitle = report.testInfo
      ? `QUIZDISHA TRANSCRIPT: ${report.testInfo.title.toUpperCase()}`
      : "QUIZDISHA CERTIFIED EXAMINATION TRANSCRIPT";

    doc.text(
      isContinuation
        ? "QUIZDISHA EXAMINATION TRANSCRIPT (CONTINUED)"
        : fitSingleLine(testHeaderTitle, contentWidth - 10),
      margin + 5,
      currentY + (isContinuation ? 7.5 : 9),
    );

    if (!isContinuation) {
      doc.setTextColor(120, 113, 108);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);

      const reference = `${sanitizedName}-${Math.floor(
        Math.random() * 9000 + 1000,
      )}`;

      const testTitleLine = report.testInfo ? `Exam: ${report.testInfo.title} | ` : "";
      const sessionText =
        `${testTitleLine}Date: ${dateStr} ${timeFormatted} | ` +
        `Candidate: ${candidateName} | Ref: ${reference}`;

      const safeSessionText = fitSingleLine(sessionText, contentWidth - 10);

      doc.text(safeSessionText, margin + 5, currentY + 16);

      currentY += 27;
    } else {
      currentY += 16;
    }
  };

  // ============================================================================
  // PAGE BREAK HANDLER
  // ============================================================================

  const ensureSpace = (neededHeight: number) => {
    if (currentY + neededHeight > pageBottomLimit) {
      doc.addPage();

      currentY = margin;

      drawPageHeader(true);
    }
  };

  // ============================================================================
  // 1. INITIAL HEADER
  // ============================================================================

  drawPageHeader(false);

  // ============================================================================
  // 2. CANDIDATE & SESSION OVERVIEW
  // ============================================================================

  const candCardHeight = 34;

  ensureSpace(candCardHeight + 5);

  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(231, 229, 228);

  doc.roundedRect(margin, currentY, contentWidth, candCardHeight, 2, 2, "FD");

  // Card title
  doc.setFillColor(238, 242, 255);

  doc.roundedRect(margin, currentY, contentWidth, 7, 2, 2, "F");

  doc.rect(margin, currentY + 3, contentWidth, 4, "F");

  doc.setTextColor(28, 25, 23);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);

  doc.text(
    "CANDIDATE IDENTIFICATION & EXAM METRICS",
    margin + 4,
    currentY + 4.8,
  );

  // --------------------------------------------------------------------------
  // Candidate column
  // --------------------------------------------------------------------------

  const leftX = margin + 4;
  const leftValueX = margin + 32;
  const leftValueWidth = 56;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.2);
  doc.setTextColor(120, 113, 108);

  doc.text("Candidate Name:", leftX, currentY + 13);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(28, 25, 23);

  const candidateNameLines = wrapText(candidateName, leftValueWidth);

  candidateNameLines.slice(0, 3).forEach((line, index) => {
    doc.text(line, leftValueX, currentY + 13 + index * 3.4);
  });

  const emailY =
    currentY + 13 + Math.min(candidateNameLines.length, 3) * 3.4 + 3;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 113, 108);

  doc.text("Email Address:", leftX, emailY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(67, 56, 202);

  const emailLines = wrapText(candidateEmail, leftValueWidth);

  emailLines.slice(0, 2).forEach((line, index) => {
    doc.text(line, leftValueX, emailY + index * 3.4);
  });

  // --------------------------------------------------------------------------
  // Status / time column
  // --------------------------------------------------------------------------

  const rightX = margin + 96;
  const rightValueX = rightX + 24;
  const rightValueWidth = 54;

  const statusLabel =
    report.submissionReason === "disqualification"
      ? "Terminated (Proctor Disqualified)"
      : report.submissionReason === "timeout"
        ? "Auto-Submitted (Timer Expiry)"
        : "Submitted Successfully";

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.2);
  doc.setTextColor(120, 113, 108);

  doc.text("Exam Status:", rightX, currentY + 13);

  doc.setFont("helvetica", "bold");

  if (report.submissionReason === "disqualification") {
    doc.setTextColor(225, 29, 72);
  } else {
    doc.setTextColor(22, 163, 74);
  }

  const statusLines = wrapText(statusLabel, rightValueWidth);

  statusLines.slice(0, 3).forEach((line, index) => {
    doc.text(line, rightValueX, currentY + 13 + index * 3.4);
  });

  const timeY = currentY + 13 + Math.min(statusLines.length, 3) * 3.4 + 3;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 113, 108);

  doc.text("Time Utilized:", rightX, timeY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(28, 25, 23);

  const timeUtilizedStr =
    `${formatTime(report.timeSpentSeconds)} of ` +
    `${formatTime(report.totalAllocatedSeconds)} allocated`;

  const timeLines = wrapText(timeUtilizedStr, rightValueWidth);

  timeLines.slice(0, 2).forEach((line, index) => {
    doc.text(line, rightValueX, timeY + index * 3.4);
  });

  currentY += candCardHeight + 5;

  // ============================================================================
  // 3. PERFORMANCE SCORECARD
  // ============================================================================

  const scoreCardHeight = 36;

  ensureSpace(scoreCardHeight + 5);

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(231, 229, 228);

  doc.roundedRect(margin, currentY, contentWidth, scoreCardHeight, 2, 2, "FD");

  doc.setFillColor(238, 242, 255);

  doc.roundedRect(margin, currentY, contentWidth, 7, 2, 2, "F");

  doc.rect(margin, currentY + 3, contentWidth, 4, "F");

  doc.setTextColor(28, 25, 23);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);

  doc.text(
    "PERFORMANCE SCORECARD & MARKING BREAKDOWN",
    margin + 4,
    currentY + 4.8,
  );

  // --------------------------------------------------------------------------
  // Redesigned scorecard
  // --------------------------------------------------------------------------

  const scoreContentY = currentY + 11;

  const netBoxWidth = 48;
  const metricsWidth = contentWidth - netBoxWidth - 6;

  const metricWidth = metricsWidth / 4;

  const metricX = (index: number) => margin + 4 + index * metricWidth;

  const drawMetric = (
    index: number,
    label: string,
    value: string,
    valueColor: [number, number, number] = [28, 25, 23],
  ) => {
    const x = metricX(index);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.7);
    doc.setTextColor(120, 113, 108);

    const labelLines = wrapText(label, metricWidth - 3);

    labelLines.slice(0, 2).forEach((line, i) => {
      doc.text(line, x, scoreContentY + i * 3);
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(valueColor[0], valueColor[1], valueColor[2]);

    doc.text(fitSingleLine(value, metricWidth - 3), x, scoreContentY + 10);
  };

  drawMetric(0, "Total Questions", `${report.totalQuestions}`);

  drawMetric(
    1,
    "Attempted / Skipped",
    `${report.attemptedCount} / ${report.unattemptedCount}`,
  );

  drawMetric(
    2,
    "Correct / Incorrect",
    `${report.correctCount} / ${report.incorrectCount}`,
  );

  drawMetric(
    3,
    "Marks (+ / -)",
    `+${report.positiveMarks} / -${report.negativeMarks}`,
  );

  // --------------------------------------------------------------------------
  // Net score box
  // --------------------------------------------------------------------------

  const netBoxX = margin + metricsWidth + 6;

  const netBoxY = currentY + 8;

  doc.setFillColor(28, 25, 23);

  doc.roundedRect(netBoxX, netBoxY, netBoxWidth, 25, 1.5, 1.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.setTextColor(238, 242, 255);

  doc.text("NET SCORE", netBoxX + 4, netBoxY + 5);

  const scoreText = `${report.netScore} / ${report.maxPossibleScore}`;

  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);

  doc.text(
    fitSingleLine(scoreText, netBoxWidth - 8),
    netBoxX + 4,
    netBoxY + 12,
  );

  doc.setFontSize(6.8);
  doc.setTextColor(8, 145, 178);

  doc.text(
    fitSingleLine(`Accuracy: ${report.accuracyRate}%`, netBoxWidth - 8),
    netBoxX + 4,
    netBoxY + 19,
  );

  currentY += scoreCardHeight + 6;

  // ============================================================================
  // 4. PROCTORING SECURITY AUDIT
  // ============================================================================

  ensureSpace(45);

  doc.setFillColor(67, 56, 202);

  doc.roundedRect(margin, currentY, contentWidth, 7, 1.5, 1.5, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);

  doc.text(
    "PROCTORING SECURITY & INTEGRITY AUDIT TRAIL",
    margin + 4,
    currentY + 4.8,
  );

  currentY += 9;

  const totalViolations = report.violations?.length || 0;

  const isDisqualified = report.submissionReason === "disqualification";

  // --------------------------------------------------------------------------
  // Integrity status box
  // --------------------------------------------------------------------------

  const statusBoxHeight = 18;

  if (isDisqualified) {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(225, 29, 72);

    doc.roundedRect(
      margin,
      currentY,
      contentWidth,
      statusBoxHeight,
      1.5,
      1.5,
      "FD",
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(225, 29, 72);

    doc.text(
      "INTEGRITY VERDICT: FAILED - PROCTOR DISQUALIFIED",
      margin + 4,
      currentY + 5.5,
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.9);
    doc.setTextColor(225, 29, 72);

    drawWrappedText(
      `Candidate accumulated ${totalViolations} security violations during the session. Assessment terminated automatically per policy.`,
      margin + 4,
      currentY + 10.5,
      contentWidth - 8,
      3.2,
    );
  } else if (totalViolations > 0) {
    doc.setFillColor(255, 247, 237);
    doc.setDrawColor(249, 115, 22);

    doc.roundedRect(
      margin,
      currentY,
      contentWidth,
      statusBoxHeight,
      1.5,
      1.5,
      "FD",
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(249, 115, 22);

    doc.text(
      `INTEGRITY VERDICT: FLAGGED FOR REVIEW - ${totalViolations} INFRACTION(S)`,
      margin + 4,
      currentY + 5.5,
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.9);
    doc.setTextColor(146, 64, 14);

    drawWrappedText(
      `Candidate completed the exam but triggered ${totalViolations} proctor warning strike(s). Administrator audit recommended.`,
      margin + 4,
      currentY + 10.5,
      contentWidth - 8,
      3.2,
    );
  } else {
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(22, 163, 74);

    doc.roundedRect(
      margin,
      currentY,
      contentWidth,
      statusBoxHeight,
      1.5,
      1.5,
      "FD",
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(22, 163, 74);

    doc.text(
      "INTEGRITY VERDICT: PASSED - ZERO RECORDED INFRACTIONS",
      margin + 4,
      currentY + 5.5,
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.9);
    doc.setTextColor(22, 163, 74);

    drawWrappedText(
      "No proctoring violations were recorded during the assessment session.",
      margin + 4,
      currentY + 10.5,
      contentWidth - 8,
      3.2,
    );
  }

  currentY += statusBoxHeight + 4;

  // --------------------------------------------------------------------------
  // Security monitoring box
  // --------------------------------------------------------------------------

  const securityBoxHeight = 17;

  ensureSpace(securityBoxHeight + 3);

  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(231, 229, 228);

  doc.roundedRect(
    margin,
    currentY,
    contentWidth,
    securityBoxHeight,
    1,
    1,
    "FD",
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.setTextColor(120, 113, 108);

  doc.text("SECURITY MONITORING ENFORCEMENT", margin + 4, currentY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.6);
  doc.setTextColor(28, 25, 23);

  drawWrappedText(
    "Webcam Surveillance: Active  |  Full-Screen Retention: Enforced  |  Tab Focus Monitor: Active  |  Clipboard Guard: Active",
    margin + 4,
    currentY + 10,
    contentWidth - 8,
    3.3,
  );

  currentY += securityBoxHeight + 3;

  // ============================================================================
  // VIOLATION TABLE
  // ============================================================================

  if (report.violations && report.violations.length > 0) {
    const drawViolationTableHeader = () => {
      ensureSpace(12);

      doc.setFillColor(238, 242, 255);

      doc.rect(margin, currentY, contentWidth, 7, "F");

      doc.setDrawColor(231, 229, 228);

      doc.line(margin, currentY + 7, margin + contentWidth, currentY + 7);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(120, 113, 108);

      doc.text("#", margin + 3, currentY + 4.7);
      doc.text("TIMESTAMP", margin + 11, currentY + 4.7);
      doc.text("EVENT", margin + 38, currentY + 4.7);
      doc.text("SEVERITY", margin + 74, currentY + 4.7);
      doc.text("INCIDENT DESCRIPTION", margin + 108, currentY + 4.7);

      currentY += 8;
    };

    drawViolationTableHeader();

    report.violations.forEach((violation: ProctorViolation, vIndex: number) => {
      // Column positions
      const numberX = margin + 3;
      const timestampX = margin + 11;
      const eventX = margin + 38;
      const severityX = margin + 74;
      const descriptionX = margin + 108;

      const descriptionWidth = contentWidth - 108 - 4;

      const descLines = wrapText(violation.description, descriptionWidth);

      const eventText = safePdfText(violation.type)
        .replace(/_/g, " ")
        .toUpperCase();

      const eventLines = wrapText(eventText, 32);

      const severityText =
        violation.severity === "critical"
          ? "CRITICAL"
          : `WARNING ${vIndex + 1}/3`;

      const severityLines = wrapText(severityText, 29);

      const rowLines = Math.max(
        descLines.length,
        eventLines.length,
        severityLines.length,
        1,
      );

      const rowHeight = Math.max(10, rowLines * 3.4 + 4);

      // If the entire row won't fit, start a new page
      // and redraw the table header.
      if (currentY + rowHeight > pageBottomLimit) {
        doc.addPage();

        currentY = margin;

        drawPageHeader(true);

        drawViolationTableHeader();
      }

      const isCritical = violation.severity === "critical";

      doc.setFillColor(
        isCritical ? 254 : 255,
        isCritical ? 242 : 247,
        isCritical ? 242 : 237,
      );

      doc.setDrawColor(231, 229, 228);

      doc.rect(margin, currentY, contentWidth, rowHeight, "F");

      doc.line(
        margin,
        currentY + rowHeight,
        margin + contentWidth,
        currentY + rowHeight,
      );

      // Number
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.8);
      doc.setTextColor(28, 25, 23);

      doc.text(`${vIndex + 1}`, numberX, currentY + 4.5);

      // Timestamp
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.2);
      doc.setTextColor(120, 113, 108);

      const timestamp = safePdfText(violation.timestamp) || "N/A";

      const timestampLines = wrapText(timestamp, 24);

      timestampLines.slice(0, 3).forEach((line, index) => {
        doc.text(line, timestampX, currentY + 4.2 + index * 3.2);
      });

      // Event
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.2);

      doc.setTextColor(
        isCritical ? 225 : 249,
        isCritical ? 29 : 115,
        isCritical ? 72 : 22,
      );

      eventLines.slice(0, 4).forEach((line, index) => {
        doc.text(line, eventX, currentY + 4.2 + index * 3.2);
      });

      // Severity
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.2);

      severityLines.slice(0, 3).forEach((line, index) => {
        doc.text(line, severityX, currentY + 4.2 + index * 3.2);
      });

      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.2);
      doc.setTextColor(28, 25, 23);

      descLines.forEach((line, index) => {
        doc.text(line, descriptionX, currentY + 4.2 + index * 3.4);
      });

      currentY += rowHeight + 1;
    });

    currentY += 4;
  }

  // ============================================================================
  // 5. QUESTION-BY-QUESTION EVALUATION
  // ============================================================================

  const drawQuestionSectionHeader = () => {
    ensureSpace(12);

    doc.setFillColor(67, 56, 202);

    doc.roundedRect(margin, currentY, contentWidth, 7, 1.5, 1.5, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);

    doc.text(
      "QUESTION-BY-QUESTION DETAILED EVALUATION & OFFICIAL ANSWER KEY",
      margin + 4,
      currentY + 4.8,
    );

    currentY += 10;
  };

  drawQuestionSectionHeader();

  // ============================================================================
  // QUESTION LOOP
  // ============================================================================

  report.breakdown.forEach((item, index) => {
    const q = item.question;

    const qNum = index + 1;

    const isCorrect = item.isCorrect;

    const isAttempted = item.isAttempted;

    // ------------------------------------------------------------------------
    // QUESTION PROMPT
    // ------------------------------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);

    const imgIndicator = q.imageUrl ? " [Diagram Attached]" : "";
    const fullPromptText =
      `Question ${qNum}: ` +
      `[${safePdfText(q.category).toUpperCase()}] ` +
      `${safePdfText(q.title)} - ` +
      `${safePdfText(q.prompt)}${imgIndicator}`;

    const promptWidth = contentWidth - 10;

    const promptLines = wrapText(fullPromptText, promptWidth);

    const promptLineHeight = 4;

    const promptBlockHeight = promptLines.length * promptLineHeight;

    // ------------------------------------------------------------------------
    // OPTIONS
    // ------------------------------------------------------------------------

    const optionItems: {
      label: string;
      text: string;
      lines: string[];
    }[] = [];

    if ("options" in q && Array.isArray(q.options)) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.2);

      q.options.forEach((optRaw, optIdx) => {
        const optLetter = String.fromCharCode(65 + optIdx);
        const optText = getOptionDisplayText(optRaw);
        const optionText = `(${optLetter}) ${safePdfText(optText)}`;

        const lines = wrapText(optionText, contentWidth - 18);

        optionItems.push({
          label: `(${optLetter})`,
          text: safePdfText(optText),
          lines,
        });
      });
    }

    let optionsBlockHeight = 0;

    if (optionItems.length > 0) {
      optionsBlockHeight = 5;

      optionItems.forEach((option) => {
        optionsBlockHeight += option.lines.length * 3.7 + 1.3;
      });
    }

    // ------------------------------------------------------------------------
    // ANSWERS
    // ------------------------------------------------------------------------

    let candidateAnsStr = "";
    let correctAnsStr = "";

    if (q.type === "single") {
      const uIndex = item.userAnswer as number | null;

      candidateAnsStr =
        uIndex !== null &&
        uIndex !== undefined &&
        q.options[uIndex] !== undefined
          ? `Option ${String.fromCharCode(65 + uIndex)}: ${safePdfText(
              getOptionDisplayText(q.options[uIndex]),
            )}`
          : "None (Unattempted / Skipped)";

      correctAnsStr = `Option ${String.fromCharCode(
        65 + q.correctAnswer,
      )}: ${safePdfText(getOptionDisplayText(q.options[q.correctAnswer]))}`;
    } else if (q.type === "multiple") {
      const uChoices = (item.userAnswer as number[]) || [];

      candidateAnsStr =
        uChoices.length > 0
          ? uChoices
              .filter((i) => q.options[i] !== undefined)
              .map(
                (i) =>
                  `Option ${String.fromCharCode(65 + i)}: ${safePdfText(
                    getOptionDisplayText(q.options[i]),
                  )}`,
              )
              .join(" | ")
          : "None (Unattempted / Skipped)";

      correctAnsStr = q.correctAnswers
        .filter((i) => q.options[i] !== undefined)
        .map(
          (i) =>
            `Option ${String.fromCharCode(65 + i)}: ${safePdfText(
              getOptionDisplayText(q.options[i]),
            )}`,
        )
        .join(" | ");
    } else if (q.type === "numerical") {
      const uVal = item.userAnswer;

      candidateAnsStr =
        uVal !== null && uVal !== undefined
          ? `${safePdfText(uVal)} ${safePdfText(q.unit)}`
          : "None (Unattempted / Skipped)";

      const minVal = (q.correctAnswer - q.tolerance).toFixed(2);

      const maxVal = (q.correctAnswer + q.tolerance).toFixed(2);

      correctAnsStr =
        `${safePdfText(q.correctAnswer)} ${safePdfText(q.unit)} ` +
        `(Tolerance: +/-${q.tolerance} -> ` +
        `Valid Range: [${minVal}, ${maxVal}])`;
    }

    // ------------------------------------------------------------------------
    // RESPONSE BOX
    // ------------------------------------------------------------------------

    const responseTextWidth = contentWidth - 50;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.2);

    const candidateLines = wrapText(candidateAnsStr, responseTextWidth);

    const correctLines = wrapText(correctAnsStr, responseTextWidth);

    const responseLineHeight = 3.8;

    const responseBoxHeight =
      5 +
      candidateLines.length * responseLineHeight +
      3 +
      correctLines.length * responseLineHeight +
      5;

    // ------------------------------------------------------------------------
    // TOTAL QUESTION BLOCK HEIGHT
    // ------------------------------------------------------------------------

    const metadataHeight = 7;

    const totalBlockHeight =
      6 +
      promptBlockHeight +
      metadataHeight +
      (optionItems.length > 0 ? optionsBlockHeight + 3 : 0) +
      responseBoxHeight +
      6;

    // ------------------------------------------------------------------------
    // PAGE BREAK
    // ------------------------------------------------------------------------

    if (currentY + totalBlockHeight > pageBottomLimit) {
      doc.addPage();

      currentY = margin;

      drawPageHeader(true);

      drawQuestionSectionHeader();
    }

    const blockStartY = currentY;

    // ------------------------------------------------------------------------
    // BLOCK BACKGROUND
    // ------------------------------------------------------------------------

    const bgColor = !isAttempted
      ? [250, 250, 249]
      : isCorrect
        ? [240, 253, 244]
        : [254, 242, 242];

    const borderColor = !isAttempted
      ? [231, 229, 228]
      : isCorrect
        ? [187, 247, 208]
        : [254, 205, 211];

    doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);

    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);

    doc.roundedRect(
      margin,
      blockStartY,
      contentWidth,
      totalBlockHeight,
      1.5,
      1.5,
      "FD",
    );

    // Status strip
    doc.setFillColor(
      isCorrect ? 22 : isAttempted ? 225 : 120,
      isCorrect ? 163 : isAttempted ? 29 : 113,
      isCorrect ? 74 : isAttempted ? 72 : 108,
    );

    doc.rect(margin, blockStartY, 1.5, totalBlockHeight, "F");

    let innerY = blockStartY + 5;

    // ------------------------------------------------------------------------
    // QUESTION PROMPT
    // ------------------------------------------------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(28, 25, 23);

    promptLines.forEach((line, lineIndex) => {
      doc.text(line, margin + 4, innerY + lineIndex * promptLineHeight);
    });

    innerY += promptBlockHeight + 2;

    // ------------------------------------------------------------------------
    // METADATA ROW
    // ------------------------------------------------------------------------

    doc.setFontSize(6.8);
    doc.setFont("helvetica", "bold");

    const typeLabel =
      q.type === "single"
        ? "Single Choice (+4 / -1)"
        : q.type === "multiple"
          ? "Multiple Choice (+4 / -2)"
          : "Numerical Entry (+4 / 0)";

    doc.setTextColor(120, 113, 108);

    const metadataWidth = contentWidth - 70;

    doc.text(
      fitSingleLine(`Type: ${typeLabel}`, metadataWidth),
      margin + 4,
      innerY,
    );

    const scoreColor = isCorrect
      ? [22, 163, 74]
      : item.scoreAwarded < 0
        ? [225, 29, 72]
        : [120, 113, 108];

    doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);

    const scoreStr =
      item.scoreAwarded > 0
        ? `+${item.scoreAwarded} Marks`
        : `${item.scoreAwarded} Marks`;

    const statusText = !isAttempted
      ? "SKIPPED (0 Marks)"
      : isCorrect
        ? `CORRECT (${scoreStr})`
        : `INCORRECT (${scoreStr})`;

    doc.text(fitSingleLine(statusText, 58), margin + contentWidth - 4, innerY, {
      align: "right",
    });

    innerY += 5;

    // ------------------------------------------------------------------------
    // OPTIONS
    // ------------------------------------------------------------------------

    if (optionItems.length > 0) {
      doc.setFillColor(255, 255, 255);

      doc.setDrawColor(231, 229, 228);

      doc.roundedRect(
        margin + 3,
        innerY,
        contentWidth - 6,
        optionsBlockHeight,
        1,
        1,
        "FD",
      );

      let optionY = innerY + 4;

      doc.setFont("helvetica", "normal");

      doc.setFontSize(7.1);
      doc.setTextColor(28, 25, 23);

      optionItems.forEach((option) => {
        option.lines.forEach((line, lineIndex) => {
          doc.text(line, margin + 6, optionY + lineIndex * 3.7);
        });

        optionY += option.lines.length * 3.7 + 1.3;
      });

      innerY += optionsBlockHeight + 3;
    }

    // ------------------------------------------------------------------------
    // RESPONSE COMPARISON
    // ------------------------------------------------------------------------

    doc.setFillColor(255, 255, 255);

    doc.setDrawColor(231, 229, 228);

    doc.roundedRect(
      margin + 3,
      innerY,
      contentWidth - 6,
      responseBoxHeight,
      1,
      1,
      "FD",
    );

    let responseY = innerY + 4.5;

    // IMPORTANT:
    // Labels are given a fixed safe area.
    // Response text starts far enough right so labels never overlap it.
    const responseLabelX = margin + 5;

    const responseTextX = margin + 40;

    // Candidate response label
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");

    if (isCorrect) {
      doc.setTextColor(22, 163, 74);

      doc.text("Your Response [OK]:", responseLabelX, responseY);
    } else if (isAttempted) {
      doc.setTextColor(225, 29, 72);

      doc.text("Your Response [X]:", responseLabelX, responseY);
    } else {
      doc.setTextColor(120, 113, 108);

      doc.text("Your Response [ ]:", responseLabelX, responseY);
    }

    // Candidate response
    doc.setFont("helvetica", "normal");

    doc.setTextColor(28, 25, 23);

    candidateLines.forEach((line, lineIndex) => {
      doc.text(line, responseTextX, responseY + lineIndex * responseLineHeight);
    });

    responseY += candidateLines.length * responseLineHeight + 2;

    // Official key label
    doc.setFont("helvetica", "bold");

    doc.setTextColor(22, 163, 74);

    doc.text("Official Key [KEY]:", responseLabelX, responseY);

    // Correct answer
    doc.setFont("helvetica", "normal");

    doc.setTextColor(28, 25, 23);

    correctLines.forEach((line, lineIndex) => {
      doc.text(line, responseTextX, responseY + lineIndex * responseLineHeight);
    });

    currentY = blockStartY + totalBlockHeight + 4;
  });

  // ============================================================================
  // 6. RUNNING FOOTER
  // ============================================================================

  const totalPages = (doc as any).internal.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);

    // Footer separator
    doc.setDrawColor(231, 229, 228);

    doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);

    // Footer left text
    doc.setFont("helvetica", "normal");

    doc.setFontSize(6.2);

    doc.setTextColor(120, 113, 108);

    const footerText = `QuizDisha Assessment Engine | Candidate: ${candidateName} (${candidateEmail}) | Official Certified Transcript`;

    const footerAvailableWidth = contentWidth - 25;

    const safeFooterText = fitSingleLine(footerText, footerAvailableWidth);

    doc.text(safeFooterText, margin, pageHeight - 7);

    // Page number
    doc.setFontSize(6.5);

    doc.text(
      `Page ${page} of ${totalPages}`,
      margin + contentWidth,
      pageHeight - 7,
      {
        align: "right",
      },
    );
  }

  // ============================================================================
  // OUTPUT
  // ============================================================================

  const pdfOutputBlob = doc.output("blob");

  return {
    blob: pdfOutputBlob,
    fileName,
  };
}
