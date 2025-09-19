import React, { useContext, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import QuoteCard from "../components/QuoteCard";
import { ThemeContext } from "../context/ThemeContext";
import useFavorites from "../utils/hooks/useFavorites";
import EmptyState from "../components/EmptyState";
import BannerAdContainer from "../components/BannerAdContainer";
import { TestIds } from "react-native-google-mobile-ads";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { theme } = useContext(ThemeContext);

  const downloadSize = "48";
  const downloadColor = "#000000";
    const bannerAdUnitId = __DEV__
      ? TestIds.BANNER
      : "ca-app-pub-xxxxxxxx~yyyyyyyyyy";

  if (favorites.length === 0)
    return <EmptyState message="No favorites yet!" theme={theme} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.quote}
        renderItem={({ item }) => (
          <QuoteCard
            quote={item.quote}
            author={item.author}
            isFavorite={true}
            onToggleFavorite={() => toggleFavorite(item)}
            downloadSize={downloadSize}
            downloadColor={downloadColor}
            defaultBgColor={theme.card}
            defaultTextColor={theme.text}
          />
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
       <BannerAdContainer adUnitId={bannerAdUnitId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 40 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 16 },
});
