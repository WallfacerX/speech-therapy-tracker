import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, ScrollView, Pressable, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";

export default function Summary() {
  const { goal, rubric, approximationTrials } = useLocalSearchParams();

  const [copied, setCopied] = useState(false);

  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const flashButton = (buttonName: string) => {
    setPressedButton(buttonName);

    setTimeout(() => {
      setPressedButton(null);
    }, 250);
  };

  const trials = approximationTrials
    ? approximationTrials.toString().split(",")
    : [];

  const correctCount = trials.filter((trial) => trial === "Correct").length;

  const accuracy =
    trials.length === 0 ? 0 : Math.round((correctCount / trials.length) * 100);

  const closeCount = trials.filter((trial) => trial === "Close").length;

  const incorrectCount = trials.filter((trial) => trial === "Incorrect").length;

  const summaryText =
    `Completed ${trials.length} trials using the ${rubric} rubric. ` +
    `The client achieved ${correctCount}/${trials.length} correct responses ` +
    `(${accuracy}% accuracy), with ${closeCount} close approximations ` +
    `and ${incorrectCount} incorrect responses.`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Session Summary</Text>

        <Text style={styles.sectionTitle}>Session Information</Text>

        <Text style={styles.summaryText}>Goal: {goal}</Text>

        <Text style={styles.summaryText}>Rubric: {rubric}</Text>

        <Text style={styles.sectionTitle}>Performance</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>Total Trials: {trials.length}</Text>

          <Text style={styles.summaryText}>Correct: {correctCount}</Text>

          <Text style={styles.summaryText}>
            Close: {trials.filter((trial) => trial === "Close").length}
          </Text>

          <Text style={styles.summaryText}>
            Incorrect: {trials.filter((trial) => trial === "Incorrect").length}
          </Text>

          <Text style={styles.summaryText}>Accuracy: {accuracy}%</Text>
        </View>

        <Text style={styles.sectionTitle}>Documentation Summary</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{summaryText}</Text>
        </View>

        {copied && <Text style={styles.copiedText}>Copied!</Text>}

        <Pressable
          style={[
            styles.copyButton,
            pressedButton === "copy" && styles.pressedButton,
          ]}
          onPress={async () => {
            flashButton("copy");

            console.log("Copy button pressed");
            console.log("Copying:", summaryText);

            await Clipboard.setStringAsync(summaryText);

            setCopied(true);

            setTimeout(() => {
              setCopied(false);
            }, 500);

            //TEST
            console.log("Copied successfully");
            //TEST
          }}
        >
          <Text style={styles.responseButtonText}>Copy Summary</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 24,
  },

  summaryCard: {
    width: "100%",
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    width: "100%",
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "700",
  },

  summaryText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
  },

  responseButton: {
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    alignItems: "center",
  },

  copyButton: {
    marginTop: 5,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: "#374151",
    alignItems: "center",
  },

  copiedText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  responseButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  pressedButton: {
    borderWidth: 3,
    borderColor: "#111827",
  },
});
