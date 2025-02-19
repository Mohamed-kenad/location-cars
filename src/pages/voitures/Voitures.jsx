import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import image from '../car.jpg'
import { Link } from 'react-router-dom';

const Voitures = () => {
  const [cars,setCars] = useState([]);

  useEffect(() => {
      axios.get("http://localhost:8080/voitures")
      .then(res => setCars(res.data))
  }, []);
  
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '76px' }}>
        <section 
          style={{
            position: 'relative', 
            height: 'calc(100vh - 76px)',
            marginTop: '-76px',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #363636 100%)'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              filter: 'brightness(36%) sepia(20%) hue-rotate(180deg)',
              zIndex: -1,
            }}
          />

          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-7">
                <div className="pe-lg-5">
                  <h1 className="text-white display-4 fw-bold mb-4" 
                      style={{ fontSize: '3.5rem' }}>
                    Explore the Road Ahead with{' '}
                    <span style={{ color: '#00c2ff' }}>GearShift</span>
                  </h1>
                  <p className="text-white opacity-75 mb-4" 
                     style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim justo 
                    nec ligula placerat efficitur.
                  </p>
                  <button style={{
                    background: 'linear-gradient(135deg, #00c2ff 0%, #0066ff 100%)',
                    border: 'none',
                    padding: '15px 30px',
                    color: 'white',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(0, 194, 255, 0.3)'
                  }}>
                    View Our Fleet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ 
          padding: '50px 0',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}>
          <div className="row text-center g-4">
            <div className="col-md-3">
              <h2 style={{ color: '#00c2ff', fontWeight: 'bold' }}>10+</h2>
              <p style={{ color: '#4a4a4a' }}>Years of Experience</p>
            </div>
            <div className="col-md-3">
              <h2 style={{ color: '#00c2ff', fontWeight: 'bold' }}>1000+</h2>
              <p style={{ color: '#4a4a4a' }}>Happy Clients</p>
            </div>
            <div className="col-md-3">
              <h2 style={{ color: '#00c2ff', fontWeight: 'bold' }}>200+</h2>
              <p style={{ color: '#4a4a4a' }}>Vehicles</p>
            </div>
            <div className="col-md-3">
              <h2 style={{ color: '#00c2ff', fontWeight: 'bold' }}>10+</h2>
              <p style={{ color: '#4a4a4a' }}>Locations</p>
            </div>
          </div>
        </section>

        <section style={{ padding: '50px 0', background: 'white' }}>
          <div className="row text-center g-4">
            <div className="col-md-3">
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #00c2ff 0%, #0066ff 100%)',
                borderRadius: '50%',
                display: 'inline-flex',
                margin: 'auto'
              }}>
                <i className="bi bi-search text-white fs-4 m-auto"></i>
              </div>
              <h5 className="mt-3" style={{ color: '#2c2c2c' }}>Browse Our Fleet</h5>
              <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="col-md-3">
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #00c2ff 0%, #0066ff 100%)',
                borderRadius: '50%',
                display: 'inline-flex',
                margin: 'auto'
              }}>
                <i className="bi bi-car-front text-white fs-4 m-auto"></i>
              </div>
              <h5 className="mt-3" style={{ color: '#2c2c2c' }}>Select Your Vehicle</h5>
              <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="col-md-3">
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #00c2ff 0%, #0066ff 100%)',
                borderRadius: '50%',
                display: 'inline-flex',
                margin: 'auto'
              }}>
                <i className="bi bi-file-text text-white fs-4 m-auto"></i>
              </div>
              <h5 className="mt-3" style={{ color: '#2c2c2c' }}>Submit an Enquiry</h5>
              <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="col-md-3">
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #00c2ff 0%, #0066ff 100%)',
                borderRadius: '50%',
                display: 'inline-flex',
                margin: 'auto'
              }}>
                <i className="bi bi-geo-alt text-white fs-4 m-auto"></i>
              </div>
              <h5 className="mt-3" style={{ color: '#2c2c2c' }}>Pick Up & Drive</h5>
              <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </section>

        <section style={{ 
          padding: '50px 0',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
        }}>
          <div className="container d-inline">
            <div className="d-flex justify-content-between align-items-center mb-4 mx-3">
              <h2 style={{ color: '#2c2c2c' }}>Featured Cars</h2>
              <button className="btn btn-outline-primary mb-4" > Show All <i className="bi bi-arrow-right"></i></button>
            </div>
            <div className="row g-4">


             {cars.map(car => (
                <div key={car.id} className="col-12 col-md-6 col-lg-3">
                  <div className="card h-100" style={{
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    <div className="position-relative">
                      <img 
                        src={car.image}
                        className="card-img-top"
                        alt={car.name}
                        style={{ 
                          height: "230px",
                          objectFit: "cover",
                          borderRadius: '12px 12px 0 0'
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                      }}>
                        {car.modele || ""}
                      </span>
                    </div>
                    <div className="card-body">
                      <h5 style={{ color: '#2c2c2c', fontWeight: '600' }}>{car.name}</h5>
                      <div className="d-flex align-items-baseline mb-3">
                        <small style={{ color: '#6c757d' }}>AED</small>
                        <span style={{
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          color: '#00c2ff',
                          margin: '0 5px'
                        }}>
                          {car.price || ""}
                        </span>
                        <small style={{ color: '#6c757d' }}>/ DAY</small>
                      </div>
                      <div className="row g-3 mb-3">
                        <div className="col-6">
                          <div className="d-flex align-items-center" style={{ color: '#6c757d' }}>
                            <i className="bi bi-speedometer2 me-2"></i>
                            <small>{car.specs || ""}</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center" style={{ color: '#6c757d' }}>
                            <i className="bi bi-gear me-2"></i>
                            <small>{car.transmission || ""}</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center" style={{ color: '#6c757d' }}>
                            <i className="bi bi-people me-2"></i>
                            <small>{car.seats || ""} Seats</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center" style={{ color: '#6c757d' }}>
                            <i className="bi bi-briefcase me-2"></i>
                            <small>{car.luggage || ""} Luggage</small>
                          </div>
                        </div>
                      </div>
                      <Link to={`/car/${car.id}`} style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #00c2ff 0%, #0066ff 100%)',
                        border: 'none',
                        display :"block",
                        color: 'white',
                        padding: '10px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        textAlign: 'center',
                      }}>
                        See Full Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </section>
      <Footer/>
      </div>
    </>
  );
};

export default Voitures;

export function Footer() {
  return (
    <footer className="bg-light py-5">
      <div className="container d-inline">
        <div className="row text-center text-md-start mx-auto">
          {/* About Us */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-primary fw-bold mb-3">About Us</h5>
            <p className="text-muted">
              CarRental provides high-quality car rental services 
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-primary fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-muted text-decoration-none hover-text-primary">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none hover-text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none hover-text-primary">
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-primary fw-bold mb-3">Contact Us</h5>
            <p className="text-muted mb-1">Email: support@carrental.com</p>
            <p className="text-muted">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-5 pt-3 text-center border-top border-muted">
          <p className="text-muted mb-0">&copy; 2023 CarRental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
