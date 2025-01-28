import { NavLink, useParams, useLocation } from "react-router-dom";
import {
  Zap,
  Clock,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { cn } from "../../../lib/utils";

function Sidebar() {
  const { id } = useParams();
  const location = useLocation();

  const navigation = [
    { name: "Today", href: `/${id}/today`, icon: Clock },
    { name: "Checked-in", href: `/${id}/checked-in`, icon: UserPlus },
    { name: "Checked-out", href: `/${id}/checked-out`, icon: UserMinus },
  ];

  return (
    <div className="flex h-screen w-[280px] flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-semibold text-blue-600"
        >
          <Zap className="h-6 w-6" />
          <span>Zap</span>
        </NavLink>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                (isActive || (location.pathname === `/${id}` && item.name === "Today"))
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
