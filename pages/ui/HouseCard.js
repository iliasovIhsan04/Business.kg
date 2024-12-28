import React from "react";
import Wrapper from "../../assets/styles/components/Wrapper";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Column from "../../assets/styles/components/Column";
import { View } from "react-native";
import ImageCustom from "../../customs/Image";
import Wave from "../../customs/Wave";
import { useNavigation } from "@react-navigation/native";

const HouseCard = ({ construction, business, floors, title, img }) => {
  const navigation = useNavigation();

  return (
    <Wave handle={() => navigation.navigate("HouseScreens", {
      screen: "HouseResidentialProfile"
    })}>
      <Wrapper padding={[16, 16]}>
        <Column gap={10}>
          {title && (
            <TextContent fontSize={20} fontWeight={600} color={colors.black}>
              {title}
            </TextContent>
          )}
          <View
            style={[
              {
                position: "relative",
              },
              title && {
                marginTop: 6,
              },
            ]}
          >
            <ImageCustom
              uri={img}
              width={"100%"}
              height={200}
              borderRadius={10}
            />
            {construction && (
              <View
                style={{
                  top: 6,
                  left: 6,
                  position: "absolute",
                  borderRadius: 4,
                  backgroundColor: colors.green,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                }}
              >
                <TextContent
                  style={{
                    textTransform: "uppercase",
                  }}
                  fontSize={10}
                  fontWeight={600}
                  color={colors.white}
                >
                  строится
                </TextContent>
              </View>
            )}
            <View
              style={{
                left: 6,
                bottom: 6,
                position: "absolute",
                flexDirection: "row",
                gap: 6,
              }}
            >
              {business && (
                <View
                  style={{
                    borderRadius: 4,
                    backgroundColor: colors.blue,
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                  }}
                >
                  <TextContent
                    fontSize={10}
                    fontWeight={600}
                    color={colors.white}
                  >
                    Бизнес-класс
                  </TextContent>
                </View>
              )}
              {floors && (
                <View
                  style={{
                    borderRadius: 4,
                    backgroundColor: "#1E1E1E99",
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                  }}
                >
                  <TextContent
                    fontSize={10}
                    fontWeight={600}
                    color={colors.white}
                  >
                    22 этажей
                  </TextContent>
                </View>
              )}
            </View>
          </View>
          <View>
            <TextContent fontSize={18} fontWeight={500} color={colors.black}>
              ЖК «Москва»
            </TextContent>
            <TextContent
              top={6}
              fontSize={12}
              fontWeight={400}
              color={colors.gray}
            >
              Бишкек, пр. Манаса/ул.Рыскулова
            </TextContent>
          </View>
        </Column>
      </Wrapper>
    </Wave>
  );
};

export default HouseCard;
