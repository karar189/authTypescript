import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/auth.js";
import { RequireAuth } from "./utils/RequireAuth.js";
import Login from "./components/Login";
import Form from "./components/Form";
import ForgotPasswordPage from "./components/ForgotPass";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* {login ? (
              <Route path="/form" element={<Form />} />
            ) : (
              <Route path="/" element={<Login />} />
            )} */}
            <Route
              path="/form"
              element={
                <RequireAuth>
                  <Form />{" "}
                </RequireAuth>
              }
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

// export default App;
const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Root;
