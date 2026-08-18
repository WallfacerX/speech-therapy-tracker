import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { featureColors, actionColors } from "../constants/colors";

export default function FeatureSelection() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const features = ["Segments", "Prosody", "Transitions", "Voicing"];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Features</Text>

      {features.map((feature) => (
        <Pressable
          key={feature}
          style={[
            styles.featureButton,
            {
              backgroundColor:
                featureColors[feature as keyof typeof featureColors],

              borderColor: selectedFeatures.includes(feature)
                ? "#111827"
                : "#CBD5E1",

              borderWidth: selectedFeatures.includes(feature) ? 3 : 1,
            },
          ]}
          onPress={() => {
            if (selectedFeatures.includes(feature)) {
              setSelectedFeatures(
                selectedFeatures.filter((item) => item !== feature),
              );
            } else {
              if (selectedFeatures.length < 4) {
                setSelectedFeatures([...selectedFeatures, feature]);
              }
            }
          }}
        >
          <Text style={styles.featureButtonText}>{feature}</Text>
        </Pressable>
      ))}

      <Pressable
        disabled={selectedFeatures.length < 1}
        style={styles.continueButton}
        onPress={() =>
          router.push({
            pathname: "/trials",
            params: {
              rubric: "Motor Speech Features",
              features: selectedFeatures.join(", "),
            },
          })
        }
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  featureButton: {
    width: "80%",
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  selectedFeatureButton: {
    backgroundColor: "#2563EB",
  },

  continueButton: {
    width: "80%",
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: actionColors.primary,
    alignItems: "center",
  },

  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
