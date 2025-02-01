import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Client from './Client';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  useEffect(() => {
    axios.get("http://localhost:8080/client")
      .then((res) => { setClients(res.data) });
  }, []);

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
    setSelectedClient({});
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
          setClients((data) => data.map((client) =>client.id === selectedClient.id ? res.data : client));
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
      <div className="card shadow">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Client Management</h4>
          <button 
            className="btn btn-light"
            onClick={openAddModal}
          >
            <i className="bi bi-plus-circle me-2"></i>Add Client
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Vehicle ID</th>
                  <th>Actions</th>
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">
                {modalMode === 'edit' ? 'Edit Client Details' : 'Add New Client'}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                {modalMode === 'edit' && (
                  <div className="mb-3">
                    <label className="form-label">Client ID</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={selectedClient.id || ''} 
                      disabled 
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">First Name</label>
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
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    value={selectedClient.email || ''} 
                    onChange={(e) => setSelectedClient({ 
                      ...selectedClient, 
                      email: e.target.value 
                    })} 
                    placeholder="Enter email"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
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