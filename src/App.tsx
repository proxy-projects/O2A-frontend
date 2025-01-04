import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import InfoForm from "./components/ui/InfoForm/InfoForm";
import QRCodePage from "./components/ui/QrCode/QrCode";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for QR Code */}
        <Route path="/" element={<QRCodePage />} />

        {/* Route for the Form */}
        <Route path="/form/:organizationId" element={<InfoForm />} />

        {/* Redirect unknown routes to QR code page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
