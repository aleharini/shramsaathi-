


import axios from "axios";
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import './OwnerWorkersList.css';

function OwnerWorkersList() {
  const [workers, setWorkers] = useState([]);
  const [filters, setFilters] = useState({
    district: "",
    workType: "",
    minAge: "",
    maxAge: "",
    minExperience: "",
    maxExperience: "",
  });
  const [ratings, setRatings] = useState({});
  const [chatWith, setChatWith] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAllWorkers();
  }, []);

  const fetchAllWorkers = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/users");
      setWorkers(res.data);
    } catch (err) {
      console.error("Error fetching workers:", err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/users/search", {
        params: filters,
      });
      setWorkers(res.data);
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  const handleRating = (id, value) => {
    setRatings({ ...ratings, [id]: value });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setChatMessages({
      ...chatMessages,
      [chatWith]: [...(chatMessages[chatWith] || []), { text: message, sender: "owner" }],
    });
    setMessage("");
  };

  return (
    <div className="owner-workers-container">
      <div className="owner-workers-header">
        <h2>Registered Workers</h2>
      </div>

      <div className="filters">
        <input name="district" value={filters.district} onChange={handleFilterChange} placeholder="District" />
        <input name="workType" value={filters.workType} onChange={handleFilterChange} placeholder="Work Type" />
        <input name="minAge" type="number" value={filters.minAge} onChange={handleFilterChange} placeholder="Min Age" />
        <input name="maxAge" type="number" value={filters.maxAge} onChange={handleFilterChange} placeholder="Max Age" />
        <input name="minExperience" type="number" value={filters.minExperience} onChange={handleFilterChange} placeholder="Min Experience" />
        <input name="maxExperience" type="number" value={filters.maxExperience} onChange={handleFilterChange} placeholder="Max Experience" />
        <button className="apply-filter-btn" onClick={applyFilters}>Apply Filters</button>
      </div>

      <div className="workers-grid">
        {workers.length === 0 ? (
          <p className="no-workers">No workers found.</p>
        ) : (
          workers.map((w) => (
            <div key={w.id} className="worker-card">
              <div className="worker-name">{w.name}</div>
              <div className="worker-details">
                <span>District: {w.district}</span>
                <span>Work Type: {w.workType}</span>
                <span>Experience: {w.experience} years</span>
                <span>Age: {w.age}</span>
                <span>Pincode: {w.pincode}</span>
              </div>

              <div className="worker-actions">
                <div className="phone-section">
                  <FaPhoneAlt className="phone-icon" /> 
                  <span className="phone-number">{w.phone || "N/A"}</span>
                </div>

                <div className="rating-section">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star-icon ${star <= (ratings[w.id] || 0) ? "filled" : ""}`}
                      onClick={() => handleRating(w.id, star)}
                    />
                  ))}
                </div>

                <button className="chat-btn" onClick={() => setChatWith(w.id)}>
                  <MdChat className="chat-icon" /> Chat
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {chatWith && (
        <div className="chat-box">
          <div className="chat-header">
            <h4>Chat with Worker</h4>
            <button className="close-btn" onClick={() => setChatWith(null)}>✖</button>
          </div>
          <div className="chat-messages">
            {(chatMessages[chatWith] || []).map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerWorkersList;
