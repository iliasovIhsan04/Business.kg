import React from "react";
import { Platform, View } from "react-native";
import { colors } from "../colors";

const Container = ({
  phon,
  style,
  head,
  flex,
  top,
  bottom,
  none,
  children,
}) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: !none && 16,
          paddingTop: head ? (Platform.OS === "ios" ? 60 : 42) + top : top,
          paddingBottom: bottom,
          backgroundColor: phon ? colors.phon : colors.white,
        },
        !flex && {
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;
