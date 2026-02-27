// App.tsx
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SignupForm } from './features/auth/components/SignUpForm';
import { LoginForm } from './features/auth/components/LoginForm';
import { ProductsModule } from './features/Dashboard/components/ProductsModule';
import { DashboardLayout } from "./components/DashboardLayout";
import { Blogs } from "./features/Dashboard/pages/Blogs";
import { Home } from "./features/Dashboard/pages/Home";
import { Properties } from "./features/Dashboard/pages/Properties";
import { Profile } from "./features/Dashboard/pages/Profile";
import { Sidebar } from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

function AppContent() {
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
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard22" element={<ProductsModule />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
