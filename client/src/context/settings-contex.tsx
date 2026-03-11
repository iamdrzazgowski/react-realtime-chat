import { createContext, useContext, useEffect, useState } from "react";

interface Settings {
    theme: string;
    notification: boolean;
}

interface SettingsContextType {
    theme: string;
    notification: boolean;
    setTheme: () => void;
    setNotification: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem("settings");

        return savedSettings
            ? JSON.parse(savedSettings)
            : { theme: "light", notification: true };
    });

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        const root = document.documentElement;
        if (settings.theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [settings.theme]);

    const setTheme = () => {
        setSettings((prev: Settings) => ({
            ...prev,
            theme: prev.theme === "light" ? "dark" : "light",
        }));
    };

    const setNotification = () => {
        setSettings((prev: Settings) => ({
            ...prev,
            notification: !prev.notification,
        }));
    };

    const value = {
        ...settings,
        setTheme,
        setNotification,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

function useSettings(): SettingsContextType {
    const context = useContext(SettingsContext);

    if (!context)
        throw new Error("SettingsContext was used outside of SettingsProvider");

    return context;
}

export { SettingsProvider, useSettings };
