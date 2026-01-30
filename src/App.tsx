// import './App.css'
// import { SignupForm } from './features/auth/components/SignUpForm'
// import { LoginForm } from './features/auth/components/LoginForm'
// import { ProductsModule } from './features/Dashboard/components/ProductsModule'

// function App() {

//   return (
//     // <SignupForm></SignupForm>
//     // <LoginForm></LoginForm>
//     <ProductsModule></ProductsModule>
//   )
// }

// export default App
//

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SignupForm } from './features/auth/components/SignUpForm';
import { LoginForm } from './features/auth/components/LoginForm';
import { ProductsModule } from './features/Dashboard/components/ProductsModule';

function AppContent() {
  const navigate = useNavigate();
}
