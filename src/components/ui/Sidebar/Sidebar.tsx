import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  Megaphone,
  HelpCircle,
  ChevronDown,
  Menu,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import Button from "../Button/Button";
import { UserAuth } from "../../../context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Product", href: "/product", icon: Package },
  { name: "Customers", href: "/customers", icon: Users, current: true },
  { name: "Income", href: "/income", icon: DollarSign },
  { name: "Promote", href: "/promote", icon: Megaphone },
  { name: "Help", href: "/help", icon: HelpCircle },
];

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-white transition-all duration-300",
        isCollapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold text-blue-600"
        >
          <Package className="h-6 w-6" />
          {!isCollapsed && <span>Bolt</span>}
        </NavLink>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
      {/* <div className="border-t py-4 px-2">
        <div className="relative">
          <div className="flex items-center gap-3">
            <img
              src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png"
              alt="User"
              className="h-10 w-10 rounded-full bg-gray-500 object-cover object-center border-2 border-blue-400 shadow-sm"
            />
            {!isCollapsed && (
              <div className="flex-1">
                <h3 className="font-medium">Evano</h3>
                <p className="text-sm text-gray-500">Project Manager</p>
              </div>
            )}
            <div className="border rounded-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${
                  isDropdownOpen
                    ? "rotate-180"
                    : "rotate-0"
                } transform transition-transform duration-200 ease-in-out`}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-1">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
