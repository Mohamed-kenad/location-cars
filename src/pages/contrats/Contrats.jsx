import axios from "axios";
import { useEffect, useState } from "react";
import Contrat from "../contrats/Contrat";

export default function Contrats() {
  const [contrats, setContrats] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [clients, setClients] = useState([]);

  const open = (id, type) => {
    const modalElement = document.getElementById("exampleModal");
    if (modalElement) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.show();
    }
    document.getElementById("voitureInfo").style.display = "none";
    document.getElementById("clientInfo").style.display = "none";

    if (type === "voiture") {
      document.getElementById("modalTitle").textContent = "Détails Voiture";
      document.getElementById("voitureInfo").style.display = "block";
      const voiture = voitures.find((v) => v.id == id);
      if (voiture) {
        document.getElementById("idv").textContent = voiture.id;
        document.getElementById("marq").textContent = voiture.name;
        document.getElementById("type").textContent = voiture.matricule;
        document.getElementById("photo").src = `https://fakeimg.pl/300x200/?text=${voiture.name}&font=lobster`;
      }
    } else if (type === "client") {
      document.getElementById("modalTitle").textContent = "Détails Client";
      document.getElementById("clientInfo").style.display = "block";
      const client = clients.find((c) => c.id == id);
      if (client) {
        document.getElementById("clientId").textContent = client.id;
        document.getElementById("clientName").textContent = client.firstName;
        document.getElementById("clientEmail").textContent = client.email;
      }
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/contrats")
      .then(res => setContrats(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/voitures")
      .then(res => setVoitures(res.data))
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
        <div className="card-header bg-warning text-white">
          <h4 className="mb-0">Gestion des Contrats</h4>
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
                  <th>Prix</th>
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title" id="modalTitle">Détails</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div id="voitureInfo" style={{display: "none"}}>
                <div className="card border-0">
                  <div className="mb-3">
                    <p><strong>ID:</strong> <span id="idv" className="ms-2"></span></p>
                    <p><strong>Marque:</strong> <span id="marq" className="ms-2"></span></p>
                    <p><strong>Matricule:</strong> <span id="type" className="ms-2"></span></p>
                  </div>
                  <img id="photo" src="" alt="Photo voiture" className="img-fluid rounded shadow-sm" />
                </div>
              </div>

              <div id="clientInfo" style={{display: "none"}}>
                <div className="card border-0">
                  <div className="p-3">
                    <p><strong>ID Client:</strong> <span id="clientId" className="ms-2"></span></p>
                    <p><strong>Nom:</strong> <span id="clientName" className="ms-2"></span></p>
                    <p><strong>Email:</strong> <span id="clientEmail" className="ms-2"></span></p>
                  </div>
                </div>
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