// src/components/layout/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import "./DashboardLayout.css";

export const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};
