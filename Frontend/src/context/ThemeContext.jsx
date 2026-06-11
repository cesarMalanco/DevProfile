import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const { user } = useAuth();

    const getStorageKey = () => {
        return user?.email
            ? `theme_${user.email}`
            : "theme_guest";
    };

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme =
            localStorage.getItem(getStorageKey());

        setDarkMode(savedTheme === "dark");
    }, [user]);

    useEffect(() => {
        document.body.classList.toggle(
            "dark-mode",
            darkMode
        );

        localStorage.setItem(
            getStorageKey(),
            darkMode ? "dark" : "light"
        );
    }, [darkMode, user]);

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}