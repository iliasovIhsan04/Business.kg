import React from "react";
import TitleBlock from "../ui/TitleBlock";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import MapViewComponent from "../../components/MapViewComponent";

const Description = ({ text, point }) => {
  return (
    <TitleBlock title="Описание">
      <TextContent fontSize={16} fontWeight={400} color={colors.black}>
        {text}
      </TextContent>
      {point && <MapViewComponent coord1={point[1]} coord2={point[0]} />}
    </TitleBlock>
  );
};

export default Description;
