import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function DashboardLayout() {
  return (
    <div className="dashboard">

      <SideBar />
        <main className="content"></main>

    </div>
  );
}

export default DashboardLayout;
