import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = function () {
  return (
    <div style={{display:"flex",minHeight:"100vh"}}>
      <Sidebar></Sidebar>
    </div>
  )
}
