import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QrCodeProps {
  organizationId?: string;
}

const QRCode: React.FC<QrCodeProps> = ({ organizationId }) => {
  const formRoute = `${window.location.origin}/organization/${organizationId}/form`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <QRCodeCanvas value={formRoute} size={200} level="H"/>
    </div>
  );
};

export default QRCode;
