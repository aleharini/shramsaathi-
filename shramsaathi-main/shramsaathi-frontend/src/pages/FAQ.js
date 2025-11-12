import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is ShramSaathi?",
      answer: "ShramSaathi is a platform that connects workers with potential employers, making it easier for workers to find jobs and for employers to find skilled labor in their area."
    },
    {
      question: "How do I register as a worker?",
      answer: "You can register as a worker by clicking on the 'Register Worker' link in the sidebar. Fill in your details including name, contact information, work type, and location. Your profile will be visible to potential employers in your area."
    },
    {
      question: "What types of work can I find on ShramSaathi?",
      answer: "ShramSaathi supports various types of work including construction, agriculture, domestic help, skilled trades, and more. Workers can specify their work type during registration."
    },
    {
      question: "How can I find workers in my area?",
      answer: "Use the 'Search Workers' or 'Map View' features to find workers. You can filter by location, work type, and experience level. The map view shows you workers' locations in real-time."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we take data security seriously. Personal information is protected and only verified employers can see your contact details. We follow industry best practices for data protection."
    },
    {
      question: "How can I update my worker profile?",
      answer: "Log in to your account and navigate to the profile section. You can update your details including contact information, work preferences, and location at any time."
    },
    {
      question: "Is ShramSaathi free to use?",
      answer: "Yes, ShramSaathi is completely free for both workers and employers. Our mission is to facilitate employment and improve access to work opportunities."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </button>
            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;