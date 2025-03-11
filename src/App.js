import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Dashboard from "./dashboard/Dashboard";
import Contrats from "./pages/contrats/Contrats";
import Clients from "./pages/clients/Clients";
import Avoitures from "./pages/Avoitures/Avoitures";
import Voitures from "./pages/voitures/Voitures";
import CarDetails from "./pages/voitures/ShowVoiture";
import BookingPage from "./pages/voitures/Rent";
import Login from "./context/auth/Login";
import store from "./redux/store";
import Register from "./context/auth/Register";
import Profile from "./context/auth/Profile";
import TrackingPage from "./pages/voitures/TrackingPage";
import Demandes from "./pages/demandes/Demandes";
import ShowAll from "./pages/voitures/Showall";

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

function MainApp() {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  const adminRoutes = ["/dashboard", "/Avoitures", "/contrats", "/clients", "/demandes"];
  const isAdminRoute = adminRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <>
      {user?.role === "admin" && isAdminRoute && <Sidebar />}

      <div className={`w-100${user?.role === "admin" && isAdminRoute ? " admin-layout" : ""}`} >
        <Routes>
          <Route path="/" element={<Voitures />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/rent" element={<BookingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tracking" element={<TrackingPage/>}/>
          <Route path="/show-all" element={<ShowAll/>} />

          {user?.role === "admin" ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Avoitures" element={<Avoitures />} />
              <Route path="/contrats" element={<Contrats />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/demandes" element={<Demandes/>}/>
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </>
  );
}
