

import axios from "axios";
import { useState } from "react";
import "./RegisterForm.css";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    workType: "",
    district: "",
    mandal: "",
    pincode: "",
    age: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8083/api/users", formData);
      alert("Worker registered successfully!");
      console.log(response.data);

      // Clear form after submission
      setFormData({
        name: "",
        phone: "",
        address: "",
        workType: "",
        district: "",
        mandal: "",
        pincode: "",
        age: "",
        experience: "",
      });
    } catch (error) {
      console.error("Error registering worker:", error);
      alert("Failed to register worker. Please check the details.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="title">Register Worker</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="workType"
            placeholder="Work Type"
            value={formData.workType}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mandal"
            placeholder="Mandal"
            value={formData.mandal}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

          {/* New Age Field */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
          />

          {/* New Experience Field */}
          <input
            type="number"
            name="experience"
            placeholder="Experience (in years)"
            value={formData.experience}
            onChange={handleChange}
            required
            min="0"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;

