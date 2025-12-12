
import React, { useContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/HomeScreen";
import Favorites from "../screens/Favorites";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryQuotes from "../screens/CategoryQuotes";
import SettingsScreen from "../screens/SettingsScreen";
import LoadingScreen from "../screens/LoadingScreen";
import IntroScreen from "../screens/IntroScreen"; // ✅ import IntroScreen
import { ThemeContext } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function QuotesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
      <Stack.Screen name="CategoryQuotes" component={CategoryQuotes} />
    </Stack.Navigator>
  );
}

// ✅ Bottom Tab Navigator
function MainTabs() {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.background },
        tabBarActiveTintColor: theme.active,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "categry") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="categry" component={QuotesStack} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const checkIntro = async () => {
      try {
        const seenIntro = await AsyncStorage.getItem("@seen_intro");
        if (!seenIntro) {
          setShowIntro(true);
        }
      } catch (e) {
        console.log("Error checking intro:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkIntro();
  }, []);

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showIntro ? (
        <>
        <Stack.Screen name="Intro" component={IntroScreen} />
        
        </>
      ) : null}
    
      <Stack.Screen name="Main" component={MainTabs} />
      
    </Stack.Navigator>
  );
}
