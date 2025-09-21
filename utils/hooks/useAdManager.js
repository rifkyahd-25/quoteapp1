import { useRef, useEffect, useState } from "react";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";

export default function useAdManager(unitId) {
  const interstitial = useRef(
    InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
    })
  ).current;

  const [favoriteClicks, setFavoriteClicks] = useState(0);

  // Store the timestamp of the last ad shown
  const lastAdTimeRef = useRef(0);

  useEffect(() => {
    const listener = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      interstitial.load();
    });
    interstitial.load();
    return () => listener();
  }, []);

  const maybeShowAd = (setter, count) => {
    const now = Date.now();
    const elapsed = now - lastAdTimeRef.current;

    const newCount = count + 1;
    setter(newCount);

    // Show ad only if:
    // 1. Click count >= 4
    // 2. Interstitial loaded
    // 3. Optional 40-second cooldown (uncomment if needed)
    if (newCount >= 4 && interstitial.loaded && elapsed > 40000) {
      interstitial.show();
      setter(0); // reset click count
      lastAdTimeRef.current = now; // update last ad timestamp
    }
  };

  return {
    interstitial,
   
    favoriteClicks,
   
    setFavoriteClicks,
    maybeShowAd,
  };
}
