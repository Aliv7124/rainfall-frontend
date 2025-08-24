import React, { useState, useEffect } from "react";

const API_URL = "https://rainfall-backend.onrender.com";

export default function RainfallPrediction() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [date, setDate] = useState("");
  const [prediction, setPrediction] = useState(null);

  // Fetch states on load
  useEffect(() => {
    fetch(`${API_URL}/states`)
      .then(res => res.json())
      .then(data => setStates(data.states))
      .catch(err => console.error(err));
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (!selectedState) return;
    fetch(`${API_URL}/cities/${selectedState}`)
      .then(res => res.json())
      .then(data => setCities(data.cities))
      .catch(err => console.error(err));
  }, [selectedState]);

  // Handle prediction
  const handlePredict = () => {
    if (!selectedState || !selectedCity || !date) {
      alert("Please select state, city, and date.");
      return;
    }

    fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location: selectedCity, date })
    })
      .then(res => res.json())
      .then(data => setPrediction(data.prediction))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Rainfall Prediction</h2>

      <label>State:</label>
      <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
        <option value="">Select State</option>
        {states.map(state => <option key={state} value={state}>{state}</option>)}
      </select>

      <br /><br />

      <label>City:</label>
      <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
        <option value="">Select City</option>
        {cities.map(city => <option key={city} value={city}>{city}</option>)}
      </select>

      <br /><br />

      <label>Date:</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <br /><br />

      <button onClick={handlePredict}>Predict Rainfall</button>

      {prediction !== null && (
        <div style={{ marginTop: "20px" }}>
          <strong>Predicted Rainfall:</strong> {prediction} mm
        </div>
      )}
    </div>
  );
}
