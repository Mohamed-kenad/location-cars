import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 
import { Footer } from './Voitures';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.rent;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [cin, setCin] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(""); 
  const [nom, setNom] = useState(""); 
  const [permis, setPermis] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * car.price;

    try {
      const clientResponse = await axios.get(`http://localhost:8080/client?cin=${cin}`);
      const existingClients = clientResponse.data;
      let clientId;

      if (existingClients.length > 0) {
        clientId = existingClients[0].id;
      } else {
        const newClientResponse = await axios.post("http://localhost:8080/client", {
          firstName: name,
          lastName: nom, 
          cin,
          permis,
          email,
          phone,
          address
        });

        const newClient = newClientResponse.data;
        clientId = newClient.id;
      }

      await axios.post("http://localhost:8080/contrats", {
        clientId: clientId,
        voitureId: car.id,
        datedebut: startDate,
        datefin: endDate,
        prix: car.price,
        total: totalPrice,
        statut: "En attente",
      });

      alert("تم تأكيد الحجز بنجاح!");
      navigate("/contrats");

    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء الحجز!");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 container d-inline py-5">
        <button className="btn btn-outline-primary mb-4" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <h1 className="fs-2 fw-bold mb-4">Book Your Rental</h1>

        <div className="row g-4">

          <div className="col-12 col-md-6 mt-5">
            <div className="card border-0">
              <img src={car.image || "/placeholder.svg"} alt={car.model} className="card-img-top rounded-3 shadow-sm" />
              <div className="card-body px-0">
                <h2 className="fs-3 fw-semibold mt-2">{car.model}</h2>
                <p className="fs-4 fw-bold">${car.price} / day</p>
              </div>
            </div>
          </div>


          <div className="col-12 col-md-6">

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label">CIN</label>
                    <input type="text" className="form-control" value={cin} onChange={(e) => setCin(e.target.value)} required />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label">Permis</label>
                    <input type="text" className="form-control" value={permis} onChange={(e) => setPermis(e.target.value)} required />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label">Adresse</label> 
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                  </div>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">Confirm Booking</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default BookingPage;
