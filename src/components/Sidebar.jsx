import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";

export default function Sidebar() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className={`sidebar ${sidebarExpanded ? "expanded" : ""}`} id="sidebar">
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className={`bi ${sidebarExpanded ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
      </button>
      <div className="logo">LV</div>

      <div className="nav-links">
        <Link
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          title="dashboard"
          to="/"
        >
          <i className="bi bi-house-door-fill"></i>
          <span>dashboard</span>
        </Link>
        <Link
          className={`nav-item ${location.pathname === "/Avoitures" ? "active" : ""}`}
          title="Voitures"
          to="/Avoitures"
        >
          <i className="bi bi-car-front-fill"></i>
          <span>Voitures</span>
        </Link>
        <Link
          className={`nav-item ${location.pathname === "/contrats" ? "active" : ""}`}
          title="Contrats"
          to="/contrats"
        >
          <i className="bi bi-clipboard2-check-fill"></i>
          <span>Contrats</span>
        </Link>
        <Link
          className={`nav-item ${location.pathname === "/clients" ? "active" : ""}`}
          title="Clients"
          to="/clients"
        >
          <i className="bi bi-person-fill"></i>
          <span>Clients</span>
        </Link>
      </div>

      <div className="sidebar-footer">
        <Link className={`nav-item ${location.pathname === "/Logout" ? "active" : ""}`} to="/Logout">
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
