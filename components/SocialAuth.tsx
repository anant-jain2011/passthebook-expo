import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Pressable, Text } from 'react-native';

GoogleSignin.configure({
  accountName: 'PassTheBook',
  webClientId: '465858492602-vl904al4a4ja0c8istuau9vn4i7qhco9.apps.googleusercontent.com',
  offlineAccess: true,
});

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();

    console.log('USER:', userInfo);
    console.log('ID TOKEN:', userInfo.data?.idToken);
  } catch (error) {
    console.log(error);
  }
};

export default function SocialAuth() {
  return (
    <Pressable
      onPress={signIn}
    >
      <Text>Sign in with Google</Text>
    </Pressable>
  );
}

// const [request, response, promptAsync] = Google.useAuthRequest({
//   responseType: 'id_token',
//   scopes: ["openid", "profile", "email"],
//   webClientId: "465858492602-vl904al4a4ja0c8istuau9vn4i7qhco9.apps.googleusercontent.com",
//   androidClientId: "465858492602-kj0v3eg5c8d0hj53skodp293mqngjfv0.apps.googleusercontent.com",
// });