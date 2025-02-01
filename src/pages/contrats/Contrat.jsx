import React from 'react';

export default function Contrat({ c, open }) {
  return (
    <tr>
      <td className="align-middle">{c.id}</td>
      <td className="align-middle">
        <button 
          className="btn btn-link text-primary p-0 text-decoration-none hover:text-primary-dark"
          onClick={() => open(c.clientId, "client")}
        >
          <i className="bi bi-person me-1"></i>
          {c.clientId}
        </button>
      </td>
      <td className="align-middle">
        <button 
          className="btn btn-link text-primary p-0 text-decoration-none hover:text-primary-dark"
          onClick={() => open(c.voitureId, "voiture")}
        >
          <i className="bi bi-car-front me-1"></i>
          {c.voitureId}
        </button>
      </td>
      <td className="align-middle">{c.contractDate}</td>
      <td className="align-middle">{c.durationMonths} jours</td>
      <td className="align-middle">DH {c.pricePerMonth} / jour</td>
    </tr>
  );
}