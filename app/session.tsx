import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import RubricCard from "../components/RubricCard";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { router } from "expo-router";

export default function Session() {
  const [goal, setGoal] = useState("");
  const [selectedRubric, setSelectedRubric] = useState("");

  const rubrics = [
    {
      title: "Basic Accuracy",
      description: "Correct / Incorrect",
    },
    {
      title: "Approximation",
      description: "Correct / Close / Incorrect",
    },
    {
      title: "Motor Speech Features",
      description: "Segments • Prosody • Voicing",
    },
  ];

  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>New Session</Text>

    <Text style={styles.label}>Goal</Text>

    <TextInput
      style={styles.input}
      placeholder="Example: Initial /k/"
      placeholderTextColor="#6B7280"
      value={goal}
      onChangeText={setGoal}
    />

    {rubrics.map((rubric) => (
      <RubricCard
        key={rubric.title}
        title={rubric.title}
        description={rubric.description}
        onPress={() => setSelectedRubric(rubric.title)}
        selected={selectedRubric === rubric.title}
      />
    ))}

    <Pressable
      style={[
        styles.continueButton,
        !selectedRubric && styles.disabledButton,
      ]}
      disabled={!selectedRubric}
      onPress={() => {
        if (selectedRubric === "Motor Speech Features") {
          router.push({
            pathname: "/feature-selection",
            params: {
              goal,
              rubric: selectedRubric,
            },
          });
        } else {
          router.push({
            pathname: "/trials",
            params: {
              goal,
              rubric: selectedRubric,
            },
          });
        }
      }}
    >
      <Text style={styles.continueButtonText}>
        Continue
      </Text>
    </Pressable>

  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "flex-start",
     paddingHorizontal: 24,
     paddingTop: 40,
     alignItems: "center",
     backgroundColor: "#F7F8FA",
   },

   title: {
     fontSize: 28,
     fontWeight: "700",
   },

   label: {
     width: "100%",
     maxWidth: 340,
     marginTop: 32,
     marginBottom: 8,
     fontSize: 16,
     fontWeight: "600",
   },

   input: {
     width: "100%",
     maxWidth: 340,
     paddingHorizontal: 16,
     paddingVertical: 14,
     borderWidth: 1,
     borderColor: "#CBD5E1",
     borderRadius: 10,
     backgroundColor: "#FFFFFF",
     fontSize: 16,
   },

   continueButton: {
     width: "100%",
     maxWidth: 340,
     marginTop: 24,
     paddingVertical: 16,
     borderRadius: 12,
     backgroundColor: "#2563EB",
     alignItems: "center",
   },

   continueButtonText: {
     color: "#FFFFFF",
     fontSize: 17,
     fontWeight: "600",
   },

   disabledButton: {
     backgroundColor: "#9CA3AF",
   },
 });
