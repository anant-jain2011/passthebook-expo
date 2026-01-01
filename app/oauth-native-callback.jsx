import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OAuthCallback() {
  return (
    <SafeAreaView>
      <SignedIn>
        <Redirect href="/" />
      </SignedIn>

      <SignedOut>
        <View style={{ height: "100%", justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ActivityIndicator size={70} color="#0099ffff" />
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>Signing you in.....</Text>
        </View>
      </SignedOut>
    </SafeAreaView>
  );
}
