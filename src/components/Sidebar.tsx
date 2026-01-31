import { NavLink } from "react-router-dom"

export const Sidebar = function () {
  const navItems = [
    { path: "/dashboard", label: "Home" },
    { path: "/dashboard/blogs", label: "Blogs" },
    { path: "/dashboard/properties", label: "Properties" },
    { path: "/dashboard/profile", label: "Profile" },
  ];

  return (
    <aside style={{ width: "250px", background: "#2c3e50", color: "white", padding: "1rem" }}>
      <h3>Open Estate Admin</h3>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
        {
          navItems.map(
            (item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  color: "white",
                  textDecoration: isActive ? "underline" : "none",
                  fontWeight: isActive ? "bold":"normal"
                }) }
              >
                {item.label}
              </NavLink>
            )
          )
        }
      </nav>

    </aside>
  )
}
