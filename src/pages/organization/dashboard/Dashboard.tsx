import { UserAuth } from "../../../context/AuthContext";
import Spinner from "../../../components/ui/Spinner/Spinner";
import Sidebar from "../../../components/ui/Sidebar/Sidebar";
import Menu from "../../../components/ui/Menu/Menu";

function Dashboard() {
  const { isLoading } = UserAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-screen grid grid-cols-[280px_1fr_1fr] grid-rows-[50px_1fr]">
      <div className="col-start-1 col-end-1">
        <Sidebar />
      </div>
      <div className=" col-start-2 col-span-full row-span-1">
        <Menu />
      </div>
      <div className="col-start-2 col-end-4 row-start-2">dashboard content</div>
    </div>
  );
}

export default Dashboard;
