import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Between from "../../../assets/styles/components/Between";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../assets/styles/colors";
import Wave from "../../../customs/Wave";
import TextContent from "../../../assets/styles/components/TextContent";
import { useStateHouse } from "../../../context/stateHouseContext";
import { useStateCar } from "../../../context/stateCarContext";

const Category = ({ house, car }) => {
  const navigation = useNavigation();
  const { filter, setFilter } = house ? useStateHouse() : useStateCar();
  const Sybmit = ({ type_id, is_urgent }) => {
    const updatedFilter = { ...filter };
    if (is_urgent) updatedFilter.is_urgent = is_urgent;
    if (type_id) {
      updatedFilter.type_id = { 
        id: type_id, 
        name: type_id === 1 ? "Продажа" : "Аренда" 
      };
    }
    setFilter(updatedFilter);
    navigation.navigate(house ? "HouseScreens" : "CarScreens", {
      screen: house ? "HouseResult" : "CarResult",
    });
  };
  
  if (house) {
    return (
      <Between center={"center"}>
        <Wave handle={() => Sybmit({ is_urgent: true })}>
          <View style={styles.box}>
            <Image
              style={{
                width: 74,
                height: 74,
              }}
              source={require("../../../assets/images/1-8.png")}
            />
            <TextContent fontSize={12} fontWeight={500} color={colors.black}>
              Срочно
            </TextContent>
          </View>
        </Wave>
        <Wave
          handle={() =>
            navigation.navigate("HouseScreens", { screen: "HouseCompanies" })
          }
        >
          <View style={styles.box}>
            <Image
              style={{
                width: 74,
                height: 74,
              }}
              source={require("../../../assets/images/1-9.png")}
            />
            <TextContent fontSize={12} fontWeight={500} color={colors.black}>
              Компании
            </TextContent>
          </View>
        </Wave>
        <Wave handle={() => Sybmit({ type_id: 1 })}>
          <View style={styles.box}>
            <Image
              style={{
                width: 74,
                height: 74,
              }}
              source={require("../../../assets/images/1-5.png")}
            />
            <TextContent fontSize={12} fontWeight={500} color={colors.black}>
              Продажа
            </TextContent>
          </View>
        </Wave>
        <Wave handle={() => Sybmit({ type_id: 2 })}>
          <View style={styles.box}>
            <Image
              style={{
                width: 74,
                height: 74,
              }}
              source={require("../../../assets/images/1-6.png")}
            />
            <TextContent fontSize={12} fontWeight={500} color={colors.black}>
              Аренда
            </TextContent>
          </View>
        </Wave>
      </Between>
    );
  }
  if (car) {
    return (
      <Between center={"center"}>
        <Wave handle={() => Sybmit({ is_urgent: true })}>
          <View style={styles.box}>
            <Image
              style={{
                width: 74,
                height: 74,
              }}
              source={require("../../../assets/images/1-8.png")}
            />
            <TextContent fontSize={12} fontWeight={500} color={colors.black}>
              Срочно
            </TextContent>
          </View>
        </Wave>
        <Wave
          handle={() =>
            navigation.navigate("CarScreens", { screen: "CarBusinessList" })
          }
        >
          <View style={styles.box}>
            <Image
              style={{
                width: 74,
                height: 74,
              }}
              source={require("../../../assets/images/car-1.png")}
            />
            <TextContent fontSize={12} fontWeight={500} color={colors.black}>
              Автобизнес
            </TextContent>
          </View>
        </Wave>
        <Wave
          handle={() =>
            navigation.navigate("CarScreens", { screen: "CarChek" })
          }
        >
          <View style={styles.box}>
            <Image
              style={{
                width: 74,
                height: 74,
              }}
              source={require("../../../assets/images/number-car.png")}
            />
            <TextContent fontSize={12} fontWeight={500} color={colors.black}>
              Carcheck
            </TextContent>
          </View>
        </Wave>
        <Wave handle={() => navigation.navigate("Report")}>
          <View style={styles.box}>
            <Image
              style={{
                width: 74,
                height: 74,
                borderRadius: 14,
              }}
              source={require("../../../assets/images/reposts-1.png")}
            />
            <TextContent fontSize={12} fontWeight={500} color={colors.black}>
              Отчеты
            </TextContent>
          </View>
        </Wave>
      </Between>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    width: 75,
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
});

export default Category;
