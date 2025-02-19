import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Footer } from "./Voitures";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/voitures/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!car) {
    return (
      <div className="text-center py-5">
        <span className="spinner-border text-primary" role="status"></span>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ paddingTop: '50px' }} className="container d-inline">
        <button className="btn btn-outline-primary mb-4" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back
        </button>

        <div className="row g-4 mb-5">
          {/* Car Image */}
          <div className="col-md-6">
            <img
              src={car.image}
              className="img-fluid rounded shadow"
              alt={car.name}
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                maxHeight: "400px", 
                width: "100%",
              }}
            />
          </div>

          {/* Car Details */}
          <div className="col-md-6">
            <h1 className="text-primary fw-bold">{car.name}</h1>
            <p className="text-muted mb-4">{car.description}</p>

            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item">
                <i className="bi bi-calendar-check me-2 text-primary"></i>
                <strong>Model:</strong> {car.modele}
              </li>
              <li className="list-group-item">
                <i className="bi bi-people me-2 text-primary"></i>
                <strong>Seats:</strong> {car.seats}
              </li>
              <li className="list-group-item">
                <i className="bi bi-gear me-2 text-primary"></i>
                <strong>Transmission:</strong> {car.transmission}
              </li>
              <li className="list-group-item">
                <i className="bi bi-fuel-pump me-2 text-primary"></i>
                <strong>Fuel Type:</strong> {car.fuel}
              </li>
            </ul>

            <h3 className="text-success fw-bold mb-3">${car.price} / Day</h3>

            {/* Rent Now Button */}
            <Link className="btn btn-lg btn-primary w-100 mt-3 rounded-pill shadow-sm" to="/rent" state={{ rent: car }} >
              <i className="bi bi-cart-check me-2"></i> Rent Now
            </Link>
          </div>
        </div>
      <Footer />
      </div>

    </>
  );
};

export default CarDetails;
