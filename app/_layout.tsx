import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { PaperProvider } from 'react-native-paper';

export const unstable_settings = {
  anchor: "(tabs)",
};

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey="pk_test_Y3VyaW91cy1wb3Jwb2lzZS0zMi5jbGVyay5hY2NvdW50cy5kZXYk"
      tokenCache={tokenCache}
    >
      <PaperProvider>
        <ThemeProvider value={DefaultTheme}>
          <SignedIn>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="oauth-native-callback" options={{ headerShown: false }} />
              <Stack.Screen name="items/[id]" options={{ headerShown: false }} />
            </Stack>
          </SignedIn>

          <SignedOut>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="oauth-native-callback" options={{ headerShown: false }} />
              <Stack.Screen name="items/[id]" options={{ headerShown: false }} />
            </Stack>
          </SignedOut>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </ClerkProvider>
  );
};

export default RootLayout;