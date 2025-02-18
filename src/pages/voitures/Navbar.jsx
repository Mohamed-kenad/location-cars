import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav 
      className="navbar navbar-expand-lg container navbar-dark fixed-top p-3" 
      style={{
        borderRadius: "69px",
        backgroundColor: "rgba(0, 0, 0, 0.72)", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.88)",
        maxWidth: "1295px", 
        margin: "0 auto", 
        
      }}
    >
      <div className="container-fluid px-3 px-lg-5">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <i className="bi bi-geo-alt-fill text-warning me-2"></i>
          <span className="fw-bold">GEARSHIFT</span>
        </a>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link active" href="/">HOME</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">ABOUT</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/brands">CAR BRANDS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">CONTACT US</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
