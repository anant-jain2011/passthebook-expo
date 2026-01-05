import { HapticTab } from "@/components/haptic-tab";
import PersistentButton from "@/components/PersistentButton";
import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Redirect, Tabs, usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const router = useRouter();
  const path = usePathname();
  const { isLoaded } = useAuth();
  const insets = useSafeAreaInsets();

  if (!isLoaded) return null;

  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0ea5e9",
          tabBarInactiveTintColor: "#9ca3af",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: [
            styles.tabBar,
            {
              paddingBottom: insets.bottom + 8,
              height: 70 + insets.bottom,
            },
          ],
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIconStyle: styles.tabBarIcon,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Octicons size={24} name="home-fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="find-books"
          options={{
            title: "Find Books",
            tabBarIcon: ({ color }) => (
              <Feather size={24} name="search" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add-books"
          options={{
            title: "Add Books",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="book-plus"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chats-screen"
          options={{
            href: null,
          }}
        />
      </Tabs>

      {/* @ts-ignore */}
      <PersistentButton
        onPress={() => router.push("/chats-screen")}
        style={{ opacity: path !== "/chats-screen" ? 1 : 0 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  tabBarIcon: {
    marginBottom: 4,
  },
  chatButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0ea5e9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
});
