import {createContext, useState, useContext} from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
        return storedUser ? JSON.parse(storedUser) : null;
    } catch {
        return null;
    }
    });

    const login = (userData, token) => {
        localStorage.setItem(
            "token",
            token
        );
        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}