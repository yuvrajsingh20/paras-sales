import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  auth_provider: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  googleLogin: (credential: string) => Promise<boolean>;
  sendOtp: (phoneNumber: string) => Promise<boolean>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: { name?: string; phone_number?: string }) => Promise<boolean>;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error("Auth check failed", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/email/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsLoginOpen(false);
        toast.success("Welcome back!");
        return true;
      } else {
        toast.error(data.error || "Login failed");
        return false;
      }
    } catch (err) {
      toast.error("Something went wrong");
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/email/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone_number: phone }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsLoginOpen(false);
        toast.success("Account created successfully!");
        return true;
      } else {
        toast.error(data.error || "Signup failed");
        return false;
      }
    } catch (err) {
      toast.error("Something went wrong");
      return false;
    }
  };

  const googleLogin = async (credential: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsLoginOpen(false);
        toast.success("Logged in with Google!");
        return true;
      } else {
        toast.error(data.error || "Google login failed");
        return false;
      }
    } catch (err) {
      toast.error("Something went wrong");
      return false;
    }
  };

  const sendOtp = async (phoneNumber: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/phone/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "OTP sent successfully!");
        return true;
      } else {
        toast.error(data.error || "Failed to send OTP");
        return false;
      }
    } catch (err) {
      toast.error("Something went wrong");
      return false;
    }
  };

  const verifyOtp = async (phoneNumber: string, otp: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/phone/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setIsLoginOpen(false);
        toast.success("Phone verified!");
        return true;
      } else {
        toast.error(data.error || "Invalid OTP");
        return false;
      }
    } catch (err) {
      toast.error("Something went wrong");
      return false;
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    toast.success("Logged out");
  };

  const updateProfile = async (data: { name?: string; phone_number?: string }): Promise<boolean> => {
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setUser(json.user);
        toast.success("Profile updated!");
        return true;
      } else {
        toast.error(json.error || "Update failed");
        return false;
      }
    } catch {
      toast.error("Something went wrong");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        googleLogin,
        sendOtp,
        verifyOtp,
        logout,
        updateProfile,
        isLoginOpen,
        setIsLoginOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
