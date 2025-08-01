import { createContext, useContext } from "react";
import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    //user: Models.User<Models.Preferences> | null;
    signUp: (email: string, password: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider
(   { children }
    : { children: React.ReactNode }) {

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
            await account.createEmailPasswordSession(email, password);
            return null; // Return null on success
        } catch (error) {
            if (error instanceof Error) {
                return error.message; // Return error message on failure
            }
            return "An error occurred during sign in."; // Fallback error message
        }
    };
    return <AuthContext.Provider value={{ signUp, signIn}}>
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