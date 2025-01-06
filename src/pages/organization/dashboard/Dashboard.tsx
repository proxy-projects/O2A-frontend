import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button/Button";
import { UserAuth } from "../../../context/AuthContext";

function Dashboard() {
  const navigate =  useNavigate()
  const { logout, isLoading } = UserAuth();
  const handleLogout = async () => {
    await logout();
    navigate('/login')
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      organization dashboard
      <Button onClick={handleLogout}>logout</Button>
    </div>
  );
}

export default Dashboard;
