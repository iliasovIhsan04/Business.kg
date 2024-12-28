import React, { useState, useEffect } from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import Wrapper from "../../assets/styles/components/Wrapper";
import Column from "../../assets/styles/components/Column";
import { Dimensions, Image, StyleSheet, TextInput, View } from "react-native";
import Flex from "../../assets/styles/components/Flex";
import Reports from "../../assets/svg/reports";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import { useСondition } from "../../context/stateContext";
import Between from "../../assets/styles/components/Between";
import ButtonLayouts from "../../layouts/buttonLayouts";
import Wave from "../../customs/Wave";
import Present from "../../assets/svg/present";
import card from "../../assets/images/cart.png";
import mbank from "../../assets/images/mbank.png";

const { width } = Dimensions.get("window");
const Balance = () => {
const { userData } = useСondition();
  const [active, setActive] = useState(0); 
  const [customAmount, setCustomAmount] = useState(""); 
  const amounts = [1000, 2000, 5000, 7000, 10000, 15000];
  const [amount, setAmount] = useState(false); 

  const handlePress = (index, amount) => {
    setActive(index);
    setCustomAmount("");
  };
  useEffect(() => {
    if (active !== null) {
      setCustomAmount(amounts[active].toString());
    }
  }, [active]);
  
  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setActive(null); 
  };

  const handleButtonPress = () => {
    if (!amount) {
      setAmount(true);
    } else {
      setAmount(false);
    }
  };


  return (
    <Container none={true} phon={true}>
      <Header container={true} back={true}>
        Мой баланс
      </Header>
      <ButtonLayouts handle={handleButtonPress} loading={""} title="Пополнить баланс" color={colors.blue}>
        <Column style={{ flex: 1 }} gap={6}>
          <Wrapper top={true} padding={[16, 0]}>
            <View style={styles.box}>
              <Column gap={10}>
                <Flex gap={10}>
                  <Reports />
                  <Column gap={4}>
                    <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                      Лицевой счёт:
                    </TextContent>
                    <TextContent fontSize={16} fontWeight={500} color={colors.black}>
                      {userData?.mkg_id}
                    </TextContent>
                  </Column>
                </Flex>
                <Between center={"center"}>
                  <TextContent fontSize={12} fontWeight={400} color={colors.gray}>
                    Баланс:
                  </TextContent>
                  <TextContent fontSize={20} fontWeight={600} color={colors.black}>
                    {userData?.balance} сом
                  </TextContent>
                </Between>
              </Column>
            </View>
          </Wrapper>
          <Wrapper padding={[16, 16]}>
            <Between center={"center"}>
              <Column gap={8}>
                <TextContent fontSize={18} fontWeight={500} color={colors.black}>
                  Активировать промокод
                </TextContent>
                <TextContent style={{ width: 250 }} fontSize={12} fontWeight={400} color={colors.gray}>
                  Получайте эксклюзивные бонусы, подарки или скидки
                </TextContent>
              </Column>
              <Present />
            </Between>
          </Wrapper>
          
          <Wrapper style={{ flex: 1 }} padding={[16, 16]}>
            {amount ? (
          <>
              <View style={styles.cart_box}>
            <Image style={{width:24, height:24}} source={mbank}/>
            <TextContent fontSize={16} fontWeight={600} color={colors.white}> Пополнить на mbank</TextContent>
          </View>
          <View style={styles.cart_box}>
            <Image source={card}/>
            <TextContent fontSize={16} fontWeight={600} color={colors.white}>Пополнить на карте</TextContent>
          </View>
      
          </>
            ) : (
              <>
                <TextContent fontSize={20} fontWeight={600} color={colors.black}>
                  Выберите сумму пополнения
                </TextContent>
                <View style={styles.price_block}>
                  {amounts.map((amount, index) => (
                    <Wave
                      key={index}
                      handle={() => handlePress(index, amount)}
                      style={active === index ? styles.price_box_active : styles.price_box}
                    >
                      <TextContent>{amount} сом</TextContent>
                    </Wave>
                  ))}
                  <TextInput
                    style={styles.input}
                    placeholder="другая сумма"
                    placeholderTextColor={colors.gray}
                    value={customAmount} 
                    onChangeText={handleCustomAmountChange} 
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}
          </Wrapper>
        </Column>
      </ButtonLayouts>
    </Container>
  );
};

const styles = StyleSheet.create({
  price_box: {
    flexBasis: "48%",
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.phon,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  price_box_active: {
    borderWidth: 1,
    borderColor: colors.blue,
    flexBasis: "48%",
    height: 70,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  price_block: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: width <= 600 ? "space-between" : "center",
    gap: width <= 600 ? 0 : 10,
    marginTop: 16,
  },
  input: {
    width: "48%",
    height: 70,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  cart_box :{
    height:70,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.blue,
    borderRadius: 10,
    gap:10
  }
});

export default Balance;
