import React from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { showAdIfAvailable } from "../utils/hooks/AdManager";

export default function DownloadModal({
  visible,
  theme,
  COLORS,
  textColor,
  bgColor,
  onSelectColor,
  onDownload,
  onClose,
}) {
  const handleDownload = () => {
    showAdIfAvailable(() => {
      if (onDownload) onDownload();
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
          paddingVertical: 50,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            textAlign: "center",
            marginBottom: 20,
            fontWeight: "600",
          }}
        >
          Select Colors
        </Text>

        {/* Text Color */}
        <Text style={{ color: "#fff", fontSize: 16, marginBottom: 10, marginLeft: 20 }}>
          Text Color:
        </Text>
        <FlatList
          data={COLORS}
          keyExtractor={(item, index) => `text-${item}-${index}`}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 20, marginBottom: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginHorizontal: 10,
                backgroundColor: item,
                borderWidth: item === textColor ? 3 : 2,
                borderColor: item === textColor ? "#fff" : "transparent",
              }}
              onPress={() => onSelectColor("text", item)}
            />
          )}
        />

        {/* Background Color */}
        <Text style={{ color: "#fff", fontSize: 16, marginBottom: 10, marginLeft: 20 }}>
          Background Color:
        </Text>
        <FlatList
          data={COLORS}
          keyExtractor={(item, index) => `bg-${item}-${index}`}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 20, marginBottom: 15 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginHorizontal: 10,
                backgroundColor: item,
                borderWidth: item === bgColor ? 3 : 2,
                borderColor: item === bgColor ? "#fff" : "transparent",
              }}
              onPress={() => onSelectColor("bg", item)}
            />
          )}
        />

        <Text
          style={{
            color: "#ebbe4d",
            marginBottom: 10,
            fontSize: 14,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Downloading process contains ads !
        </Text>

        {/* Download Button */}
        <TouchableOpacity
          style={{
            marginHorizontal: 50,
            paddingVertical: 12,
            borderRadius: 30,
            alignItems: "center",
            marginTop: 10,
            backgroundColor: theme.primary,
          }}
          onPress={handleDownload}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>Download Now</Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity
          style={{
            marginHorizontal: 50,
            marginTop: 15,
            paddingVertical: 12,
            borderRadius: 30,
            alignItems: "center",
            backgroundColor: "#ef4444",
          }}
          onPress={onClose}
        >
          <Text style={{ color: "#fff" }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
