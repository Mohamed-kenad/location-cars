import React, { useEffect, useState } from 'react';
import axios from 'axios';

  
  export default function Contrat({ c, clients ,voitures,contrats, open }) {
    const [status, setStatus] = useState('');
    
    const valClient = clients.find((client) => client.id === c.clientId);
    const valVoiture = voitures.find((voiture) => voiture.id === c.voitureId);

    const isActive = (endDate) => new Date(endDate) >= new Date();
  
    useEffect(() => {
      setStatus(isActive(c.datefin) ? '🟢 Actif' : '🔴 Expiré');
    }, [c.datefin]);
    
    useEffect(() => {
      if (voitures.length > 0 && contrats.length > 0) {
        voitures.forEach((car) => {
          const voitureContrats = contrats.filter((c) => c.voitureId === car.id);
          const isAvailable = !voitureContrats.some(c => isActive(c.datefin))
          if (isAvailable !== car.disponible){
            const newCar = {...car , disponible: isAvailable}
             axios.put(`http://localhost:8080/voitures/${newCar.id}`, newCar)
          }
        });
      } else {
        console.log("not found");
      }
    }, [voitures,contrats]);
  
   
 

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
