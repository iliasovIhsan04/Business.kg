import React from "react";
import Wave from "../../../customs/Wave";
import TextContent from "../../../assets/styles/components/TextContent";
import { View } from "react-native";
import Category from "../svg/category";
import { colors } from "../../../assets/styles/colors";
import { useNavigation } from "@react-navigation/native";

const InputCate = ({ text, navLink, link, color, param }) => {
  const navigation = useNavigation();

  return (
    <Wave
      handle={() => {
        if (param) {
          navigation.navigate(navLink, {
            screen: link,
            params: { id: 1 },
          });
        } else {
          navigation.navigate(navLink, {
            screen: link,
          });
        }
      }}
    >
      <View
        style={{
          width: "100%",
          height: 55,
          borderRadius: 10,
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: color ? color : colors.white,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextContent
          numberOfLines={1}
          style={{
            flex: 1,
          }}
        >
          {text}
        </TextContent>
        <View
          style={{
            width: 1,
            marginHorizontal: 16,
            height: "100%",
            borderRadius: 1,
            backgroundColor: "#D0D0D0",
          }}
        />
        <Category />
      </View>
    </Wave>
  );
};

export default InputCate;
