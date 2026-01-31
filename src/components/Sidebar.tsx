// src/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // We'll create this next

export const Sidebar = () => {
  const navItems = [
    { path: "/dashboard", label: "Home" },
    { path: "/dashboard/blogs", label: "Blogs" },
    { path: "/dashboard/properties", label: "Properties" },
    { path: "/dashboard/profile", label: "Profile" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h3>Open Estate</h3>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"} // Ensures 'Home' isn't always active
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
