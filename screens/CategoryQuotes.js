import React, { useState, useEffect, useContext, useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import QuoteCard from "../components/QuoteCard";
import SkeletonLoading from "../components/SkeletonLoading";
// import SearchBar from "../components/SearchBar";
import CategoryHeader from "../components/CategoryHeader";
import { ThemeContext } from "../context/ThemeContext";
import { shuffleByDate } from "../utils/shuffle";
import useFavorites from "../utils/hooks/useFavorites";
import BannerAdContainer from "../components/BannerAdContainer";
import { TestIds } from "react-native-google-mobile-ads";

export default function CategoryQuotes({ route }) {
  const { category } = route.params;
  const { theme } = useContext(ThemeContext);
  const [quotesData, setQuotesData] = useState([]);
  const [categoryQuotes, setCategoryQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [ready, setReady] = useState(false);

  const flatListRef = useRef();
  const { favoriteSet, toggleFavorite } = useFavorites();

  const bannerAdUnitId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-xxxxxxxx~yyyyyyyyyy";

  useEffect(() => {
    const loadQuotes = async () => {
      const data = await import("../assets/quotes.json");
      setQuotesData(data.default);
      setLoadingQuotes(false);
    };
    loadQuotes();
  }, []);

  useEffect(() => {
    if (!loadingQuotes) setReady(true);
  }, [loadingQuotes]);

  useEffect(() => {
    const filtered = quotesData.filter((q) => q.category.includes(category));
    const dailyShuffled = shuffleByDate(filtered);
    setCategoryQuotes(dailyShuffled);
    setFilteredQuotes(dailyShuffled);
  }, [quotesData, category]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const searched = categoryQuotes.filter(
        (q) =>
          q.quote.toLowerCase().includes(searchText.toLowerCase()) ||
          q.author.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredQuotes(searched);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchText, categoryQuotes]);

  // Scroll restoration
  useEffect(() => {
    const restoreScroll = async () => {
      const offsetStr = await AsyncStorage.getItem(`scroll_${category}`);
      const offset = offsetStr ? parseFloat(offsetStr) : 0;
      setTimeout(() => {
        if (flatListRef.current && offset > 0)
          flatListRef.current.scrollToOffset({ offset, animated: false });
      }, 100);
    };
    if (filteredQuotes.length > 0) restoreScroll();
  }, [filteredQuotes]);

  const handleScroll = async (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    await AsyncStorage.setItem(`scroll_${category}`, offsetY.toString());
  };

  const renderItem = ({ item }) => (
    <QuoteCard
      quote={item.quote}
      author={item.author?.split(",")[0].trim().toLowerCase() || ""}
      isFavorite={favoriteSet.has(item.quote)}
      onToggleFavorite={() => toggleFavorite(item)}
    />
  );

  if (!ready) return <SkeletonLoading ready={ready} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CategoryHeader category={category} theme={theme} />
      {/* <SearchBar value={searchText} onChangeText={setSearchText} theme={theme} /> */}
      <FlatList
        ref={flatListRef}
        data={filteredQuotes}
        keyExtractor={(item) => item.quote}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <BannerAdContainer adUnitId={bannerAdUnitId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 10 },
});
