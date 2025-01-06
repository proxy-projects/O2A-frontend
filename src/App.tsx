import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfoForm from "./components/ui/InfoForm/InfoForm";
import QRCodePage from "./components/ui/QrCode/QrCode";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Welcome from "./pages/Welcome";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/qr-code" element={<QRCodePage />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form/:organizationId" element={<InfoForm />} />
        <Route path="*" element={<div>page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
