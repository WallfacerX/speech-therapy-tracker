import { Pressable, StyleSheet, Text } from "react-native";

type RubricCardProps = {
  title: string;
  description: string;
  onPress: () => void;
  selected: boolean;
};

export default function RubricCard({
  title,
  description,
  onPress,
  selected,
}: RubricCardProps) {
  return (
    <Pressable
      style={[styles.card, selected && styles.selectedCard]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 340,
    padding: 18,
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  selectedCard: {
    borderColor: "#111827",
    borderWidth: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  description: {
    fontSize: 15,
    color: "#6B7280",
  },
});
