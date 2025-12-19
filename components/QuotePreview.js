
// import React from "react";
// import { View, Text, TouchableOpacity, Share,  } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// export default function QuotePreview({
//   quote,
//   author,
//   theme,
//   isFavorite,
//   onToggleFavorite,
//   onOpenDownload,
// }) {


//   // ✅ Share function
//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `"${quote}"\n\n— ${author || "Unknown"}`,
//       });
//     } catch (error) {
//       console.log("Error sharing:", error);
//     }
//   };

//   return (
//     <LinearGradient
//       colors={[theme.bigcard, theme.bigcard]}
//       style={{
//         padding: 25,
//         borderRadius: 20,
//         marginVertical: 15,
//         alignItems: "center",
//         position: "relative",
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 8 },
//         shadowRadius: 10,
//         elevation: 8,
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 60,
//           position: "absolute",
//           top: 10,
//           left: 20,
//           opacity: 0.1,
//           color: theme.textMuted,
//         }}
//       >
//         “
//       </Text>

//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: "600",
//           textAlign: "center",
//           lineHeight: 32,
//           marginTop: 20,
//           fontFamily: "Lora",
//           color: theme.text,
//         }}
//       >
//         {quote}
//       </Text>

//       <Text
//         style={{
//           fontSize: 16,
//           fontStyle: "italic",
//           marginTop: 20,
//           color: theme.textMuted,
//         }}
//       >
//         {author ? author.split(",")[0].trim().toLowerCase() : ""}
//       </Text>

//       {/* Actions */}
//       <View
//         style={{
//           flexDirection: "row",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           marginTop: 25,
//         }}
//       >
//         {/* Favorite */}
//         <ActionButton
//           label={isFavorite ? "Remove" : "Add"}
//           icon={isFavorite ? "heart" : "heart-outline"}
//           theme={theme}
//           onPress={onToggleFavorite}
//         />

//         {/* Download */}
//         <ActionButton
//           label="Download"
//           icon="download-outline"
//           theme={theme}
//           onPress={onOpenDownload}
//         />

    
//       </View>
//     </LinearGradient>
//   );
// }

// // ✅ Small reusable button
// function ActionButton({ label, icon, theme, onPress }) {
//   return (
//     <TouchableOpacity
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 15,
//         paddingVertical: 8,
//         borderRadius: 12,
//         margin: 5,
//         backgroundColor:
//           theme.mode === "dark" ? "#01675b" : "rgba(0,0,0,0.05)",
//       }}
//       onPress={onPress}
//     >
//       <Ionicons name={icon} size={20} color={theme.active} />
//       <Text style={{ fontWeight: "600", marginLeft: 6, color: theme.active }}>
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );
// }
import React from "react";
import { View, Text, TouchableOpacity, Share, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function QuotePreview({
  quote,
  author,
  theme,
  isFavorite,
  onToggleFavorite,
  onOpenDownload,
}) {
  // ✅ Share function
  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${quote}"\n\n— ${author || "Unknown"}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          theme.bigcard,
          theme.mode === "dark" ? `${theme.bigcard}CC` : `${theme.bigcard}F8`
        ]}
        style={[
          styles.card,
          theme.mode === "dark" ? styles.cardDark : styles.cardLight,
        ]}
      >
        {/* Decorative quote marks */}
        <Text style={styles.quoteMarkLeft(theme)}>❝</Text>
        <Text style={styles.quoteMarkRight(theme)}>❞</Text>

        {/* Favorite indicator */}
        {isFavorite && (
          <View style={styles.favoriteIndicator(theme)}>
            <Ionicons name="heart" size={14} color="#FFFFFF" />
          </View>
        )}

        {/* Quote content */}
        <View style={styles.contentWrapper}>
          <Text
            style={styles.quoteText(theme)}
            numberOfLines={5}
            ellipsizeMode="tail"
          >
            {quote}
          </Text>

          <View style={styles.authorContainer}>
            <View style={styles.authorLine(theme)} />
            <Text style={styles.authorText(theme)}>
              {author ? author.split(",")[0].trim().toLowerCase() : "unknown"}
            </Text>
            <View style={styles.authorLine(theme)} />
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            {/* Favorite button */}
            <ActionButton
              label={isFavorite ? "Saved" : "Save"}
              icon={isFavorite ? "heart" : "heart-outline"}
              theme={theme}
              onPress={onToggleFavorite}
              isPrimary={isFavorite}
            />

            {/* Share button */}
            <ActionButton
              label="Share"
              icon="share-outline"
              theme={theme}
              onPress={handleShare}
              isPrimary={false}
            />

            {/* Edit button (formerly Download) */}
            <ActionButton
              label="Edit"
              icon="create-outline"
              theme={theme}
              onPress={onOpenDownload}
              isPrimary={false}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

// ✅ Enhanced ActionButton
function ActionButton({ label, icon, theme, onPress, isPrimary }) {
  return (
    <TouchableOpacity
      style={[
        styles.actionButton,
        isPrimary 
          ? styles.primaryButton(theme) 
          : theme.mode === "dark" 
            ? styles.secondaryButtonDark 
            : styles.secondaryButtonLight
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={icon} 
        size={18} 
        color={isPrimary ? "#FFFFFF" : theme.active} 
        style={styles.buttonIcon}
      />
      {label ? (
        <Text style={[
          styles.buttonText,
          { color: isPrimary ? "#FFFFFF" : theme.active }
        ]}>
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  card: {
    padding: 24,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  cardLight: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#FFFFFF80",
  },
  cardDark: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF15",
  },
  quoteMarkLeft: (theme) => ({
    position: "absolute",
    top: 16,
    left: 20,
    fontSize: 56,
    opacity: 0.08,
    color: theme.text,
    fontFamily: "Georgia",
  }),
  quoteMarkRight: (theme) => ({
    position: "absolute",
    bottom: 16,
    right: 20,
    fontSize: 56,
    opacity: 0.08,
    color: theme.text,
    fontFamily: "Georgia",
  }),
  favoriteIndicator: (theme) => ({
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: theme.active,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.active,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  }),
  contentWrapper: {
    position: "relative",
    zIndex: 1,
  },
  quoteText: (theme) => ({
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 32,
    marginTop: 8,
    marginBottom: 20,
    fontFamily: "Georgia",
    color: theme.text,
    letterSpacing: 0.2,
  }),
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    gap: 12,
  },
  authorLine: (theme) => ({
    flex: 1,
    height: 1,
    backgroundColor: theme.mode === "dark" ? "#FFFFFF25" : "#00000015",
  }),
  authorText: (theme) => ({
    fontSize: 15,
    fontStyle: "italic",
    color: theme.textMuted,
    fontWeight: "500",
    minWidth: 80,
    textAlign: "center",
    letterSpacing: 0.3,
  }),
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
  },
  primaryButton: (theme) => ({
    backgroundColor: theme.active,
    shadowColor: theme.active,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  }),
  secondaryButtonLight: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  secondaryButtonDark: {
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.3,
  },
});