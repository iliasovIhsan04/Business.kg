import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Button from "../../customs/Button";
import { Image, StyleSheet, View, ScrollView, Platform, Dimensions } from "react-native";
import { colors } from "../../assets/styles/colors";
import Between from "../../assets/styles/components/Between";
import Column from "../../assets/styles/components/Column";
import TextContent from "../../assets/styles/components/TextContent";
import Flex from "../../assets/styles/components/Flex";
import Card from "../../customs/Card";
import Star from "../../assets/svg/star1.js";
import Wave from "../../customs/Wave.jsx";
import Back from "../../assets/svg/backWhite.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import ButtonLayouts from "../../layouts/buttonLayouts.js";
import { url } from "../../api/api.jsx";
import Loading from "../../ui/Loading.jsx";
const containerWidth = (Dimensions.get('window').width - 32) / 2 - 5;

const CarPrivateProfile = () => {
  const route = useRoute();
  const { id } = route.params;
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await url.get(`auth/accounts/${id}/user_info/`);
      console.log(response.data);
      setProfile(response.data);
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
  
  const navigation = useNavigation();
  return (
    <ButtonLayouts>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {
          profile.length === 0 ? (
            <Loading color={colors.blue}/>
          ) : (
            <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 150 }}
          >
            <View style={styles.card_private_profile}>
              <Wave
                width={30}
                height={24}
                style={{
                  marginTop: Platform.OS === "ios" ? 60 : 42,
                  marginHorizontal: 16,
                  marginBottom: 16,
                }}
                handle={() => navigation.goBack()}
              >
                <Back />
              </Wave>
              <Between style={styles.profileContent} gap={0}>
                <Flex gap={10}>
                  <Image source={{uri:profile?._avatar}} style={styles.profileImage} />
                  <Column style={styles.profileDetails} gap={10}>
                    <TextContent
                      fontSize={20}
                      fontWeight={500}
                      color={colors.white}
                    >
                      {profile?.name}
                    </TextContent>
                    <Flex style={styles.rating} gap={5}>
                      <Star />
                      <TextContent
                        fontSize={14}
                        fontWeight={400}
                        color={colors.white}
                      >
                        {profile?.avarage_rating}
                      </TextContent>
                      <TextContent
                        left={15}
                        fontSize={12}
                        fontWeight={400}
                        color={colors.white}
                      >
                        {profile?.review_count} отзывов
                      </TextContent>
                    </Flex>
                  </Column>
                </Flex>
                <Button
                  color={colors.white}
                  style={styles.privateButton}
                  textColor={colors.blue}
                  fontSize={12}
                >
                  Частное лицо
                </Button>
              </Between>
              <View style={styles.block}>
                <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                  О себе:
                </TextContent>
                <TextContent
                  fontSize={16}
                  fontWeight={400}
                  color={colors.black}
                  top={6}
                  style={{ lineHeight: 19 }}
                >
                  {profile?.description}
                </TextContent>
                <TextContent
                  fontSize={20}
                  fontWeight={600}
                  color={colors.black}
                  top={30}
                >
                  {profile.accommodation_count} объявления
                </TextContent>
                <View style={styles.list}>
                  {profile?.ads?.car.map((el) => (
                    <Card
                     key={el.id}
                     likes={el.is_liked}
                     image={el.pictures[0]?.pictures?.big}
                     id={el.id}
                     title={el.model_name}
                     price={el.prices[0]?.price}
                     priceDollars={el.prices[1]?.price}
                     year={el.year}
                     volume={el.mileage}
                     vip={el.is_premium}
                     starVip={el.is_vip}
                     urgently={el.is_urgent}
                     mark={el.mark_name}
                     width={containerWidth}
                   />
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          )
        }
 
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
    paddingHorizontal: 16,
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
    flex: 1,
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: colors.white,
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

export default CarPrivateProfile;
