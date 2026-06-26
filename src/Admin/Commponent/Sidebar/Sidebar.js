import React, { useState, useEffect, useContext } from 'react';
import './Sidebar.css';
import UsedContext from '../ContextApi/Context';
import { connectSupabase } from '../../../commponents/supabase/supabase';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  let {LinkTab , IsCheckAdmin} = useContext(UsedContext)
  const [CurruentUsers, setCurruentUsers] = useState('');
  // Screen size monitor karke default layouts select karne ke liye
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false); // Mobile standard defaults: close
      } else {
        setIsOpen(true);  // Desktop standard defaults: open
      }
    };

    handleResize(); // First load fire
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
// getCurrentUsers
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
  },[CurruentUsers]);

  // Logout Admin 
    const handleLogout = async () => {
      const { data , error } = await connectSupabase.auth.signOut();
  
      if (error) {
        console.log(error.message);
      } else {
        console.log('User Logged Out Successfully');
          
        const { error } = await connectSupabase
        .from('UsersIfo')
        .update({ agreeTerms: false })
        .eq('id', CurruentUsers?.id)
        IsCheckAdmin('user')
        
      }
  
     
    };
  return (
    <>
      {/* Mobile Menu Button - srf tab screen par active hoga jab side-panel close hoga */}
      <button className="mobile-trigger" onClick={toggleSidebar}>
        ☰
      </button>
    

      {/* Dim Overlay Clocker */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={toggleSidebar}
      ></div>

      {/* Main Container */}
      <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        
        {/* Header Branding */}
        <div className="sidebar-header">
          <div className="logo-container">
            <span className="logo-icon">SM</span>
            {isOpen && <span className="logo-text">Libas</span>}
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Action Menu Links */}
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item active">
              <span className="nav-icon" onClick={()=> LinkTab('Dashboard')}>D</span>
              {isOpen && <span className="nav-label" onClick={()=> LinkTab('Dashboard')}>Dashboard</span>}
            </li>
            <li className="nav-item">
              <span className="nav-icon" onClick={()=> LinkTab('Users')}>U</span>
              {isOpen && <span className="nav-label" onClick={()=> LinkTab('Users')}>Users</span>}
            </li>
            <li className="nav-item">
              <span className="nav-icon" onClick={()=> LinkTab('Order')}>O</span>
              {isOpen && <span className="nav-label" onClick={()=> LinkTab('Order')}>Orders</span>}
            </li>
            <li className="nav-item">
              <span className="nav-icon" onClick={()=> LinkTab('AddProducts')}>A</span>
              {isOpen && <span className="nav-label" onClick={()=> LinkTab('AddProducts')}>Add Products</span>}
            </li>
            <li className="nav-item">
              <span className="nav-icon" onClick={()=> LinkTab('Products')}>P</span>
              {isOpen && <span className="nav-label" onClick={()=> LinkTab('Products')}>Products</span>}
            </li>
            <li className="nav-item">
              <span className="nav-icon" onClick={handleLogout}>L</span>
              {isOpen && <span className="nav-label" onClick={handleLogout}>Log out</span>}
            </li>
          </ul>
        </nav>

        {/* User Card Info Area */}
        <div className="sidebar-footer">
          <div className="user-avatar">👤</div>
          {isOpen && (
            <div className="user-info">
              <p className="user-name">Alex Doe</p>
              <p className="user-role">Admin</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Sidebar;