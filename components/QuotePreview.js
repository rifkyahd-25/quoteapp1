
import React from "react";
import { View, Text, TouchableOpacity, Share,  } from "react-native";
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
    <LinearGradient
      colors={[theme.bigcard, theme.bigcard]}
      style={{
        padding: 25,
        borderRadius: 20,
        marginVertical: 15,
        alignItems: "center",
        position: "relative",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      <Text
        style={{
          fontSize: 60,
          position: "absolute",
          top: 10,
          left: 20,
          opacity: 0.1,
          color: theme.textMuted,
        }}
      >
        “
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
          lineHeight: 32,
          marginTop: 20,
          fontFamily: "Lora",
          color: theme.text,
        }}
      >
        {quote}
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontStyle: "italic",
          marginTop: 20,
          color: theme.textMuted,
        }}
      >
        {author ? author.split(",")[0].trim().toLowerCase() : ""}
      </Text>

      {/* Actions */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        {/* Favorite */}
        <ActionButton
          label={isFavorite ? "Remove" : "Add"}
          icon={isFavorite ? "heart" : "heart-outline"}
          theme={theme}
          onPress={onToggleFavorite}
        />

        {/* Download */}
        <ActionButton
          label="Download"
          icon="download-outline"
          theme={theme}
          onPress={onOpenDownload}
        />

    
      </View>
    </LinearGradient>
  );
}

// ✅ Small reusable button
function ActionButton({ label, icon, theme, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        margin: 5,
        backgroundColor:
          theme.mode === "dark" ? "#01675b" : "rgba(0,0,0,0.05)",
      }}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={theme.active} />
      <Text style={{ fontWeight: "600", marginLeft: 6, color: theme.active }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
