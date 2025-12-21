import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { HapticTab } from "@/components/haptic-tab";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
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
            <MaterialCommunityIcons name="book-plus" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
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
});
