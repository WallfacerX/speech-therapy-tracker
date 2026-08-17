import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function Trials() {
  const { goal, rubric } = useLocalSearchParams<{
    goal: string;
    rubric: string;
  }>();

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [closeCount, setCloseCount] = useState(0);

  const trialNumber = correctCount + closeCount + incorrectCount + 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{width: "100%"}}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <Text style={styles.title}>Data Collection</Text>

      <Text style={styles.label}>Goal</Text>

      <Text style={styles.goalText}>
        {goal}
      </Text>

      <Text style={styles.label}>Rubric</Text>

      <Text style={styles.goalText}>
        {rubric}
      </Text>

      <Text style={styles.label}>
        Trial Data
      </Text>

    <View style={styles.trialArea}>
      {rubric === "Basic Accuracy" && (
        <>
          <Text style={styles.placeholder}>
            Trial {trialNumber}
          </Text>

          <View style={styles.statsContainer}>
            <Text style={styles.countText}>
              Correct: {correctCount}
            </Text>

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
                    (correctCount / (correctCount + incorrectCount)) * 100
                  )}
              %
            </Text>
          </View>

      <Pressable
        style={styles.responseButton}
        onPress={() => {
          setCorrectCount(correctCount + 1);
        }}
      >
        <Text style={styles.responseButtonText}>Correct</Text>
      </Pressable>

      <Pressable
        style={styles.incorrectButton}
        onPress={() => {
          setIncorrectCount(incorrectCount + 1);
        }}
      >
        <Text style={styles.responseButtonText}>Incorrect</Text>
      </Pressable>
    </>
  )}
      {rubric === "Approximation" && (
     <>
        <Text style={styles.placeholder}>
          Trial {trialNumber}
        </Text>

       <View style={styles.statsContainer}>
           <Text style={styles.countText}>
             Correct: {correctCount}
           </Text>

           <Text style={styles.countText}>
             Close: {closeCount}
           </Text>

           <Text style={styles.countText}>
             Incorrect: {incorrectCount}
           </Text>

           <Text style={styles.countText}>
             Total Trials: {correctCount + closeCount + incorrectCount}
           </Text>
         </View>

        <Pressable
          style={styles.closeButton}
          onPress={() =>  {
             setCloseCount(closeCount + 1);
          }}
        >
        <Text style={styles.responseButtonText}>Close</Text>
      </Pressable>

     <Pressable
       style={styles.responseButton}
       onPress={() => {
         setCorrectCount(correctCount + 1);
       }}
     >
       <Text style={styles.responseButtonText}>Correct</Text>
     </Pressable>

     <Pressable
       style={styles.incorrectButton}
       onPress={() => {
         setIncorrectCount(incorrectCount + 1);
       }}
     >
       <Text style={styles.responseButtonText}>Incorrect</Text>
     </Pressable>

     </>
  )}
</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  label: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
  },

  goalText: {
    width: "100%",
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "600",
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
    backgroundColor: "#16A34A",
    alignItems: "center",
  },

  responseButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  incorrectButton: {
    width: "100%",
    marginTop: 16,
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: "#DC2626",
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
    backgroundColor: "#F59E0B",
    alignItems: "center",
  },

  scrollContent: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },

});

