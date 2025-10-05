import { createContext, useContext, useState, useEffect } from "react";
import { validateAuth, checkRateLimit, recordFailedAttempt } from "../utils/auth";

type UserRole = "team_member" | "public_user";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isTeamMember: boolean;
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  isTeamMember: boolean;
  canCreateEvents: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Authentication moved to utils/auth.ts for better security

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem("acentrium_user");
    const sessionTimeout = localStorage.getItem("acentrium_session_timeout");
    
    if (savedUser && sessionTimeout) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const timeoutTime = parseInt(sessionTimeout);
        const now = Date.now();
        
        // Check if session is still valid (24 hours)
        if (now - timeoutTime < 24 * 60 * 60 * 1000) {
          setUser(parsedUser);
        } else {
          // Session expired, clear storage
          localStorage.removeItem("acentrium_user");
          localStorage.removeItem("acentrium_session_timeout");
        }
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("acentrium_user");
        localStorage.removeItem("acentrium_session_timeout");
      }
    }
    setIsLoading(false);
  }, []);

  const isTeamMember = user?.isTeamMember || false;
  const canCreateEvents = isTeamMember;

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Check rate limiting
    if (!checkRateLimit(email)) {
      setIsLoading(false);
      throw new Error("Too many failed attempts. Please try again later.");
    }
    
    // Simulate API call delay for security
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validate credentials using secure auth utility
    const isValidCredentials = validateAuth(email, password);
    
    if (email && password && isValidCredentials) {
      const newUser: User = {
        id: Date.now().toString(),
        name: "Acentrium Team Member",
        email: email.toLowerCase(),
        role: "team_member",
        isTeamMember: true,
      };
      
      setUser(newUser);
      localStorage.setItem("acentrium_user", JSON.stringify(newUser));
      localStorage.setItem("acentrium_session_timeout", Date.now().toString());
      setIsLoading(false);
      return true;
    } else {
      // Record failed attempt
      recordFailedAttempt(email);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("acentrium_user");
    localStorage.removeItem("acentrium_session_timeout");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isTeamMember,
        canCreateEvents,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
