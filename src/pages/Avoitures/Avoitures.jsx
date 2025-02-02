import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Avoiture from "./Avoiture";

export default function Avoitures() {
  const [voitures, setVoitures] = useState([]);
  const [selectVoiture, setSelectVoiture] = useState({});
  const [modalMode, setModalMode] = useState("add");

  useEffect(() => {
    axios.get("http://localhost:8080/voitures")
      .then(res => setVoitures(res.data))
  }, []);
  
  const deletev = (idv) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/voitures/${idv}`)
          .then(() => {
            Swal.fire("Supprimé!", "Le véhicule a été supprimé.", "success");
            setVoitures((data) => data.filter((v) => v.id !== idv));
          });
      }
    });
  };

  const openEditModal = (idv) => {     
    const data = voitures.find((v) => v.id === idv);
    if (data) {
      setSelectVoiture(data);
      setModalMode('edit');
      showModal();
    }
  };

  const openAddModal = () => {
    setSelectVoiture({ disponible: true });
    setModalMode('add');
    showModal();
  };

  const showModal = () => {
    const modalElement = document.getElementById("voitureModal");
    const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
  };

  const handleSubmit = () => {
    if (modalMode === 'edit') {
      axios.put(`http://localhost:8080/voitures/${selectVoiture.id}`, selectVoiture)
        .then((res) => { 
          setVoitures(prev => prev.map(v => v.id === selectVoiture.id ? res.data : v));
          Swal.fire("Mis à jour!", "Les informations de la voiture ont été modifiées.", "success");
          hideModal();
        });
    } else {
      axios.post("http://localhost:8080/voitures", selectVoiture)
        .then((res) => {
          setVoitures([...voitures, res.data]);
          Swal.fire("Ajouté!", "La voiture a été ajoutée avec succès.", "success");
          hideModal();
        });
    }
  };

  const hideModal = () => {
    const modalElement = document.getElementById("voitureModal");
    if (modalElement) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.hide();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectVoiture({ ...selectVoiture, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="card shadow">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Gestion des Véhicules</h4>
          <button className="btn btn-light" onClick={openAddModal}>
            <i className="bi bi-plus-circle me-2"></i> Ajouter un véhicule
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover border">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>matricule</th>
                  <th>Modèle</th>
                  <th>Image</th>
                  <th>Disponible</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {voitures.map((v) => (
                  <Avoiture key={v.id} v={v} openEditModal={openEditModal} deletev={deletev} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="voitureModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">
                {modalMode === 'edit' ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                {modalMode === "edit" && (
                  <div className="mb-3">
                    <label className="form-label">ID</label>
                    <input type="text" className="form-control" value={selectVoiture.id || ""} disabled />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-control" value={selectVoiture.name || ""} 
                    onChange={(e) => setSelectVoiture({ ...selectVoiture, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">matricule</label>
                  <input type="text" className="form-control" value={selectVoiture.matricule || ""} 
                    onChange={(e) => setSelectVoiture({ ...selectVoiture, matricule: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Modèle</label>
                  <input type="text" className="form-control" value={selectVoiture.modele || ""} 
                    onChange={(e) => setSelectVoiture({ ...selectVoiture, modele: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input type="file" onChange={handleImageChange} />
                  {selectVoiture.image && <img src={selectVoiture.image} alt="preview" width="100" />}
                </div>
                  { modalMode === "edit" && (<div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input"
                    checked={selectVoiture.disponible} 
                    onChange={(e) => setSelectVoiture({ ...selectVoiture, disponible: e.target.checked })}
                  />
                  <label className="form-check-label">Disponible</label>
                </div>) }
                
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                {modalMode === 'edit' ? 'Sauvegarder' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
