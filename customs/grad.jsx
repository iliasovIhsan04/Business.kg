import React from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = ({ children }) => {
  return (
    <LinearGradient
      colors={["#267CFD", "#FF78F1"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.button}
    >
      <Text style={styles.text}>{children}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default GradientButton;
