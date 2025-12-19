
// import { useContext } from "react";
// import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
// import QuoteCard from "../components/QuoteCard";
// import { ThemeContext } from "../context/ThemeContext";
// import useFavorites from "../utils/hooks/useFavorites";
// import BannerAdContainer from "../components/BannerAdContainer";
// import { TestIds } from "react-native-google-mobile-ads";

// export default function Favorites() {
//   const { favorites, toggleFavorite, refreshFavorites } = useFavorites();
//   const { theme } = useContext(ThemeContext);

//   const bannerAdUnitId = __DEV__
//     ? TestIds.BANNER
//     : "ca-app-pub-2598026458310292/4999435025";

//   const userFavoritesReversed = [...favorites].reverse();

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <Text style={[styles.header, { color: theme.text }]}>Favorites</Text>

//       {/* Refresh button */}
//       <TouchableOpacity onPress={refreshFavorites} style={styles.refreshButton}>
//         <Text style={styles.refreshText}>🔄 Refresh</Text>
//       </TouchableOpacity>

//       {userFavoritesReversed.length === 0 ? (
//         <Text style={[styles.emptyText, { color: theme.text }]}>
//           No favorites added yet 💔
//         </Text>
//       ) : (
//         <FlatList
//           data={userFavoritesReversed}
//           keyExtractor={(item, index) => item.quote + index}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <QuoteCard
//               quote={item.quote}
//               author={item.author}
//               isFavorite={favorites.some(f => f.quote === item.quote)}
//               onToggleFavorite={() => toggleFavorite(item)}
//               defaultBgColor={theme.card}
//               defaultTextColor={theme.text}
//             />
//           )}
//           contentContainerStyle={{ paddingBottom: 80 }}
//         />
//       )}

//       <BannerAdContainer adUnitId={bannerAdUnitId} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingHorizontal: 10, paddingTop: 40 },
//   header: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
//   emptyText: { marginTop: 40, fontSize: 16, textAlign: "center" },
//   refreshButton: {
//     alignSelf: "center",
//     marginBottom: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: "#007AFF",
//     borderRadius: 8,
//   },
//   refreshText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });
import { useContext, useState } from "react";
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  RefreshControl,
  Animated 
} from "react-native";
import QuoteCard from "../components/QuoteCard";
import { ThemeContext } from "../context/ThemeContext";
import useFavorites from "../utils/hooks/useFavorites";
import BannerAdContainer from "../components/BannerAdContainer";
import { TestIds } from "react-native-google-mobile-ads";
import { Ionicons } from "@expo/vector-icons";

export default function Favorites() {
  const { favorites, toggleFavorite, refreshFavorites } = useFavorites();
  const { theme } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [spinAnim] = useState(new Animated.Value(0));

  const bannerAdUnitId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-2598026458310292/4999435025";

  const userFavoritesReversed = [...favorites].reverse();

  const onRefresh = () => {
    setRefreshing(true);
    refreshFavorites();
    
    // Animation for refresh
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      spinAnim.setValue(0);
      setRefreshing(false);
    });
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header with gradient background */}
      <View style={[styles.headerContainer, { 
        backgroundColor: theme.mode === 'dark' ? `${theme.card}CC` : `${theme.card}F5`,
        borderBottomColor: theme.mode === 'dark' ? '#FFFFFF20' : '#00000010'
      }]}>
        <Text style={[styles.header, { color: theme.text }]}>⭐ Favorites</Text>
        <Text style={[styles.subHeader, { color: theme.textMuted }]}>
          {favorites.length} saved quote{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Refresh button with animation */}
      <TouchableOpacity 
        onPress={onRefresh} 
        style={[styles.refreshButton, {
          backgroundColor: theme.active,
          shadowColor: theme.mode === 'dark' ? '#000' : theme.active,
        }]}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Ionicons 
            name="refresh" 
            size={20} 
            color="#FFFFFF" 
          />
        </Animated.View>
        <Text style={styles.refreshText}>Refresh Favorites</Text>
      </TouchableOpacity>

      {userFavoritesReversed.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <View style={[styles.emptyIcon, { backgroundColor: `${theme.active}20` }]}>
            <Ionicons 
              name="heart-outline" 
              size={48} 
              color={theme.active} 
            />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            No Favorites Yet
          </Text>
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Tap the ❤️ on any quote to save it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={userFavoritesReversed}
          keyExtractor={(item, index) => `${item.quote}-${index}`}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.active}
              colors={[theme.active]}
              progressBackgroundColor={theme.background}
            />
          }
          renderItem={({ item, index }) => (
            <View style={styles.quoteContainer}>
              {/* Quote number indicator */}
              <View style={[styles.quoteNumber, { 
                backgroundColor: theme.active,
                borderColor: theme.mode === 'dark' ? `${theme.active}80` : `${theme.active}60`
              }]}>
                <Text style={styles.quoteNumberText}>
                  #{userFavoritesReversed.length - index}
                </Text>
              </View>
              
              <QuoteCard
                quote={item.quote}
                author={item.author}
                isFavorite={favorites.some(f => f.quote === item.quote)}
                onToggleFavorite={() => toggleFavorite(item)}
                defaultBgColor={theme.card}
                defaultTextColor={theme.text}
                style={styles.quoteCard}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={() => (
            <View style={styles.listHeader}>
              <Text style={[styles.listHeaderText, { color: theme.textMuted }]}>
                Latest favorites appear first
              </Text>
            </View>
          )}
        />
      )}

      <BannerAdContainer adUnitId={bannerAdUnitId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  header: { 
    fontSize: 28, 
    fontWeight: "700", 
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subHeader: { 
    fontSize: 14, 
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  refreshText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: { 
    fontSize: 22, 
    fontWeight: "700", 
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: { 
    fontSize: 16, 
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },
  quoteContainer: {
    position: 'relative',
    marginHorizontal: 16,
  },
  quoteNumber: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  quoteNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  quoteCard: {
    marginTop: 16,
  },
  listContent: { 
    paddingBottom: 100,
    paddingTop: 10,
  },
  separator: {
    height: 16,
  },
  listHeader: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listHeaderText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});