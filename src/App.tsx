import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/auth.js";
import Login from "./components/Login";
import Form from "./components/Form";
import ForgotPasswordPage from "./components/ForgotPass";

const App = () => {
  // const isAuthenticated = true; // Replace with your authentication logic

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/form" element={<Form />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
