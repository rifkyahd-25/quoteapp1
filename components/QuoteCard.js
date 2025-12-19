

// import React, { useRef, useState, useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";
// import QuotePreview from "./QuotePreview";
// import DownloadModal from "./DownloadModal";
// import * as FileSystem from "expo-file-system";
// import * as Sharing from "expo-sharing";
// import Toast from "react-native-toast-message";

// const COLORS = [
//   "#ffffff", "#000000", "#fef3c7", "#fde68a", "#fca5a5",
//   "#93c5fd", "#c7d2fe", "#fecdd3", "#1f2937", "#0f172a",
//   "#e11d48", "#2563eb", "#7c3aed", "#ea580c",
// ];

// export default function QuoteCard({
//   quote,
//   author,
//   isFavorite,
//   onToggleFavorite,
//   defaultTextColor = "#000000",
//   defaultBgColor = "#fde2e4",
// }) {
//   const { theme } = useContext(ThemeContext);
//   const previewRef = useRef();

//   const [textColor, setTextColor] = useState(defaultTextColor);
//   const [bgColor, setBgColor] = useState(defaultBgColor);
//   const [fontSize, setFontSize] = useState(18);
//   const [fontFamily, setFontFamily] = useState("System");
//   const [alignment, setAlignment] = useState("center");
//   const [downloadModalVisible, setDownloadModalVisible] = useState(false);

//   /** 
//    * GOOGLE PLAY SAFE SAVE FUNCTION
//    * No MediaLibrary, no permissions needed.
//    * Uses system share dialog.
//    */
//   const saveToGallery = async (uri) => {
//     try {
//       const fileUri = FileSystem.documentDirectory + "quote.jpg";

//       // Copy the temporary file into app storage
//       await FileSystem.copyAsync({
//         from: uri,
//         to: fileUri,
//       });

//       // Open system share/save dialog (Google Play approved)
//       await Sharing.shareAsync(fileUri);

//       Toast.show({
//         type: "success",
//         text1: "Image ready 📸",
//         text2: "Use the dialog to save it to your gallery.",
//       });

//     } catch (err) {
//       console.log("Save error:", err);
//       Toast.show({
//         type: "error",
//         text1: "Save Failed",
//         text2: "Something went wrong.",
//       });
//     }
//   };

//   /**
//    * Capture the quote and trigger the save function
//    */
//   const downloadAsImage = async () => {
//     try {
//       const uri = await previewRef.current.capture();
//       await saveToGallery(uri);
//       setDownloadModalVisible(false);
//     } catch (error) {
//       console.log("Error capturing quote:", error);
//     }
//   };

//   const selectColor = (type, color) => {
//     if (type === "text") setTextColor(color);
//     if (type === "bg") setBgColor(color);
//   };

//   return (
//     <>
//       <QuotePreview
//         quote={quote}
//         author={author}
//         theme={theme}
//         isFavorite={isFavorite}
//         onToggleFavorite={onToggleFavorite}
//         onOpenDownload={() => setDownloadModalVisible(true)}
//       />

