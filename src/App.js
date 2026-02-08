import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Manager from "./pages/Manager";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:id" element={<VenueDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="*" element={<h1>404 - Not found</h1>} />
      </Routes>
  );
}

export default App;