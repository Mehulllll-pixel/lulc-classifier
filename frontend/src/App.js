import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/predict", formData);
      setResult(response.data);
    } catch (err) {
      console.error("Prediction failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🌍 Land Use & Land Cover Classifier</h1>
      <input type="file" onChange={handleUpload} accept="image/*" />
      {image && <img src={image} alt="Preview" style={{ width: '300px', marginTop: '20px' }} />}
      {loading && <p>🔄 Loading prediction...</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>🧠 Prediction: {result.class}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
