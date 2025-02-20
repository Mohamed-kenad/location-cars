import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function AjouterContrats({ voitures, c ,setContrats}) {
    const [found, setFound] = useState(false);
    const [cin, setCin] = useState("");
    const [client, setClient] = useState([]);
    const [error, setError] = useState(false);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [prix, setPrix] = useState("");
    const [selectedVehicleId, setSelectedVehicleId] = useState("");
    const navigate = useNavigate();

    const foundClient = c.find(client => client.cin === cin);
    
    const handleSearch = () => {
        if (foundClient) {
            setClient(foundClient);
            setFound(true);
        } else {
            setError(true);
        }
    };

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: "Client not found",
                text: "Would you like to add a new client?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, add client",
                cancelButtonText: "Cancel"
            }).then((result) => {
                if (result.isConfirmed) {
                  const modalElement = document.getElementById("exampleModal");
                  if (modalElement) {
                  const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
                  modal.hide();}
                  navigate("/clients", { state: { showModal: true } });
                }
            });
        }
    }, [error, navigate]);
    
    

    const handleSubmit =  (e) => {
        e.preventDefault();
        const totalPrice = calculateTotalPrice();
        const contractData = {
            clientId: foundClient.id,
            datedebut: dateStart,
            voitureId: selectedVehicleId,
            datefin: dateEnd,
            prix: prix,
            total: totalPrice,
            statut: "confirmed"
        };


        
        axios.post("http://localhost:8080/contrats", contractData)
        .then(res => {
            setContrats(prevContrats => [...prevContrats, res.data]); 
            
            const modalElement = document.getElementById("exampleModal");
            if (modalElement) {
              const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
              modal.hide();
            }
    
            setCin(""); 
            setClient([]);  
            setFound(false); 
            setError(false);  
            setDateStart("");  
            setDateEnd("");  
            setPrix("");  
            setSelectedVehicleId("");  
    
            Swal.fire({
                title: "Success!",
                text: "Contract has been created",
                icon: "success",
                confirmButtonColor: "#198754"
            });
        })
        
    }

    const calculateTotalPrice = () => {
        if (!dateStart || !dateEnd || !prix) return 0;
    
        const start = new Date(dateStart);
        const end = new Date(dateEnd);
        const diffInTime = end - start;
        const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); 
        return diffInDays * parseFloat(prix);
    };
    
     
    

    return (
        <div className="container-fluid p-0">
            <div className="mb-3">
                <div className="row g-2">
                    <div className="col-8">
                        <label className="form-label fw-semibold">Search by CIN</label>
                        <input 
                            type="search" 
                            className="form-control form-control-sm" 
                            onChange={(e) => setCin(e.target.value)}
                            placeholder="Enter client CIN"
                        />
                    </div>
                    <div className="col-4 d-flex align-items-end">
                        <button 
                            className="btn btn-warning btn-sm w-100" 
                            onClick={handleSearch}
                        >
                            <i className="bi bi-search me-1"></i>
                            Search
                        </button>
                    </div>
                </div>
            </div>
           

            {/* Client Information */}
            {found && (
                <div className="alert alert-success py-2 mb-3">
                    <div className="row g-2">
                        <div className="col-sm-4">
                            <small className="fw-bold">Name:</small> {client.firstName}
                        </div>
                        <div className="col-sm-4">
                            <small className="fw-bold">Last Name:</small> {client.lastName}
                        </div>
                        <div className="col-sm-4">
                            <small className="fw-bold">Phone:</small> {client.phone}
                        </div>
                    </div>
                </div>
            )}

            {/* Contract Form */}
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label fw-semibold">Vehicle</label>
                        <select 
                            className="form-select form-select-sm"
                            onChange={(e) => setSelectedVehicleId(e.target.value)}
                            required
                        >
                            <option value="">Select a vehicle</option>
                            {voitures.map((v, i) => (
                                v.disponible ? 
                              <option key={i} value={v.id}>
                                    {v.name} - {v.matricule} - {v.modele}
                                </option>:""
                            ))}
                        </select>
                    </div>


                    <div className="col-6">
                        <label className="form-label fw-semibold">Start Date</label>
                        <input 
                            type="date" 
                            className="form-control form-control-sm"
                            onChange={(e) => setDateStart(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-6">
                        <label className="form-label fw-semibold">End Date</label>
                        <input 
                            type="date" 
                            className="form-control form-control-sm"
                            onChange={(e) => setDateEnd(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label fw-semibold">Prix par jour</label>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text">$</span>
                            <input 
                                type="number" 
                                className="form-control"
                                onChange={(e) => setPrix(e.target.value)}
                                placeholder="Enter monthly price"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12">
                    <label className="form-label fw-semibold">Prix Total</label>
                    <div className="input-group input-group-sm">
                        <span className="input-group-text form-control form-control-sm" >{calculateTotalPrice()} DH</span>
                    </div>
                </div>

                  
                    <div className="col-12">
                        <button 
                            type="submit" 
                            className="btn btn-warning w-100"
                            disabled={!found}
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Create Contract
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}