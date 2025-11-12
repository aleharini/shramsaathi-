


import axios from "axios";
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaStar } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import "./NearbyJobs.css";

function NearbyJobs() {
  const [owners, setOwners] = useState([]);
  const [filters, setFilters] = useState({ district: "", pincode: "" });
  const [ratings, setRatings] = useState({});
  const [chatWith, setChatWith] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [message, setMessage] = useState("");

  // Fetch all owners on load
  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/owners");
      setOwners(res.data);
    } catch (err) {
      console.error("Error fetching owners:", err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const res = await axios.get("http://localhost:8083/api/owners/search", {
        params: activeFilters,
      });
      setOwners(res.data);
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
      [chatWith]: [
        ...(chatMessages[chatWith] || []),
        { text: message, sender: "worker" },
      ],
    });
    setMessage("");
  };

  return (
    <div className="nearby-jobs-container">
      <h2 className="title">Nearby Registered Owners</h2>

      <div className="filters">
        <input
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          placeholder="Enter District"
        />
        <input
          name="pincode"
          value={filters.pincode}
          onChange={handleFilterChange}
          placeholder="Enter Pincode"
        />
        <button className="apply-filter-btn" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      <div className="owners-grid">
        {owners.length === 0 ? (
          <p className="no-results">No owners found.</p>
        ) : (
          owners.map((owner) => (
            <div key={owner.id} className="owner-card">
              <div className="owner-header">
                <h3>{owner.companyName || owner.businessName}</h3>
                <p className="owner-name">👤 {owner.name}</p>
              </div>

              <div className="owner-details">
                <p>
                  <strong>District:</strong> {owner.district}
                </p>
                <p>
                  <strong>Mandal:</strong> {owner.mandal}
                </p>
                <p>
                  <strong>Pincode:</strong> {owner.pincode}
                </p>
                <p>
                  <strong>Email:</strong> {owner.email}
                </p>
              </div>

              <div className="owner-actions">
                <div className="phone-section">
                  <FaPhoneAlt className="phone-icon" />
                  <span className="phone-number">{owner.phone || "N/A"}</span>
                </div>

                <div className="rating-section">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`star-icon ${
                        star <= (ratings[owner.id] || 0) ? "filled" : ""
                      }`}
                      onClick={() => handleRating(owner.id, star)}
                    />
                  ))}
                </div>

                <button className="chat-btn" onClick={() => setChatWith(owner.id)}>
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
            <h4>Chat with Owner</h4>
            <button className="close-btn" onClick={() => setChatWith(null)}>
              ✖
            </button>
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

export default NearbyJobs;
