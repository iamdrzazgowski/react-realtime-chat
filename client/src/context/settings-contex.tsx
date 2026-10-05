import {
    type ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

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

const SETTINGS_KEY = "settings:v1";

const DEFAULT_SETTINGS: Settings = { theme: "light", notification: true };

function loadSettings(): Settings {
    // Lazy init (rerender-lazy-state-init) + versioned, minimal storage
    // (client-localstorage-schema, js-cache-storage).
    try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (!saved) return DEFAULT_SETTINGS;
        const parsed = JSON.parse(saved) as Partial<Settings>;
        return {
            theme: parsed.theme === "dark" ? "dark" : "light",
            notification:
                typeof parsed.notification === "boolean"
                    ? parsed.notification
                    : DEFAULT_SETTINGS.notification,
        };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

const SettingsContext = createContext<SettingsContextType | null>(null);

function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<Settings>(loadSettings);

    useEffect(() => {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        } catch {
            // Private browsing / quota exceeded: settings stay in memory.
        }
    }, [settings]);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", settings.theme === "dark");
    }, [settings.theme]);

    const setTheme = useCallback(() => {
        setSettings((prev: Settings) => ({
            ...prev,
            theme: prev.theme === "light" ? "dark" : "light",
        }));
    }, []);

    const setNotification = useCallback(() => {
        setSettings((prev: Settings) => ({
            ...prev,
            notification: !prev.notification,
        }));
    }, []);

    // Memoized value (rerender-memo): consumers no longer rerender on every
    // provider render, only when the slice they use changes.
    const value = useMemo<SettingsContextType>(
        () => ({
            theme: settings.theme,
            notification: settings.notification,
            setTheme,
            setNotification,
        }),
        [settings.theme, settings.notification, setTheme, setNotification],
    );

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
