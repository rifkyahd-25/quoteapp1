import React from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import {
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
} from "react-native-google-mobile-ads";
import useNetworkStatus from "../utils/hooks/useNetworkStatus";

export default function NativeAdBlock({ ad, theme }) {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return (
      <View style={[styles.container, styles.fallback]}>
        <Text style={[styles.text, { color: theme?.textMuted || "#999" }]}>
          No internet connection
        </Text>
      </View>
    );
  }

  if (!ad) {
    return (
      <View style={[styles.container, styles.fallback]}>
        <ActivityIndicator size="small" color={theme?.textMuted || "#999"} />
        <Text style={[styles.text, { color: theme?.textMuted || "#999" }]}>
          Loading ad...
        </Text>
      </View>
    );
  }

  return (
    <NativeAdView nativeAd={ad} style={styles.container}>
      {ad.icon && (
        <NativeAsset assetType={NativeAssetType.ICON}>
          <Image source={{ uri: ad.icon.url }} style={styles.icon} />
        </NativeAsset>
      )}

      <NativeAsset assetType={NativeAssetType.HEADLINE}>
        <Text style={styles.headline}>{ad.headline}</Text>
      </NativeAsset>

      <Text style={styles.sponsored}>Sponsored</Text>

      <NativeMediaView resizeMode="contain" style={styles.media} />

      {ad.cta && (
        <NativeAsset assetType={NativeAssetType.CTA}>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>{ad.cta}</Text>
          </View>
        </NativeAsset>
      )}
    </NativeAdView>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 6,
    fontSize: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  media: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  cta: {
    marginTop: 8,
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 6,
  },
  ctaText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  sponsored: {
    fontSize: 10,
    color: "#aaa",
    marginBottom: 4,
    marginTop: 4,
  },
  headline: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
});
