import React, { useContext , useRef , useEffect } from 'react';
import './hero.css';
import heroImage from '../Images/heroSection.png'; // Aapki matching image design file
import { userContext } from '../contextApi/Context';
import hereo  from '../Images/hereo.jpg'

const HeroSection = () => {
  let {setCheckClick} = useContext(userContext)
  
   const containerRef = useRef(null)

  useEffect(() => {
    const elements = containerRef.current.children // sab child elements

    window.gsap.fromTo(elements, 
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.6, 
        ease: "power2.out"
      }
    )
  }, [])

  
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${hereo})` }}>
      <div className="hero-dark-overlay"></div>
      
      <div ref={containerRef} className="hero-main-content">
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
          <a href="#shop" className="hero-btn-gold" onClick={()=>setCheckClick('PremiumKurtis')}>SHOP THE COLLECTION</a>
          <a href="#new-arrivals" className="hero-btn-outline" onClick={()=>setCheckClick('NewArrivals')}>EXPLORE ARRIVALS</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;