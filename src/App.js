import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Contrats from "./pages/contrats/Contrats";

import Clients from "./pages/clients/Clients";
import Avoitures from "./pages/Avoitures/Avoitures";
import "./App.css";
import Voitures from "./pages/voitures/Voitures";

export default function App() {
  return (
    <>

        <Sidebar />
        <div className="container"> 
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Avoitures" element={<Avoitures />} />
            <Route path="/contrats/" element={<Contrats />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/voitures" element={<Voitures />} />
          </Routes>
        </div>
      
   
    </>
  );
}
