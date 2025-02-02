import React from 'react';

export default function Avoiture({ v ,openEditModal,deletev}) {
  return (
    <tr>
      <td className="align-middle">{v.id}</td>
      <td className="align-middle">{v.name}</td>
      <td className="align-middle">{v.matricule}</td>
      <td className="align-middle">{v.modele}</td>
      <td className="align-middle"><img src={v.image} alt="" width="110" height="70" /></td>
      <td className="align-middle">
        {v.disponible ? 
          <span className="badge bg-success">Disponible</span> : 
          <span className="badge bg-danger">Non disponible</span>
          }
      </td>
      <td className="align-middle">
        <div className="btn-group" role="group">
          <button 
            className="btn btn-sm btn-outline-primary me-2"
            
            onClick={()=>openEditModal(v.id)}
          >
            <i className="bi bi-pencil me-1"></i>Edit
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={()=>deletev(v.id)}
          >
            <i className="bi bi-trash me-1"></i>Delete
          </button>
        </div>
      </td>
    </tr>
  );
}