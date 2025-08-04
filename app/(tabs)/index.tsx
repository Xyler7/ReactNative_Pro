import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Surface, Text } from "react-native-paper";

export default function Index() {
  const {signOut, user} = useAuth();

  const [habits, setHabits] = useState<Habit[]>();


  useEffect(() => {
    fetchHabits();
  }, [user]);
    

  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal("user_id", user?.$id ?? "")]
      );
      setHabits(response.documents as Habit[]);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };


  return (
    <View
    style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}> Today&apos;s Habits</Text>
        <Button
          mode="text"
          onPress={signOut}
          icon={"logout"}
          >Sign Out
        </Button>
      </View>

      {habits?.length === 0 ? (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>No habits yet. Add your first habit!</Text></View>
      ) : (
        habits?.map((habit, key) => (
          <Surface key={key} style={styles.card} elevation={0}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}> { habit.title } </Text>
            <Text style={styles.cardDescription}> { habit.description } </Text>
            <View style={styles.cardFooter}>
              <View style={styles.streakBadge}>
                <MaterialCommunityIcons
                  name="fire"
                  size= {18}
                  color={"#ff9800"}
                />
                <Text style={styles.streakText}>
                  {habit.streak_count} day streak
                </Text>
              </View>
                <View style={styles.frequencyBadge}>
                  <Text style={styles.frequencyText}> {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}</Text>
                </View>
            </View>
          </View>
      </Surface>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#888",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#666",
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    marginLeft: 4,
    color: "#ff9800",
  },
  frequencyBadge: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  frequencyText: {
    color: "#333",
  },
});
