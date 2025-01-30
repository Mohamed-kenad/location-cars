import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`} id="sidebar">
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className={`bi ${sidebarExpanded ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
      </button>
      <div className="logo">LV</div>

      <div className="nav-links">
        <a className="nav-item" title="Categories" href="#">
        <i class="bi bi-house-door-fill"></i>
          <span>dashboard</span>
        </a>
        <a className="nav-item" title="Clients" href="#">
        <i class="bi bi-car-front-fill"></i>
          <span>Voiture</span>
         
        </a>
        <a className="nav-item" title="Produits" href="#">
        <i class="bi bi-clipboard2-check-fill"></i>
          <span>Contrat</span>
        </a>
        <a className="nav-item" title="Commands" href="#">
        <i class="bi bi-person-fill"></i>
          <span>Client</span>
        </a>
        <a className="nav-item" href="#">
          <i className="bi bi-heart"></i>
          <span>Likes</span>
        </a>
        <a className="nav-item" href="#">
          <i className="bi bi-wallet2"></i>
          <span>Wallet</span>
        </a>
      </div>

      <div className="sidebar-footer">
        <a href="#" className="nav-item">
          <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
        </a>    
      </div>
    </div>
  );
}
