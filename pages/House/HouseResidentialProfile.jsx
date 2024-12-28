import React from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import ProfileBox from "../../components/ProfileBox";
import { colors } from "../../assets/styles/colors";
import Wrapper from "../../assets/styles/components/Wrapper";
import TextContent from "../../assets/styles/components/TextContent";
import Column from "../../assets/styles/components/Column";
import { useNavigation } from "@react-navigation/native";
import AccountBlock from "../components/AccountBlock";
import { ScrollView, View } from "react-native";
import Slider from "../../components/Slider";
import { useStateHouse } from "../../context/stateHouseContext";
import MapViewComponent from "../../components/MapViewComponent";

const HouseResidentialProfile = () => {
  const { resident } = useStateHouse();
  const navigation = useNavigation();

  const routeTo = () => {
    navigation.navigate("HouseScreens", {
      screen: "HouseCompanyProfile",
    });
  };
  const data = resident.images.map((el) => {
    return { image: el.image_url };
  });
  return (
    <Container none={true} phon={true}>
      <Header back={true} container={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: colors.white,
          }}
        >
          <Slider height={200} img={data} back={true} detail={true} />
        </View>
        <Column gap={6}>
          <Wrapper top={true} padding={[16]}>
            <View
              style={{
                marginTop: 10,
              }}
            >
              <ProfileBox
                none={true}
                gap={10}
                name={resident.complex_name}
                rates="0000"
                reviews="0000"
                reviewsColor={colors.blue}
                more={true}
              />
            </View>
            <TextContent
              top={30}
              fontSize={12}
              fontWeight={400}
              color={colors.gray}
            >
              Об объекте:
            </TextContent>
            <TextContent
              top={6}
              fontSize={16}
              fontWeight={400}
              color={colors.black}
            >
              {resident.about_complex}
            </TextContent>
            <MapViewComponent coord1={resident.lat} coord2={resident.lon} />
          </Wrapper>
          {/* <Characteristic
            data={[
              {
                name: "one",
                value: "two",
              },
              {
                name: "one",
                value: "two",
              },
              {
                name: "one",
                value: "two",
              },
              {
                name: "one",
                value: "two",
              },
              {
                name: "one",
                value: "two",
              },
              {
                name: "one",
                value: "two",
              },
            ]}
            keyOne={"name"}
            keyTwo={"value"}
          /> */}
          <AccountBlock
            title="Компания"
            name="Авангард Стиль"
            nameColor={colors.blue}
            stars={1}
            rates="4.4"
            reviews={1}
            description="ул. Токтогула 125/1, Бизнес Центр «Avangard», Tower A, 2-этаж"
            ava="https://www.perunica.ru/uploads/posts/2019-09/1567597236_021.jpg"
            handle={routeTo}
          />
          <View
            style={{
              // backgroundColor: colors.white,
              paddingBottom: 150,
            }}
          ></View>
        </Column>
      </ScrollView>
    </Container>
  );
};

export default HouseResidentialProfile;
