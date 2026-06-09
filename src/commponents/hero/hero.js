import React from 'react';
import './hero.css';
import heroImage from '../Images/heroSection.png'; // Aapki matching image design file

const HeroSection = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-dark-overlay"></div>
      
      <div className="hero-main-content">
        <h1 className="hero-main-title">
          EXPERIENCE THE <br />
          ART OF MODERN <br />
          ELEGANCE
        </h1>
        
        <p className="hero-main-desc">
          Curated Kurti, Shalwar Kameez & Suits for the Contemporary Woman. 
          Discover timeless designs and modern fits.
        </p>
        
        <p className="hero-signature-text">
          Crafted for comfort, styled for you.
        </p>

        <div className="hero-buttons-wrapper">
          <a href="#shop" className="hero-btn-gold">SHOP THE COLLECTION</a>
          <a href="#new-arrivals" className="hero-btn-outline">EXPLORE ARRIVALS</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;