

import React, { useRef, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import QuotePreview from "./QuotePreview";
import DownloadModal from "./DownloadModal";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";

const COLORS = [
  "#ffffff", "#000000", "#fef3c7", "#fde68a", "#fca5a5",
  "#93c5fd", "#c7d2fe", "#fecdd3", "#1f2937", "#0f172a",
  "#e11d48", "#2563eb", "#7c3aed", "#ea580c",
];

export default function QuoteCard({
  quote,
  author,
  isFavorite,
  onToggleFavorite,
  defaultTextColor = "#000000",
  defaultBgColor = "#fde2e4",
}) {
  const { theme } = useContext(ThemeContext);
  const previewRef = useRef();

  const [textColor, setTextColor] = useState(defaultTextColor);
  const [bgColor, setBgColor] = useState(defaultBgColor);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState("System");
  const [alignment, setAlignment] = useState("center");
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);

  /** 
   * GOOGLE PLAY SAFE SAVE FUNCTION
   * No MediaLibrary, no permissions needed.
   * Uses system share dialog.
   */
  const saveToGallery = async (uri) => {
    try {
      const fileUri = FileSystem.documentDirectory + "quote.jpg";

      // Copy the temporary file into app storage
      await FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });

      // Open system share/save dialog (Google Play approved)
      await Sharing.shareAsync(fileUri);

      Toast.show({
        type: "success",
        text1: "Image ready 📸",
        text2: "Use the dialog to save it to your gallery.",
      });

    } catch (err) {
      console.log("Save error:", err);
      Toast.show({
        type: "error",
        text1: "Save Failed",
        text2: "Something went wrong.",
      });
    }
  };

  /**
   * Capture the quote and trigger the save function
   */
  const downloadAsImage = async () => {
    try {
      const uri = await previewRef.current.capture();
      await saveToGallery(uri);
      setDownloadModalVisible(false);
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

      <DownloadModal
        visible={downloadModalVisible}
        theme={theme}
        COLORS={COLORS}
        textColor={textColor}
        bgColor={bgColor}
        onSelectColor={selectColor}
        onDownload={downloadAsImage}
        onClose={() => setDownloadModalVisible(false)}
        quote={quote}
        author={author}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        alignment={alignment}
        setAlignment={setAlignment}
        previewRef={previewRef} // Pass ViewShot ref
      />
    </>
  );
}
