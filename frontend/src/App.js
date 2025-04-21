import './styles.css';
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Changed localhost to 127.0.0.1 to avoid potential network issues
      const res = await axios.post("http://127.0.0.1:8000/predict/", formData);
      setResult(res.data);
    } catch (error) {
      setResult({ class: "Error", confidence: 0, error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title-row">
          <span className="emoji">🌍</span>
          <h1>Land Use & Cover Classifier</h1>
        </div>

        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="file-input"
        />

        {preview && <img src={preview} alt="preview" className="preview-img" />}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="upload-btn"
        >
          {loading ? "Classifying..." : "Classify Image"}
        </button>

        {result && (
          <div className="result-box">
            <h2>🧠 Prediction: {result.class}</h2>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(result.confidence || 0) * 100}%` }}
              ></div>
            </div>
            <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
            {result.error && <p className="error-text">Error: {result.error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
