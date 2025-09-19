import React, { forwardRef } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from "react-native-view-shot";

const { width } = Dimensions.get("window");

const QuoteCardView = forwardRef(({ quote, theme }, ref) => {
  return (
    <ViewShot ref={ref} options={{ format: "png", quality: 1 }}>
      <LinearGradient
        colors={[theme.bigcard, theme.bigcard]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.card}
      >
        <Text style={styles.quoteMark}>“</Text>
        <Text style={[styles.quote, { color: theme.text, fontFamily: "Lora" }]}>
          "{quote.quote}"
        </Text>
        <Text style={styles.author}>- {quote.author}</Text>
      </LinearGradient>
    </ViewShot>
  );
});

export default QuoteCardView;

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 8,
    backgroundColor: "#fff",
  },
  quoteMark: {
    fontSize: 60,
    fontFamily: "Lora",
    color: "rgba(0,0,0,0.05)",
    position: "absolute",
    top: 20,
    left: 20,
  },
  quote: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 32,
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    fontFamily: "Lora",
    color: "#666",
    marginTop: 25,
  },
});
