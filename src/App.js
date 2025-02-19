import { Routes, Route ,useLocation} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Contrats from "./pages/contrats/Contrats";

import Clients from "./pages/clients/Clients";
import Avoitures from "./pages/Avoitures/Avoitures";
import "./App.css";
import Voitures from "./pages/voitures/Voitures";
import CarDetails from "./pages/voitures/ShowVoiture";
import BookingPage from "./pages/voitures/Rent";

export default function App() {
  const location = useLocation();
  return (
    <>

     {location.pathname !== "/voitures" && !location.pathname.startsWith("/car/") && !location.pathname.startsWith("/rent") && <Sidebar />}

        <div className="container"> 
          <Routes>
            <Route path="/Avoitures" element={<Avoitures />} />
            <Route path="/contrats" element={<Contrats />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/voitures" element={<Voitures />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/rent" element={<BookingPage />} />
          </Routes>
        </div>
      
   
    </>
  );
}
