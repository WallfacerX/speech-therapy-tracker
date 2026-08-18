import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { featureColors } from "../constants/colors";

export default function FeatureSelection() {
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const features = [
      "Segments",
      "Prosody",
      "Transitions",
      "Voicing",
    ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Select Features
      </Text>

      {features.map((feature) => (
       <Pressable
         key={feature}
         style={[
             styles.featureButton,
             selectedFeatures.includes(feature) && styles.selectedFeatureButton
         ]}
         onPress={() => {
           if (selectedFeatures.includes(feature)) {
             setSelectedFeatures(
                 selectedFeatures.filter((item) => item !== feature)
             );
         } else {
            if (selectedFeatures.length < 4) {
             setSelectedFeatures ([
                 ...selectedFeatures,
                 feature,
             ]);
           }
         }}
        }
       >
          <Text>
            {feature}
          </Text>
        </Pressable>
    ))}
       <Text>
         Selected: {selectedFeatures.join(", ")}
       </Text>

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
    backgroundColor: "#2563EB",
    alignItems: "center",
  },

  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});