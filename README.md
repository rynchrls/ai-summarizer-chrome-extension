# 📄 AI Summarizer Chrome Extension  

A Chrome extension that allows you to **summarize highlighted text or PDF content (up to 5 pages)** directly in your browser.  
Built with **HTML, TypeScript, FastAPI, Python**, and powered by **Ollama (DeepSeek V3.1:671B Cloud)**.  

---

## 🚀 Features  
- 🔍 **Text Summarization** – Select and highlight text on any webpage, use the extension popup to get a concise summary.  
- 📑 **PDF Summarization** – Upload PDF files (up to **5 pages max**) and get AI-generated summaries.  
- ⚡ **FastAPI Backend** – Secure and scalable backend for handling summarization requests.  
- 🤖 **AI Powered** – Uses **Ollama DeepSeek V3.1 (671B Cloud)** for high-quality summaries.  
- 🌐 **Cross-Platform** – Works on any Chromium-based browser (Chrome, Edge, Brave, etc.).  

---

## 🛠️ Tech Stack  
- **Frontend:** HTML, TypeScript  
- **Backend:** FastAPI (Python)  
- **AI Model:** Ollama DeepSeek V3.1 (671B Cloud)  
- **Packaging:** Chrome Extension (Manifest V3)  

---

## 📂 Project Structure  
```bash
.
├── api/                   # FastAPI server
│   ├── .venv/             # Python virtual environment
│   ├── src/               # Backend source code
│   │   └── main.py        # API entry point
│   └── requirements.txt   # Python dependencies
│
├── app/                   # Chrome extension source
│   ├── dist/              # Compiled TypeScript build
│   ├── node_modules/      # NPM dependencies
│   ├── src/               # Extension source (TS logic)
│   │   ├── pdfHandler.ts  # PDF summarization logic
│   │   └── popup.ts       # Popup handling logic
│   ├── manifest.json      # Chrome extension manifest (MV3)
│   ├── package-lock.json  # NPM lock file
│   ├── package.json       # NPM dependencies & scripts
│   ├── pdf.worker.min.js  # PDF.js worker
│   ├── popup.html         # Extension popup UI
│   └── tsconfig.json      # TypeScript config
│
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

---

## ⚙️ Installation  

### 1. Clone the repository  
```bash
git clone https://github.com/rynchrls/ai-summarizer-extension.git
cd ai-summarizer-extension
```

### 2. Backend Setup (FastAPI + Python)  
```bash
cd backend
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
```

Run the FastAPI server:  
```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup (Extension)  
Build TypeScript files with **esbuild** or **tsc**:  
```bash
npm install
npm run build
```

### 4. Load Extension in Chrome  
1. Open **chrome://extensions/**  
2. Enable **Developer mode**  
3. Click **Load unpacked**  
4. Select the `extension/` folder  

---

## 🔑 Configuration  
- Ensure your FastAPI server is running at `http://localhost:5000`.  
- The extension will send summarization requests to the backend.  
- Ollama model (`deepseek-v3.1:671b-cloud`) should be properly configured in your backend.  

---

## ▶️ Usage  
1. **Summarize Highlighted Text**  
   - Highlight any text on a webpage.  
   - Right-click → **Summarize with AI**.  
   - View summary in popup.  

2. **Summarize PDFs (up to 5 pages)**  
   - Open the extension popup.  
   - Upload a PDF file (max 5 pages).  
   - Get an AI-generated summary instantly.  

---

## 📌 Roadmap  
- [ ] Support longer PDFs with chunking.  
- [ ] Add multiple summarization styles (bullet points, key insights, TL;DR).  
- [ ] Support offline summaries with local LLMs.  
- [ ] Export summaries to Markdown / Notion.  

---

## 🤝 Contributing  
Contributions are welcome! Please open an issue or submit a pull request.  

---

## 📜 License  
MIT License – feel free to use and modify for your own projects.  

---

## 👨‍💻 Author  
**Ryan Charles Alcaraz**  
- 🌍 [LinkedIn](https://www.linkedin.com/in/ryan-charles-alcaraz-582650295/)  
- 💻 [GitHub](https://github.com/rynchrls)  
