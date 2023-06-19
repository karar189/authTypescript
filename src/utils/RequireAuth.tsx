import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  if (!auth.email) {
    return <Navigate to="login" />;
  }
  return <>{children}</>;
};
