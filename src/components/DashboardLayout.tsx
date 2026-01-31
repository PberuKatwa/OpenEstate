import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = function () {
  return (
    <div style={{display:"flex",minHeight:"100vh"}}>
      <Sidebar></Sidebar>

      <main style={{ flex: 1, padding: "2rem", backgroundColor: "#f4f4f4" }}>
        <Outlet/>
      </main>
    </div>
  )
}
