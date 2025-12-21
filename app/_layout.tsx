import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import { tokenCache } from "@/utils/tokenCache";
import { ClerkProvider } from '@clerk/clerk-expo';
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";

export const unstable_settings = {
  anchor: "(tabs)",
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              presentation: "modal",
              title: "Modal",
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default RootLayout;