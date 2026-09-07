from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from langchain_utils import generate_interview_questions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload_resume/")
async def upload_resume(file: UploadFile = File(...)):
    content = await file.read()
    resume_text = content.decode("utf-8", errors="ignore")

    questions = generate_interview_questions(resume_text)

    return {"questions": questions}
