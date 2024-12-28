import React from "react";
import { View } from "react-native";
import { colors } from "../colors";

const Wrapper = ({ style, padding, top, bottom, children }) => {
  return (
    <View
      style={[
        {
          width: "100%",
          minHeight: 20,
          backgroundColor: colors.white,
          paddingHorizontal: 16,
          paddingBottom: padding?.length >= 1 ? padding[0] : 0,
          paddingTop: padding?.length == 2 ? padding[1] : 0,
          borderTopLeftRadius: top ? 0 : 14,
          borderTopRightRadius: top ? 0 : 14,
          borderBottomLeftRadius: bottom ? 0 : 14,
          borderBottomRightRadius: bottom ? 0 : 14,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Wrapper;
