import React, { useState } from 'react';
import { verifyDocument, getCurrentUser } from '../utils/auth';
import './VerificationForm.css';

const DocumentTypes = {
  OWNER: ['businessLicense', 'taxRegistration', 'identityProof'],
  WORKER: ['identityProof', 'addressProof', 'workExperience']
};

const VerificationForm = () => {
  const [files, setFiles] = useState({});
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({});
  
  const user = getCurrentUser();
  const requiredDocs = DocumentTypes[user?.role] || [];

  const handleFileChange = (documentType, event) => {
    const file = event.target.files[0];
    setFiles(prev => ({ ...prev, [documentType]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const results = await Promise.all(
        Object.entries(files).map(([docType, file]) =>
          verifyDocument(user.id, docType, file)
        )
      );

      setStatus(results.reduce((acc, result) => ({
        ...acc,
        [result.documentType]: result.status
      }), {}));

      // Clear files after successful upload
      setFiles({});
    } catch (error) {
      console.error('Verification submission failed:', error);
      setStatus({ error: 'Document submission failed. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  if (!user) return <div>Please login to verify your account.</div>;

  return (
    <div className="verification-form">
      <h2>Account Verification</h2>
      <p className="verification-info">
        Please upload the following documents to verify your {user.role.toLowerCase()} account:
      </p>

      <form onSubmit={handleSubmit}>
        {requiredDocs.map(docType => (
          <div key={docType} className="document-upload">
            <label>
              {docType.replace(/([A-Z])/g, ' $1').trim()}:
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(docType, e)}
                required={!status[docType]}
              />
            </label>
            {status[docType] && (
              <span className={`status ${status[docType].toLowerCase()}`}>
                {status[docType]}
              </span>
            )}
          </div>
        ))}

        <button 
          type="submit" 
          disabled={uploading || Object.keys(files).length === 0}
          className="submit-button"
        >
          {uploading ? 'Uploading...' : 'Submit Documents'}
        </button>

        {status.error && (
          <div className="error-message">{status.error}</div>
        )}
      </form>

      <div className="verification-notes">
        <h3>Important Notes:</h3>
        <ul>
          <li>All documents should be clear and legible</li>
          <li>Accepted formats: PDF, JPG, PNG</li>
          <li>Maximum file size: 5MB per document</li>
          <li>Processing may take 1-2 business days</li>
        </ul>
      </div>
    </div>
  );
};

export default VerificationForm;