import axios from "axios";
import { useEffect, useState } from "react";
import Ajoutercontrats from "./Ajoutecontrats";
import Contrat from "../contrats/Contrat";

export default function Contrats() {
  const [contrats, setContrats] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [clients, setClients] = useState([]);
  const [voitureselect, setVoitureselect] = useState("");
  const [clientselect, setClientselect] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/voitures/")
      .then(res => setVoitures(res.data))
      .catch(err => console.log(err));
  }, []);

  const open = (id, type) => {
    const modalElement = document.getElementById("exampleModal");
    const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();

    document.getElementById("voitureInfo").style.display = "none";
    document.getElementById("clientInfo").style.display = "none";
    document.getElementById("ajouterContrat").style.display = "none";

    if (type === "voiture") {
      const data = voitures.find((v) => v.id == id)
      setVoitureselect(data)
      document.getElementById("modalTitle").textContent = "Détails Voiture";
      document.getElementById("voitureInfo").style.display = "block";
    }
    if (type === "client") {
      const val = clients.find((c) => c.id == id)
      setClientselect(val)
      document.getElementById("modalTitle").textContent = "Détails Client";
      document.getElementById("clientInfo").style.display = "block";
    }
    if (type === "contrat") {
      axios.get("http://localhost:8080/voitures")
        .then(res => setVoitures(res.data))
      document.getElementById("modalTitle").textContent = "Détails Client";
      document.getElementById("ajouterContrat").style.display = "block";
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/contrats")
      .then(res => setContrats(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/client")
      .then(res => setClients(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="card shadow">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Gestion des Contrats</h4>
          <button className="btn btn-light" onClick={() => open(null, "contrat")} >
            <i className="bi bi-plus-circle me-2"></i>Add Contrats
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover border">
              <thead className="bg-light">
                <tr>
                  <th>Id Contrat</th>
                  <th>ID Client</th>
                  <th>ID Voiture</th>
                  <th>Date Début</th>
                  <th>Date Fin</th>
                  <th>Prix / jour</th>
                  <th>prix total</th>
                </tr>
              </thead>
              <tbody>
                {contrats.map((c, i) =>
                  <Contrat key={i} c={c} open={open} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="exampleModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title" id="modalTitle">Détails</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body bg-light">
                            
                            {/* Vehicle Info Modal Content */}
              <div id="voitureInfo" style={{ display: "none" }}>
                <div className="card border-0">
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img id="photo" src={voitureselect.image} alt="voiture" 
                        className="img-fluid rounded-start" 
                        style={{ objectFit: 'cover', height: '250px' }} />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <h6 className="card-title mb-3">
                          <i className="bi bi-car-front text-primary me-2"></i>
                          Détails du Véhicule
                        </h6>
                        <div className="list-group list-group-flush">
                          <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                            <small className="text-muted fs-6">ID</small>
                            <span className="badge bg-light text-dark fs-6">{voitureselect.id}</span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                            <small className="text-muted fs-6 ">Marque</small>
                            <span className="badge bg-light text-dark fs-6">{voitureselect.name}</span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                            <small className="text-muted fs-6">Matricule</small>
                            <span className="badge bg-light text-dark fs-6">{voitureselect.matricule}</span>
                          </div>
                          <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                            <small className="text-muted fs-6">modele</small>
                            <span className="badge bg-light text-dark fs-6">{voitureselect.modele}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                            {/* Client Info Modal Content */}
              <div id="clientInfo" style={{ display: "none" }}>
                <div className="card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                          style={{ width: '50px', height: '50px' }}>
                        <i className="bi bi-person-fill" style={{ fontSize: '1.5rem' }}></i>
                      </div>
                      <div>
                        <h6 className="mb-0 text-dark fs-5">{clientselect.firstName} {clientselect.lastName}</h6>
                        <small className="text-muted">Client ID: {clientselect.id}</small>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="card border-0 bg-light">
                          <div className="card-body p-3">
                            <h6 className="card-subtitle mb-2 text-primary small">
                              <i className="bi bi-person-vcard me-1"></i>Personnel
                            </h6>
                            <div className="mb-2">
                              <small className="text-muted fs-5">CIN : </small>
                              <span className="badge bg-light text-dark fs-5">{clientselect.cin}</span>
                            </div>
                            <div>
                              <small className="text-muted fs-5">permis : </small>
                              <span className="badge bg-light text-dark fs-5" >{clientselect.permis}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card border-0 bg-light">
                          <div className="card-body p-3">
                            <h6 className="card-subtitle mb-2 text-primary small">
                              <i className="bi bi-info-circle me-1"></i>Contact
                            </h6>
                            <div className="mb-2">
                              <i className="bi bi-telephone-fill text-primary me-2 small"></i>
                              <span className="small">{clientselect.phone}</span>
                            </div>
                            <div className="mb-2">
                              <i className="bi bi-envelope-fill text-primary me-2 small"></i>
                              <span className="small">{clientselect.email}</span>
                            </div>
                            <div>
                              <i className="bi bi-geo-alt-fill text-primary me-2 small"></i>
                              <span className="small">{clientselect.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div id="ajouterContrat" style={{ display: "none" }}>
                <Ajoutercontrats key={contrats.length} voitures={voitures} c={clients} setContrats={setContrats} />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}