import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRCodePage from "./components/ui/QrCode/QrCode";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/organization/dashboard/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/organization/profile/Profile";
import Today from "./pages/organization/dashboard/Today";
import CheckedIn from "./pages/organization/dashboard/CheckedIn";
import CheckedOut from "./pages/organization/dashboard/CheckedOut";
import OrganizationForm from "./pages/organization/OrganizationForm/CreateOrganizationForm";
import FormPage from "./pages/organization/OrganizationForm/FormPage";
import GetStarted from "./pages/organization/GetStarted/GetStarted";


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
          path="/create-form"
          element={
            <ProtectedRoute>
              <OrganizationForm/>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/form/:organizationId"
          element={
            <ProtectedRoute>
              <FormPage />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/form/:id"
          element={
            <ProtectedRoute>
              <FormPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
