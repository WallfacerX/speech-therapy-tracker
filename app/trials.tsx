import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { router } from "expo-router";
import {
  actionColors,
  responseColors,
  featureColors,
} from "../constants/colors";

export default function Trials() {
  const { goal, rubric, features } = useLocalSearchParams<{
    goal: string;
    rubric: string;
    features: string;
  }>();

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [closeCount, setCloseCount] = useState(0);
  const [featureAccuracy, setFeatureAccuracy] = useState<string[]>([]);
  const [completedTrials, setCompletedTrials] = useState<string[][]>([]);
  const [approximationTrials, setApproximationTrials] = useState<string[]>([]);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const flashButton = (buttonName: string) => {
    setPressedButton(buttonName);

    setTimeout(() => {
      setPressedButton(null);
    }, 250);
  };

  const selectedFeatures = features
    ? features.split(",").map((feature) => feature.trim())
    : [];

  const trialNumber = correctCount + closeCount + incorrectCount + 1;

  const fullSuccessCount = completedTrials.filter((trial) =>
    selectedFeatures.every((feature) => trial.includes(feature)),
  ).length;

  const fullSuccessPercentage =
    completedTrials.length === 0
      ? 0
      : Math.round((fullSuccessCount / completedTrials.length) * 100);

  const approximationAccuracy =
    approximationTrials.length === 0
      ? 0
      : Math.round(
          (approximationTrials.filter((trial) => trial === "Correct").length /
            approximationTrials.length) *
            100,
        );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Data Collection</Text>

        <Text style={styles.contextText}>Goal: {goal || "None"}</Text>

        <Text style={styles.contextText}>Rubric: {rubric}</Text>

        <View style={styles.trialArea}>
          {rubric === "Motor Speech Features" && (
            <>
              <Text style={styles.countText}>
                Completed Trials: {completedTrials.length}
              </Text>

              <Text style={styles.countText}>
                Full Successful Trials: {fullSuccessCount}
              </Text>

              <Text style={styles.countText}>
                Full Success Accuracy: {fullSuccessPercentage}%
              </Text>

              {selectedFeatures.map((feature) => (
                <Pressable
                  key={feature}
                  style={[
                    styles.featureTrialButton,
                    {
                      backgroundColor:
                        featureColors[feature as keyof typeof featureColors],
                      borderColor: featureAccuracy.includes(feature)
                        ? "#111827"
                        : "#CBD5E1",
                      borderWidth: featureAccuracy.includes(feature) ? 3 : 1,
                    },
                  ]}
                  onPress={() => {
                    if (featureAccuracy.includes(feature)) {
                      setFeatureAccuracy(
                        featureAccuracy.filter((item) => item !== feature),
                      );
                    } else {
                      setFeatureAccuracy([...featureAccuracy, feature]);
                    }
                  }}
                >
                  <Text style={styles.featureButtonText}>{feature}</Text>
                </Pressable>
              ))}

              <Pressable
                style={[
                  styles.completeTrialButton,
                  pressedButton === "completeTrial" && styles.pressedButton,
                ]}
                onPress={() => {
                  flashButton("completeTrial");

                  //Test
                  console.log("Trial completed", featureAccuracy);
                  //Test

                  setCompletedTrials([...completedTrials, featureAccuracy]);

                  setFeatureAccuracy([]);
                }}
              >
                <Text style={styles.responseButtonText}>Complete Trial</Text>
              </Pressable>
            </>
          )}
          {rubric === "Basic Accuracy" && (
            <>
              <Text style={styles.placeholder}>Trial {trialNumber}</Text>

              <View style={styles.statsContainer}>
                <Text style={styles.countText}>Correct: {correctCount}</Text>

                <Text style={styles.countText}>
                  Incorrect: {incorrectCount}
                </Text>

                <Text style={styles.countText}>
                  Total Trials: {correctCount + incorrectCount}
                </Text>

                <Text style={styles.countText}>
                  Accuracy:{" "}
                  {correctCount + incorrectCount === 0
                    ? 0
                    : Math.round(
                        (correctCount / (correctCount + incorrectCount)) * 100,
                      )}
                  %
                </Text>
              </View>

              <Pressable
                style={[
                  styles.responseButton,
                  pressedButton === "correct" && styles.pressedButton,
                ]}
                onPress={() => {
                  flashButton("correct");

                  setCorrectCount(correctCount + 1);
                }}
              >
                <Text style={styles.responseButtonText}>Correct</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.incorrectButton,
                  pressedButton === "incorrect" && styles.pressedButton,
                ]}
                onPress={() => {
                  flashButton("incorrect");

                  setIncorrectCount(incorrectCount + 1);
                }}
              >
                <Text style={styles.responseButtonText}>Incorrect</Text>
              </Pressable>
            </>
          )}
          {rubric === "Approximation" && (
            <>
              <View style={styles.statsContainer}>
                <Text style={styles.countText}>
                  Total Trials: {correctCount + closeCount + incorrectCount}
                </Text>

                <Text style={styles.countText}>Correct: {correctCount}</Text>

                <Text style={styles.countText}>Close: {closeCount}</Text>

                <Text style={styles.countText}>
                  Incorrect: {incorrectCount}
                </Text>

                <Text style={styles.countText}>
                  Approximation Accuracy: {approximationAccuracy}%
                </Text>
              </View>

              <Pressable
                style={[
                  styles.closeButton,
                  pressedButton === "close" && styles.pressedButton,
                ]}
                onPress={() => {
                  flashButton("close");

                  setCloseCount(closeCount + 1);
                  setApproximationTrials([...approximationTrials, "Close"]);
                }}
              >
                <Text style={styles.responseButtonText}>Close</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.responseButton,
                  pressedButton === "correct" && styles.pressedButton,
                ]}
                onPress={() => {
                  flashButton("correct");

                  setCorrectCount(correctCount + 1);
                  setApproximationTrials([...approximationTrials, "Correct"]);
                }}
              >
                <Text style={styles.responseButtonText}>Correct</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.incorrectButton,
                  pressedButton === "incorrect" && styles.pressedButton,
                ]}
                onPress={() => {
                  flashButton("incorrect");

                  setIncorrectCount(incorrectCount + 1);
                  setApproximationTrials([...approximationTrials, "Incorrect"]);
                }}
              >
                <Text style={styles.responseButtonText}>Incorrect</Text>
              </Pressable>
            </>
          )}

          <Pressable
            style={[
              styles.summaryButton,
              pressedButton === "viewSummary" && styles.pressedButton,
            ]}
            onPress={() => {
              flashButton("viewSummary");

              setTimeout(() => {
                router.push({
                  pathname: "/summary",
                  params: {
                    goal,
                    rubric,
                    approximationTrials: approximationTrials.join(","),
                  },
                });
              }, 250);
            }}
          >
            <Text style={styles.responseButtonText}>View Summary</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "#F7F8FA",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 35,
  },

  contextText: {
    width: "100%",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left",
    marginTop: 6,
    marginBottom: 15,
  },

  trialArea: {
    width: "90%",
    alignSelf: "center",
    minHeight: 360,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },

  placeholder: {
    marginTop: 24,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
  },

  responseButton: {
    width: "100%",
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: responseColors.Correct,
    alignItems: "center",
  },

  responseButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  featureButtonText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },

  pressedButton: {
    borderWidth: 3,
    borderColor: "#111827",
  },

  featureTrialButton: {
    width: "100%",
    marginTop: 12,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  incorrectButton: {
    width: "100%",
    marginTop: 16,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: responseColors.Incorrect,
    alignItems: "center",
  },

  countText: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  statsContainer: {
    width: "100%",
    marginTop: 12,
    marginBottom: 24,
  },

  closeButton: {
    width: "100%",
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: responseColors.Close,
    alignItems: "center",
  },

  summaryButton: {
    width: "100%",
    marginTop: 16,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: actionColors.primary,
    alignItems: "center",
  },

  completeTrialButton: {
    width: "100%",
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: actionColors.secondary,
    alignItems: "center",
  },

  scrollContent: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 40,
  },
});
