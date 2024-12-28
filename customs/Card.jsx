import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import TextContent from "../assets/styles/components/TextContent";
import { colors } from "../assets/styles/colors";
import Column from "../assets/styles/components/Column";
import Flex from "../assets/styles/components/Flex";
import Heard1 from "../assets/svg/heardFull.js";
import Heard from "../assets/svg/heard.js";
import Vip from "../assets/svg/vip.js";
import VipStar from "../assets/svg/starVip.js";
import Wave from "./Wave.jsx";
import Between from "../assets/styles/components/Between.jsx";
import { useNavigation } from "@react-navigation/native";
import ImageCustom from "./Image.jsx";
import { url } from "../api/api.jsx";
import { CustomAlert } from "../ui/Alert.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useСondition } from "../context/stateContext.jsx";

const Card = ({
  complex_id,
  id,
  image,
  likes,
  width,
  title,
  background,
  priceDollars,
  price,
  year,
  volume,
  mileage_unit,
  is_urgent,
  home,
  vip,
  starVip,
  dealer_name,
  dollarsSquare,
  summSquare,
  adress,
  mark,
}) => {
  const [isFavorite, setIsFavorite] = useState(likes);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { getFavoite, setHasFavorite  } = useСondition();

  const likeHandle = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login");
    }
    const header = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      setLoading(true);
      if (!isFavorite) {
        const response = await url(
          `main/like/${id}/${home ? "house" : "car"}/set_like/`,
          header
        );
        setHasFavorite(true)
        setIsFavorite(true);
        console.log(response.data);
        CustomAlert({
          type: "success",
          title: "Успешно!",
          text: "Добавлено в изрбанные",
        });
      } else {
        const response = await url(
          `main/like/${id}/${home ? "house" : "car"}/remove_like/`,
          header
        );
        console.log(response.data);
        setHasFavorite(true)
        setIsFavorite(false);
        getFavoite();
        CustomAlert({
          type: "success",
          title: "Успешно!",
          text: "Удалено из избранные",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const goDetail = () => {
    if (home) {
      navigation.navigate("HouseScreens", {
        screen: "HouseDetail",
        params: { id: id, complex_id: complex_id },
      });
    } else {
      navigation.navigate("CarScreens", {
        screen: "CarDetail",
        params: { id: id },
      });
    }
  };
  return (
    <Wave handle={goDetail} style={[stylesCard.card_block, { width: width }]}>
      <Column
        gap={10}
        style={[stylesCard.card_box, { backgroundColor: background }]}
      >
        <View style={stylesCard.card_box_img}>
          <View
            style={{
              top: 0,
              left: 0,
              position: "absolute",
              width: "100%",
              height: 120,
            }}
          >
            <ImageCustom
              uri={image}
              width={"100%"}
              height={120}
              borderRadius={6}
            />
          </View>
          <Pressable
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              zIndex: 1,
              width: 24,
              height: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => (loading ? "" : likeHandle())}
          >
            {loading ? (
              <ActivityIndicator size={24} color={colors.white} />
            ) : isFavorite ? (
              <Heard1 />
            ) : (
              <Heard />
            )}
          </Pressable>
          {is_urgent === true ? (
            <View style={stylesCard.urgently}>
              <TextContent color={colors.white} fontSize={8} fontWeight={500}>
                срочно
              </TextContent>
            </View>
          ) : ""}
          {dealer_name && (
            <View style={stylesCard.avto_user}>
              <TextContent color={colors.white} fontSize={8} fontWeight={500}>
               {dealer_name}
              </TextContent>
            </View>
          )}
        </View>
        {!home && (
          <>
            <TextContent
              numberOfLines={2}
              color={colors.black}
              fontSize={14}
              fontWeight={500}
              style={{minHeight:35, }}
            >
              {mark} {title}, {year}
            </TextContent>
            <Column gap={2}>
              <TextContent color={colors.black} fontSize={18} fontWeight={600}>
                ${priceDollars}
              </TextContent>
              <TextContent color={colors.black} fontSize={14} fontWeight={500}>
                {price} сом
              </TextContent>
            </Column>
          </>
        )}
        {home && (
          <Column gap={10}>
            <TextContent
              numberOfLines={2}
              color={colors.black}
              fontSize={14}
              fontWeight={500}
            >
              {title}
            </TextContent>
            <Column gap={2}>
              <Between>
                <TextContent
                  color={colors.black}
                  fontSize={14}
                  fontWeight={600}
                >
                  ${priceDollars}
                </TextContent>
                <TextContent color={colors.gray} fontSize={12} fontWeight={400}>
                  {price} сом
                </TextContent>
              </Between>
              <Between>
                <TextContent
                  color={colors.black}
                  fontSize={14}
                  fontWeight={600}
                >
                  ${dollarsSquare}/м²
                </TextContent>
                <TextContent color={colors.gray} fontSize={12} fontWeight={400}>
                  {summSquare}/м²
                </TextContent>
              </Between>
            </Column>
          </Column>
        )}
        {home ? (
          <Flex style={{ flexDirection: "row" }} gap={5}>
            {vip === true ? (
              <Vip style={{ width: 14, height: 14 }} />
            ) : starVip === true ? (
              <VipStar style={{ width: 14, height: 14 }} />
            ) : null}
            <TextContent
              numberOfLines={1}
              fontSize={12}
              fontWeight={400}
              color={colors.gray}
            >
              {adress}
            </TextContent>
          </Flex>
        ) : (
          <Flex style={{ flexDirection: "row" }} gap={5}>
            {vip === true ? (
              <Vip style={{ width: 14, height: 14 }} />
            ) : starVip === true ? (
              <VipStar style={{ width: 14, height: 14 }} />
            ) : null}
            <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
              {year}
            </TextContent>
            <TextContent color={colors.gray}>/</TextContent>
            <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
              {volume} {mileage_unit}
            </TextContent>
          </Flex>
        )}
      </Column>
    </Wave>
  );
};

const stylesCard = StyleSheet.create({
  avto_user: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.red,
    position: "absolute",
    left: 3,
    zIndex: 1,
    bottom: 3,
    borderRadius: 4,
  },
  card_block: {
    width: "49%",
    minHeight:150,
  },
  card_box: {
    width: "100%",
    borderRadius: 8,
    padding: 4,
  },
  card_box_img: {
    height: 120,
    borderRadius: 6,
    position: "relative",
  },
  urgently: {
    position: "absolute",
    top: 3,
    left: 3,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.red,
    borderRadius: 4,
  },
});

export default Card;
