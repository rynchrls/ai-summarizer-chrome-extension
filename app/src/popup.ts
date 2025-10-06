import { extractPdfText } from "./pdfHandler";
import { marked } from "marked";

const output = document.getElementById("output")!;
const summarizeBtn = document.getElementById(
  "summarizeBtn"
) as HTMLButtonElement;
const summarizePdfBtn = document.getElementById(
  "summarizePdfBtn"
) as HTMLButtonElement;
const fileInput = document.getElementById("fileInput") as HTMLInputElement;

summarizeBtn.textContent = "📄 Summarize Page";
summarizePdfBtn.textContent = "📕 Summarize PDF";
// Helper: render markdown into output box
function renderMarkdown(text: string) {
  output.innerHTML = marked.parse(text) as string;
}

// Helper: toggle button states
function setLoadingState(isLoading: boolean, type: "web" | "pdf") {
  if (type === "web") {
    summarizeBtn.disabled = isLoading;
    summarizeBtn.textContent = isLoading
      ? "⏳ Summarizing..."
      : "📄 Summarize Page";
  } else {
    summarizePdfBtn.disabled = isLoading;
    summarizePdfBtn.textContent = isLoading
      ? "⏳ Summarizing..."
      : "📕 Summarize PDF";
  }
}

// Webpage summarization
summarizeBtn?.addEventListener("click", async () => {
  output.textContent = "⏳ Extracting and summarizing...";
  setLoadingState(true, "web");

  try {
    // 1. Get the active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // 2. Inject script: get highlighted text OR page text
    const [{ result: extractedText }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const selection = window.getSelection()?.toString().trim();
        if (selection && selection.length > 30) {
          return selection;
        }

        let text = "";
        const blocks = Array.from(
          document.querySelectorAll("p, div, span, h1, h2, h3")
        );
        const contentBlocks = blocks
          .map((el) => (el as HTMLElement).innerText.trim())
          .filter(
            (t) =>
              t.length > 50 &&
              !/^(cookies|subscribe|sign in|advertisement)/i.test(t)
          );

        text = contentBlocks.join("\n\n");
        if (!text) {
          text = document.body.innerText || "";
        }

        return text.slice(0, 10000);
      },
    });

    if (!extractedText || extractedText.trim().length < 30) {
      output.textContent = "⚠️ No meaningful text to summarize.";
      return;
    }

    console.log("Extracted text:", extractedText.substring(0, 200));

    // 3. Send to backend summarizer
    const res = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: extractedText }),
    });

    const data = await res.json();

    // 4. Display summary with markdown formatting
    renderMarkdown(data.text || "⚠️ Failed to summarize");
  } catch (err) {
    console.error(err);
    output.textContent =
      "❌ Error while summarizing (not allowed on chrome:// pages)";
  } finally {
    setLoadingState(false, "web");
  }
});

// PDF summarization
summarizePdfBtn?.addEventListener("click", () => {
  fileInput?.click();
});

fileInput?.addEventListener("change", async (event: any) => {
  const file = event.target.files[0];
  if (!file) return;

  output.textContent = "⏳ Extracting text from PDF...";
  setLoadingState(true, "pdf");

  try {
    const pdfText = await extractPdfText(file);

    if (!pdfText || pdfText.length < 50) {
      output.textContent = "⚠️ Couldn’t read the PDF text.";
      return;
    }

    output.textContent = "⏳ Summarizing PDF...";

    console.log("Extracted PDF text:", pdfText.substring(0, 200));

    const res = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: pdfText }),
    });

    const data = await res.json();

    // Render PDF summary with markdown formatting
    renderMarkdown(data.text || "⚠️ Failed to summarize PDF");
  } catch (err) {
    console.error(err);
    output.textContent = "❌ Error reading PDF";
  } finally {
    setLoadingState(false, "pdf");
  }
});
