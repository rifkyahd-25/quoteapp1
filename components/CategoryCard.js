import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

export default function CategoryCard({
  categoryName,
  iconFunc,
  subtitle,
  onPress,
}) {
  const { theme } = useContext(ThemeContext);

  const iconElement = iconFunc ? (
    iconFunc(theme.smcardtextcolor)
  ) : (
    <Ionicons name="ellipse-outline" size={28} color={theme.primary} />
  );

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.backgroundsmcard }]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>{iconElement}</View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]}>
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", textTransform: "capitalize" },
  subtitle: { fontSize: 14, marginTop: 2 },
});
