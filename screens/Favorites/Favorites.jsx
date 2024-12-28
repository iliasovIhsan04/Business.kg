import React, { useEffect, useRef, useState } from "react";
import LayoutTab from "../../layouts/tabs";
import { StyleSheet, Text, View } from "react-native";
import Slide from "./components/Slide";
import NotLoveData from "../../assets/svg/notLoveData";
import NotSearchData from "../../assets/svg/notSearchLoveData";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Loading from "../../ui/Loading";
import Wave from "../../customs/Wave";
import List from "../MainScreen/components/List";
import { useСondition } from "../../context/stateContext";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const NotData = ({ title, description, SvgIcon }) => (
  <View style={styles.notDataContainer}>
    <SvgIcon />
    <TextContent
      top={20}
      fontSize={18}
      fontWeight={500}
      color={colors.black}
      center="center"
    >
      {title}
    </TextContent>
    <TextContent
      style={styles.notDataText}
      top={12}
      fontSize={16}
      fontWeight={400}
      color={colors.gray}
      center="center"
    >
      {description}
    </TextContent>
  </View>
);

const Favorites = () => {
  const { myFavorite, loadFavorite, getFavoite, hasFavorite, setHasFavorite, favoriteDetail, setFavoriteDetail } = useСondition();
  const [data, setData] = useState({
    car: [],
    house: [],
  });
  const [search, setSearch] = useState({
    car: [],
    house: [],
  });
  const [select, setSelect] = useState("Машина");
  const scrollRef = useRef(null);
  const scrollRefTwo = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      if (hasFavorite || favoriteDetail) {
        getFavoite();
        setHasFavorite(false); 
        setFavoriteDetail(false)
      }
    }, [hasFavorite || favoriteDetail])
  );
  useEffect(() => {
    setData({
      car: myFavorite?.cars || [],
      house: myFavorite?.houses || [],
    });
  }, [myFavorite]);
  if (loadFavorite) {
    return <Loading />;
  }
  return (
    <LayoutTab>
      <Slide
        scrollRef={scrollRef}
        scrollRefTwo={scrollRefTwo}
        data={
          <View style={{ flex: 1 }}>
            <View style={styles.buttonsContainer}>
              {["Машина", "Дом"].map((item) => (
                <Wave
                  key={item}
                  style={select === item ? styles.btn_active : styles.btn}
                  handle={() => setSelect(item)}
                >
                  <TextContent
                    fontSize={14}
                    fontWeight={400}
                    color={select === item ? colors.white : colors.gray}
                  >
                    {item}
                  </TextContent>
                </Wave>
              ))}
            </View>
            <ScrollView
              ref={scrollRef}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {select === "Машина" &&
                (data.car.length > 0 ? (
                  <List data={data.car} love={true} car={true} />
                ) : (
                  <NotData
                    title="Избранные машины"
                    description="Добавьте машину в избранное"
                    SvgIcon={NotLoveData}
                  />
                ))}
              {select === "Дом" &&
                (data.house.length > 0 ? (
                  <List data={data.house} love={true} />
                ) : (
                  <NotData
                    title="Избранные дома"
                    description="Добавьте дом в избранное"
                    SvgIcon={NotLoveData}
                  />
                ))}
            </ScrollView>
          </View>
        }
        searchData={
          <View style={{ flex: 1 }}>
            <View style={styles.buttonsContainer}>
              {["Машина", "Дом"].map((item) => (
                <Wave
                  key={item}
                  style={select === item ? styles.btn_active : styles.btn}
                  handle={() => setSelect(item)}
                >
                  <TextContent
                    fontSize={14}
                    fontWeight={400}
                    color={select === item ? colors.white : colors.gray}
                  >
                    {item}
                  </TextContent>
                </Wave>
              ))}
            </View>
            {select === "Машина" &&
              (search.car.length > 0 ? (
                <View></View>
              ) : (
                <NotData
                  title="Избранные поиски"
                  description="Сохраняйте поиски в избранное, чтобы следить за ценой"
                  SvgIcon={NotSearchData}
                />
              ))}
            {select === "Дом" &&
              (search.house.length > 0 ? (
                <View></View>
              ) : (
                <NotData
                  title="Избранные поиски"
                  description="Сохраняйте поиски в избранное, чтобы следить за ценой"
                  SvgIcon={NotSearchData}
                />
              ))}
            <ScrollView
              ref={scrollRef}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            ></ScrollView>
          </View>
        }
      />
    </LayoutTab>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 36,
    borderRadius: 50,
    paddingHorizontal: 16,
    backgroundColor: colors.phon,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn_active: {
    height: 36,
    borderRadius: 50,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },
  notDataContainer: {
    marginTop: 150,
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 200,
  },
  notDataText: {
    maxWidth: 300,
  },
});

export default Favorites;
