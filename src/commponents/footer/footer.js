import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Column 1: Brand Info & About */}
        <div className="footer-col brand-info">
          <h2 className="footer-logo">sm<span>Libas</span></h2>
          <p className="footer-about-text">
            Experience the art of modern elegance. We craft premium quality Kurtis, Shalwar Kameez, and contemporary traditional wear designed for the modern woman.
          </p>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#pinterest" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
            <a href="#whatsapp" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>

        {/* Column 2: Quick Shop Links */}
        <div className="footer-col">
          <h3>SHOP CATEGORIES</h3>
          <ul className="footer-links">
            <li><a href="#kurti">Premium Kurtis</a></li>
            <li><a href="#shalwar-kameez">Shalwar Kameez</a></li>
            <li><a href="#new-arrivals">New Arrivals</a></li>
            <li><a href="#sale">Exclusive Sale (Flat Off)</a></li>
          </ul>
        </div>


        {/* Column 4: Contact details */}
        <div className="footer-col contact-details">
          <h3>GET IN TOUCH</h3>
          <p><i className="fas fa-map-marker-alt"></i> Karachi, Sindh, Pakistan</p>
          <p><i className="fas fa-phone-alt"></i> +92 300 1234567</p>
          <p><i className="fas fa-envelope"></i> info@smlibas.com</p>
          <p className="timings"><i className="fas fa-clock"></i> Mon - Sat: 10:00 AM - 08:00 PM</p>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p>&copy; {new Date().getFullYear()} Create By Muhammad Talha Sheikh</p>
          <div className="payment-icons">
            <span title="Cash on Delivery">WhatsApp +923162573865</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;