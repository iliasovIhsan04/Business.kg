import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../assets/styles/colors";

const Loading = ({ color }) => {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 300,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color={color ? color : colors.black} />
    </View>
  );
};

export default Loading;
