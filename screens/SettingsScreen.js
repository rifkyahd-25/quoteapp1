import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import BannerAdContainer from "../components/BannerAdContainer";
import { TestIds } from "react-native-google-mobile-ads";

export default function SettingsScreen() {
  const bannerAdUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-xxxxxxxx~yyyyyyyyyy";
  const { theme, setAppTheme } = useContext(ThemeContext);
  

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Choose Theme</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => setAppTheme("light")}
      >
        <Text style={styles.buttonText}>Light Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => setAppTheme("dark")}
      >
        <Text style={styles.buttonText}>Dark Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => setAppTheme("soft")}
      >
        <Text style={styles.buttonText}>Soft Theme</Text>
      </TouchableOpacity>
        <View style={styles.adContainer}>
             <BannerAdContainer adUnitId={bannerAdUnitId} />
             </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  adContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
