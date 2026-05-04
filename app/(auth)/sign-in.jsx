import SocialAuth from "@/components/SocialAuth";
import { useSignIn } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Example: Requesting permissions and getting token


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.title}>Sign In to PassTheBook</Text>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <SocialAuth />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            keyboardType="email-address"
            autoComplete="email"
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            autoComplete="password"
          />

          <TouchableOpacity style={styles.button} onPress={onSignInPress} disabled={!emailAddress || !password}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/sign-up')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    height: 250,
    width: 250,
    marginInline: "auto",
    borderRadius: 250,
    borderWidth: 2,
    borderColor: "#eee",
    marginBottom: 30,
    // marginTop: -20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  link: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
});
