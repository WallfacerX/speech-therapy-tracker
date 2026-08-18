import { Pressable, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { actionColors } from "../constants/colors";

export default function Index() {
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const flashButton = (buttonName: string) => {
    setPressedButton(buttonName);

    setTimeout(() => {
      setPressedButton(null);
    }, 250);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Speech Therapy Tracker</Text>

      <Pressable
        style={[
          styles.startButton,
          pressedButton === "startSession" && styles.pressedButton,
        ]}
        onPress={() => {
          flashButton("startSession");

          setTimeout(() => {
            router.push("/session");
          }, 250);
        }}
      >
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
    backgroundColor: actionColors.primary,
    alignItems: "center",
  },

  pressedButton: {
    borderWidth: 3,
    borderColor: "#111827",
  },

  startButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
