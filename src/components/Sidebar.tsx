import { NavLink } from "react-router-dom"

export const Sidebar = function () {
  const navItems = [
    { path: "/dashboard", label: "Home" },
    { path:"/dashboard/blogs", label:"Blogs" },
    { path:"/dashboard/properties", label:"Properties" },
    { path:"/dashboard/profile", label:"Profile" },

  ]

  return (
    <h1>THIS IS THE SIDEBARRR!!</h1>
  )
}
