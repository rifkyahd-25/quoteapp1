// // import React from "react";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import HomeScreen from "../screens/HomeScreen";
// // import AllQuotes from "../screens/AllQuotes";
// // import Favorites from "../screens/Favorites";

// // const Tab = createBottomTabNavigator();

// // export default function AppNavigator() {
// //   return (
// //     <Tab.Navigator screenOptions={{ headerShown: false }}>
// //       <Tab.Screen name="Home" component={HomeScreen} />
// //       <Tab.Screen name="All Quotes" component={AllQuotes} />
// //       <Tab.Screen name="Favorites" component={Favorites} />
// //     </Tab.Navigator>
// //   );
// // }



// // import React from "react";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import { createNativeStackNavigator } from "@react-navigation/native-stack";

// // import HomeScreen from "../screens/HomeScreen";
// // import Favorites from "../screens/Favorites";
// // import CategoriesScreen from "../screens/CategoriesScreen";
// // import CategoryQuotes from "../screens/CategoryQuotes";

// // const Tab = createBottomTabNavigator();
// // const Stack = createNativeStackNavigator();

// // // Stack for Quotes Tab
// // function QuotesStack() {
// //   return (
// //     <Stack.Navigator screenOptions={{ headerShown: false }}>
// //       <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
// //       <Stack.Screen name="CategoryQuotes" component={CategoryQuotes} />
// //     </Stack.Navigator>
// //   );
// // }

// // export default function AppNavigator() {
// //   return (
// //     <Tab.Navigator screenOptions={{ headerShown: false }}>
// //       <Tab.Screen name="Home" component={HomeScreen} />
// //       <Tab.Screen name="categry" component={QuotesStack} />
// //       <Tab.Screen name="Favorites" component={Favorites} />
// //     </Tab.Navigator>
// //   );
// // }
// import React, { useContext, useState } from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons"; // <-- import icons

// import HomeScreen from "../screens/HomeScreen";
// import Favorites from "../screens/Favorites";
// import CategoriesScreen from "../screens/CategoriesScreen";
// import CategoryQuotes from "../screens/CategoryQuotes";
// import SettingsScreen from "../screens/SettingsScreen";
// import { ThemeContext } from "../context/ThemeContext";
// import LoadingScreen from "../screens/LoadingScreen";


// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// // Stack for Quotes Tab
// function QuotesStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
//       <Stack.Screen name="CategoryQuotes" component={CategoryQuotes} />
//     </Stack.Navigator>
//   );
// }

// export default function AppNavigator() {
//   const { theme } = useContext(ThemeContext);
//   const [isLoading, setIsLoading] = useState(true); 


//   if (isLoading) {
//     return <LoadingScreen onFinish={() => setIsLoading(false)} />;
//   }
//   return (
//     <Tab.Navigator
//     screenOptions={({ route }) => ({
//       headerShown: false,
//       tabBarStyle: { backgroundColor: theme.background },
//       tabBarActiveTintColor: theme.active,
//       tabBarInactiveTintColor: theme.textMuted,
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;

//         if (route.name === "Home") {
//           iconName = focused ? "home" : "home-outline";
//         } else if (route.name === "categry") {
//           iconName = focused ? "list" : "list-outline";
//         } else if (route.name === "Favorites") {
//           iconName = focused ? "heart" : "heart-outline";
//         } else if (route.name === "Settings") {
//           iconName = focused ? "settings" : "settings-outline";
//         }

//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//     })}
//   >
//     <Tab.Screen name="Home" component={HomeScreen} />
//     <Tab.Screen name="categry" component={QuotesStack} />
//     <Tab.Screen name="Favorites" component={Favorites} />
//     <Tab.Screen name="Settings" component={SettingsScreen} />
//   </Tab.Navigator>
//   );
// }
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
