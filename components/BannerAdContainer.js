// // components/BannerAdContainer.js
// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

// export default function BannerAdContainer({ adUnitId }) {
//   return (
//     <View style={styles.adContainer}>
//       <BannerAd
//         unitId={adUnitId}
//         size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//         requestOptions={{ requestNonPersonalizedAdsOnly: true }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   adContainer: {
//     marginTop: 10,
//   },
// });



// components/BannerAdContainer.js
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import useNetworkStatus from "../utils/hooks/useNetworkStatus";

export default function BannerAdContainer({ adUnitId }) {
  const isOnline = useNetworkStatus();

  return (
    <View style={styles.adContainer}>
      {isOnline ? (
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      ) : (
        <ActivityIndicator size="small" color="#888" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});