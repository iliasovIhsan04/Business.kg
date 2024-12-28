import React, { useState } from "react";
import Header from "../../components/Header";
import Container from "../../assets/styles/components/Container";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import Card from "../../customs/Card";
import { colors } from "../../assets/styles/colors";
import { useNavigation } from "@react-navigation/native";
const containerWidth = (Dimensions.get('window').width - 32) / 2 - 5;

const cars = [
  {
    id: 1,
    title: "Toyota Camry • Седан",
    year: 2020,
    price: "15,000 $",
    priceDollars: 15000,
    image: "../../../assets/images/bmw.jpg",
    background: colors.white,
    vip: true,
    urgently: true,
    volume: "30000км",
  },
  {
    id: 2,
    title: "Honda CR-V • Кроссовер",
    year: 2021,
    price: "25,000$",
    priceDollars: 25000,
    image: "../../../assets/images/mashina-1.jpg",
    background: "#F6C20A26",
    background: "#05FF0026",
    starVip: true,
    volume: "56000км",
  },
  {
    id: 3,
    title: "Tesla Model 3 • Электромобиль",
    year: 2022,
    price: "35,000 $",
    priceDollars: 35000,
    image: "https://via.placeholder.com/150",
    background: "#F6C20A26",
    volume: "24000км",
  },
];



const CarBusinessListDetails = () => {
  const [businessId, setBusinessId] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await url.get(`main/dealer/${id}`);
      console.log(response.data)
      setBusinessId(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [businessId]);
  return (
    <>
      <Header container={true} back={true}>
        Автобизнес
      </Header>
      <Container phon={true}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.map}>
            {/* {cars.map((car) => (
              <Card
                key={car.id}
                width={containerWidth}
                image={car.image}
                id={car.id}
                title={car.title}
                background={car.background}
                price={car.price}
                priceDollars={car.priceDollars}
                year={car.year}
                vip={car.vip}
                urgently={car.urgently}
                starVip={car.starVip}
                volume={car.volume}
              />
            ))} */}
          </View>
        </ScrollView>
      </Container>
    </>
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
});

export default CarBusinessListDetails;
