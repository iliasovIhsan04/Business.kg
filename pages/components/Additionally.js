import React, { useState } from "react";
import TitleBlock from "../ui/TitleBlock";
import Between from "../../assets/styles/components/Between";
import Flex from "../../assets/styles/components/Flex";
import TextContent from "../../assets/styles/components/TextContent";
import More from "../../assets/svg/more";
import { colors } from "../../assets/styles/colors";
import { View } from "react-native";
import ModalDown from "../../ui/ModalDown";
import Wave from "../../customs/Wave";

const Additionally = ({ title, data }) => {
  const [modal, setModal] = useState(false);
  const [select, setSelect] = useState([]);

  const openSelect = (arg) => {
    setSelect(arg);
    setModal(true);
  };

  return (
    <View>
      <TitleBlock title={title}>
        {data?.map((el, id) => (
          <Wave handle={() => openSelect(el.data)} key={id}>
            <Between center={"center"}>
              <TextContent fontSize={16} fontWeight={500} color={colors.black}>
                {el.name}
              </TextContent>
              <Flex>
                <TextContent fontSize={16} fontWeight={400} color={colors.gray}>
                  {/* {el.data.length} */}
                </TextContent>
                <More />
              </Flex>
            </Between>
          </Wave>
        ))}
      </TitleBlock>
      <ModalDown paddingNone={true} modal={modal} setModal={setModal}>
        <TitleBlock title={title} closee={true} handle={() => setModal(false)}>
          {select.map((el, id) => (
            <Flex key={id} gap={10}>
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 10,
                  backgroundColor: colors.black,
                }}
              />
              <TextContent fontSize={14} fontWeight={400} color={colors.black}>
                {el.text}
              </TextContent>
            </Flex>
          ))}
        </TitleBlock>
      </ModalDown>
    </View>
  );
};

export default Additionally;
