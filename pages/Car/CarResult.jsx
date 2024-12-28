import React from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import { colors } from "../../assets/styles/colors";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import TextContent from "../../assets/styles/components/TextContent";
import Card from "../../customs/Card";
import Wave from "../../customs/Wave";
import Loading from "../../ui/Loading";
import InputCate from "../../screens/MainScreen/components/Input";
import { useStateCar } from "../../context/stateCarContext";

const containerWidth = (Dimensions.get("window").width - 32) / 2 - 5;
const fullWidth = Dimensions.get("window").width - 32;

const CarResult = () => {
  const { loading, result, filter } = useStateCar();

  if (loading) {
    return <Loading color={colors.house} />;
  }

  return (
    <Container>
      <Header homeBack={true} back={true}>
        {result.length} предложений
      </Header>
      <View
        style={{
          paddingBottom: 10,
        }}
      >
        <InputCate
          color={colors.phon}
          text="Все регионы, марка"
          navLink={"CarScreens"}
          link={"CarFilter"}
          param={true}
        />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.map}>
          {Object.values(result)?.map((el, id) => {
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
                  vip={el.is_premium}
                  starVip={el.is_vip}
                  urgently={el.is_urgent}
                  mark={el.mark_name}
                  background={el.ad_color}
                />
              );
            }
          })}
        </View>
      </ScrollView>
    </Container>
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

export default CarResult;
