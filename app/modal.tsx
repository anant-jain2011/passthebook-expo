// import { Button, Platform, StyleSheet } from 'react-native';

// import { ThemedText } from '@/components/themed-text';

// import Constants from 'expo-constants';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { useEffect, useState } from 'react';
// // import { Button } from '@react-navigation/elements';
// import { ThemedView } from '@/components/themed-view';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowBanner: false,
//     shouldShowList: !false,
//   }),
// });

// export default function ModalScreen() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
//   const [notification, setNotification] = useState<Notifications.Notification | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

//     if (Platform.OS === 'android') {
//       Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
//     }
//     const notificationListener = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       notificationListener.remove();
//       responseListener.remove();
//     };
//   }, []);
//   return (
//     <ThemedView style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//       }}>
//       <ThemedText>Your expo push token: {expoPushToken}</ThemedText>
//       <ThemedText>{`Channels: ${JSON.stringify(
//         channels.map(c => c.id),
//         null,
//         2
//       )}`}</ThemedText>
//       <ThemedView style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <ThemedText>Title: {notification && notification.request.content.title} </ThemedText>
//         <ThemedText>Body: {notification && notification.request.content.body}</ThemedText>
//         <ThemedText>Data: {notification && JSON.stringify(notification.request.content.data)}</ThemedText>
//       </ThemedView>
//       <Button
//         title="Press to schedule a notification"
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       />
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
// });


// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Shinzo Wo Sasageyo! 🔰",
//       body: 'Because My Soldiers do not buckle or yield when faced with the cruelty of this world.',
//       data: { data: 'goes here', test: { test1: 'more data' } },
//     },
//     trigger: {
//       type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//       seconds: 1,
//     },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('myNotificationChannel', {
//       name: 'A channel is needed for the permissions prompt to appear',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     // EAS projectId is used here.
//     try {
//       const projectId =
//         Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//       if (!projectId) {
//         throw new Error('Project ID not found');
//       }
//       token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(token);
//     } catch (e) {
//       token = `${e}`;
//     }
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }