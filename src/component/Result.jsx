import React from "react";

export default function Result({ result }) {
  if (!result) {
    return (
      <div className="alert alert-info text-center mt-3">
        Enter Location and Date then click <strong>Predict</strong> to see the result.
      </div>
    );
  }

  return (
    <div className="card shadow mt-3">
      <div className="card-body text-center">
        <h5 className="card-title">Prediction Result</h5>
        <h3 className="fw-bold text-capitalize text-primary">{result}</h3>
      </div>
    </div>
  );
}

