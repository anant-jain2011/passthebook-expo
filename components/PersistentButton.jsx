// components/PersistentButton.js
import React from "react";
import { useFonts } from "expo-font";
import { Path, Svg } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, StyleSheet } from "react-native";

const PersistentButton = ({ onPress, style }) => {
  const [fontsLoaded] = useFonts({
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });

  return (
    fontsLoaded && (
      <SafeAreaView style={{ ...styles.container, ...style }}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Svg
            stroke="transparent"
            fill="#fff"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="28px"
            width="28px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path d="M17 2H13V1H11V2H7C5.34315 2 4 3.34315 4 5V8C4 10.7614 6.23858 13 9 13H15C17.7614 13 20 10.7614 20 8V5C20 3.34315 18.6569 2 17 2ZM11 7.5C11 8.32843 10.3284 9 9.5 9C8.67157 9 8 8.32843 8 7.5C8 6.67157 8.67157 6 9.5 6C10.3284 6 11 6.67157 11 7.5ZM16 7.5C16 8.32843 15.3284 9 14.5 9C13.6716 9 13 8.32843 13 7.5C13 6.67157 13.6716 6 14.5 6C15.3284 6 16 6.67157 16 7.5ZM4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4Z"></Path>
          </Svg>
        </TouchableOpacity>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease-in-out",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PersistentButton;
