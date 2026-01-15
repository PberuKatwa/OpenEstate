import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { ManageProperties } from "../modules/manageProperties/ManageProperties";
import { Blog } from "../modules/blog/Blog";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/manage-properties" element={<ManageProperties />} ></Route>
          <Route path="/blog" ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
