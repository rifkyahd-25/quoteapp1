// import React, { useContext } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { ThemeContext } from "../context/ThemeContext";

// export default function CategoryCard({
//   categoryName,
//   iconFunc,
//   subtitle,
//   onPress,
// }) {
//   const { theme } = useContext(ThemeContext);

//   const iconElement = iconFunc ? (
//     iconFunc(theme.smcardtextcolor)
//   ) : (
//     <Ionicons name="ellipse-outline" size={28} color={theme.primary} />
//   );

//   return (
//     <TouchableOpacity
//       style={[styles.card, { backgroundColor: theme.backgroundsmcard }]}
//       onPress={onPress}
//     >
//       <View style={styles.iconContainer}>{iconElement}</View>
//       <View style={styles.textContainer}>
//         <Text style={[styles.title, { color: theme.text }]}>
//           {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
//         </Text>
//         <Text style={[styles.subtitle, { color: theme.textMuted }]}>
//           {subtitle}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   iconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#E0F7FA",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 16,
//   },
//   textContainer: { flex: 1 },
//   title: { fontSize: 16, fontWeight: "600", textTransform: "capitalize" },
//   subtitle: { fontSize: 14, marginTop: 2 },
// });
import React, { useContext, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Animated 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

export default function CategoryCard({
  categoryName,
  iconFunc,
  subtitle,
  onPress,
}) {
  const { theme } = useContext(ThemeContext);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);

  const iconElement = iconFunc ? (
    iconFunc(theme.active)
  ) : (
    <Ionicons name="apps" size={24} color={theme.active} />
  );

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  const formattedCategoryName = categoryName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Animated.View
        style={[
          styles.card,
          { 
            backgroundColor: theme.backgroundsmcard,
            transform: [{ scale: scaleAnim }],
            borderColor: isPressed ? `${theme.active}30` : theme.border,
            shadowColor: theme.mode === 'dark' ? '#000' : theme.primary,
          }
        ]}
      >
        {/* Decorative accent line */}
        <View style={[
          styles.accentLine,
          { backgroundColor: theme.active }
        ]} />

        {/* Icon container with gradient effect */}
        <View style={[
          styles.iconContainer,
          { 
            backgroundColor: theme.mode === 'dark' 
              ? `${theme.active}20` 
              : `${theme.active}15`,
            borderColor: theme.mode === 'dark' 
              ? `${theme.active}30` 
              : `${theme.active}20`,
          }
        ]}>
          {iconElement}
        </View>

        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={[
              styles.title, 
              { color: theme.text }
            ]}>
              {formattedCategoryName}
            </Text>
            
            {/* Chevron indicator */}
            <Ionicons 
              name="chevron-forward" 
              size={18} 
              color={theme.textMuted}
              style={styles.chevron}
            />
          </View>
          
          <Text style={[
            styles.subtitle, 
            { color: theme.textMuted }
          ]}>
            {subtitle}
          </Text>
        </View>

        {/* Hover effect overlay */}
        {isPressed && (
          <View style={[
            styles.pressOverlay,
            { backgroundColor: theme.mode === 'dark' ? '#FFFFFF08' : '#00000005' }
          ]} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    marginHorizontal: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textContainer: { 
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: { 
    fontSize: 17, 
    fontWeight: "700", 
    flex: 1,
    letterSpacing: 0.3,
  },
  subtitle: { 
    fontSize: 14, 
    lineHeight: 20,
    opacity: 0.8,
  },
  chevron: {
    marginLeft: 8,
    opacity: 0.6,
  },
  pressOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});