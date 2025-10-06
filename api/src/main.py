from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ollama import chat

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Transcript(BaseModel):
    text: str


@app.post("/summarize")
async def summarize(transcript: Transcript):
    summarize = chat(
        model="deepseek-v3.1:671b-cloud",
        messages=[
            {
                "role": "system",
                "content": "You are an expert summarizer. Summarize text from PDFs, docs, or highlights into clear, concise, and structured notes. Use short bullet points or brief paragraphs. Keep key facts, arguments, and lists. Remove fluff and redundancies. Stay neutral and objective. Limit length to about 30% of the original unless told otherwise.",
            },
            {"role": "user", "content": transcript.text},
        ],
    )
    return {"text": summarize["message"]["content"]}
