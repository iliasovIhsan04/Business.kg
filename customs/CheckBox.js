import React from "react";
import Between from "../assets/styles/components/Between";
import TextContent from "../assets/styles/components/TextContent";
import { View } from "react-native";
import { colors } from "../assets/styles/colors";
import CheckBox from "../assets/svg/checkBox";
import CheckBoxActive from "../assets/svg/checkBoxActive";
import Wave from "./Wave";

const CheckBoxCustom = ({ active, text, handle }) => {
  return (
    <Wave handle={handle}>
      <Between
        style={{
          height: 40,
        }}
        center={"center"}
      >
        <TextContent fontSize={16} fontWeight={400} color={colors.black}>
          {text}
        </TextContent>
        <View
          style={{
            width: 24,
            height: 24,
          }}
        >
          {active ? <CheckBoxActive /> : <CheckBox />}
        </View>
      </Between>
    </Wave>
  );
};

export default CheckBoxCustom;
