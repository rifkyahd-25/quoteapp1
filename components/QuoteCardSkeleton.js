import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function QuoteCardSkeleton() {
  const shimmer = new Animated.Value(0);

  Animated.loop(
    Animated.timing(shimmer, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    })
  ).start();

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.card}>
      {/* Quote mark placeholder */}
      <View style={styles.quoteMark} />
      {/* Quote text placeholder */}
      <View style={styles.quoteLine} />
      <View style={[styles.quoteLine, { width: "70%", marginTop: 10 }]} />
      {/* Author placeholder */}
      <View style={styles.authorLine} />

      {/* Shimmer effect */}
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.3)",
            "rgba(255,255,255,0)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 30,
    padding: 30,
    backgroundColor: "#eee",
    overflow: "hidden",
    marginBottom: 20,
  },
  quoteMark: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginBottom: 20,
  },
  quoteLine: {
    height: 20,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  authorLine: {
    width: "40%",
    height: 16,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginTop: 30,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
});
