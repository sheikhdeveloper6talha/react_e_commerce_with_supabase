import React, { useEffect, useContext } from 'react';
import './Error.css';
import { userContext } from '../contextApi/Context';

const ErrorToast = () => {
  // Context se error text aur setter function uthaya
  const { isErrorText, setisErrorText } = useContext(userContext);
  const toastType = 'error'; // Fixed state as per your requiremnt

  useEffect(() => {
    // Agar koi error text hai to timer chalao
    if (isErrorText) {
      const timer = setTimeout(() => {
        if (setisErrorText) setisErrorText(""); // 6 seconds baad context ko khali kar do
      }, 6000);

      // Cleanup function: naya error aane par purana timer instant clear
      return () => clearTimeout(timer);
    }
  }, [isErrorText, setisErrorText]);

  // Manually close karne ka handler
  const handleClose = () => {
    if (setisErrorText) setisErrorText(""); // Context text reset hote hi component gayab ho jayega
  };

  // Agar backend/context mein koi error text hi nahi bacha to component screen se automatic out
  if (!isErrorText) return null;

  return (
    <div className={`sml-toast-wrapper ${toastType}`}>
      <div className="sml-toast-content">
        
        {/* Icon container */}
        <div className="sml-toast-icon">
          ✕
        </div>
        
        {/* Message container */}
        <div className="sml-toast-message">
          <p className="sml-toast-title">Error</p>
          <p className="sml-toast-text">{isErrorText}</p>
        </div>

        {/* Manual Close Button */}
        <button 
          type="button" 
          className="sml-toast-close-btn" 
          onClick={handleClose}
        >
          ×
        </button>
      </div>
      
      {/* Niche ki animated progress bar line (Ensure animation speed is 6s in CSS) */}
      <div className="sml-toast-progress"></div>
    </div>
  );
};

export default ErrorToast;