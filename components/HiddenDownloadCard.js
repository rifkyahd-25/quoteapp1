
import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from "react-native-view-shot";

export default function HiddenDownloadCard({
  downloadRef,
  quote,
  author,
  textColor,
  bgColor,
  bgImage,
  fontSize = 60,
  fontFamily = "System",
  alignment = "center",
  theme,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    console.log("HiddenDownloadCard Rendered");
    console.log("bgImage:", bgImage);
  }, [bgImage]);

  const content = (
    <>
      {/* Large decorative quote */}
      <Text
        style={{
          fontSize: 200,
          position: "absolute",
          top: 40,
          left: 60,
          opacity: 0.05,
          color: textColor || theme?.text,
        }}
      >
        “
      </Text>

      {/* Main quote text */}
      <Text
        style={{
          color: textColor || theme?.text,
          textAlign: alignment,
          fontWeight: "600",
          fontSize,
          fontFamily,
          lineHeight: fontSize * 1.2,
          letterSpacing: 1.2,
        }}
      >
        {quote}
      </Text>

      {/* Divider line */}
      <View
        style={{
          marginTop: 50,
          width: "20%",
          height: 2,
          backgroundColor: textColor || theme?.textMuted,
          opacity: 0.6,
        }}
      />

      {/* Author */}
      <Text
        style={{
          fontSize: fontSize * 0.6,
          color: textColor || theme?.textMuted,
          textAlign: alignment,
          marginTop: 30,
          fontStyle: "italic",
          fontFamily: "serif",
        }}
      >
        {author ? `— ${author.trim()}` : ""}
      </Text>

      {/* Watermark */}
      <Text
        style={{
          fontSize: fontSize * 0.45,
          color: textColor || theme?.textMuted,
          position: "absolute",
          bottom: 40,
          right: 60,
          opacity: 0.7,
        }}
      >
        YourAppName
      </Text>
    </>
  );

  return (
    <ViewShot
      ref={downloadRef}
      options={{ format: "png", quality: 1, result: "tmpfile" }}
      style={{
       
        position: "absolute",
        left: -2000,
        top: -2000,
      }}
    >
      <View style={{ flex: 1, width: "100%", height: "100%", overflow: "hidden" }}>
        {bgImage ? (
          <ImageBackground
            source={{ uri: bgImage }}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 80,
            }}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => console.log("ImageBackground error:", e.nativeEvent)}
          >
            {!imageLoaded ? (
              <ActivityIndicator size="large" color={textColor || "#000"} />
            ) : (
              content
            )}
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={[bgColor || "#ffffff", bgColor || "#ffffff"]}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 80,
            }}
          >
            {content}
          </LinearGradient>
        )}
      </View>
    </ViewShot>
  );
}
