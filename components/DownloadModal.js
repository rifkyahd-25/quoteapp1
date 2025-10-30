// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   ScrollView,
// } from "react-native";
// import Slider from "@react-native-community/slider";
// import ViewShot from "react-native-view-shot";
// import { LinearGradient } from "expo-linear-gradient";
// import { showAdIfAvailable } from "../utils/hooks/AdManager";

// const FONTS = [
//   "System",
//   "serif",
//   "monospace",
//   "cursive",
//   "sans-serif",
//   "sans-serif-light",
//   "sans-serif-thin",
//   "sans-serif-condensed",
//   "sans-serif-medium",
// ];

// export default function DownloadModal({
//   visible,
//   theme,
//   COLORS,
//   textColor,
//   bgColor,
//   onSelectColor,
//   onDownload,
//   onClose,
//   quote,
//   author,
//   fontSize,
//   setFontSize,
//   fontFamily,
//   setFontFamily,
//   alignment,
//   setAlignment,
//   previewRef, // ✅ Passed from parent
// }) {

//   const handleDownload = async () => {
//     try {
//       await showAdIfAvailable(async () => {
//         if (previewRef?.current?.capture && onDownload) {
//           const uri = await previewRef.current.capture();
//           onDownload(uri);
//         } else {
//           console.warn("ViewShot ref not ready");
//         }
//       });
//     } catch (err) {
//       console.error("Download failed:", err);
//     }
//   };

//   const renderCardContent = () => (
//     <>
//       <Text
//         style={{
//           fontSize: 100,
//           position: "absolute",
//           top: 20,
//           left: 20,
//           opacity: 0.05,
//           color: textColor || theme.text,
//         }}
//       >
//         “
//       </Text>

//       <Text
//         style={{
//           color: textColor || theme.text,
//           textAlign: alignment,
//           fontWeight: "600",
//           fontSize,
//           fontFamily,
//           lineHeight: fontSize * 1.2,
//           letterSpacing: 1.2,
//         }}
//       >
//         {quote}
//       </Text>

//       <View
//         style={{
//           marginTop: 20,
//           width: "20%",
//           height: 2,
//           backgroundColor: textColor || theme.textMuted,
//           opacity: 0.6,
//         }}
//       />

//       <Text
//         style={{
//           fontSize: fontSize * 0.6,
//           color: textColor || theme.textMuted,
//           textAlign: alignment,
//           marginTop: 10,
//           fontStyle: "italic",
//           fontFamily: "serif",
//         }}
//       >
//         {author ? `— ${author.trim()}` : ""}
//       </Text>

//       {/* <Text
//         style={{
//           fontSize: fontSize * 0.45,
//           color: textColor || theme.textMuted,
//           position: "absolute",
//           bottom: 20,
//           right: 20,
//           opacity: 0.7,
//         }}
//       >
//         YourAppName
//       </Text> */}
//     </>
//   );

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "rgba(0,0,0,0.7)",
//           justifyContent: "center",
//         }}
//       >
//         <View
//           style={{
//             flex: 1,
//             margin: 20,
//             backgroundColor: "#111",
//             borderRadius: 20,
//             overflow: "hidden",
//           }}
//         >
//           <Text
//             style={{
//               color: "#fff",
//               fontSize: 20,
//               fontWeight: "600",
//               textAlign: "center",
//               paddingVertical: 15,
//               backgroundColor: "#000",
//             }}
//           >
//             Customize & Preview
//           </Text>

//           <ScrollView contentContainerStyle={{ padding: 15 }}>
//             {/* Preview */}
//             <View
//               style={{
//                 width: "100%",
//                 aspectRatio: 1,
//                 marginBottom: 20,
//                 borderRadius: 15,
//                 overflow: "hidden",
//                 alignSelf: "center",
//               }}
//             >
//               <ViewShot
//                 ref={previewRef}
//                 options={{ format: "png", quality: 1, result: "tmpfile" }}
//                 style={{ flex: 1 }}
//               >
//                 <LinearGradient
//                   colors={[bgColor || "#ffffff", bgColor || "#ffffff"]}
//                   style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     alignItems: "center",
//                     padding: 30,
//                   }}
//                 >
//                   {renderCardContent()}
//                 </LinearGradient>
//               </ViewShot>
//             </View>

//             {/* Text Color */}
//             <View style={{ marginBottom: 15 }}>
//               <Text style={{ color: "#fff", marginBottom: 8 }}>Text Color</Text>
//               <FlatList
//                 data={COLORS}
//                 horizontal
//                 keyExtractor={(item, index) => `text-${index}`}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: 20,
//                       marginHorizontal: 5,
//                       backgroundColor: item,
//                       borderWidth: item === textColor ? 3 : 2,
//                       borderColor: item === textColor ? "#fff" : "transparent",
//                     }}
//                     onPress={() => onSelectColor("text", item)}
//                   />
//                 )}
//               />
//             </View>

