import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import image from '../car.jpg'

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
            filter: 'brightness(36%) blur(1px) ', 
            zIndex: -1,  
          }}></div>

          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-7">
                <div className="pe-lg-5">
                  <h1 className="text-white display-4 fw-bold mb-4" style={{ fontSize: '3.5rem' }}>
                    Explore the Road Ahead with{' '}
                    <span className="text-success">GearShift</span> Rentals
                  </h1>
                  <p className="text-white opacity-75 mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim justo 
                    nec ligula placerat efficitur.
                  </p>
                  <button className="btn btn-success px-4 py-3 text-uppercase fw-semibold">
                    View Our Fleet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

          {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="row text-center g-4">
          <div className="col-md-3">
            <h2 className="text-success fw-bold">10+</h2>
            <p className="text-secondary">Years of Experience</p>
          </div>
          <div className="col-md-3">
            <h2 className="text-success fw-bold">1000+</h2>
            <p className="text-secondary">Happy Clients</p>
          </div>
          <div className="col-md-3">
            <h2 className="text-success fw-bold">200+</h2>
            <p className="text-secondary">Vehicles</p>
          </div>
          <div className="col-md-3">
            <h2 className="text-success fw-bold">10+</h2>
            <p className="text-secondary">Locations</p>
          </div>
        </div>
      </section>

         {/* Process Section */}
      <section className="py-5 ">
        <div className="row text-center g-4">
          <div className="col-md-3">
          <div className="bg-success rounded-circle d-inline-flex p-0" style={{ width: '70px', height: '70px' }}>
             <i className="bi bi-search text-white fs-4 m-auto"></i>
           </div>
            <h5 className="mt-3">Browse Our Fleet</h5>
            <p className="text-secondary small">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
          <div className="col-md-3">
          <div className="bg-success rounded-circle d-inline-flex p-0" style={{ width: '70px', height: '70px' }}>
              <i className="bi bi-car-front text-white fs-4  m-auto"></i>
            </div>
            <h5 className="mt-3">Select Your Vehicle</h5>
            <p className="text-secondary small">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
          <div className="col-md-3">
          <div className="bg-success rounded-circle d-inline-flex p-0" style={{ width: '70px', height: '70px' }}>
              <i className="bi bi-file-text text-white fs-4  m-auto"></i>
            </div>
            <h5 className="mt-3">Submit an Enquiry</h5>
            <p className="text-secondary small">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
          <div className="col-md-3">
          <div className="bg-success rounded-circle d-inline-flex p-0" style={{ width: '70px', height: '70px' }}>
              <i className="bi bi-geo-alt text-white fs-4  m-auto"></i>
            </div>
            <h5 className="mt-3">Pick Up & Drive</h5>
            <p className="text-secondary small">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div>
        </div>
      </section>

        {/* Featured Cars Section */}
      <section className="py-5 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Featured Cars</h2>
          <button className="btn btn-outline-danger">Show All</button>
        </div>
        <div className="row g-4">
          {cars.map(car => (
            <div key={car.id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 cover shadow-sm">
                <div className="position-relative">
                  <img 
                    src={car.image}
                    className="card-img-top"
                    alt={car.name} style={  {  minHeight:"230px"}}
                  />
                  <span className="position-absolute top-0 start-0 badge bg-danger m-3">
                    {car.year || ""}
                  </span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{car.name}</h5>
                  <div className="d-flex align-items-baseline mb-3">
                    <small className="text-secondary">AED</small>
                    <span className="fs-4 fw-bold mx-1">{car.price || ""}</span>
                    <small className="text-secondary">/ DAY</small>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <div className="d-flex align-items-center text-secondary">
                        <i className="bi bi-speedometer2 me-2"></i>
                        <small>{car.specs|| ""}</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center text-secondary">
                        <i className="bi bi-gear me-2"></i>
                        <small>{car.specs || ""}</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center text-secondary">
                        <i className="bi bi-people me-2"></i>
                        <small>{car.specs || ""} Seats</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center text-secondary">
                        <i className="bi bi-briefcase me-2"></i>
                        <small>{car.specs || ""} Luggage</small>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-success text-white w-100">See Full Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </>
  );
};

export default Voitures;

