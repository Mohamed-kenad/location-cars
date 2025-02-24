import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [contrats,setCantrats]=useState([]);
  
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  const clientId=user?.id;
  
 useEffect(()=>{


  axios.get(`http://localhost:8080/contrats`)
  .then((res)=>setCantrats(res.data));

}
,[clientId])

const today = new Date();
const confiClient = contrats?.filter((c) => c.clientId === clientId &&["pending", "confirmed", "canceled"].includes(c.statut) &&
  new Date(c.datefin) >= today).length || 0;
  


  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
      }
    });
  };

  const navStyle = {
    background: scrolled
      ? "linear-gradient(145deg, rgba(0, 194, 255, 0.95), rgba(0, 102, 255, 0.95))"
      : "rgba(25, 25, 25, 0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: scrolled
      ? "0 10px 30px rgba(0, 194, 255, 0.2)"
      : "0 4px 20px rgba(0, 0, 0, 0.3)",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top container p-3 mt-3" 
         style={{ ...navStyle, borderRadius: "30px" }}>
      <div className="container-fluid px-lg-5">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-geo-alt-fill me-2" 
             style={{ color: scrolled ? "#ffffff" : "#00c2ff" }}></i>
          <span className="fw-bold fs-5">GEARSHIFT</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {['home', 'about', 'brands'].map((section) => (
              <li className="nav-item" key={section}>
                <a
                  className={`nav-link position-relative px-4 ${activeSection === section ? 'active' : ''}`}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                >
                  <span className="text-uppercase small">{section}</span>
                  {activeSection === section && (
                    <span
                      className="position-absolute"
                      style={{
                        bottom: "0",
                        left: "20px",
                        right: "20px",
                        height: "2px",
                        background: "#ffffff"
                      }}
                    ></span>
                  )}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-3 d-flex align-items-center">
              {isLoggedIn ? (
                <>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-light rounded-pill px-3 me-4"
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </button>
                    <Link to="/tracking" className='me-4 '>
                    <i className="bi bi-bell-fill fs-3  text-white">
                      {confiClient>0 &&(
                        <>
                      <strong className="badge bg-danger position-absolute translate-middle rounded-circle ">{confiClient}</strong>
                        </>
                      )}
                    </i>
                  </Link>
                    <Link to="/profile">
                    <img
                      src={user?.avatar || "https://via.placeholder.com/60"}
                      alt="User Avatar"
                      className="profile-img rounded-circle"
                      width="20"
                      height="20"
                      />
                      </Link>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-outline-light rounded-pill px-4"
                >
                  LOGIN
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
