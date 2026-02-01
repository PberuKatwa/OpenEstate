// src/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faNewspaper,
  faBuilding,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { path: "/dashboard", label: "Home", icon: faHouse },
  { path: "/dashboard/blogs", label: "Blogs", icon: faNewspaper },
  { path: "/dashboard/properties", label: "Properties", icon: faBuilding },
  { path: "/dashboard/profile", label: "Profile", icon: faUser },
];

export const Sidebar = () => {
  return (
    <>
      {/* Mobile toggle button (UI only) */}
      <button
        type="button"
        className="sm:hidden m-3 p-2 rounded-md border hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <aside className="fixed top-0 left-0 z-40 w-64 h-full bg-white border-r">
        <div className="h-full px-4 py-6">
          {/* Logo */}
          <h2 className="text-xl font-semibold mb-6">Open Estate</h2>

          {/* Nav */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm
                  transition-colors
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }
                `
                }
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};
