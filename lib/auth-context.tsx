import React, { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";


type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean;
    signUp: (email: string, password: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | Models.User<Models.Preferences> | null>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children } : { children: React.ReactNode }) {

        const[user, setUser] = useState<Models.User<Models.Preferences>
        | null>(null);

        const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

        useEffect(() => {
            getUser();
        }, []);

        const getUser = async () => {
            try {
                const session= await account.get()
                setUser(session);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Failed to fetch user:", error.message);
                } else {
                    console.error("An unexpected error occurred:", error);
                }
                setUser(null);
            } finally {
                setIsLoadingUser(false);
            }
        }

        // Fetch the current user
        const signUp = async (email: string, password: string) => {
        try {
            await account.create(ID.unique(), email, password);
            await signIn(email, password);
            return null; // Return null on success
        } catch (error) {
            if (error instanceof Error) {
                return error.message; // Return error message on failure
            }

            return "An error occurred during sign up."; // Fallback error message
        }
    };
    
    // Sign in the user
    const signIn = async (email: string, password: string) => {
        try {
             const current = await account.getSession('current').catch(() => null);
            if (current) {
                const user = await account.get();
                setUser(user);
                return user;
                }

                await account.createEmailPasswordSession(email, password);
                const user = await account.get();
                setUser(user);
                return user;
            } catch (error) {
            if (error instanceof Error) {
                return error.message; // Return error message on failure
            }
            return "An error occurred during sign in."; // Fallback error message
        }
    };

    const signOut = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };

    return <AuthContext.Provider value={{user, isLoadingUser, signUp, signIn, signOut}}>
        {children}
    </AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be inside of the AuthProvider");
    }
        return context;
}