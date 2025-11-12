// src/components/SearchUsers.js
import { useState } from "react";
import axios from "axios";

export default function SearchUsers() {
  const [searchParams, setSearchParams] = useState({ workType: "", district: "" });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setSearchParams({...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8083/api/users/search`, {
        params: searchParams
      });
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  return (
    <div>
      <h2>Search Workers</h2>
      <input name="workType" onChange={handleChange} placeholder="Work Type" />
      <input name="district" onChange={handleChange} placeholder="District" />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name} - {user.workType} - {user.district}</li>
        ))}
      </ul>
    </div>
  );
}
