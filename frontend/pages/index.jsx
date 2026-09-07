import { useState } from 'react';

export default function Home() {
  const [resume, setResume] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const startInterview = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", resume);

    try {
      const res = await fetch('http://localhost:8000/upload_resume/', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setQuestions(data.questions);
      setInterviewStarted(true);
    } catch (error) {
      console.error("Failed to start interview:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {!interviewStarted ? (
        <>
          <h1>🧑‍💼 AI Interviewer</h1>
          <input type="file" onChange={handleFileUpload} accept=".txt" />
          <br /><br />
          <button disabled={!resume || loading} onClick={startInterview}>
            {loading ? "Loading..." : "Start Interview"}
          </button>
        </>
      ) : (
        <VoiceInterview questions={questions} />
      )}
    </div>
  );
}

function VoiceInterview({ questions }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>🎯 Interview Questions</h2>
      <ul>
        {questions.map((q, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {q}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px', fontStyle: 'italic', color: '#555' }}>
        🎙️ Live Voice Interview (WebRTC placeholder)
      </div>
    </div>
  );
}
