import { useSSO } from '@clerk/clerk-expo';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import '../assets/images/g-logo.png';

WebBrowser.maybeCompleteAuthSession();

export default function SocialAuth() {
  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: 'passthebookexpo',
          path: 'oauth-native-callback',
        }),
      });

      console.log('Created session ID:', createdSessionId);

      createdSessionId && setActive({ session: createdSessionId });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View style={{ width: "100%", paddingHorizontal: 16 }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginBottom: 20
        }}>
        <Image
          source={require('../assets/images/g-logo.png')}
          style={{ width: 30, height: 30, marginRight: 12 }}
        />
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
          Sign In with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}
