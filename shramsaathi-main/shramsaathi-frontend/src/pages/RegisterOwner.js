import axios from 'axios';
import { useState } from 'react';
import './RegisterOwner.css';

const RegisterOwner = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    district: '',
    mandal: '',
    pincode: '',
    businessName: ''
  });

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
    setStatus('');
  };

  const validateForm = () => {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const pincodeRegex = /^\d{6}$/;

    if (!phoneRegex.test(formData.phone)) {
      setError('Phone number must be 10 digits');
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (formData.gstin && !gstinRegex.test(formData.gstin)) {
      setError('Invalid GSTIN format');
      return false;
    }
    if (!pincodeRegex.test(formData.pincode)) {
      setError('Pincode must be 6 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:8083/api/owners/register', formData);
      setStatus('✅ Owner Registered Successfully');
      setFormData({
        name: '',
        phone: '',
        email: '',
        district: '',
        mandal: '',
        pincode: '',
        businessName: ''
      });
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const formFields = [
    { name: 'name', type: 'text', placeholder: 'Full Name', required: true },
    { name: 'phone', type: 'tel', placeholder: 'Phone Number (10 digits)', required: true },
    { name: 'email', type: 'email', placeholder: 'Email Address', required: true },
    { name: 'businessName', type: 'text', placeholder: 'Business Name', required: true },
    { name: 'district', type: 'text', placeholder: 'District', required: true },
    { name: 'mandal', type: 'text', placeholder: 'Mandal', required: true },
    { name: 'pincode', type: 'text', placeholder: 'Pincode (6 digits)', required: true }
  ];

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register Business Owner</h2>
        {formFields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
        {status && <p className="success-message">{status}</p>}
      </form>
    </div>
  );
};

export default RegisterOwner;