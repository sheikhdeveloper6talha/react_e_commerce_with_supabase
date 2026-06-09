import React from 'react';
import './Loader.css';
import SMlibasLogo from '../Images/logoSMlibas.webp'
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
     <img src={SMlibasLogo} alt = 'Is not Show'/>
    </div>
  );
};

export default Loader;