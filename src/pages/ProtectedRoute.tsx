import { ReactNode } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner/Spinner";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = UserAuth();

  if (session === undefined) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return <div>{session ? <>{children}</> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoute;
