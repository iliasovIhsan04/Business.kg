import React from "react";
import Container from "../../assets/styles/components/Container";
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Between from "../../assets/styles/components/Between";
import Star from "../../assets/svg/star1.js";
import Flex from "../../assets/styles/components/Flex";
import Column from "../../assets/styles/components/Column";
import Slider from "../../components/Slider.jsx";
import TitleBlock from "../ui/TitleBlock.js";
import Wave from "../../customs/Wave.jsx";
import Map from "../../assets/svg/map.js";
import Phone from "../../assets/svg/phone.js";
import World from "../../assets/svg/world.js";
import Mail from "../../assets/svg/mail.js";
import Date from "../../assets/svg/date.js";
import { ResizeMode, Video } from "expo-av";
import HouseCard from "../ui/HouseCard.js";
import ButtonLayouts from "../../layouts/buttonLayouts.js";
import MapViewComponent from "../../components/MapViewComponent.jsx";

const profile = [
  {
    id: 1,
    image: require("../../assets/images/car.png"),
    name: "Chery РОЛЬФ Магистральный",
    star: "4.8",
    recal: "23",
    img: [
      {
        id: 1,
        image:
          "https://cdn.prod.website-files.com/63a02e61e7ffb565c30bcfc7/65fa5e6535ec537dc53bd0d1_modern%20house%20ideas.webp",
      },
      {
        id: 2,
        image:
          "https://jennian-homes.b-cdn.net/assets/Uploads/ListingPages/Chianti-Modified-2_4-Bedroom-Home-Front-Facade_Jennian-Homes__FillMaxWzkwMCw2MDBd.jpg?auto=format",
      },
      {
        id: 3,
        image:
          "https://img.etimg.com/thumb/width-420,height-315,imgsize-22382,resizemode-75,msid-111780228/news/international/world-news/india-has-the-worlds-second-most-expensive-house-check-the-of-the-top-10-costliest-homes/which-mansion-tops-the-list-of-the-worlds-most-expensive-houses.jpg",
      },
    ],
  },
];

const data = [
  {
    img: "https://cdn.houseplansservices.com/product/f2m9lok2vgeu0fc9bs7d7s14vk/w560x373.jpg?v=4",
  },
  {
    img: "https://cdn.shopify.com/s/files/1/2829/0660/files/EXFR-I64A4616_1600x.jpg?v=1724438493",
  },
  {
    img: "https://static.vecteezy.com/system/resources/thumbnails/023/308/330/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg",
  },
];

const HouseCompanyProfile = () => {
  const { img, image } = profile[0];

  return (
    <ButtonLayouts>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%", flex: 1 }}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <Container none={true} phon={true}>
            <Slider img={img} />
            <Column gap={6}>
              <View style={styles.block}>
                <Between style={styles.profileContent} gap={0}>
                  <Flex
                    gap={10}
                    style={{ width: "70%", alignItems: "flex-start" }}
                  >
                    <Image source={image} style={styles.profileImage} />
                    <Column style={styles.profileDetails} gap={10}>
                      <TextContent
                        fontSize={20}
                        fontWeight={500}
                        color={colors.black}
                      >
                        Авангард Стиль
                      </TextContent>
                      <Flex style={styles.rating} gap={5}>
                        <Star />
                        <TextContent
                          fontSize={14}
                          fontWeight={400}
                          color={colors.black}
                        >
                          4.8
                        </TextContent>
                        <TextContent
                          left={15}
                          fontSize={12}
                          fontWeight={400}
                          color={colors.blue}
                        >
                          2 отзывов
                        </TextContent>
                      </Flex>
                    </Column>
                  </Flex>
                </Between>
                <TextContent
                  top={20}
                  fontSize={12}
                  fontWeight={400}
                  color={colors.gray}
                >
                  О компании:
                </TextContent>
                <TextContent
                  fontSize={16}
                  fontWeight={400}
                  color={colors.black}
                  top={6}
                  style={{ lineHeight: 19 }}
                >
                  Строительная компания «Авангард Cтиль» – лидер строительного
                  рынка. Мы строим жилые многоэтажные дома, коммерческие
                  объекты, объекты культурного и социального назначения, мосты,
                  дороги, тоннели, промышленные объекты, делаем реконструкцию
                  зданий и сооружений.
                </TextContent>
                <MapViewComponent coord1={"42.871881"} coord2={"74.576332"} />
              </View>
              <TitleBlock title={"Контакты"}>
                <Wave>
                  <Flex gap={10}>
                    <Map />
                    <TextContent
                      flex={16}
                      fontWeight={400}
                      color={colors.black}
                    >
                      ул. Токтогула 125/1, Бизнес Центр «Avangard», Tower A,
                      2-этаж
                    </TextContent>
                  </Flex>
                </Wave>
                <Wave>
                  <Flex gap={10}>
                    <Phone />
                    <TextContent
                      style={{
                        textDecorationLine: "underline",
                      }}
                      flex={16}
                      fontWeight={400}
                      color={colors.blue}
                    >
                      +996 (502) 80-02-02
                    </TextContent>
                  </Flex>
                </Wave>
                <Wave>
                  <Flex gap={10}>
                    <World />
                    <TextContent
                      style={{
                        textDecorationLine: "underline",
                      }}
                      flex={16}
                      fontWeight={400}
                      color={colors.blue}
                    >
                      avangardstyle.kg
                    </TextContent>
                  </Flex>
                </Wave>
                <Wave>
                  <Flex gap={10}>
                    <Mail />
                    <TextContent
                      flex={16}
                      fontWeight={400}
                      color={colors.black}
                    >
                      sales@avangardstyle.kg
                    </TextContent>
                  </Flex>
                </Wave>
                <Wave>
                  <Flex gap={10}>
                    <Date />
                    <TextContent flex={16} fontWeight={400}>
                      1998
                    </TextContent>
                  </Flex>
                </Wave>
              </TitleBlock>
              <TitleBlock title={"Видео"}>
                <Video
                  style={styles.video}
                  source={{
                    uri: "https://videocdn.cdnpk.net/joy/content/video/free/2012-10/large_preview/hd1944.mp4?token=exp=1730469390~hmac=ceb3074319bcf633d06ceea263ca84b2f7a8abd01c517e436ff5c6e04787d54e",
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onError={(e) =>
                    console.log(`Error loading video ${index}`, e)
                  }
                />
              </TitleBlock>
              <HouseCard
                business={true}
                construction={true}
                floors={true}
                title="Объекты компании"
                img={data[0].img}
              />
              {data.map((el, id) => (
                <HouseCard
                  business={true}
                  construction={true}
                  floors={true}
                  img={el.img}
                />
              ))}
            </Column>
          </Container>
          <View
            style={{
              height: 100,
              backgroundColor: colors.phon,
            }}
          />
        </ScrollView>
      </View>
    </ButtonLayouts>
  );
};

const styles = StyleSheet.create({
  btn_car_profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer_bis_profile: {
    width: "100%",
    position: "relative",
    bottom: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
    borderTopWidth: 1,
    borderTopColor: colors.phon,
  },
  card_private_profile: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  profileContent: {
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profileDetails: {
    paddingVertical: 4.5,
  },
  rating: {
    alignItems: "center",
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  privateButton: {
    height: 27,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  block: {
    marginTop: -20,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingBottom: 16,
  },
  header: {
    backgroundColor: colors.blue,
    borderBottomWidth: 0,
  },
  list: {
    top: 10,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#000",
  },
});

export default HouseCompanyProfile;
