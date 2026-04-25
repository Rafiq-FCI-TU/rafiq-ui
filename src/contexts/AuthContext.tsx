import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export interface User {
  id?: string;
  username?: string;
  email?: string;
  roles?: string[];
  hasAssessment?: boolean;
  assessmentId?: number | null;
  patientId?: number | null;
  specialistId?: string | null;
  score?: number | null;
  isAuthenticated?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  login: (userData: any, token: string, refreshToken: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(token);
      } catch (e) {
        console.error("Failed to parse stored user data", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: any, token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);

    const userObj: User = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      roles: userData.roles || [],
      hasAssessment: userData.hasAssessment || false,
      assessmentId: userData.assessmentId ? userData.assessmentId : null,
      patientId: userData.patientid || null,
      specialistId: userData.specialistid || null,
      score: userData.score || null,
      isAuthenticated: true,
    };

    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    setToken(token);
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
