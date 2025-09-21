import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { ThemeContext } from "../context/ThemeContext";
import QuoteCardView from "../components/QuoteCardView"; // ✅ import the separated component
import QuoteCardSkeleton from "../components/QuoteCardSkeleton";
import QuoteButtons from "../components/QuoteButtons";
import BannerAdContainer from "../components/BannerAdContainer";
import { TestIds } from "react-native-google-mobile-ads";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [quote, setQuote] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const viewShotRef = useRef();
  const { theme } = useContext(ThemeContext);
    const bannerAdUnitId = __DEV__
      ? TestIds.BANNER
      : "ca-app-pub-xxxxxxxx~yyyyyyyyyy";

  useEffect(() => {
    getQuoteOfTheDay();
  }, []);

  const fadeInQuote = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const getQuoteOfTheDay = async () => {
    const quotesData = (await import("../assets/quotes.json")).default;
    const indexStr = await AsyncStorage.getItem("quoteIndex");
    let index = indexStr ? parseInt(indexStr, 10) : 0;
    if (index >= quotesData.length) index = 0;

    setQuote(quotesData[index]);
    fadeInQuote();
    await AsyncStorage.setItem("quoteIndex", (index + 1).toString());
  };

  const nextQuote = () => getQuoteOfTheDay();

  const shareQuote = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await Sharing.shareAsync(uri);
    } catch (err) {
      console.log(err);
    }
  };

  const downloadAsImage = async () => {
    try {
      const uri = await viewShotRef.current.capture({
        width: 1080,
        height: 1080,
      });

      const perm = await MediaLibrary.requestPermissionsAsync();
      if (perm.status === "granted") {
        await MediaLibrary.saveToLibraryAsync(uri);

        Toast.show({
          type: "success",
          text1: "✅ Quote saved!",
          text2: "Your quote has been saved to the gallery.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Permission denied",
          text2: "Please allow gallery access to save quotes.",
        });
      }
    } catch (error) {
      console.log("Error capturing quote:", error);

      Toast.show({
        type: "error",
        text1: "Permission denied",
        text2: "Please allow gallery access to save quotes.",
      });
    }
  };

  if (!quote) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <QuoteCardSkeleton />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text
        style={[styles.todayLabel, { color: theme.text, fontFamily: "Lora" }]}
      >
        Today's Quote
      </Text>

      <Animated.View style={{ opacity: fadeAnim }}>
        <QuoteCardView ref={viewShotRef} quote={quote} theme={theme} />
      </Animated.View>
      <QuoteButtons
        theme={theme}
        onNext={nextQuote}
        onShare={shareQuote}
        onDownload={downloadAsImage}
      />
      <View style={styles.adContainer}>
       <BannerAdContainer adUnitId={bannerAdUnitId} />
       </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  adContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  todayLabel: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: width * 0.9,
    justifyContent: "space-between",
    marginTop: 20,
  },
  nextBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  nextText: { fontSize: 16, fontWeight: "600", color: "#333" },
  shareBtn: {
    width: 60,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  downloadBtn: {
    width: 60,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8F0",
  },
  loadingText: {
    marginTop: 50,
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
  },
});
