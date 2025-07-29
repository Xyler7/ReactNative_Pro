import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {

    return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View>
            <Text>Create Account</Text>

            <TextInput
            label= "Email"
            autoCapitalize="none" 
            keyboardType="email-address"
            placeholder="example@gmail.com"
            mode="outlined"/>

            <TextInput
            label= "Password"
            autoCapitalize="none" 
            keyboardType="email-address"
            placeholder="Enter your password"
            mode="outlined"/>

            <Button mode="contained">Sign Up</Button>
            <Button>Already have an account? Sign In</Button>

         </View>
    </KeyboardAvoidingView>
    );
}