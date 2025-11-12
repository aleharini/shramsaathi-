import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'your-secret-key'; // Use environment variable in production

export const encryptData = (data) => {
  if (!data) return null;
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  if (!encryptedData) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Function to encrypt sensitive fields in an object
export const encryptSensitiveData = (data) => {
  if (!data) return data;
  
  const sensitiveFields = ['phone', 'address', 'pincode', 'aadhar'];
  const encryptedData = { ...data };
  
  sensitiveFields.forEach(field => {
    if (encryptedData[field]) {
      encryptedData[field] = encryptData(encryptedData[field]);
    }
  });
  
  return encryptedData;
};

// Function to decrypt sensitive fields in an object
export const decryptSensitiveData = (data) => {
  if (!data) return data;
  
  const sensitiveFields = ['phone', 'address', 'pincode', 'aadhar'];
  const decryptedData = { ...data };
  
  sensitiveFields.forEach(field => {
    if (decryptedData[field]) {
      decryptedData[field] = decryptData(decryptedData[field]);
    }
  });
  
  return decryptedData;
};