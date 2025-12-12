import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

export default function QuoteButtons({ theme, onNext, onShare, onDownload }) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[styles.nextBtn, { backgroundColor: theme.smcardtextcolor }]}
        onPress={onNext}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.shareBtn, { backgroundColor: theme.smcardtextcolor }]}
        onPress={onShare}
      >
        <Ionicons name="share-social-outline" size={24} color="#fff" />
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    width: width * 0.9,
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  nextBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  nextText: { color: "#333", fontWeight: "600", fontSize: 16 },
  shareBtn: {
    width: 60,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
  },
  downloadBtn: {
    width: 60,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
});
