import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faNewspaper,
  faBuilding,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ardhiLogo from "../../assets/ardhitech_logo.png"

const navItems = [
  { path: "/dashboard", label: "Home", icon: faHouse },
  { path: "/dashboard/blogs", label: "Blogs", icon: faNewspaper },
  { path: "/dashboard/properties", label: "Properties", icon: faBuilding },
  { path: "/dashboard/profile", label: "Profile", icon: faUser },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <aside
      style={{ fontFamily: "'Poppins', sans-serif", width: 220 }}
      className="h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0 py-6 relative overflow-hidden"
    >

      {/* Logo / Brand */}
      <div className="relative z-10 p-3">
        <div className="flex items-center gap-3">
          <div className=" w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src={ardhiLogo} alt="Ardhitech Logo" className="absolute inset-0 w-36" />
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-3">
        <div
          className="px-2 pb-2 pt-1 uppercase text-gray-400"
          style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em" }}
        >
          Navigation
        </div>

        <div className="space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  isActive
                    ? "font-semibold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 font-normal"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "rgba(192,24,42,0.07)",
                      border: "1px solid rgba(192,24,42,0.15)",
                      color: "#C0182A",
                      fontWeight: 600,
                    }
                  : {
                      border: "1px solid transparent",
                    }
              }
            >
              <FontAwesomeIcon icon={item.icon} className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-3 my-2" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2.5 px-3 py-2.5 mx-3 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, border: "1px solid transparent" }}
        onMouseEnter={(e) => (e.currentTarget.style.border = "1px solid rgba(239,68,68,0.15)")}
        onMouseLeave={(e) => (e.currentTarget.style.border = "1px solid transparent")}
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 flex-shrink-0" />
        <span>Logout</span>
      </button>
    </aside>
  );
};
