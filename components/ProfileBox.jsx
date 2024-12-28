import React from "react";
import Wave from "../customs/Wave";
import Between from "../assets/styles/components/Between";
import Flex from "../assets/styles/components/Flex";
import More from "../assets/svg/more";
import Column from "../assets/styles/components/Column";
import TextContent from "../assets/styles/components/TextContent";
import { colors } from "../assets/styles/colors";
import Star from "../assets/svg/starMini";
import { View } from "react-native";
import ImageCustom from "../customs/Image";

const ProfileBox = ({
  ava,
  name,
  nameColor,
  stars,
  rates,
  reviews,
  reviewsColor,
  description,
  handle,
  gap,
  more,
  none,
}) => {
  if (none) {
    return (
      <Between center={"center"}>
        <Flex
          style={{
            flex: 1,
          }}
          gap={10}
        >
          {ava && (
            <View
              style={{
                width: 60,
                height: 60,
              }}
            >
              <ImageCustom uri={ava} width={60} height={60} borderRadius={50} />
            </View>
          )}
          <Column
            style={{
              flex: 1,
            }}
            gap={gap ? gap : 4}
          >
            <TextContent
              fontSize={16}
              fontWeight={500}
              color={nameColor ? nameColor : colors.black}
            >
              {name}
            </TextContent>
            <Flex gap={15}>
              <Flex gap={4}>
                <Star />
                <TextContent
                  fontSize={14}
                  fontWeight={400}
                  color={colors.black}
                >
                  {rates}
                </TextContent>
              </Flex>
              <TextContent
                fontSize={12}
                fontWeight={400}
                color={reviewsColor ? reviewsColor : colors.gray}
              >
                {reviews} {reviews == 1 ? "отзыв" : "отзывов"}
              </TextContent>
            </Flex>
            {description && (
              <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                {description}
              </TextContent>
            )}
          </Column>
        </Flex>
        {!more && <More />}
      </Between>
    );
  }
  return (
    <Wave handle={handle}>
      <Between center={"center"}>
        <Flex
          style={{
            flex: 1,
          }}
          gap={10}
        >
          {ava && (
            <View
              style={{
                width: 60,
                height: 60,
              }}
            >
              <ImageCustom uri={ava} width={60} height={60} borderRadius={50} />
            </View>
          )}
          <Column
            style={{
              flex: 1,
            }}
            gap={gap ? gap : 4}
          >
            <TextContent
              fontSize={16}
              fontWeight={500}
              color={nameColor ? nameColor : colors.black}
            >
              {name}
            </TextContent>
            <Flex gap={15}>
              <Flex gap={4}>
                <Star />
                <TextContent
                  fontSize={14}
                  fontWeight={400}
                  color={colors.black}
                >
                  {rates}
                </TextContent>
              </Flex>
              <TextContent
                fontSize={12}
                fontWeight={400}
                color={reviewsColor ? reviewsColor : colors.gray}
              >
                {reviews} {reviews == 1 ? "отзыв" : "отзывов"}
              </TextContent>
            </Flex>
            {description && (
              <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                {description}
              </TextContent>
            )}
          </Column>
        </Flex>
        {!more && <More />}
      </Between>
    </Wave>
  );
};

export default ProfileBox;
