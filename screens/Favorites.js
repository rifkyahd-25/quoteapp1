
import { useContext } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import QuoteCard from "../components/QuoteCard";
import { ThemeContext } from "../context/ThemeContext";
import useFavorites from "../utils/hooks/useFavorites";
import BannerAdContainer from "../components/BannerAdContainer";
import { TestIds } from "react-native-google-mobile-ads";

export default function Favorites() {
  const { favorites, toggleFavorite, refreshFavorites } = useFavorites();
  const { theme } = useContext(ThemeContext);

  const bannerAdUnitId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-2598026458310292/4999435025";

  const userFavoritesReversed = [...favorites].reverse();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Favorites</Text>

      {/* Refresh button */}
      <TouchableOpacity onPress={refreshFavorites} style={styles.refreshButton}>
        <Text style={styles.refreshText}>🔄 Refresh</Text>
      </TouchableOpacity>

      {userFavoritesReversed.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.text }]}>
          No favorites added yet 💔
        </Text>
      ) : (
        <FlatList
          data={userFavoritesReversed}
          keyExtractor={(item, index) => item.quote + index}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <QuoteCard
              quote={item.quote}
              author={item.author}
              isFavorite={favorites.some(f => f.quote === item.quote)}
              onToggleFavorite={() => toggleFavorite(item)}
              defaultBgColor={theme.card}
              defaultTextColor={theme.text}
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <BannerAdContainer adUnitId={bannerAdUnitId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, paddingTop: 40 },
  header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  emptyText: { marginTop: 40, fontSize: 16, textAlign: "center" },
  refreshButton: {
    alignSelf: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  refreshText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
