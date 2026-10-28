import { createContext, useContext, useState } from "react";

export interface AuthUser{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    type: string;
}

interface AuthContextType {
    user: AuthUser | null;
    login: (user: AuthUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => {},
    logout: () => {},
});

const SESSION_KEY = "authUser";

function getUserFromSession(): AuthUser | null {
    try {
    const userData = sessionStorage.getItem(SESSION_KEY);
    return userData ? JSON.parse(userData) : null;
    } catch (error) {
    console.error("Error parsing user data from sessionStorage:", error);
    return null;
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(getUserFromSession());

    const login = (user: AuthUser) => {
        setUser(user);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;