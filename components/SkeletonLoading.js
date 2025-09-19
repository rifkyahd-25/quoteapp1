import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SkeletonLoading({ ready }) {
  const { theme } = React.useContext(ThemeContext);

  const pulseAnim = useRef(new Animated.Value(0.3)).current;
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = ["Loading Quotes...", "Fetching Quotes..."];

  useEffect(() => {
    // Continuous pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Change message every second
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (ready) return null; // stop showing skeleton when data is ready

  const skeletonBar = (width, height = 20, marginTop = 10) => (
    <Animated.View
      style={{
        width,
        height,
        marginTop,
        borderRadius: 8,
        backgroundColor: theme.card,
        opacity: pulseAnim,
      }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textMuted }]}>
        {messages[messageIndex]}
      </Text>

      {/* Skeleton for category header */}
      {skeletonBar(SCREEN_WIDTH * 0.6, 30, 20)}

      {/* Skeleton for search bar */}
      {skeletonBar(SCREEN_WIDTH * 0.9, 40, 20)}

      {/* Skeletons for list items */}
      {[...Array(5)].map((_, i) => (
        <View key={i} style={{ marginTop: 15 }}>
          {skeletonBar(SCREEN_WIDTH * 0.85, 60)}
          {skeletonBar(SCREEN_WIDTH * 0.6, 20, 8)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Added padding top
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
