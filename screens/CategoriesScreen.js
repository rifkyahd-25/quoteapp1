
// import React, { useContext } from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import { ThemeContext } from "../context/ThemeContext";
// import CategoryCard from "../components/CategoryCard";
// import { categories, categoryData } from "../data/categoryData";
// import BannerAdContainer from "../components/BannerAdContainer";
// import { TestIds } from "react-native-google-mobile-ads";
// import { showAdIfAvailable } from "../utils/hooks/AdManager"; // ✅ Add this

// export default function CategoriesScreen({ navigation }) {
//   const { theme } = useContext(ThemeContext);
//   const bannerAdUnitId = __DEV__
//     ? TestIds.BANNER
//     : "ca-app-pub-2598026458310292/2609075408";

//   const handleCategoryPress = (item) => {
//     showAdIfAvailable(() => {
//       navigation.navigate("CategoryQuotes", { category: item });
//     });
//   };

//   const renderItem = ({ item }) => {
//     const cat = categoryData[item];
//     return (
//       <CategoryCard
//         categoryName={item}
//         iconFunc={cat?.icon}
//         subtitle={cat?.subtitle}
//         onPress={() => handleCategoryPress(item)} // ✅ Modify to use ad
//       />
//     );
//   };

//   return (
//     <>
//       <View style={[styles.container, { backgroundColor: theme.background }]}>
//         <Text style={[styles.header, { color: theme.text }]}>Categories</Text>
//         <FlatList
//   data={categories}
//   keyExtractor={(item) => item}
//   renderItem={renderItem}
//   contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
//   ListFooterComponent={() => (
//     <View style={{ alignItems: "center",  bottom: 0, }}>
//       <BannerAdContainer adUnitId={bannerAdUnitId} />
//     </View>
//   )}
// />

//       </View>

     
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 20 },
//   header: {
//     fontSize: 30,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 16,
//     fontFamily: "Lora",
//   },
  
// });
import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import CategoryCard from "../components/CategoryCard";
import { categories, categoryData } from "../data/categoryData";
import BannerAdContainer from "../components/BannerAdContainer";
import { TestIds } from "react-native-google-mobile-ads";
import { showAdIfAvailable } from "../utils/hooks/AdManager";

export default function CategoriesScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const bannerAdUnitId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-2598026458310292/2609075408";

  // Handle category press with interstitial ad
  const handleCategoryPress = (category) => {
    showAdIfAvailable(() => {
      navigation.navigate("CategoryQuotes", { category });
    });
  };

  const renderItem = ({ item }) => {
    const cat = categoryData[item];
    return (
      <CategoryCard
        categoryName={item}
        iconFunc={cat?.icon}
        subtitle={cat?.subtitle}
        theme={theme} // Pass theme for proper styling
        onPress={() => handleCategoryPress(item)}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        initialNumToRender={10}
        removeClippedSubviews={true}
        ListFooterComponent={() => (
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <BannerAdContainer adUnitId={bannerAdUnitId} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    fontFamily: "Lora",
  },
});
