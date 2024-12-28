import React from "react";
import TextContent from "../../assets/styles/components/TextContent";
import Between from "../../assets/styles/components/Between";
import Flex from "../../assets/styles/components/Flex";
import Wrapper from "../../assets/styles/components/Wrapper";
import { colors } from "../../assets/styles/colors";
import Button from "../../customs/Button";
import { View } from "react-native";
import Column from "../../assets/styles/components/Column";
import Vip from "../../assets/svg/vip.js";
import Eye from "../../assets/svg/eye.js";
import Heart from "../../assets/svg/heartSmall.js";
import Comment from "../../assets/svg/commentSmall.js";
import Slider from "../../components/Slider.jsx";
import { useNavigation } from "@react-navigation/native";

const MainBlock = ({
  mark,
  year,
  title,
  priceUSD,
  miniPriceUSD,
  priceSom,
  miniPriceSom,
  house,
  address,
  time,
  vip,
  addHours,
  eye,
  heart,
  comment,
  img,
  street,
  is_urgent
}) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        backgroundColor: colors.white,
      }}
    >
      <Slider height={200} detail={true} back={true} img={img} is_urgent={is_urgent}/>
      <Wrapper top={true} padding={[16, 0]}>
        <Column gap={16}>
          <TextContent
            top={10}
            fontSize={18}
            fontWeight={500}
            color={colors.black}
          >
           {mark} {title}, {year}
          </TextContent>
          {house ? (
            <View>
              <Flex gap={20}>
                <TextContent
                  fontSize={22}
                  fontWeight={600}
                  color={colors.black}
                >
                  ${priceUSD}
                </TextContent>
                <TextContent fontSize={14} fontWeight={400} color={colors.gray}>
                  {priceSom} сом
                </TextContent>
              </Flex>
              <Flex top={4} gap={20}>
                <TextContent
                  fontSize={16}
                  fontWeight={500}
                  color={colors.black}
                >
                  ${miniPriceUSD}
                </TextContent>
                <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                  {miniPriceSom} сом/м²
                </TextContent>
              </Flex>
            </View>
          ) : (
            <Column gap={2}>
              <Between>
                <TextContent
                  fontSize={22}
                  fontWeight={600}
                  color={colors.black}
                >
                  ${priceUSD}
                </TextContent>
                <Button
                  color={colors.phon}
                  style={{ height: 27, paddingHorizontal: 10 }}
                  textColor={colors.blue}
                  handle={() =>
                    navigation.navigate("CarScreens", { screen: "CarChek" })
                  }
                >
                  Отчет по госномеру
                </Button>
              </Between>
              <TextContent fontSize={14} fontWeight={400} color={colors.black}>
                {priceSom} сом
              </TextContent>
            </Column>
          )}
          <Column gap={10}>
            <Between
              style={{
                alignItems: "flex-end",
              }}
            >
              <Column gap={2}>
                <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                  {address}
                </TextContent>
                {street && (
                  <TextContent
                    fontSize={12}
                    fontWeight={400}
                    color={colors.gray}
                  >
                    {street}
                  </TextContent>
                )}
              </Column>
              <Flex gap={6}>
                <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                  {time}
                </TextContent>
                {vip && (
                  <View
                    style={{
                      width: 16,
                      height: 16,
                    }}
                  >
                    <Vip />
                  </View>
                )}
              </Flex>
            </Between>
            <Between>
              <Flex gap={14}>
                <Flex gap={6}>
                  <Eye />
                  <TextContent
                    fontSize={14}
                    fontWeight={400}
                    color={colors.gray}
                  >
                    {eye}
                  </TextContent>
                </Flex>
                <Flex gap={6}>
                  <Heart />
                  <TextContent
                    fontSize={14}
                    fontWeight={400}
                    color={colors.gray}
                  >
                    {heart}
                  </TextContent>
                </Flex>
                <Flex gap={6}>
                  <Comment />
                  <TextContent
                    fontSize={14}
                    fontWeight={400}
                    color={colors.gray}
                  >
                    {comment}
                  </TextContent>
                </Flex>
              </Flex>
              <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                {addHours}
              </TextContent>
            </Between>
          </Column>
        </Column>
      </Wrapper>
    </View>
  );
};

export default MainBlock;
