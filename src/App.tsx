import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfoForm from "./components/ui/InfoForm/InfoForm";
import QRCodePage from "./components/ui/QrCode/QrCode";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/organization/dashboard/Dashboard";
import GetStarted from "./pages/organization/getstarted/GetStarted";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/organization/profile/Profile";
import Today from "./pages/organization/dashboard/Today";
import CheckedIn from "./pages/organization/dashboard/CheckedIn";
import CheckedOut from "./pages/organization/dashboard/CheckedOut";
import Forms from "./pages/organization/dashboard/Forms";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/qr-code"
          element={
            <ProtectedRoute>
              <QRCodePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <GetStarted />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Today />} />
          <Route path="today" element={<Today />} />
          <Route path="checked-in" element={<CheckedIn />} />
          <Route path="checked-out" element={<CheckedOut />} />
          <Route path="forms" element={<Forms />} />
        </Route>
          <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form/:organizationId"
          element={
            <ProtectedRoute>
              <InfoForm />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
