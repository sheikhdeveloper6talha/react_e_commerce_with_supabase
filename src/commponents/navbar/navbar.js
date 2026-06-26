import './navbar.css';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../contextApi/Context';
import { connectSupabase } from '../supabase/supabase';
import SMlibasLogo from '../Images/logoSMlibas.webp'
import CartDrawer from '../Addcart/AddCart';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  


  const {
    setCheckClick,
    DobaraChala,
    setDobaraChala,
    OpendCart,
    SendProduct,
    GoToLogin
  } = useContext(userContext);

  const [CurruentUsers, setCurruentUsers] = useState('');

  const handlar = (va) => {
    setCheckClick(va);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    
    setIsOpen(false);
  
  };

  const getCurrentUser = async () => {
    try {
      const {
        data: { user }
      } = await connectSupabase.auth.getUser();

      setCurruentUsers(user);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    getCurrentUser();
  },[DobaraChala]);

  const handleLogout = async () => {
    const { error } = await connectSupabase.auth.signOut();

    if (error) {
      console.log(error.message);
    } else {
      console.log('User Logged Out Successfully');
         const { error } = await connectSupabase
        .from('UsersIfo')
        .update({ agreeTerms: false })
        .eq('id', CurruentUsers.id)
      
    }

    setDobaraChala(!DobaraChala);
    setIsOpen(false);
  };

  return (
    <>
    <nav className="main-navbar">
        <div className="brand-logo">
          <img src={SMlibasLogo} alt = 'Is not Show'/>
        </div>
      <div className="navbar-container">

<div className='toogleAddcart'>

        <button
          className={`nav-toggle-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

          </div>

        <ul className={`navbar-links-list ${isOpen ? 'active-menu' : ''}`}>
          <li onClick={() => handlar('')}>
            <a href="#home">Home</a>
          </li>

          <li onClick={() => handlar('Premium Kurtis')}>
            <a href="#kurti">Kurti</a>
          </li>

          <li onClick={() => handlar('Shalwar Kameez')}>
            <a href="#shalwar-kameez">Shalwar Kameez</a>
          </li>

          <li onClick={() => handlar('New Arrivals')}>
            <a href="#new-arrivals">New Arrivals</a>
          </li>

          <li onClick={() => handlar('Exclusive Sale')}>
            <a href="#sale" className="sale-tab">
              Sale
            </a>
          </li>

          <li onClick={() => handlar('Order')}>
            <a href="#sale" className="sale-tab">
              Order
            </a>
          </li>


          {/* Mobile Section */}
          <div className="mobile-user-section">
            
              <>
            {CurruentUsers && (
                <p className="account-btn email-text">
                  {CurruentUsers.email}
                </p>
)}
{CurruentUsers && (
                <button
                  onClick={()=> handleLogout()}
                  className="Logout-btn"
                >
                  Logout
                </button>)}
              </>
          </div>
        </ul>

        {/* Desktop Section */}
        <div className="desktop-actions">

          {CurruentUsers && (
            <p className="account-btn">
              {CurruentUsers.email}
            </p>
          )}

          {CurruentUsers && (
            <button
              onClick={handleLogout}
              className="Logout-btn"
            >
              Logout
            </button>
          )}
        </div>
          <div className="navbar-right-actions">
            <a href="#account" className="account-btn" onClick={()=> OpendCart()}>
              Add Cart
            </a>
            <span>{SendProduct.length}</span>
          </div>

      </div>
    </nav>

</>
)
};

export default Navbar;