import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const favoriteSet = new Set(favorites.map((q) => q.quote));

  // Load favorites once on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const fav = JSON.parse(await AsyncStorage.getItem("favorites")) || [];
        setFavorites(fav);
      } catch (e) {
        console.error("Failed to load favorites:", e);
        setFavorites([]);
      }
    };
    loadFavorites();
  }, []);

  // Toggle favorite with useCallback for stable reference
  const toggleFavorite = useCallback(async (quote) => {
    try {
      let updated;
      if (favoriteSet.has(quote.quote)) {
        updated = favorites.filter((q) => q.quote !== quote.quote);
      } else {
        updated = [...favorites, quote];
      }
      setFavorites(updated);
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to toggle favorite:", e);
    }
  }, [favorites, favoriteSet]);

  return { favorites, toggleFavorite, favoriteSet };
}
