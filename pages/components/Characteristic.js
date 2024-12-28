import React, { useState, useRef } from "react";
import { Animated, Easing } from "react-native";
import TitleBlock from "../ui/TitleBlock";
import Between from "../../assets/styles/components/Between";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Button from "../../customs/Button";

const Characteristic = ({ data, keyOne, keyTwo }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const handleToggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const displayedData = expanded ? data : data.slice(0, 4);

  const maxHeight = data.length * 40;
  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [4 * 40, maxHeight],
  });

  return (
    <TitleBlock title="Характеристика">
      <Animated.View
        style={{
          flexDirection: "column",
          gap: 16,
          maxHeight: animatedHeight,
          overflow: "hidden",
        }}
      >
        {displayedData.map((el, id) => (
          <Between center={"center"} key={id}>
            <TextContent fontSize={14} fontWeight={400} color={colors.gray}>
              {el[keyOne]}
            </TextContent>
            <TextContent fontSize={14} fontWeight={400} color={colors.black}>
              {el[keyTwo]}
            </TextContent>
          </Between>
        ))}
      </Animated.View>
      {data.length > 4 && (
        <Button
          handle={handleToggleExpand}
          color={colors.phon}
          textColor={colors.black}
        >
          {expanded ? "Скрыть" : "Читать дальше"}
        </Button>
      )}
    </TitleBlock>
  );
};

export default Characteristic;
