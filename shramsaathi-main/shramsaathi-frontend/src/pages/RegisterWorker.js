


import axios from 'axios';
import { useState } from 'react';
import './RegisterWorker.css';

const RegisterWorker = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    workType: '',
    district: '',
    mandal: '',
    pincode: '',
    age: '',
    experience: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8083/api/users', formData);
      setStatus('✅ Worker Registered Successfully');
      setFormData({
        name: '',
        phone: '',
        address: '',
        workType: '',
        district: '',
        mandal: '',
        pincode: '',
        age: '',
        experience: ''
      });
    } catch (error) {
      setStatus('❌ Registration failed. Check backend or network.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register Worker</h2>
        {["name", "phone", "address", "workType", "district", "mandal", "pincode", "age", "experience"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "age" || field === "experience" ? "number" : "text"}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
          />
        ))}
        <button type="submit">Submit</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
};

export default RegisterWorker;
