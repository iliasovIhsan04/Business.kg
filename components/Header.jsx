import React, { useEffect, useState } from "react";
import { Platform, Pressable, View } from "react-native";
import TextContent from "../assets/styles/components/TextContent";
import { colors } from "../assets/styles/colors";
import Flex from "../assets/styles/components/Flex";
import Back from "../assets/svg/back";
import Wave from "../customs/Wave";
import { useNavigation } from "@react-navigation/native";
import Between from "../assets/styles/components/Between";
import { useСondition } from "../context/stateContext.jsx";
import { ActivityIndicator } from "react-native-web";
import { url } from "../api/api.jsx";
import { CustomAlert } from "../ui/Alert.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Heard1 from "../assets/svg/loveFull.js";
import Heard from "../assets/svg/love.js";

const Header = ({
  id,
  love,
  iks,
  back,
  homeBack,
  handleBack,
  container,
  children,
  style,
  reset,
  home,
  likes,
}) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(likes);
  const [loading, setLoading] = useState(false);
  const {setFavoriteDetail } = useСondition();

  useEffect(() => {
    setIsFavorite(likes);
  }, [likes]);
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
      if (!isFavorite) {
        const response = await url(
          `main/like/${id}/${home ? "house" : "car"}/set_like/`,
          header
        );
        console.log(response.data);
        setIsFavorite(true);
        setFavoriteDetail(true)
        CustomAlert({
          type: "success",
          title: "Успешно!",
          text: "Добавлено в избранные",
        });
      } else {
        const response = await url(
          `main/like/${id}/${home ? "house" : "car"}/remove_like/`,
          header
        );
        console.log(response.data);
        setIsFavorite(false);
        setFavoriteDetail(true)
        CustomAlert({
          type: "success",
          title: "Успешно!",
          text: "Удалено из избранных",
        });
      }
    } catch (error) {
      console.log(error); 
    } finally {
      setLoading(false);
    }
  };
  const route = () => {
    if (handleBack) {
      handleBack();
    } else if (homeBack) {
      navigation.navigate("MainScreen");
    } else {
      navigation.goBack();
    }
  };
  return (
    <View
      style={[
        {
          paddingTop: Platform.OS === "ios" ? 60 : 42,
          backgroundColor: colors.white,
          paddingBottom: 16,
        },
        container && {
          paddingHorizontal: 16,
        },
        style,
      ]}
    >
      <Between center="center">
        <Flex
          style={{
            flex: 1,
          }}
          gap={20}
        >
          {back && (
            <Wave handle={route}>
              <Back />
            </Wave>
          )}
          <TextContent
            style={{
              flex: 1,
            }}
            numberOfLines={1}
            fontSize={22}
            fontWeight={600}
            color={colors.black}
          >
            {children}
          </TextContent>
        </Flex>
        {love && (
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
              <Heard1/>
            ) : (
              <Heard />
            )}
          </Pressable>
        )}
        {iks && (
          <Wave handle={reset}>
            <TextContent fontSize={14} fontWeight={500} color={colors.black}>
              Сбросить
            </TextContent>
          </Wave>
        )}
      </Between>
    </View>
  );
};

export default Header;
