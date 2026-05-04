import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(user.imageU);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem("profile");
    if (data) {
      const parsed = JSON.parse(data);
      setName(parsed.name || "");
      setEmail(parsed.email || "");
      setPhone(parsed.phone || "");
      setImage(parsed.image || null);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    const profile = { name, email, phone, image };
    await AsyncStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile updated ✅");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Avatar */}
      <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{ color: "#64748b" }}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Inputs */}
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Enter email"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholder="Enter phone"
          keyboardType="phone-pad"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    color: "#0f172a",
  },

  avatarWrapper: {
    alignSelf: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    gap: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  saveBtn: {
    marginTop: 24,
    backgroundColor: "#0ea5e9",
    paddingVertical: 16,
    borderRadius: 12,
  },

  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
