import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { SignupForm } from './features/auth/components/SignUpForm';
import { LoginForm } from './features/auth/components/LoginForm';
import { ProductsModule } from './features/Dashboard/components/ProductsModule';
import { initializeApiClient } from "./services/apiClient";
import { DashboardLayout } from "./components/DashboardLayout";
import { Blogs } from "./features/Dashboard/pages/Blogs";
import { Home } from "./features/Dashboard/pages/Home";
import { Properties } from "./features/Dashboard/pages/Properties";
import { Profile } from "./features/Dashboard/pages/Profile";
import { Sidebar } from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AppContent() {

  const navigate = useNavigate();
  useEffect(
    function () {
      const getToken = function () { return localStorage.getItem('token') };
      initializeApiClient(getToken)
    },
    [navigate]
  );

  return (
    <div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

     <Routes>
       <Route path="/sign-up" element={<SignupForm></SignupForm>}></Route>
       <Route path="/login" element={<LoginForm></LoginForm>}></Route>
       <Route path="/dashboard22" element={<ProductsModule></ProductsModule>}></Route>
       <Route path="/sidebar" element={<Sidebar></Sidebar>}></Route>

       <Route path="/dashboard" element={<DashboardLayout />}>
         <Route index element={<Home />} ></Route>
         <Route path="properties" element={<Properties />}></Route>
         <Route path="blogs" element={<Blogs />}></Route>
         <Route path="profile" element={<Profile/>}></Route>
       </Route>
     </Routes>
    </div>
  )

}

export default function App() {
  return (

    <BrowserRouter>
      <AppContent></AppContent>
    </BrowserRouter>
  )
}
