
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { theme, setAppTheme } = useContext(ThemeContext);

  const ThemeButton = ({ label, mode }) => (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: theme.primary, shadowColor: theme.text }
      ]}
      onPress={() => setAppTheme(mode)}
    >
      <Text style={[styles.buttonText, { color: "#fff" }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background }
      ]}
    >
      {/* Title */}
      <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

      {/* Theme Section */}
      <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
        Choose Theme
      </Text>
      <ThemeButton label="Light Theme" mode="light" />
      <ThemeButton label="Dark Theme" mode="dark" />
      <ThemeButton label="Soft Theme" mode="soft" />

      {/* About Section */}
      <View style={[styles.aboutContainer, { borderColor: theme.border }]}>
        <Text style={[styles.aboutTitle, { color: theme.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: theme.textMuted }]}>
          This app allows you to explore and save your favorite quotes with 
          customizable themes. Designed for a smooth and distraction-free 
          reading experience.{"\n\n"}
          Version: 1.0.0{"\n"}
          Developed by StyleMaven ✨
        </Text>
      </View>

      {/* Links Section */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => Linking.openURL("https://quoteapp-life.vercel.app/terms")}>
          <Text style={[styles.linkText, { color: theme.primary }]}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL("https://quoteapp-life.vercel.app/privacy")}>
          <Text style={[styles.linkText, { color: theme.primary }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  aboutContainer: {
    marginTop: 30,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    width: "100%",
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
  },
  linksContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    marginVertical: 6,
    fontWeight: "600",
  },
});
