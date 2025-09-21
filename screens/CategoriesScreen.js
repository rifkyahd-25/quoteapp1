import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import CategoryCard from "../components/CategoryCard";
import { categories, categoryData } from "../data/categoryData";
import BannerAdContainer from "../components/BannerAdContainer";
import { TestIds } from "react-native-google-mobile-ads";

export default function CategoriesScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const bannerAdUnitId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-xxxxxxxx~yyyyyyyyyy";

  const renderItem = ({ item }) => {
    const cat = categoryData[item];

    return (
      <CategoryCard
        categoryName={item}
        iconFunc={cat?.icon}
        subtitle={cat?.subtitle}
        onPress={() =>
          navigation.navigate("CategoryQuotes", { category: item })
        }
      />
    );
  };

  return (
    <>
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
      
    </View>
    <View style={styles.adContainer}>
        <BannerAdContainer adUnitId={bannerAdUnitId} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    fontFamily: "Lora",
  },
  adContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
});
