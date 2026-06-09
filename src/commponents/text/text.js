import React from 'react';
import './text.css';

const TopTicker = () => {
  return (
    <div className="top-ticker">
      <div className="ticker-track">
        <span className="ticker-item">✨ NEW ARRIVALS: Flat 20% OFF on Luxury Kurtis! ✨</span>
        <span className="ticker-item">🛍️ FREE SHIPPING across Pakistan on orders above Rs. 5000! 🛍️</span>
        <span className="ticker-item">🌟 ELEGANT SHALWAR KAMEEZ SUITS — Crafted for the modern woman! 🌟</span>
        {/* Repeating for seamless infinite animation looping */}
        <span className="ticker-item">✨ NEW ARRIVALS: Flat 20% OFF on Luxury Kurtis! ✨</span>
        <span className="ticker-item">🛍️ FREE SHIPPING across Pakistan on orders above Rs. 5000! 🛍️</span>
      </div>
    </div>
  );
};

export default TopTicker;