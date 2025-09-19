import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import ViewShot from "react-native-view-shot";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext"; // <-- import Theme
import DownloadModal from "./DownloadModal";
import QuotePreview from "./QuotePreview";
import HiddenDownloadCard from "./HiddenDownloadCard";
import Toast from "react-native-toast-message";


const COLORS = [
  "#ffffff",
  "#000000",
  "#fef3c7",
  "#fde68a",
  "#fca5a5",
  "#93c5fd",
  "#c7d2fe",
  "#fecdd3",
  "#1f2937",
  "#ffffff",
  "#fefefe",
  "#0f172a",
  "#e11d48",
  "#2563eb",
  "#7c3aed",
  "#ea580c",
];

export default function QuoteCard({
  quote,
  author,
  isFavorite,
  onToggleFavorite,
  downloadSize = 48,
  defaultTextColor = "#000000",
  defaultBgColor = "#fde2e4",
}) {
  const { theme } = useContext(ThemeContext); // <-- use theme
  const downloadRef = useRef();
  const [textColor, setTextColor] = useState(defaultTextColor);
  const [bgColor, setBgColor] = useState(defaultBgColor);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [readyToCapture, setReadyToCapture] = useState(false);


  const saveToGallery = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("QuotesApp", asset, false);
        
        Toast.show({
          type: "success",
          text1: "Saved to Gallery 📸",
          text2: "Your quote has been saved successfully!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "Please allow gallery access to save images.",
        });
      }
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Save Failed",
        text2: "Something went wrong. Please try again.",
      });
    }
  };

  const downloadAsImage = async () => {
    try {
      setReadyToCapture(true);
      setTimeout(async () => {
        const uri = await downloadRef.current.capture();
        await saveToGallery(uri);
        setDownloadModalVisible(false);
        setReadyToCapture(false);
      }, 100);
    } catch (error) {
      console.log("Error capturing quote:", error);
    }
  };

  const selectColor = (type, color) => {
    if (type === "text") setTextColor(color);
    if (type === "bg") setBgColor(color);
  };

  return (
    <>
      <QuotePreview
        quote={quote}
        author={author}
        theme={theme}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        onOpenDownload={() => setDownloadModalVisible(true)}
      />

      <HiddenDownloadCard
        downloadRef={downloadRef}
        quote={quote}
        author={author}
        textColor={textColor}
        bgColor={bgColor}
        theme={theme}
      />

      <DownloadModal
        visible={downloadModalVisible}
        theme={theme}
        COLORS={COLORS}
        textColor={textColor}
        bgColor={bgColor}
        onSelectColor={(type, color) =>
          type === "text" ? setTextColor(color) : setBgColor(color)
        }
        onDownload={downloadAsImage}
        onClose={() => setDownloadModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 25,
    borderRadius: 20,
    marginVertical: 15,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    position: "relative",
  },
  quoteIcon: {
    fontSize: 60,
    position: "absolute",
    top: 10,
    left: 20,
    opacity: 0.1,
  },
  quote: {
    fontSize: 20,
    fontWeight: "600",
    // fontStyle: "italic",
    textAlign: "center",
    lineHeight: 32,
    marginTop: 20,
    fontFamily: "Lora",
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 25,
  },
  favButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  favText: { fontWeight: "600", marginLeft: 6 },
  downloadText: { fontWeight: "600", marginLeft: 6 },
  hiddenView: {
    width: 1080,
    height: 1080,
    position: "absolute",
    left: -2000,
    top: -2000,
  },
  downloadCard: {
    width: 1080,
    height: 1080,
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
    borderRadius: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingVertical: 50,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  modalSubtitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#0000",
  },
  modalDownload: {
    marginHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  modalClose: {
    marginHorizontal: 50,
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
});
