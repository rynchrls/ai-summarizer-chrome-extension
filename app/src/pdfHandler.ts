import * as pdfjsLib from "pdfjs-dist";

// Required for PDF.js to work in Chrome extension
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("pdf.worker.min.js");

export async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    fullText += pageText + "\n\n";
  }

  return fullText.slice(0, 15000); // limit to avoid huge requests
}
