import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";


const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];

export default function AddHabitScreen() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [frequency, setFrequency] = useState<Frequency>("daily");
    const [ error, setError ] = useState<string | null>(null);
    const {user} = useAuth(); // Assuming useAuth is a custom hook to get user context
    const router = useRouter(); // Get the router instance by calling the hook
    const theme = useTheme(); // Get the theme object

    const handleSubmit = async () => {
        if (!user) return;
        
        try{
        await databases.createDocument(
            DATABASE_ID,
            HABITS_COLLECTION_ID,
            ID.unique(),
            {
                user_id: user.$id,
                title,
                description,
                frequency,
                streak_count: 0,
                last_completed: new Date().toISOString(),
                created_at: new Date().toISOString(),
            }
        );

        router.back()
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
                return;
            }
        }

        setError("An error occurred while adding the habit. Please try again later.");
    };

    return (
        <View style={styles.container}>
            <TextInput
            label="Title"
            mode="outlined"
            onChangeText={setTitle}
            style={styles.input}
            />
            <TextInput
            label="Description"
            mode="outlined"
            onChangeText={setDescription}
            style={styles.input}
            />
            <View style= {styles.frequencyContainer}>
                <SegmentedButtons 
                value={frequency}
                onValueChange={(value) => setFrequency(value as Frequency)}
                buttons={FREQUENCIES.map((freq) => ({
                    value: freq,
                    label: freq.charAt(0).toUpperCase() + freq.slice(1),
                }))} 
                />
            </View>
            <Button
            mode="contained" 
            onPress={handleSubmit}
            disabled={!title || !description}>Add Habit
            </Button> 
            {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
             
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
    },
    input: {
        marginBottom: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    frequencyContainer: {
        marginBottom: 24,
    },

});

function fetchHabits() {
    throw new Error("Function not implemented.");
}

