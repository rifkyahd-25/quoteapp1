// /screens/LoadingScreen.js
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function LoadingScreen({ onFinish }) {
  const { theme } = useContext(ThemeContext);

  const [progress] = useState(new Animated.Value(0));
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Loading resources...",
    "Initializing app...",
    "Fetching quotes...",
    "Almost ready..."
  ];

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progress, {
      toValue: 100,
      duration: 4000, // total loading duration
      useNativeDriver: false,
    }).start(() => {
      onFinish(); // call when animation completes
    });

    // Change messages step by step
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < messages.length) {
        setMessageIndex(step);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.logoBox}>
        <Text style={[styles.logoText, { color: theme.primary }]}> Quotes App </Text>
      </View>

      {/* Progress bar */}
      <View style={[styles.progressBar, { borderColor: theme.border }]}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              backgroundColor: theme.primary,
              width: widthInterpolated,
            },
          ]}
        />
      </View>

      {/* Changing message */}
      <Text style={[styles.message, { color: theme.text }]}>
        {messages[messageIndex]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoBox: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  progressBar: {
    width: "80%",
    height: 14,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
});