//             {/* Background Color */}
//             <View style={{ marginBottom: 15 }}>
//               <Text style={{ color: "#fff", marginBottom: 8 }}>
//                 Background Color
//               </Text>
//               <FlatList
//                 data={COLORS}
//                 horizontal
//                 keyExtractor={(item, index) => `bg-${index}`}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: 20,
//                       marginHorizontal: 5,
//                       backgroundColor: item,
//                       borderWidth: item === bgColor ? 3 : 2,
//                       borderColor: item === bgColor ? "#fff" : "transparent",
//                     }}
//                     onPress={() => onSelectColor("bg", item)}
//                   />
//                 )}
//               />
//             </View>

//             {/* Font Style */}
//             <View style={{ marginBottom: 15 }}>
//               <Text style={{ color: "#fff", marginBottom: 8 }}>Font Style</Text>
//               <FlatList
//                 data={FONTS}
//                 horizontal
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     style={{
//                       paddingVertical: 8,
//                       paddingHorizontal: 16,
//                       borderRadius: 20,
//                       marginHorizontal: 5,
//                       backgroundColor:
//                         item === fontFamily ? theme.primary : "#374151",
//                     }}
//                     onPress={() => setFontFamily(item)}
//                   >
//                     <Text style={{ color: "#fff", fontFamily: item }}>
//                       {item}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>

//             {/* Font Size */}
//             <View style={{ marginBottom: 15 }}>
//               <Text style={{ color: "#fff", marginBottom: 8 }}>
//                 Font Size: {fontSize}
//               </Text>
//               <Slider
//                 minimumValue={12}
//                 maximumValue={40}
//                 step={1}
//                 value={fontSize}
//                 onValueChange={setFontSize}
//                 style={{ width: "100%" }}
//                 minimumTrackTintColor={theme.primary}
//                 maximumTrackTintColor="#aaa"
//               />
//             </View>

//             {/* Alignment */}
//             <View style={{ marginBottom: 15 }}>
//               <Text style={{ color: "#fff", marginBottom: 8 }}>Alignment</Text>
//               <View style={{ flexDirection: "row", justifyContent: "center" }}>
//                 {["left", "center", "right"].map((align) => (
//                   <TouchableOpacity
//                     key={align}
//                     style={{
//                       paddingVertical: 8,
//                       paddingHorizontal: 16,
//                       borderRadius: 20,
//                       marginHorizontal: 5,
//                       backgroundColor:
//                         alignment === align ? theme.primary : "#374151",
//                     }}
//                     onPress={() => setAlignment(align)}
//                   >
//                     <Text
//                       style={{ color: "#fff", textTransform: "capitalize" }}
//                     >
//                       {align}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </View>

//             {/* Buttons */}
//             <TouchableOpacity
//               style={{
//                 marginVertical: 10,
//                 paddingVertical: 12,
//                 borderRadius: 30,
//                 alignItems: "center",
//                 backgroundColor: theme.primary,
//               }}
//               onPress={handleDownload}
//             >
//               <Text style={{ color: "#fff", fontWeight: "600" }}>
//                 Download Now
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={{
//                 marginBottom: 15,
//                 paddingVertical: 12,
//                 borderRadius: 30,
//                 alignItems: "center",
//                 backgroundColor: "#ef4444",
//               }}
//               onPress={onClose}
//             >
//               <Text style={{ color: "#fff" }}>Cancel</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </View>
//     </Modal>
//   );
// }

import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import ViewShot from "react-native-view-shot";
import { LinearGradient } from "expo-linear-gradient";
import { showAdIfAvailable } from "../utils/hooks/AdManager";
import NetInfo from "@react-native-community/netinfo";
const FONTS = [
  "System",
  "serif",
  "monospace",
  "cursive",
  "sans-serif",
  "sans-serif-light",
  "sans-serif-thin",
  "sans-serif-condensed",
  "sans-serif-medium",
];

export default function DownloadModal({
  visible,
  theme,
  COLORS,
  textColor,
  bgColor,
  onSelectColor,
  onDownload,
  onClose,
  quote,
  author,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  alignment,
  setAlignment,
  previewRef, // ✅ Passed from parent
}) {
  const [loading, setLoading] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const handleDownload = async () => {
    if (!isConnected) return; // just in case
    try {
      setLoading(true);
      await showAdIfAvailable(async () => {
        if (previewRef?.current?.capture && onDownload) {
          const uri = await previewRef.current.capture();
          await onDownload(uri);
        } else {
          console.warn("ViewShot ref not ready");
        }
      });
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderCardContent = () => (
    <>
      <Text
        style={{
          fontSize: 100,
          position: "absolute",
          top: 20,
          left: 20,
          opacity: 0.05,
          color: textColor || theme.text,
        }}
      >
        “
      </Text>

      <Text
        style={{
          color: textColor || theme.text,
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

      <View
        style={{
          marginTop: 20,
          width: "20%",
          height: 2,
          backgroundColor: textColor || theme.textMuted,
          opacity: 0.6,
        }}
      />

      <Text
        style={{
          fontSize: fontSize * 0.6,
          color: textColor || theme.textMuted,
          textAlign: alignment,
          marginTop: 10,
          fontStyle: "italic",
          fontFamily: "serif",
        }}
      >
        {author ? `— ${author.trim()}` : ""}
      </Text>

      {/* <Text
        style={{
          fontSize: fontSize * 0.45,
          color: textColor || theme.textMuted,
          position: "absolute",
          bottom: 20,
          right: 20,
          opacity: 0.7,
        }}
      >
        YourAppName
      </Text> */}
    </>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.7)",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 20,
            backgroundColor: "#111",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "600",
              textAlign: "center",
              paddingVertical: 15,
              backgroundColor: "#000",
            }}
          >
            Customize & Preview
          </Text>

          <ScrollView contentContainerStyle={{ padding: 15 }}>
            {/* Preview */}
            <View
              style={{
                width: "100%",
                aspectRatio: 1,
                marginBottom: 20,
                borderRadius: 15,
                overflow: "hidden",
                alignSelf: "center",
              }}
            >
              <ViewShot
                ref={previewRef}
                options={{ format: "png", quality: 1, result: "tmpfile" }}
                style={{ flex: 1 }}
              >
                <LinearGradient
                  colors={[bgColor || "#ffffff", bgColor || "#ffffff"]}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 30,
                  }}
                >
                  {renderCardContent()}
                </LinearGradient>
              </ViewShot>
            </View>

            {/* Text Color */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ color: "#fff", marginBottom: 8 }}>Text Color</Text>
              <FlatList
                data={COLORS}
                horizontal
                keyExtractor={(item, index) => `text-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginHorizontal: 5,
                      backgroundColor: item,
                      borderWidth: item === textColor ? 3 : 2,
                      borderColor: item === textColor ? "#fff" : "transparent",
                    }}
                    onPress={() => onSelectColor("text", item)}
                  />
                )}
              />
            </View>

            {/* Background Color */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ color: "#fff", marginBottom: 8 }}>
                Background Color
              </Text>
              <FlatList
                data={COLORS}
                horizontal
                keyExtractor={(item, index) => `bg-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginHorizontal: 5,
                      backgroundColor: item,
                      borderWidth: item === bgColor ? 3 : 2,
                      borderColor: item === bgColor ? "#fff" : "transparent",
                    }}
                    onPress={() => onSelectColor("bg", item)}
                  />
                )}
              />
            </View>

            {/* Font Style */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ color: "#fff", marginBottom: 8 }}>Font Style</Text>
              <FlatList
                data={FONTS}
                horizontal
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 20,
                      marginHorizontal: 5,
                      backgroundColor:
                        item === fontFamily ? theme.primary : "#374151",
                    }}
                    onPress={() => setFontFamily(item)}
                  >
                    <Text style={{ color: "#fff", fontFamily: item }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* Font Size */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ color: "#fff", marginBottom: 8 }}>
                Font Size: {fontSize}
              </Text>
              <Slider
                minimumValue={12}
                maximumValue={40}
                step={1}
                value={fontSize}
                onValueChange={setFontSize}
                style={{ width: "100%" }}
                minimumTrackTintColor={theme.primary}
                maximumTrackTintColor="#aaa"
              />
            </View>

            {/* Alignment */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{ color: "#fff", marginBottom: 8 }}>Alignment</Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {["left", "center", "right"].map((align) => (
                  <TouchableOpacity
                    key={align}
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 20,
                      marginHorizontal: 5,
                      backgroundColor:
                        alignment === align ? theme.primary : "#374151",
                    }}
                    onPress={() => setAlignment(align)}
                  >
                    <Text
                      style={{ color: "#fff", textTransform: "capitalize" }}
                    >
                      {align}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* ===== DOWNLOAD INFO MESSAGE ===== */}
            <Text
              style={{
                color: "#fbbf24",
                fontSize: 14,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Downloading process contains ads
            </Text>

            {/* Buttons */}
            {!isConnected && (
              <Text
                style={{
                  color: "#f87171",
                  textAlign: "center",
                  marginBottom: 10,
                  fontSize: 14,
                }}
              >
                No Internet Connection. Downloads are disabled.
              </Text>
            )}

            {/* Download Button */}
            <TouchableOpacity
              style={{
                marginVertical: 10,
                paddingVertical: 12,
                borderRadius: 30,
                alignItems: "center",
                backgroundColor: isConnected ? theme.primary : "#6b7280", // gray when disabled
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={handleDownload}
              disabled={loading || !isConnected}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  {isConnected ? "Download Now" : "Download "}
                </Text>
              )}
            </TouchableOpacity>


            <TouchableOpacity
              style={{
                marginBottom: 15,
                paddingVertical: 12,
                borderRadius: 30,
                alignItems: "center",
                backgroundColor: "#ef4444",
              }}
              onPress={onClose}
            >
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
