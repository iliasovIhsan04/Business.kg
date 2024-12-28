import React, { useCallback, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Loading from "../../../ui/Loading";
import Wave from "../../../customs/Wave";
import TextContent from "../../../assets/styles/components/TextContent";
import { colors } from "../../../assets/styles/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Card from "../../../customs/Card";
import { useStateHouse } from "../../../context/stateHouseContext";
import { useStateCar } from "../../../context/stateCarContext";
import { useСondition } from "../../../context/stateContext.jsx";

const containerWidth = (Dimensions.get("window").width - 32) / 2 - 5;
const fullWidth = Dimensions.get("window").width - 32;
const List = ({ car, data, love }) => {
  const { reLoading, recomention, param, getRecomention, getCarRecomention } = car
    ? useStateCar()
    : useStateHouse();
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

  const { setFavoriteDetail, favoriteDetail } = useСondition();
  useFocusEffect(
    React.useCallback(() => {
      if (favoriteDetail) {
        if (car) {
          getCarRecomention()
        } else {
          getRecomention();
        }
      }
    }, [favoriteDetail])
  );
  if (reLoading) {
    return <Loading color={car ? colors.blue : colors.house} />;
  }
  return (
    <View style={styles.map}>
      {recomention &&
        Object.values(love ? data : recomention)?.map((el, id) => {
          const type = param?.type?.filter((obj) => {
            return obj.id == el.type_id;
          })[0];
          const category = param?.category?.filter((obj) => {
            return obj.id == el.category;
          })[0];
          const rooms = param?.rooms?.filter((obj) => {
            return obj.id == el.rooms;
          })[0];
          const title = `${type?.name ? `${type.name}` : ""}${
            category?.name ? ` • ${category.name}` : ""
          }${
            rooms?.name
              ? rooms?.id >= 6
                ? ` • ${rooms?.name}`
                : ` • ${rooms?.name}-комн.,`
              : ""
          } ${el.square}м²${
            el.floor == -1
              ? ", цоколь"
              : el.floor == -2
              ? ", подвал"
              : el.floor > 1
              ? `, ${el.floor}-этаж из ${el.floors}`
              : ""
          }`;
          if (el.advertising) {
            return (
              <Wave handle={() => handleFunction()} key={id}>
                <View style={[styles.box, styles.advertisement]}>
                  <TextContent
                    fontSize={24}
                    fontWeight="bold"
                    color={colors.black}
                    style={{ textAlign: "center", padding: 20 }}
                  >
                    Рекламный Блок
                  </TextContent>
                </View>
              </Wave>
            );
          } else {
            if (car) {
              return (
                <Card
                  width={containerWidth}
                  likes={el.is_liked}
                  image={el?.pictures[0]?.pictures?.small}
                  id={el.id}
                  key={id}
                  title={el.model_name}
                  price={el.prices[0]?.price}
                  priceDollars={el.prices[1]?.price}
                  year={el.year}
                  volume={el.mileage}
                  mileage_unit={el.mileage_unit}
                  vip={el.is_vip}
                  starVip={el.is_premium}
                  is_urgent={el.is_urgent}
                  mark={el.mark_name}
                  background={el.ad_color}
                  dealer_name={el.dealer_name}
                />
              );
            } else {
              return (
                <Card
                  width={containerWidth}
                  likes={el.is_liked}
                  image={el?.properties_pictures[0]?.pictures?.big}
                  id={el.id}
                  complex_id={el.complex_id}
                  key={id}
                  title={title}
                  background={el.ad_color}
                  price={el.prices[0]?.price}
                  priceDollars={el.prices[1]?.price}
                  year={el.year}
                  summSquare={el.prices[0]?.m2_price}
                  dollarsSquare={el.prices[1]?.m2_price}
                  volume={el.volume}
                  is_urgent={el.is_urgent}
                  vip={el.is_premium}
                  starVip={el.is_vip}
                  adress={el.street}
                  home={car ? false : true}
                />
              );
            }
          }
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 200,
  },
  box: {
    width: containerWidth,
    height: 250,
    backgroundColor: colors.phon,
    borderRadius: 6,
  },
  advertisement: {
    marginVertical: 20,
    width: fullWidth,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    height: 80,
    width: "90%",
    backgroundColor: "#78CAD2",
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 20,
  },
});

export default List;
