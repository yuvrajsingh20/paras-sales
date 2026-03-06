import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock login — replace with real auth
    await new Promise((r) => setTimeout(r, 800));
    setUser({ name: email.split("@")[0], email });
    setIsLoginOpen(false);
    return true;
  };

  const signup = async (name: string, email: string, _password: string, phone?: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    setUser({ name, email, phone });
    setIsLoginOpen(false);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoginOpen, setIsLoginOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
