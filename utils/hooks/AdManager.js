// // AdManager.js
// import { InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";

// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : "ca-app-pub-xxxx/yyyy";

// // Singleton interstitial instance
// let interstitial = InterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
// });

// let adLoaded = false;
// let isCooldown = false;

// interstitial.addAdEventListener(AdEventType.LOADED, () => {
//   adLoaded = true;
// });

// interstitial.addAdEventListener(AdEventType.CLOSED, () => {
//   adLoaded = false;
//   interstitial.load(); // preload for next use
//   // start 30s cooldown after ad watched
//   isCooldown = true;
//   setTimeout(() => {
//     isCooldown = false;
//   }, 30000);
// });

// // load first ad
// interstitial.load();

// export const showAdIfAvailable = (onFinish) => {
//   if (isCooldown) {
//     // 🚫 Ads in cooldown → skip directly
//     onFinish();
//     return;
//   }

//   if (adLoaded) {
//     interstitial.show();
//     interstitial.addAdEventListener(AdEventType.CLOSED, onFinish);
//   } else {
//     // 🚫 Ad not ready → skip
//     onFinish();
//   }
// };
// AdManager.js
import { InterstitialAd, AdEventType, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : "ca-app-pub-2598026458310292/1060190011";

let interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

let adLoaded = false;
let isCooldown = false;

// Queue callbacks when ad is shown
let adCallbackQueue = [];

interstitial.addAdEventListener(AdEventType.LOADED, () => {
  adLoaded = true;
});

interstitial.addAdEventListener(AdEventType.CLOSED, () => {
  adLoaded = false;
  interstitial.load(); // preload next ad
  // start 30s cooldown
  isCooldown = true;
  setTimeout(() => {
    isCooldown = false;
  }, 20000);

  // Call all queued callbacks once safely
  adCallbackQueue.forEach((cb) => cb());
  adCallbackQueue = [];
});

interstitial.load();

export const showAdIfAvailable = (onFinish) => {
  if (isCooldown || !adLoaded) {
    // Skip ad if cooldown or not loaded
    onFinish();
    return;
  }

  // Queue the callback
  adCallbackQueue.push(onFinish);

  try {
    interstitial.show();
  } catch (err) {
    console.log("Ad show error:", err);
    // fallback: call callback immediately
    adCallbackQueue.forEach((cb) => cb());
    adCallbackQueue = [];
  }
};
