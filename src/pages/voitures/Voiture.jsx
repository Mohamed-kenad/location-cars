import { Link } from "react-router-dom";

function Voiture({voitures}) {
    const imageUrl = `https://fakeimg.pl/300x200/?text=${voitures.name}&font=lobster`; 
  return (
    <div className="col">
    <div className="card h-100 shadow-sm hover-shadow transition">
      {/* Image container with fixed ratio */}
      <div className="position-relative" style={{ paddingBottom: "66.67%" }}>
        <img
          src={imageUrl}
          className="card-img-top position-absolute w-100 h-100 object-fit-cover"
          alt={voitures.name}
          style={{ top: 0, left: 0 }}
        />
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-capitalize fw-bold mb-2">{voitures.name}</h5>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <span className="badge bg-primary me-2">Matricule</span>
            <span className="text-muted">{voitures.matricule}</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="badge bg-secondary me-2">Modèle</span>
            <span className="text-muted">{voitures.modele}</span>
          </div>
        </div>
        
        <Link 
          to="/contrats"
          className="btn btn-primary mt-auto text-white d-flex align-items-center justify-content-center gap-2"
        >
          <i className="bi bi-arrow-right"></i>
          Voir les détails
        </Link>
      </div>
    </div>
  </div>
 
  );
}
export default Voiture;