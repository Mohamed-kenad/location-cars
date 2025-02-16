import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Contrat({ c, clients, voitures, open }) {
  const [status, setStatus] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);  

  const valClient = clients.find((client) => client.id === c.clientId);
  const valVoiture = voitures.find((voiture) => voiture.id === c.voitureId);

  useEffect(() => {

    const now = new Date();  

    const isActive = new Date(c.datefin) >= now;
    setStatus(isActive ? '🟢 Actif' : '🔴 Expiré');

   
    if (isActive) {
      setIsAvailable(false);
    } else if (new Date(c.datefin) < now) {
      setIsAvailable(true); 
    }

    const updateCarAvailability = async () => {
      if (valVoiture) {
          await axios.put(`http://localhost:8080/voitures/${valVoiture.id}`, {
            ...valVoiture,
            disponible: isAvailable, 
          });
      }
    };

    updateCarAvailability();

  }, [c.datefin, c.datedebut, valVoiture, isAvailable]); 


  return (
    <tr className='text-center'>
      <td className="align-middle">{c.id}</td>
      <td className="align-middle">
        <button 
          className="btn btn-link text-primary p-0 text-decoration-none hover:text-primary-dark"
          onClick={() => open(c.clientId, 'client')}
        >
          <i className="bi bi-person me-1"></i>
          {valClient?.firstName || 'Inconnu'}
        </button>
      </td>
      <td className="align-middle">
        <button 
          className="btn btn-link text-primary p-0 text-decoration-none hover:text-primary-dark"
          onClick={() => open(c.voitureId, 'voiture')}
        >
          <i className="bi bi-car-front me-1"></i>
          {valVoiture?.name || 'Non spécifié'}
        </button>
      </td>
      <td className="align-middle">{c.datedebut}</td>
      <td className="align-middle">{c.datefin}</td>
      <td className="align-middle">{c.prix} DH / jour</td>
      <td className="align-middle">{c.total} DH</td>
      <td className="align-middle">{status}</td>
    </tr>
  );
}
