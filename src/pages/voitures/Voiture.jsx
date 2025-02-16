import React from 'react';
import { Link } from 'react-router-dom';

const Voiture = ({ voitures }) => {
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm overflow-hidden hover-shadow-lg transition-all duration-250 ease-in-out">
        {/* Image Section */}
        <div className="position-relative ratio ratio-4x3">
          <img
            src={voitures.image}
            className="card-img-top object-fit-cover"
            alt={voitures.name}
          />
          <div className="position-absolute bottom-0 w-100 h-50 bg-dark bg-opacity-25"></div>
          
          {/* Price Badge */}
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-white text-dark fs-5 p-2 rounded-3 shadow-sm">
              <span className="text-primary fw-bold">{voitures.prix}€</span>
              <span className="text-muted fs-6"> / jour</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-4">
          {/* Title Section */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="card-title fs-5 fw-bold mb-0 text-truncate">
              {voitures.name}
            </h3>
            <span className="badge bg-primary bg-opacity-10 text-primary fs-6 rounded-pill px-3">
              {voitures.modele}
            </span>
          </div>

          {/* Features Grid */}
          <div className="row g-2 mb-4">
            <div className="col-4 d-flex align-items-center">
              <i className="bi bi-fuel-pump text-primary me-2"></i>
              <small className="text-muted">Diesel</small>
            </div>
            <div className="col-4 d-flex align-items-center">
              <i className="bi bi-gear text-primary me-2"></i>
              <small className="text-muted">Auto</small>
            </div>
            <div className="col-4 d-flex align-items-center">
              <i className="bi bi-people text-primary me-2"></i>
              <small className="text-muted">Places</small>
            </div>
          </div>

          {/* CTA Button */}
          <Link 
            to="/contrats" 
            className="btn btn-dark d-flex justify-content-between align-items-center "
          >
            <span>Louer maintenant</span>
            <i className="bi bi-arrow-right-short fs-4"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Voiture;