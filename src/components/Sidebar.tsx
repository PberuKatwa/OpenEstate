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

    </aside>
  )
}
