import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { Platform } from "react-native";
import { AuthenticationContext } from "../authentication/authentication.context";
export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const { user, saveNotification, deleteNotification } = useContext(
    AuthenticationContext
  );
  const title = `Hello, ${user?.name} Medication Reminder ⏰`;

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const schedulePushNotification = async (body, time, day) => {
    time = new Date(time);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = days.indexOf(day) + 1;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
      },
      trigger: {
        weekday: weekday,
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });
    console.log("notif id on scheduling", id);
    return id;
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
        lightColor: "#FF231F7C",
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
    }

    return token;
  };

  const cancelNotification = async (notifId) => {
    await deleteNotification(notifId);
    await Notifications.cancelScheduledNotificationAsync(notifId);
  };

  const scheduleNotifcation = async (day, time, name) => {
    try {
      console.log(day, time, name);

      const body = `Please Take Your ${day} Medication of ${name} 💊`;
      const token = await schedulePushNotification(body, time, day);
      await saveNotification({
        day,
        time,
        token,
        name,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        scheduleNotifcation,
        cancelNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
