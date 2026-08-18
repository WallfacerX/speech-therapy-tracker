import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Summary() {
  const { goal, rubric, approximationTrials } = useLocalSearchParams();

  const trials = approximationTrials
    ? approximationTrials.toString().split(",")
    : [];

  const correctCount = trials.filter(
    (trial) => trial === "Correct"
  ).length;

  const accuracy =
    trials.length === 0
      ? 0
      : Math.round((correctCount / trials.length) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Session Summary
      </Text>

      <Text>
        Goal: {goal}
      </Text>

      <Text>
        Rubric: {rubric}
      </Text>

      <Text>
        Total Trials: {trials.length}
      </Text>

      <Text>
        Correct: {trials.filter((trial) => trial === "Correct").length}
      </Text>

      <Text>
        Close: {trials.filter((trial) => trial === "Close").length}
      </Text>

      <Text>
        Incorrect: {trials.filter((trial) => trial === "Incorrect").length}
      </Text>

      <Text>
        Accuracy: {accuracy}%
      </Text>

    </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F7F8FA",
      padding: 24,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
    },
  });