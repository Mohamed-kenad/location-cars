import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';
import Client from './Client';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [modalMode, setModalMode] = useState('add');
  const location = useLocation();
  const { state } = location;

  

  useEffect(() => {
    axios.get("http://localhost:8080/client")
      .then((res) => { setClients(res.data) });
  }, []);

  useEffect(()=>{
    if (state?.showModal) {
      setModalMode('add');
      showModal();
    }
  },[state])

  const deleteClient = (id) => {
    axios.delete(`http://localhost:8080/client/${id}`)
      .then(() => {
        setClients((data) => data.filter((client) => client.id !== id));
      });
  };

  const openEditModal = (id) => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setSelectedClient(client);
      setModalMode('edit');
      showModal();
    }
  };

  const openAddModal = () => {
    setSelectedClient([]);
    setModalMode('add');
    showModal();
  };

  const showModal = () => {
    const modalElement = document.getElementById("clientModal");
    if (modalElement) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.show();
    }
  };

  const handleSubmit = () => {
    if (modalMode === 'edit') {
      axios.put(`http://localhost:8080/client/${selectedClient.id}`, selectedClient)
        .then((res) => {
          setClients((data) => data.map((client) =>
            client.id === selectedClient.id ? res.data : client));
          hideModal();
        });
    } else {
      axios.post("http://localhost:8080/client", selectedClient)
        .then((res) => {
          setClients((prevClients) => [...prevClients, res.data]);
          hideModal();
        });
    }
  };

  const hideModal = () => {
    const modalElement = document.getElementById("clientModal");
    if (modalElement) {
      const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
      modal.hide();
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center py-3">
          <h4 className="mb-0 fw-semibold">Client Management</h4>
          <button 
            className="btn btn-light d-flex align-items-center gap-2"
            onClick={openAddModal}
          >
            <i className="bi bi-plus-circle"></i>
            <span>Add Client</span>
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-dark">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">First Name</th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">CIN</th>
                  <th className="px-4 py-3">License</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <Client 
                    c={client} 
                    keey={client.id} 
                    open={openEditModal} 
                    deleteClient={deleteClient}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Client Modal (Add/Edit) */}
      <div id="clientModal" className="modal fade" tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content border-0">
      <div className="modal-header bg-warning text-white align-items-center">
        <h5 className="modal-title fw-semibold">
          {modalMode === 'edit' ? 'Edit Client Details' : 'Add New Client'}
        </h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body p-4">
        <form className="row g-3">
          {modalMode === 'edit' && (
            <div className="col-12">
              <label className="form-label small fw-semibold">Client ID</label>
              <input 
                type="text" 
                className="form-control bg-light" 
                value={selectedClient.id || ''} 
                disabled 
              />
            </div>
          )}
          <div className="col-md-6">
            <label className="form-label small fw-semibold">First Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={selectedClient.firstName || ''} 
              onChange={(e) => setSelectedClient({ 
                ...selectedClient, 
                firstName: e.target.value 
              })} 
              placeholder="Enter first name"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-semibold">Last Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={selectedClient.lastName || ''} 
              onChange={(e) => setSelectedClient({ 
                ...selectedClient, 
                lastName: e.target.value 
              })} 
              placeholder="Enter last name"
            />
          </div>
          <div className="col-12">
            <label className="form-label small fw-semibold">CIN</label>
            <input 
              type="text" 
              className="form-control" 
              value={selectedClient.cin || ''} 
              onChange={(e) => setSelectedClient({ 
                ...selectedClient, 
                cin: e.target.value 
              })} 
              placeholder="Enter CIN number"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-semibold">License</label>
            <input 
              type="text" 
              className="form-control" 
              value={selectedClient.permis || ''} 
              onChange={(e) => setSelectedClient({ 
                ...selectedClient, 
                permis: e.target.value 
              })} 
              placeholder="Enter license number"
            />
          </div>
          <div className="col-12">
            <label className="form-label small fw-semibold">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={selectedClient.email || ''} 
              onChange={(e) => setSelectedClient({ 
                ...selectedClient, 
                email: e.target.value 
              })} 
              placeholder="Enter email address"
            />
          </div>
          <div className="col-12">
            <label className="form-label small fw-semibold">Phone</label>
            <input 
              type="tel" 
              className="form-control" 
              value={selectedClient.phone || ''} 
              onChange={(e) => setSelectedClient({ 
                ...selectedClient, 
                phone: e.target.value 
              })} 
              placeholder="Enter phone number"
            />
          </div>
          <div className="col-12">
            <label className="form-label small fw-semibold">Address</label>
            <input 
              type="text" 
              className="form-control" 
              value={selectedClient.address || ''} 
              onChange={(e) => setSelectedClient({ 
                ...selectedClient, 
                address: e.target.value 
              })} 
              placeholder="Enter address"
            />
          </div>
        </form>
      </div>
      <div className="modal-footer border-top">
        <button 
          type="button" 
          className="btn btn-light" 
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button 
          type="button" 
          className="btn btn-success text-white" 
          onClick={handleSubmit}
        >
          {modalMode === 'edit' ? 'Save Changes' : 'Add Client'}
        </button>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default Clients;