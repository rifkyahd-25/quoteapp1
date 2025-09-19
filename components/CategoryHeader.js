import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CategoryHeader({ category, theme }) {
  return (
    <View style={[styles.badge, { backgroundColor: theme.smcardtextcolor }]}>
      <Text style={[styles.text, { color: theme.text, fontFamily: "Lora" }]}>
        {category} Quotes
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 22,
    letterSpacing: 1,
    textAlign: "center",
    fontWeight: "700",
  },
});
