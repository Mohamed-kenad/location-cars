import React from 'react';

export default function Avoiture({ v ,openEditModal}) {
  return (
    <tr>
      <td className="align-middle">{v.id}</td>
      <td className="align-middle">{v.name}</td>
      <td className="align-middle">{v.matricule}</td>
      <td className="align-middle">{v.modele}</td>
      <td className="align-middle">image</td>
      <td className="align-middle">
        <div className="btn-group" role="group">
          <button 
            className="btn btn-sm btn-outline-primary me-2"
            data-bs-toggle="modal" 
            data-bs-target="#editVehicleModal"
            onClick={()=>openEditModal(v.id)}
          >
            <i className="bi bi-pencil me-1"></i>Edit
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            data-bs-toggle="modal" 
            data-bs-target="#deleteVehicleModal"
          >
            <i className="bi bi-trash me-1"></i>Delete
          </button>
        </div>
      </td>
    </tr>
  );
}