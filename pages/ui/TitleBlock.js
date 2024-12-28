import React from "react";
import Wrapper from "../../assets/styles/components/Wrapper";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Column from "../../assets/styles/components/Column";
import Between from "../../assets/styles/components/Between";
import Wave from "../../customs/Wave";
import Clode from "../../assets/svg/clode";

const TitleBlock = ({ title, handle, closee, children }) => {
  return (
    <Wrapper padding={[16, 16]}>
      <Column gap={16}>
        <Between center={"center"}>
          <TextContent fontSize={20} fontWeight={600} color={colors.black}>
            {title}
          </TextContent>
          {closee && (
            <Wave handle={handle}>
              <Clode />
            </Wave>
          )}
        </Between>
        {children}
      </Column>
    </Wrapper>
  );
};

export default TitleBlock;
