import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (data: { username: string; password: string; email: string; name: string; phone?: string }) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const res = await fetch("/api/user", {
                credentials: "include",
            });
            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function login(username: string, password: string) {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Invalid credentials");
        }

        const userData = await res.json();
        setUser(userData);
        toast({
            title: "Welcome back!",
            description: `Logged in as ${userData.username}`,
        });
    }

    async function register(data: { username: string; password: string; email: string; name: string; phone?: string }) {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Registration failed");
        }

        const userData = await res.json();
        setUser(userData);
        toast({
            title: "Account created!",
            description: `Welcome to GoVista, ${userData.name}!`,
        });
    }

    async function logout() {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
        toast({
            title: "Logged out",
            description: "See you next time!",
        });
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
