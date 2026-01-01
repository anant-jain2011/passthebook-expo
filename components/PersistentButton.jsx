// components/PersistentButton.js
import React from 'react';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PersistentButton = ({ onPress, style }) => {
  const [fontsLoaded] = useFonts({
    'Ionicons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });

  return (
    fontsLoaded && (
      <SafeAreaView style={{...styles.container, ...style}}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <MaterialCommunityIcons name="robot-happy" size={28} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transitionDuration: '200ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-in-out',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersistentButton;
