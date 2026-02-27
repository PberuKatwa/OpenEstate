import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faNewspaper,
  faBuilding,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ardhiLogo from "../../assets/ardhitech_logo.png";

const navItems = [
  { path: "/dashboard", label: "Home", icon: faHouse, end: true },
  { path: "/dashboard/blogs", label: "Blogs", icon: faNewspaper, end: false },
  { path: "/dashboard/properties", label: "Properties", icon: faBuilding, end: false },
  { path: "/dashboard/profile", label: "Profile", icon: faUser, end: false },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <aside
      className="sticky top-0 h-screen flex flex-col flex-shrink-0
      bg-gradient-to-b
      from-slate-950
      via-slate-900
      to-blue-950"
      style={{ width: 220, fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <img src={ardhiLogo} alt="Ardhitech" className="h-10 w-auto object-contain brightness-0 invert" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-4 space-y-0.5">
        <p className="px-3 pb-3 text-white/25 uppercase tracking-widest" style={{ fontSize: 9, fontWeight: 600 }}>
          Menu
        </p>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgba(192,24,42,0.25)",
                    border: "1px solid rgba(192,24,42,0.35)",
                    color: "#fca5a5",
                    fontWeight: 600,
                  }
                : {
                    border: "1px solid transparent",
                    color: "rgba(255,255,255,0.40)",
                    fontWeight: 400,
                  }
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-white/10" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mx-3 my-4 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:bg-white/5 hover:text-white/70 transition-all duration-150 border border-transparent"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Logout</span>
      </button>
    </aside>
  );
};
