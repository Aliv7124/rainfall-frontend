import React, { useState } from "react";
import PredictionForm from "./component/PredictionForm";
import Result from "./component/Result";

export default function App() {
  const [result, setResult] = useState("");

  const handlePredict = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data.Rainfall);
    } catch (err) {
      console.error("Error:", err);
      setResult("Error fetching prediction");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "25rem" }}>
        <h2 className="text-center mb-4">🌧️ Rainfall Prediction</h2>
        <PredictionForm onPredict={handlePredict} />
        <Result result={result} />
      </div>
    </div>
  );
}



