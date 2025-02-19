import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav 
      className="navbar navbar-expand-lg container navbar-dark fixed-top p-3" 
      style={{
        borderRadius: "30px",
        background: scrolled 
          ? "linear-gradient(145deg, rgba(0, 194, 255, 0.95), rgba(0, 102, 255, 0.95))"
          : "rgba(25, 25, 25, 0.8)",
        backdropFilter: "blur(10px)",
        boxShadow: scrolled 
          ? "0 10px 30px rgba(0, 194, 255, 0.2)"
          : "0 4px 20px rgba(0, 0, 0, 0.3)",
        maxWidth: "1295px",
        margin: "15px auto",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="container-fluid px-3 px-lg-5">
        {/* Logo */}
        <a 
          className="navbar-brand d-flex align-items-center" 
          href="/"
          style={{
            fontSize: "1.4rem",
            letterSpacing: "1px"
          }}
        >
          <i className="bi bi-geo-alt-fill me-2" style={{ 
            color: scrolled ? "#ffffff" : "#00c2ff",
            transition: "color 0.3s ease"
          }}></i>
          <span className="fw-bold">GEARSHIFT</span>
        </a>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          style={{
            padding: "8px",
            transition: "transform 0.3s ease"
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {[
              { text: "HOME", href: "/", active: true },
              { text: "ABOUT", href: "/about" },
              { text: "CAR BRANDS", href: "/brands" },
              { text: "CONTACT US", href: "/contact" }
            ].map((item, index) => (
              <li className="nav-item" key={index}>
                <a 
                  className={`nav-link ${item.active ? 'active' : ''}`} 
                  href={item.href}
                  style={{
                    padding: "8px 20px",
                    margin: "0 5px",
                    fontSize: "0.9rem",
                    letterSpacing: "1px",
                    position: "relative",
                    transition: "all 0.3s ease",
                    opacity: item.active ? 1 : 0.8
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = item.active ? "1" : "0.8";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  {item.text}
                  {item.active && (
                    <span style={{
                      position: "absolute",
                      bottom: "0",
                      left: "20px",
                      right: "20px",
                      height: "2px",
                      background: scrolled ? "#ffffff" : "#00c2ff",
                      transition: "background 0.3s ease"
                    }}></span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;