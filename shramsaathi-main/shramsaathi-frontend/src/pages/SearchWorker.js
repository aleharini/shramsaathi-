import React, { useState } from "react";
import axios from "axios";
import "./SearchWorker.css";
import { Search } from "lucide-react";

export default function SearchWorker() {
  const [workType, setWorkType] = useState("");
  const [district, setDistrict] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await axios.get("http://localhost:8083/api/users/search", {
        params: { workType, district },
      });
      setResults(res.data);
      if (res.data.length === 0) {
        setStatus("No workers found.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error occurred while searching.");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="heading">
          <Search className="heading-icon" />
          <h2 className="heading-text">Search Workers</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter Work Type</label>
            <input
              type="text"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              placeholder="e.g. Electrician"
              required
            />
          </div>
          <div className="form-group">
            <label>Enter District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="e.g. Warangal"
              required
            />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>

      <div className="results-grid">
        {results.map((worker, idx) => (
          <div key={idx} className="result-card">
            <h3>{worker.name}</h3>
            <p><strong>Phone:</strong> {worker.phone}</p>
            <p><strong>Address:</strong> {worker.address}</p>
            <p><strong>Mandal:</strong> {worker.mandal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
