import React from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import { colors } from "../../assets/styles/colors";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import TextContent from "../../assets/styles/components/TextContent";
import Card from "../../customs/Card";
import Wave from "../../customs/Wave";
import Loading from "../../ui/Loading";
import { useStateHouse } from "../../context/stateHouseContext";
import InputCate from "../../screens/MainScreen/components/Input";

const containerWidth = (Dimensions.get("window").width - 32) / 2 - 5;
const fullWidth = Dimensions.get("window").width - 32;

const HouseResult = () => {
  const { param, loading, result, filter } = useStateHouse();

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
          text={`${filter.region.name}, ${filter.category.name}`}
          navLink={"HouseScreens"}
          link={"HouseFilter"}
          param={true}
        />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.map}>
          {Object.values(result)?.map((el, id) => {
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
              return (
                <Card
                  width={containerWidth}
                  image={el.properties_pictures[0].pictures.big}
                  id={el.id}
                  key={id}
                  title={title}
                  background={el.background}
                  price={el.prices[0].price}
                  priceDollars={el.prices[1].price}
                  year={el.year}
                  summSquare={el.prices[0].m2_price}
                  dollarsSquare={el.prices[1].m2_price}
                  volume={el.volume}
                  urgently={el.urgently}
                  vip={el.vip}
                  starVip={el.starVip}
                  adress={el.street}
                  home={true}
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

export default HouseResult;
