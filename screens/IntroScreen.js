import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../context/ThemeContext";

const { width } = Dimensions.get("window");
const screens = [
  {
    key: "welcome",
    title: "Welcome to QuoteApp ✨",
    subtitle: "Your companion for daily inspiration, motivation, and positivity.",
    // image: require("../assets/image/welcome.png"),
  },
  {
    key: "quotes",
    title: "Explore 30K+ Quotes 📖",
    subtitle: "Discover handpicked quotes on life, success, love, happiness, and more.",
    // image: require("../assets/image/quotes.png"),
  },
  {
    key: "features",
    title: "Your Quotes, Your Way 🌟",
    subtitle: "Save favorites, download quotes, or share them instantly with friends.",
    // image: require("../assets/image/features.png"),
  },
  {
    key: "themes",
    title: "Themes & Daily Quotes 🎨⏰",
    subtitle: "Switch between Light, Dark, and Soft themes, and stay inspired with daily reminders.",
    image: require("../assets/image/ChatGPT Image Sep 23, 2025, 12_27_05 PM.png"),
  },
  {
    key: "getstarted",
    title: "Let’s Begin 🌟",
    subtitle: "Start your journey towards positivity and growth.",
    image: require("../assets/image/ChatGPT Image Sep 23, 2025, 12_27_10 PM.png"),
  },
];

// const screens = [
//   {
//     key: "welcome",
//     title: "Welcome to QuoteApp ✨",
//     subtitle: "Daily inspiration and motivation in one place.",
//      image: require("../assets/image/ChatGPT Image Sep 23, 2025, 12_19_12 PM.png"),
//   },
//   {
//     key: "curated",
//     title: "Curated Quotes 📖",
//     subtitle: "Discover handpicked quotes across life, success, and love.",
//     image: require("../assets/image/ChatGPT Image Sep 23, 2025, 12_19_21 PM.png"),
// },
//   {
//     key: "favorites",
//     title: "Save Your Favorites ❤️",
//     subtitle: "Build your own personal collection of uplifting words.",
//     // image: require("../assets/quote-favorites.png"),
//   },
//   {
//     key: "daily",
//     title: "Daily Reminders ⏰",
//     subtitle: "Stay inspired with gentle notifications every day.",
//     image: require("../assets/image/ChatGPT Image Sep 23, 2025, 12_27_05 PM.png"),
//   },
//   {
//     key: "getstarted",
//     title: "Let’s Begin 🌟",
//     subtitle: "Start your journey towards positivity and growth.",
//     image: require("../assets/image/ChatGPT Image Sep 23, 2025, 12_27_10 PM.png"),

//   },
// ];

export default function IntroScreen() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      setCurrentIndex(Math.round(value / width));
    });
    return () => scrollX.removeListener(listener);
  }, [scrollX]);

  const next = () => {
    if (currentIndex < screens.length - 1) {
      scrollViewRef.current.scrollTo({ x: width * (currentIndex + 1), animated: true });
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem("@seen_intro", "true");
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {screens.map((screen, i) => {
          const fadeAnim = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });

          return (
            <Animated.View key={screen.key} style={[styles.screen, { width, opacity: fadeAnim }]}>
              {screen.image && (
                <Image source={screen.image} style={styles.image} resizeMode="contain" />
              )}

              <Text style={[styles.title, { color: theme.text }]}>{screen.title}</Text>

              {screen.subtitle && (
                <Text style={[styles.subtitle, { color: theme.textMuted }]}>{screen.subtitle}</Text>
              )}
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      <View style={styles.footer}>
        <LinearGradient
          colors={[theme.grone, theme.grtwo]}
          style={styles.buttonWrapper}
        >
          <Pressable style={styles.button} onPress={next}>
            <Text style={styles.buttonText}>
              {currentIndex === screens.length - 1 ? "Get Started" : "Next"}
            </Text>
          </Pressable>
        </LinearGradient>

        <View style={styles.progressDots}>
          {screens.map((_, i) => {
            const scale = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.8, 1.2, 0.8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === currentIndex ? theme.primary : theme.textMuted,
                    transform: [{ scale }],
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  screen: {
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    marginHorizontal: 24,
    fontWeight: "500",
    lineHeight: 24,
  },
  footer: {
    alignItems: "center",
    marginBottom: Platform.OS === "android" ? 60 : 70,
  },
  buttonWrapper: {
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 25,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 90,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "white",
  },
  progressDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
});
