import React from 'react';

const Client = ({ c, deleteClient, open }) => {
  return (
    <tr className='text-center'>
      <td>{c.id}</td>
      <td>{c.firstName}</td>
      <td>{c.lastName}</td>
      <td>{c.cin}</td>
      <td>{c.permis}</td>
      
      <td>{c.email}</td>
      <td>{c.phone}</td>
      <td>{c.address}</td>
      <td>
        <div className="btn-group" role="group">
          <button 
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => open(c.id)}
          >
            <i className="bi bi-pencil"></i> Edit
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteClient(c.id)}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Client;