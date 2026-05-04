import { HapticTab } from "@/components/haptic-tab";
import PersistentButton from "@/components/PersistentButton";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Redirect, Tabs, usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ---------------- Notifications ----------------
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  if (!Device.isDevice) {
    handleRegistrationError("Use physical device");
    return;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    handleRegistrationError("Permission not granted");
    return;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  if (!projectId) {
    handleRegistrationError("Project ID not found");
  }

  const token = (
    await Notifications.getExpoPushTokenAsync({ projectId })
  ).data;

  return token;
}

// ---------------- Main ----------------
export default function TabLayout() {
  const router = useRouter();
  const path = usePathname();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(
        async (token) =>
          await fetch("https://ptb-backend.vercel.app/add-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              userId: user?.id,
            }),
          })
      )
      .catch((err) => console.log(err));

    (async () => {
      const cart = await AsyncStorage.getItem("cart");
      if (!cart) {
        await AsyncStorage.setItem("cart", JSON.stringify([]));
      }
    })();
  }, []);

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0ea5e9",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarButton: HapticTab,
          tabBarStyle: [
            styles.tabBar,
            {
              height: 70 + insets.bottom,
              paddingBottom: insets.bottom + 8,
            },
          ],
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIconStyle: styles.tabBarIcon,
        }}
      >
        {/* Home */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Octicons name="home-fill" size={24} color={color} />
            ),
          }}
        />

        {/* Search */}
        <Tabs.Screen
          name="find-books"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <Feather name="search" size={24} color={color} />
            ),
          }}
        />

        {/* 🔥 SELL BUTTON */}
        <Tabs.Screen
          name="add-books"
          options={{
            title: "",
            tabBarLabel: () => null,
            tabBarIcon: () => (
              <Pressable
                onPress={() => router.push("/add-books")}
                style={({ pressed }) => [
                  styles.sellButton,
                  { transform: [{ scale: pressed ? 0.9 : 1 }] },
                ]}
              >
                <Feather name="plus" size={28} color="#fff" />
              </Pressable>
            ),
          }}
        />

        {/* Cart */}
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="shopping-cart" size={22} color={color} />
            ),
          }}
        />

        {/* Profile */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={22} color={color} />
            ),
          }}
        />

        {/* Hidden routes */}
        <Tabs.Screen name="chats-screen" options={{ href: null }} />
        <Tabs.Screen name="notifications" options={{ href: null }} />
        <Tabs.Screen name="profile-ext" options={{ href: null }} />
        <Tabs.Screen name="chat-page" options={{ href: null }} />
        <Tabs.Screen name="checkout" options={{ href: null }} />
        <Tabs.Screen name="wishlist" options={{ href: null }} />
      </Tabs>

      <PersistentButton
        onPress={() => router.push("/chats-screen")}
        style={
          ["/chats-screen", "/cart", "/checkout"].includes(path)
            ? { display: "none" }
            : undefined
        }
      />
    </>
  );
}

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 0,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
  },

  tabBarLabel: {
    fontSize: 11.5,
    fontWeight: "600",
    marginTop: 2,
  },

  tabBarIcon: {
    marginBottom: 2,
  },

  // 🔥 Center Sell Button
  sellButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0ea5e9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -28,
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
});