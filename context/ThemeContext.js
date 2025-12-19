// // /context/ThemeContext.js
// import React, { createContext, useEffect, useState } from "react";
// import { Appearance } from "react-native";

// const LightTheme = {
//   mode: "light",
//   background: "#f2f1f6",
//   backgroundsmcard: "#f8fafc",
//   text: "#1f2937",
//   textMuted: "#64748b",
//   primary: "#3b82f6",
//   card: "#ffffff",
//   border: "#e2e8f0",
//   grone: "#93c5fd",
//   grtwo: "#60a5fa",
//   smcardtextcolor: "#2563eb",
  
//   active: "#6366f1",
//   activeligter: "#93c5fd",
//   bigcard: "#ffffff",
// };

// const DarkTheme = {
//   mode: "dark",
//   background: "#121212", // Recommended dark theme base
//   backgroundsmcard: "#1e1e1e", // Slightly lighter for small cards
//   text: "#e2e8f0", // Soft light gray (less harsh than pure white)
//   textMuted: "#94a3b8", // Muted cool gray
//   primary: "#3b82f6", // Same blue for brand consistency
//   card: "#1f2937", // Dark slate for elevated surfaces
//   border: "#334155", // Dark blue-gray borders
//   grone: "#6366f1", // Indigo gradient start
//   grtwo: "#4338ca", // Deeper indigo gradient end
//   smcardtextcolor: "#a78bfa", // Soft violet text
//   active: "#03dac5",
//   activeligter: "#A7FFF5",
//   bigcard: "#252525", // Teal accent for active states
// };

// const SoftTheme = {
//   mode: "soft",
//   background: "#f2f1f6", // warm off-white
//   backgroundsmcard: "#fffbeb", 
//   text: "#374151",
//   textMuted: "#9ca3af",
//   primary: "#ea580c", // deeper warm orange (better contrast)
//   card: "#fff7ed",
//   border: "#fcd34d",
//   grone: "#f59e0b",
//   grtwo: "#fbbf24",
//   smcardtextcolor: "#b45309", // stronger amber-brown
//   active: "#f97316", // brighter orange active
//   activeligter: "#fdba74",
//   bigcard: "#fff3e0",
// };

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const colorScheme = Appearance.getColorScheme();

//   const [theme, setTheme] = useState(
//     colorScheme === "dark" ? DarkTheme : LightTheme
//   );

//   const setAppTheme = (mode) => {
//     if (mode === "light") setTheme(LightTheme);
//     else if (mode === "dark") setTheme(DarkTheme);
//     else if (mode === "soft") setTheme(SoftTheme);
//   };

//   useEffect(() => {
//     const listener = Appearance.addChangeListener(({ colorScheme }) => {
//       setTheme(colorScheme === "dark" ? DarkTheme : LightTheme);
//     });

//     return () => listener.remove();
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, setAppTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
// /context/ThemeContext.js
import React, { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add this import

const LightTheme = {
  mode: "light",
  background: "#f2f1f6",
  backgroundsmcard: "#f8fafc",
  text: "#1f2937",
  textMuted: "#64748b",
  primary: "#3b82f6",
  card: "#ffffff",
  border: "#e2e8f0",
  grone: "#93c5fd",
  grtwo: "#60a5fa",
  smcardtextcolor: "#2563eb",
  active: "#6366f1",
  activeligter: "#93c5fd",
  bigcard: "#ffffff",
};

const DarkTheme = {
  mode: "dark",
  background: "#121212",
  backgroundsmcard: "#1e1e1e",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  primary: "#3b82f6",
  card: "#1f2937",
  border: "#334155",
  grone: "#6366f1",
  grtwo: "#4338ca",
  smcardtextcolor: "#a78bfa",
  active: "#03dac5",
  activeligter: "#A7FFF5",
  bigcard: "#252525",
};

const SoftTheme = {
  mode: "soft",
  background: "#f2f1f6",
  backgroundsmcard: "#fffbeb", 
  text: "#374151",
  textMuted: "#9ca3af",
  primary: "#ea580c",
  card: "#fff7ed",
  border: "#fcd34d",
  grone: "#f59e0b",
  grtwo: "#fbbf24",
  smcardtextcolor: "#b45309",
  active: "#f97316",
  activeligter: "#fdba74",
  bigcard: "#fff3e0",
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("system"); // Track user selection
  const [theme, setTheme] = useState(LightTheme);

  // Initialize theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("user-theme");
        if (savedTheme) {
          setSelectedTheme(savedTheme);
          applyTheme(savedTheme);
        } else {
          // First time - use system theme
          const systemTheme = Appearance.getColorScheme();
          applyTheme("system", systemTheme);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
        const systemTheme = Appearance.getColorScheme();
        applyTheme("system", systemTheme);
      }
    };
    
    loadTheme();
  }, []);

  const applyTheme = (themeMode, systemTheme = null) => {
    const actualSystemTheme = systemTheme || Appearance.getColorScheme();
    
    switch (themeMode) {
      case "light":
        setTheme(LightTheme);
        break;
      case "dark":
        setTheme(DarkTheme);
        break;
      case "soft":
        setTheme(SoftTheme);
        break;
      case "system":
      default:
        setTheme(actualSystemTheme === "dark" ? DarkTheme : LightTheme);
        break;
    }
  };

  const setAppTheme = async (mode) => {
    try {
      // Save user preference
      await AsyncStorage.setItem("user-theme", mode);
      setSelectedTheme(mode);
      applyTheme(mode);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  // Listen to system theme changes only when user selected "system" theme
  useEffect(() => {
    if (selectedTheme === "system") {
      const listener = Appearance.addChangeListener(({ colorScheme }) => {
        applyTheme("system", colorScheme);
      });

      return () => listener.remove();
    }
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setAppTheme, selectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};