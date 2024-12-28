import React from "react";
import Between from "../assets/styles/components/Between";
import TextContent from "../assets/styles/components/TextContent";
import { View } from "react-native";
import { colors } from "../assets/styles/colors";
import Check from "../assets/svg/check";
import Wave from "./Wave";

const Check = ({ active, text, handle }) => {
  return (
    <Wave handle={handle}>
      <Between center={"center"}>
        <TextContent fontSize={16} fontWeight={400} color={colors.black}>
          {text}
        </TextContent>
        <View
          style={{
            width: 24,
            height: 24,
          }}
        >
          {active && <Check />}
        </View>
      </Between>
    </Wave>
  );
};

export default Check;
