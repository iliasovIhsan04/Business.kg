import React, { useEffect, useState } from "react";
import Container from "../../assets/styles/components/Container";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Card from "../../customs/Card";
import Between from "../../assets/styles/components/Between";
import Star from "../../assets/svg/star1.js";
import Flex from "../../assets/styles/components/Flex";
import Column from "../../assets/styles/components/Column";
import Button from "../../customs/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import Slider from "../../components/Slider.jsx";
import ButtonLayouts from "../../layouts/buttonLayouts.js";
import { url } from "../../api/api.jsx";
const containerWidth = (Dimensions.get("window").width - 32) / 2 - 5;

const HouseCompaniesDetail = ({car}) => {
  const route = useRoute();
  const { id, complex_id } = route.params;
  const [businessId, setBusinessId] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleFunction = () => {
    if (car) {
      navigation.navigate("CarScreens", {
        screen: "CarDetail",
      });
    } else {
      navigation.navigate("HouseScreens", {
        screen: "HouseDetail",
      });
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await url.get(`main/dealer/${id}`);
      console.log(response.data);
      setBusinessId(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  
  return (
    <ButtonLayouts>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: "100%", flex: 1 }}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <Container none={true}>
            <Slider
              img={
                Array.isArray(businessId?.dealer_images) &&
                businessId?.dealer_images.length > 0
                  ? businessId?.dealer_images.map((image) => ({
                      image: image.image,
                    }))
                  : [0]
              }
            />
            <View style={styles.block}>
              <Between style={styles.profileContent} gap={0}>
                <Flex
                  gap={10}
                  style={{ width: "70%", alignItems: "flex-start" }}
                >
                  <Image
                    source={{ uri: businessId.logo_path }}
                    style={styles.profileImage}
                  />
                  <Column style={styles.profileDetails} gap={10}>
                    <TextContent
                      fontSize={20}
                      fontWeight={500}
                      color={colors.black}
                    >
                      {businessId?.name}
                    </TextContent>
                    <Flex style={styles.rating} gap={5}>
                      <Star />
                      <TextContent
                        fontSize={14}
                        fontWeight={400}
                        color={colors.black}
                      >
                        {businessId?.avarage_rating}
                      </TextContent>
                      <TextContent
                        left={15}
                        fontSize={12}
                        fontWeight={400}
                        color={colors.blue}
                      >
                        {businessId?.review_count} отзывов
                      </TextContent>
                    </Flex>
                  </Column>
                </Flex>
                <Button
                  color={colors.phon}
                  style={styles.privateButton}
                  textColor={colors.blue}
                  fontSize={12}
                >
                  Автобизнес
                </Button>
              </Between>
              <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                О компании:
              </TextContent>
              <TextContent
                fontSize={16}
                fontWeight={400}
                color={colors.black}
                top={6}
                style={{ lineHeight: 19 }}
              >
                {businessId?.description}
              </TextContent>
              <TextContent
                fontSize={20}
                fontWeight={600}
                color={colors.black}
                top={30}
              >
                {businessId?.ads_count} объявлений
              </TextContent>
              <View style={styles.list}>
                {businessId?.dates?.ads.map((el) => (
                  <Card
                    width={containerWidth}
                    likes={el.is_liked}
                    image={el?.properties_pictures[0]?.pictures?.big}
                    id={el.id}
                    complex_id={el.complex_id}
                    key={id}
                    background={el.background}
                    price={el.prices[0]?.price}
                    priceDollars={el.prices[1]?.price}
                    year={el.year}
                    summSquare={el.prices[0]?.m2_price}
                    dollarsSquare={el.prices[1]?.m2_price}
                    volume={el.volume}
                    urgently={el.urgently}
                    vip={el.vip}
                    starVip={el.starVip}
                    adress={el.street}
                    home={car ? false : true}
                  />
                ))}
              </View>
            </View>
          </Container>
        </ScrollView>
      </View>
    </ButtonLayouts>
  );
};
const styles = StyleSheet.create({
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
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
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
});

export default HouseCompaniesDetail;
