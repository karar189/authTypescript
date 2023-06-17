import { useState, useContext, createContext, ReactNode } from "react";

interface AuthContextProps {
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [email, setEmail] = useState<string | null>(null);

  const login = (email: string) => {
    setEmail(email);
  };

  const logout = () => {
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext) as AuthContextProps;
};
