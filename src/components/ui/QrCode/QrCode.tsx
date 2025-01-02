import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodePage: React.FC = () => {
  const organizationId = "12345"; // Replace with dynamic ID if needed
  const formRoute = `${window.location.origin}/form/${organizationId}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Scan the QR Code to Fill the Form
      </h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <QRCodeCanvas value={formRoute} size={200} />
      </div>
      <p className="text-gray-600 mt-4 text-center">
        After scanning, the form will open on your device.
      </p>
    </div>
  );
};

export default QRCodePage;