//       <DownloadModal
//         visible={downloadModalVisible}
//         theme={theme}
//         COLORS={COLORS}
//         textColor={textColor}
//         bgColor={bgColor}
//         onSelectColor={selectColor}
//         onDownload={downloadAsImage}
//         onClose={() => setDownloadModalVisible(false)}
//         quote={quote}
//         author={author}
//         fontSize={fontSize}
//         setFontSize={setFontSize}
//         fontFamily={fontFamily}
//         setFontFamily={setFontFamily}
//         alignment={alignment}
//         setAlignment={setAlignment}
//         previewRef={previewRef} // Pass ViewShot ref
//       />
//     </>
//   );
// }
import React, { useRef, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import QuotePreview from "./QuotePreview";
import DownloadModal from "./DownloadModal";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";

const COLORS = [
  // Light & Neutrals (10)
  "#FFFFFF", "#F8FAFC", "#F1F5F9", "#E2E8F0", "#FEFCE8",
  "#FFFBEB", "#F0F9FF", "#F5F3FF", "#FAF5FF", "#FDF2F8",
  
  // Pastels (10)
  "#FDE68A", "#BAE6FD", "#C7D2FE", "#A7F3D0", "#FBCFE8",
  "#93C5FD", "#C4B5FD", "#6EE7B7", "#F9A8D4", "#FDBA74",
  
  // Bright/Vibrant (12)
  "#FEF3C7", "#3B82F6", "#8B5CF6", "#10B981", "#EC4899",
  "#F59E0B", "#EF4444", "#FBBF24", "#60A5FA", "#A78BFA",
  "#34D399", "#FB923C",
  
  // Rich Colors (10)
  "#1E40AF", "#5B21B6", "#065F46", "#9D174D", "#92400E",
  "#7F1D1D", "#6366F1", "#06B6D4", "#84CC16", "#F472B6",
  
  // Dark Colors (12)
  "#1F2937", "#111827", "#0F172A", "#1E1B4B", "#134E4A",
  "#451A03", "#374151", "#4B5563", "#6B7280", "#1C1917",
  "#292524", "#0C0A09",
  
  // Special/Accent (12)
  "#D97706", "#059669", "#DC2626", "#7C3AED", "#0EA5E9",
  "#DB2777", "#CA8A04", "#2563EB", "#16A34A", "#EA580C",
  "#9333EA", "#0891B2"
];

// Solid colors for background (simplified version)
const SOLID_COLORS = [
  // Light & Neutral (16 colors)
  "#FFFFFF", // Pure White
  "#F8FAFC", // Slate 50 - Cool light gray
  "#F1F5F9", // Slate 100
  "#E2E8F0", // Slate 200
  "#CBD5E1", // Slate 300
  "#FEFCE8", // Yellow 50 - Soft warm light
  "#FFFBEB", // Amber 50
  "#F7F7F7", // Custom light gray
  "#FAFAFA", // Custom off-white
  "#F9FAFB", // Gray 50
  "#F3F4F6", // Gray 100
  "#E5E7EB", // Gray 200
  "#F5F5F5", // Custom light gray
  "#F0F0F0", // Custom light gray
  "#F2F2F2", // Custom light gray
  "#EAEAEA", // Custom light gray
  
  // Soft Pastels (16 colors)
  "#FEF3C7", // Amber 100 - Warm yellow
  "#DBEAFE", // Blue 100 - Sky blue
  "#F0F9FF", // Sky 50 - Light blue
  "#FEF2F2", // Red 50 - Soft pinkish
  "#F5F3FF", // Violet 50 - Light purple
  "#F0FDF4", // Green 50 - Mint green
  "#FDF4FF", // Fuchsia 50 - Light pink
  "#FFEDD5", // Orange 50 - Peach
  "#F0FDFA", // Teal 50 - Light teal
  "#EFF6FF", // Blue 50 - Very light blue
  "#FCE7F3", // Pink 50 - Light pink
  "#F0F9FF", // Cyan 50 - Light cyan
  "#ECFCCB", // Lime 50 - Light lime
  "#FEF9C3", // Yellow 100 - Soft yellow
  "#D1FAE5", // Emerald 100 - Light green
  "#E0E7FF", // Indigo 100 - Light indigo
  
  // Medium Light (12 colors)
  "#FDE68A", // Amber 200
  "#BAE6FD", // Sky 200
  "#C7D2FE", // Indigo 200
  "#A7F3D0", // Emerald 200
  "#FBCFE8", // Pink 200
  "#FED7AA", // Orange 200
  "#99F6E4", // Teal 200
  "#BFDBFE", // Blue 200
  "#DDD6FE", // Violet 200
  "#FECACA", // Red 200
  "#BBF7D0", // Green 200
  "#FDE047", // Yellow 300
  
  // Vibrant Colors (16 colors)
  "#3B82F6", // Blue 500 - Royal blue
  "#8B5CF6", // Violet 500 - Rich purple
  "#10B981", // Emerald 500 - Forest green
  "#EC4899", // Pink 500 - Hot pink
  "#F59E0B", // Amber 500 - Gold
  "#EF4444", // Red 500 - Bright red
  "#06B6D4", // Cyan 500 - Bright cyan
  "#84CC16", // Lime 500 - Lime green
  "#F97316", // Orange 500 - Bright orange
  "#6366F1", // Indigo 500
  "#14B8A6", // Teal 500
  "#8B5CF6", // Purple 500
  "#EAB308", // Yellow 500
  "#22C55E", // Green 500
  "#3B82F6", // Blue 500
  "#A855F7", // Fuchsia 500
  
  // Rich/Dark Colors (16 colors)
  "#1F2937", // Gray 800
  "#0F172A", // Slate 900
  "#111827", // Gray 900
  "#1E40AF", // Blue 800 - Navy blue
  "#5B21B6", // Violet 800 - Deep purple
  "#065F46", // Emerald 800 - Deep green
  "#9D174D", // Pink 800 - Deep rose
  "#92400E", // Amber 800 - Deep orange
  "#7F1D1D", // Red 800 - Deep red
  "#0C4A6E", // Blue 900
  "#4C1D95", // Purple 900
  "#134E4A", // Teal 900
  "#701A75", // Fuchsia 900
  "#713F12", // Yellow 900
  "#1E3A8A", // Indigo 900
  "#064E3B", // Emerald 900
  
  // Special/Accent Colors (12 colors)
  "#FBBF24", // Amber 400 - Bright yellow
  "#60A5FA", // Blue 400 - Bright blue
  "#A78BFA", // Violet 400 - Bright purple
  "#34D399", // Emerald 400 - Bright green
  "#F472B6", // Pink 400 - Bright pink
  "#FB923C", // Orange 400 - Bright orange
  "#22D3EE", // Cyan 400 - Bright cyan
  "#A3E635", // Lime 400 - Bright lime
  "#38BDF8", // Sky 400
  "#818CF8", // Indigo 400
  "#2DD4BF", // Teal 400
  "#E879F9", // Fuchsia 400
  
  // Deep & Professional (8 colors)
  "#000000", // Pure Black
  "#1C1917", // Stone 900
  "#292524", // Stone 800
  "#44403C", // Stone 700
  "#57534E", // Stone 600
  "#374151", // Gray 700
  "#4B5563", // Gray 600
  "#6B7280", // Gray 500
  
  // Gradient-Ready Colors (8 colors)
  "#9333EA", // Purple 600
  "#2563EB", // Blue 600
  "#059669", // Emerald 600
  "#DC2626", // Red 600
  "#D97706", // Amber 600
  "#0891B2", // Cyan 600
  "#CA8A04", // Yellow 600
  "#DB2777", // Pink 600
];

// Predefined background images
const BACKGROUND_IMAGES = [
  {
    id: "1",
    name: "Mountain",
    uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    color: "#4F46E5",
  },
  {
    id: "2",
    name: "Beach",
    uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    color: "#0EA5E9",
  },
  {
    id: "3",
    name: "Forest",
    uri: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    color: "#10B981",
  },
  {
    id: "4",
    name: "Night Sky",
    uri: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    color: "#6366F1",
  },
  {
    id: "5",
    name: "Abstract",
    uri: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    color: "#8B5CF6",
  },
  {
    id: "6",
    name: "Sunset",
    uri: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
    color: "#F59E0B",
  },
  {
    id: "7",
    name: "Minimal White",
    uri: null,
    color: "#FFFFFF",
  },
  {
    id: "8",
    name: "Gradient Blue",
    uri: null,
    color: "gradient",
  },
  {
    id: "9",
    name: "Snowy Mountain",
    uri: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    color: "#94a3b8",
  },
  {
    id: "10",
    name: "Rocky Ridge",
    uri: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&q=80",
    color: "#78716c",
  },
  {
    id: "11",
    name: "Alpine Lake",
    uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    color: "#0ea5e9",
  },
  {
    id: "12",
    name: "Mountain Path",
    uri: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    color: "#6b7280",
  },
  {
    id: "13",
    name: "Desert Dunes",
    uri: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    color: "#d97706",
  },
  {
    id: "14",
    name: "Tropical Shore",
    uri: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    color: "#06b6d4",
  },
  {
    id: "15",
    name: "Ocean Waves",
    uri: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
    color: "#0369a1",
  },
  {
    id: "16",
    name: "Coastal Cliffs",
    uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    color: "#4b5563",
  },
  {
    id: "17",
    name: "Palm Beach",
    uri: "https://images.unsplash.com/photo-1516496636080-14fb876e029d?w=800&q=80",
    color: "#059669",
  },
  {
    id: "18",
    name: "Forest Trail",
    uri: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
    color: "#365314",
  },
  {
    id: "19",
    name: "Autumn Woods",
    uri: "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?w=800&q=80",
    color: "#92400e",
  },
  {
    id: "20",
    name: "Sunlit Forest",
    uri: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&q=80",
    color: "#ca8a04",
  },
  {
    id: "21",
    name: "Foggy Woods",
    uri: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    color: "#6b7280",
  },
  {
    id: "22",
    name: "Pine Forest",
    uri: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
    color: "#1e40af",
  },
  {
    id: "23",
    name: "Starry Night",
    uri: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80",
    color: "#1e1b4b",
  },
  {
    id: "24",
    name: "Milky Way",
    uri: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    color: "#312e81",
  },
  {
    id: "25",
    name: "Moonlight",
    uri: "https://images.unsplash.com/photo-1532978379173-523e6a4a115e?w=800&q=80",
    color: "#374151",
  },
  {
    id: "26",
    name: "City Night",
    uri: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
    color: "#1f2937",
  },
  {
    id: "27",
    name: "Night Desert",
    uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    color: "#581c87",
  },
  {
    id: "28",
    name: "Geometric Pattern",
    uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    color: "#dc2626",
  },
  {
    id: "29",
    name: "Liquid Art",
    uri: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
    color: "#8b5cf6",
  },
  {
    id: "30",
    name: "Paint Splash",
    uri: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
    color: "#ec4899",
  },
  {
    id: "31",
    name: "Texture Background",
    uri: "https://images.unsplash.com/photo-1543857778-c4a1a569e388?w=800&q=80",
    color: "#d4d4d4",
  },
  {
    id: "32",
    name: "Abstract Waves",
    uri: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&q=80",
    color: "#0ea5e9",
  },
  {
    id: "33",
    name: "Purple Sunset",
    uri: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    color: "#8b5cf6",
  },
  {
    id: "34",
    name: "Minimal Gray",
    uri: null,
    color: "#d4d4d4",
  },
  {
    id: "35",
    name: "Minimal Black",
    uri: null,
    color: "#000000",
  },
  {
    id: "36",
    name: "Minimal Beige",
    uri: null,
    color: "#f5f5dc",
  },
  {
    id: "37",
    name: "Minimal Blue",
    uri: null,
    color: "#dbeafe",
  },
  {
    id: "38",
    name: "Sunset Gradient",
    uri: null,
    color: "gradient",
  },
  {
    id: "39",
    name: "Forest Gradient",
    uri: null,
    color: "gradient",
  },
  {
    id: "40",
    name: "Purple Gradient",
    uri: null,
    color: "gradient",
  },
  {
    id: "41",
    name: "Ocean Gradient",
    uri: null,
    color: "gradient",
  },
  {
    id: "42",
    name: "Urban Skyline",
    uri: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    color: "#374151",
  },
  {
    id: "43",
    name: "Modern Architecture",
    uri: "https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&q=80",
    color: "#6b7280",
  },
  {
    id: "44",
    name: "Desert Canyon",
    uri: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    color: "#92400e",
  },
  {
    id: "45",
    name: "Winter Forest",
    uri: "https://images.unsplash.com/photo-1455218873509-8097305ee378?w=800&q=80",
    color: "#e2e8f0",
  },
  {
    id: "46",
    name: "Frozen Lake",
    uri: "https://images.unsplash.com/photo-1547517023-7ca0c162f816?w=800&q=80",
    color: "#0ea5e9",
  },
  {
    id: "47",
    name: "Snowy Trees",
    uri: "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?w=800&q=80",
    color: "#94a3b8",
  },
  {
    id: "48",
    name: "Ice Caves",
    uri: "https://images.unsplash.com/photo-1495555687395-564a1e73405e?w=800&q=80",
    color: "#38bdf8",
  },
  {
    id: "49",
    name: "Waterfall",
    uri: "https://images.unsplash.com/photo-1512273222628-4daea6e55abb?w=800&q=80",
    color: "#0ea5e9",
  },
  {
    id: "50",
    name: "River Flow",
    uri: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    color: "#0369a1",
  },
  {
    id: "51",
    name: "Lake Reflection",
    uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    color: "#1d4ed8",
  },
  {
    id: "52",
    name: "Countryside",
    uri: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    color: "#4d7c0f",
  },
  {
    id: "53",
    name: "Flower Field",
    uri: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    color: "#db2777",
  },
  {
    id: "54",
    name: "Storm Clouds",
    uri: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80",
    color: "#4b5563",
  },
  {
    id: "55",
    name: "Coffee Shop",
    uri: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=800&q=80",
    color: "#78350f",
  },
  {
    id: "56",
    name: "Workspace",
    uri: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
    color: "#d4d4d4",
  },
  {
    id: "57",
    name: "Bookshelf",
    uri: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    color: "#92400e",
  },
  {
    id: "58",
    name: "Art Studio",
    uri: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
    color: "#7c3aed",
  },
  {
    id: "59",
    name: "Cozy Interior",
    uri: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80",
    color: "#fbbf24",
  },
  {
    id: "60",
    name: "Cabin View",
    uri: "https://images.unsplash.com/photo-1483721310020-03333e577cce?w=800&q=80",
    color: "#92400e",
  },
  {
    id: "61",
    name: "Fireplace",
    uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    color: "#dc2626",
  },
  {
    id: "62",
    name: "Rustic Wood",
    uri: "https://images.unsplash.com/photo-1543857778-c4a1a569e388?w=800&q=80",
    color: "#78350f",
  },
  {
    id: "63",
    name: "Galaxy",
    uri: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    color: "#1e1b4b",
  },
  {
    id: "64",
    name: "Planet View",
    uri: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    color: "#0ea5e9",
  },
  {
    id: "65",
    name: "Bokeh Lights",
    uri: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
    color: "#8b5cf6",
  },
  {
    id: "66",
    name: "Light Trails",
    uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    color: "#f59e0b",
  },
  {
    id: "67",
    name: "Neon Lights",
    uri: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
    color: "#db2777",
  },
  {
    id: "68",
    name: "Volcano",
    uri: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&q=80",
    color: "#475569",
  },
  {
    id: "69",
    name: "Coral Reef",
    uri: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
    color: "#ec4899",
  },
  {
    id: "70",
    name: "Marine Life",
    uri: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    color: "#06b6d4",
  },
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
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState("System");
  const [alignment, setAlignment] = useState("center");
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);

  // Background state management
  const [selectedBackground, setSelectedBackground] = useState({
    type: "color", // "color", "image", or "gradient"
    value: defaultBgColor,
    image: { color: defaultBgColor, name: "Solid Color" }
  });

  /** 
   * GOOGLE PLAY SAFE SHARE FUNCTION
   * No MediaLibrary, no permissions needed.
   * Uses system share dialog.
   */
  const shareImage = async (uri) => {
    try {
      // Generate a unique filename
      const timestamp = Date.now();
      const fileName = `quote_${timestamp}.jpg`;
      
      // Get the app's cache directory
      const directory = FileSystem.cacheDirectory;
      const destinationUri = `${directory}${fileName}`;

      // Read the source file and write to destination
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        // Copy the file using the new API approach
        await FileSystem.copyAsync({
          from: uri,
          to: destinationUri,
        });
      } else {
        throw new Error("Captured image not found");
      }

      // Open system share/save dialog (Google Play approved)
      await Sharing.shareAsync(destinationUri, {
        mimeType: 'image/jpeg',
        dialogTitle: 'Save or Share Quote Image',
        UTI: 'public.jpeg'
      });

      Toast.show({
        type: "success",
        text1: "Image Ready 📸",
        text2: "Share or save to your gallery",
      });

    } catch (err) {
      console.log("Share error:", err);
      Toast.show({
        type: "error",
        text1: "Share Failed",
        text2: err.message || "Something went wrong.",
      });
      throw err;
    }
  };

  /**
   * Capture the quote and trigger the share function
   */
  const shareAsImage = async () => {
    try {
      if (previewRef.current?.capture) {
        const uri = await previewRef.current.capture();
        await shareImage(uri);
        setDownloadModalVisible(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Preview not ready",
        });
      }
    } catch (error) {
      console.log("Error capturing quote:", error);
      Toast.show({
        type: "error",
        text1: "Capture Failed",
        text2: "Could not create image",
      });
    }
  };

  const selectColor = (type, color) => {
    if (type === "text") {
      setTextColor(color);
    }
  };

  // Function to handle background selection
  const handleBackgroundSelect = (background) => {
    if (background.uri) {
      // It's an image background
      setSelectedBackground({
        type: "image",
        value: background.uri,
        image: background
      });
    } else if (background.color === "gradient") {
      // It's a gradient
      setSelectedBackground({
        type: "gradient",
        value: "gradient",
        image: background
      });
    } else {
      // It's a solid color
      setSelectedBackground({
        type: "color",
        value: background.color,
        image: background
      });
    }
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
        SOLID_COLORS={SOLID_COLORS}
        BACKGROUND_IMAGES={BACKGROUND_IMAGES}
        textColor={textColor}
        selectedBackground={selectedBackground}
        onSelectColor={selectColor}
        onSelectBackground={handleBackgroundSelect}
        onDownload={shareAsImage}
        onClose={() => setDownloadModalVisible(false)}
        quote={quote}
        author={author}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        alignment={alignment}
        setAlignment={setAlignment}
        previewRef={previewRef}
      />
    </>
  );
}