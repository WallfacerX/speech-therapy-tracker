import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Speech Therapy Tracker</Text>

      <Pressable style={styles.startButton}
                   onPress={() => router.push("/session")}>
        <Text style={styles.startButtonText}>Start Session</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#F7F8FA",
  },
  title: {
    marginBottom: 32,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  startButton: {
    width: "100%",
    maxWidth: 320,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

