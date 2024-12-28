import React from "react";
import Between from "../assets/styles/components/Between";
import TextContent from "../assets/styles/components/TextContent";
import { View } from "react-native";
import { colors } from "../assets/styles/colors";
import Range from "../assets/svg/range";
import RangeActive from "../assets/svg/rangeActive";
import Wave from "./Wave";
import Flex from "../assets/styles/components/Flex";

const RangeCustom = ({color, active, text, handle }) => {
  return (
    <Wave handle={handle}>
      <Between center={"center"}>
        <Flex gap={10}>
          {color && <View style={[{
            width: 20,
            height: 20,
            backgroundColor: `#${color}`,
            borderRadius: 50,
          },
          color == 'FFFFFF' && {
            borderWidth: 1,
            borderColor: colors.phon
          }]
          } >
            </View>}
            <TextContent fontSize={16} fontWeight={400} color={colors.black}>
          {text}
        </TextContent>
        </Flex>
       
        <View
          style={{
            width: 24,
            height: 24,
          }}
        >
          {active ? <RangeActive /> : <Range />}
        </View>
      </Between>
    </Wave>
  );
};

export default RangeCustom;
