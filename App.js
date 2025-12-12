
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import { ThemeProvider } from "./context/ThemeContext";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import mobileAds from "react-native-google-mobile-ads"; // 👈 Added import

export default function App() {
  const [fontsLoaded] = useFonts({
    Lora: require("./assets/fonts/Lora-VariableFont_wght.ttf"),
  });

  const [appReady, setAppReady] = useState(false);

  // Initialize AdMob SDK + wait for fonts
  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => {
        console.log("✅ AdMob SDK initialized");
      });
  }, []);

  // Wait until fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded]);

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
          <Toast />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}


