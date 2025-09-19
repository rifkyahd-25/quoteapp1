// notificationService.js
import * as Notifications from "expo-notifications";

// Handle foreground notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request permissions
export async function requestNotificationPermission() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === "granted";
}

// Schedule 2 daily notifications
export async function scheduleDailyNotifications() {
  // Cancel any old scheduled notifications (avoid duplicates)
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Morning notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🌞 Morning Quote",
      body: "Start your day with inspiration ✨",
      sound: true,
    },
    trigger: {
      hour: 9, // 9 AM
      minute: 0,
      repeats: true,
    },
  });

  // Night notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🌙 Night Quote",
      body: "End your day with wisdom 🌌",
      sound: true,
    },
    trigger: {
      hour: 21, // 9 PM
      minute: 0,
      repeats: true,
    },
  });
}
