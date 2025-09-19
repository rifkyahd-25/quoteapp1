// import React from "react";
// import { Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import ViewShot from "react-native-view-shot";

// export default function HiddenDownloadCard({
//   downloadRef,
//   quote,
//   author,
//   textColor,
//   bgColor,
//   theme,
// }) {
//   return (
//     <ViewShot
//       ref={downloadRef}
//       options={{ format: "png", quality: 1, result: "tmpfile" }}
//       style={{
//         width: 1080,
//         height: 1080,
//         position: "absolute",
//         left: -2000,
//         top: -2000,
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
//       <LinearGradient
//         colors={[bgColor || theme.card, bgColor || theme.card]}
//         style={{
//           width: 1080,
//           height: 1080,
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 60,
//           borderRadius: 40,
//         }}
//       >
//         <Text
//           style={{
//             color: textColor || theme.text,
//             textAlign: "center",
            
//             fontWeight: "600",
//             fontSize: 56,
//             fontFamily: "Lora",
//           }}
//         >
//           "{quote}"
//         </Text>
//         <Text
//           style={{
//             fontSize: 36,
//             color: textColor || theme.textMuted,
//             textAlign: "center",
//             marginTop: 40,
//             fontStyle: "italic",
//           }}
//         >
//           - {author ? author.split(",")[0].trim().toLowerCase() : ""}
//         </Text>
//       </LinearGradient>
//     </ViewShot>
//   );
// }
import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ViewShot from "react-native-view-shot";

export default function HiddenDownloadCard({
  downloadRef,
  quote,
  author,
  textColor,
  bgColor,
  theme,
}) {
  return (
    <ViewShot
      ref={downloadRef}
      options={{ format: "png", quality: 1, result: "tmpfile" }}
      style={{
        width: 1080,
        height: 1080,
        position: "absolute",
        left: -2000,
        top: -2000,
      }}
    >
      <LinearGradient
        colors={[
          bgColor || bgColor,
          bgColor || bgColor,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          borderRadius: 40,
        }}
      >
        {/* Decorative quote mark */}
        <Text
          style={{
            fontSize: 200,
            position: "absolute",
            top: 40,
            left: 60,
            opacity: 0.05,
            color: textColor || theme.text,
          }}
        >
          “
        </Text>

        {/* Quote Text */}
        <Text
          style={{
            color: textColor || theme.text,
            textAlign: "center",
            fontWeight: "600",
            fontSize: 60,
            fontFamily: "Lora",
            lineHeight: 80,
            letterSpacing: 1.2,
          }}
        >
          “{quote}”
        </Text>

        {/* Separator */}
        <View
          style={{
            marginTop: 50,
            width: "20%",
            height: 2,
            backgroundColor: textColor || theme.textMuted,
            opacity: 0.6,
          }}
        />

        {/* Author */}
        <Text
          style={{
            fontSize: 38,
            color: textColor || theme.textMuted,
            textAlign: "center",
            marginTop: 30,
            fontStyle: "italic",
            fontFamily: "serif",
          }}
        >
          {author ? `— ${author.trim()}` : ""}
        </Text>

        {/* Branding */}
        <Text
          style={{
            fontSize: 28,
            color: textColor || theme.textMuted,
            position: "absolute",
            bottom: 40,
            right: 60,
            opacity: 0.7,
          }}
        >
          YourAppName
        </Text>
      </LinearGradient>
    </ViewShot>
  );
}
