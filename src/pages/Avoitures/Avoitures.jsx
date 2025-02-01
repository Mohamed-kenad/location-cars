import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avoiture from "./Avoiture";

export default function Avoitures() {
  const [voitures, setVoitures] = useState([]);
  const [selectVoiture, setSelectVoiture] = useState({});
  const [modalMode, setModalMode] = useState("add");

  useEffect(() => {
    axios.get("http://localhost:8080/voitures")
      .then(res => setVoitures(res.data))
  }, []);

 





  
  const deletev=(idv)=>{
    axios.delete(`http://localhost:8080/voitures/${idv}`)
    .then(()=>{
      setVoitures((data) => data.filter((v) => v.id !== idv))
    })

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
  setSelectVoiture([]);
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
          hideModal();
        })
    } else {
      axios.post("http://localhost:8080/voitures", selectVoiture)
        .then((res) => {
          setVoitures([...voitures, res.data]);
          hideModal();
        })
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
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Vehicle Management</h4>
          <button className="btn btn-light" onClick={openAddModal}>
            <i className="bi bi-plus-circle me-2"></i>Add Vehicle
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover border">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Registration</th>
                  <th>Model</th>
                  <th>image</th>
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
                {modalMode === 'edit' ? 'Edit Voiture Details' : 'Add New Voiture'}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                {modalMode === "edit" && (
                  <div className="mb-3">
                  <label className="form-label">Voiture ID</label>
                  <input type="text" className="form-control" value={selectVoiture.id || ""} disabled />
                </div>

                )}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={selectVoiture.name || ""} onChange={(e) => setSelectVoiture({ 
                      ...selectVoiture, 
                      name: e.target.value 
                    })}  placeholder="Enter name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Registration</label>
                  <input type="text" className="form-control" name="matricule" value={selectVoiture.matricule || ""}  onChange={(e) => setSelectVoiture({ 
                      ...selectVoiture, 
                      matricule: e.target.value 
                    })}  placeholder="Enter registration" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Model</label>
                  <input type="text" className="form-control" name="modele" value={selectVoiture.modele || ""}  onChange={(e) => setSelectVoiture({ 
                      ...selectVoiture, 
                      modele: e.target.value 
                    })}  placeholder="Enter model" />
                </div>
                <div className="mb-3">
                  <label className="form-label">image</label>
                  <input type="file" onChange={handleImageChange} />
                {selectVoiture.image && (
                  <div>
                    <img src={selectVoiture.image} alt="preview" width="100" />
                  </div>
                )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                {modalMode === 'edit' ? 'Save Changes' : 'Add Voiture'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
