# AI Interviewer

AI Interviewer is a full-stack application that creates interview questions from a plain-text resume. The frontend is built with Next.js and React. The backend is built with FastAPI and uses LangChain with a local Hugging Face GPT-2 text-generation pipeline.

## Features

- Upload a resume as a UTF-8 `.txt` file.
- Send the resume to a FastAPI backend.
- Generate up to five interview questions using GPT-2.
- Display the generated questions in the Next.js frontend.
- Return a set of fallback questions if the model does not produce question-formatted output.

## Project Structure

```text
interview_project/
├── backend/
│   ├── langchain_utils.py   # Hugging Face pipeline and question generation
│   ├── main.py              # FastAPI application and upload endpoint
│   └── requirements.txt     # Python dependency file
├── frontend/
│   ├── pages/
│   │   └── index.jsx        # Next.js user interface
│   └── package.json         # Frontend dependencies and scripts
├── .gitignore
└── README.md
```

## How It Works

1. The user selects a resume `.txt` file in the browser.
2. The frontend sends the file as multipart form data to `POST /upload_resume/`.
3. FastAPI reads and decodes the file as UTF-8.
4. LangChain passes the resume text to a GPT-2 Hugging Face pipeline.
5. The backend extracts lines ending in `?` and returns a maximum of five questions.
6. The frontend displays the returned questions.

The first backend startup downloads the GPT-2 model from Hugging Face. This can take several minutes and requires an internet connection. The model is cached locally after the first download.

## Prerequisites

Install the following before starting:

- Python 3.9 or newer
- Node.js 18 or newer
- npm
- Git
- Internet access for the first GPT-2 model download

A virtual environment is recommended for the Python backend.

## Backend Setup

Open PowerShell in the project root and run:

```powershell
cd D:\interview_project\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

If PowerShell prevents activation, allow scripts for the current user or use the virtual environment's Python executable directly:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
.\.venv\Scripts\Activate.ps1
```

The current `backend/requirements.txt` file is empty. Install the backend dependencies with:

```powershell
python -m pip install fastapi uvicorn python-multipart langchain transformers torch
```

Then start the API server:

```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Keep this terminal running. The API will be available at:

- Application: `http://localhost:8000`
- Interactive API documentation: `http://localhost:8000/docs`
- Resume endpoint: `http://localhost:8000/upload_resume/`

## Frontend Setup

Open a second PowerShell window:

```powershell
cd D:\interview_project\frontend
npm install
npm run dev
```

Open the application at [http://localhost:3000](http://localhost:3000).

The frontend is configured to send requests to `http://localhost:8000/upload_resume/`. Start the backend before clicking **Start Interview**.

## Using the Application

1. Create or save a resume as a plain-text file with a `.txt` extension.
2. Open [http://localhost:3000](http://localhost:3000).
3. Select the resume file.
4. Click **Start Interview**.
5. Wait for the model to generate the questions.
6. Review the displayed interview questions.

The current frontend accepts `.txt` files only. PDF and DOCX parsing are not implemented yet.

## API Reference

### `POST /upload_resume/`

Uploads a resume and returns generated questions.

Request:

```text
Content-Type: multipart/form-data
Field name: file
```

Example using PowerShell:

```powershell
curl.exe -X POST http://localhost:8000/upload_resume/ -F "file=@D:\path\to\resume.txt"
```

Successful response:

```json
{
  "questions": [
    "What experience do you have with...?",
    "Can you describe...?"
  ]
}
```

## Troubleshooting

### `ModuleNotFoundError` when starting FastAPI

Make sure the virtual environment is active and install the backend packages:

```powershell
cd D:\interview_project\backend
.\.venv\Scripts\Activate.ps1
python -m pip install fastapi uvicorn python-multipart langchain transformers torch
```

### `python-multipart` error when uploading

FastAPI requires `python-multipart` for file uploads. Install it with:

```powershell
python -m pip install python-multipart
```

### Frontend cannot connect to the backend

Confirm that both servers are running:

- Next.js: `http://localhost:3000`
- FastAPI: `http://localhost:8000`

Also check the browser developer console and the backend terminal for errors.

### GPT-2 download is slow or fails

The model is downloaded on first use and may require substantial disk space and network time. Retry with a stable internet connection. Once downloaded, Hugging Face normally reuses the local cache.

### No useful questions are generated

The application falls back to five general interview questions when the model output does not contain lines ending with a question mark. This is expected behavior for some GPT-2 outputs.

## Development Notes

- CORS currently allows requests from `http://localhost:3000` only.
- Resume contents are decoded as UTF-8, with invalid bytes ignored.
- The GPT-2 pipeline is initialized when the backend module loads, so startup can take time.
- The displayed voice interview area is currently a WebRTC placeholder; live voice interaction is not implemented.
- The backend dependency list should be added to `backend/requirements.txt` for repeatable setup:

```text
fastapi
uvicorn
python-multipart
langchain
transformers
torch
```

## Stopping the Services

In each running terminal, press:

```text
Ctrl+C
```

Deactivate the Python virtual environment when finished:

```powershell
deactivate
```

## Git Commands

After reviewing the files, commit and push the project with:

```powershell
cd D:\interview_project
git add .
git commit -m "Add project README"
git push
```
