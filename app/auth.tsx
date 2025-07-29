import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
    }

    return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    >
        <View style={ styles.content}>
            <Text style={ styles.title}  variant="headlineSmall">{isSignUp ? "Create Account" : "Welcome Back!"}</Text>

            <TextInput
            label= "Email"
            autoCapitalize="none" 
            keyboardType="email-address"
            placeholder="example@gmail.com"
            mode="outlined"
            style={styles.input}
/>

            <TextInput
            label= "Password"
            autoCapitalize="none" 
            keyboardType="email-address"
            placeholder="Enter your password"
            mode="outlined"/>

            <Button mode="contained" style={styles.button}>
                {isSignUp
                ? "Sign Up"
                : "Sign In"}
            </Button>
            <Button
            mode="text"
            onPress={handleSwitchMode}
            style={styles.switchModeButton}>
                {isSignUp
                ? "Already have an account? Sign In!"
                : "Don't have and account? Sign Up!"}
            </Button>

         </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f5f5f5"
    },
    content: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        marginBottom: 6,
    },
    button: {
        textAlign: "center",
        marginTop: 8,
    },
    switchModeButton: {
        marginTop: 6,
    }
});