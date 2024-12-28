import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import { url } from "../../api/api";
import Loading from "../../ui/Loading";
import { colors } from "../../assets/styles/colors";
import Column from "../../assets/styles/components/Column";
import Wrapper from "../../assets/styles/components/Wrapper";
import Flex from "../../assets/styles/components/Flex";
import TextContent from "../../assets/styles/components/TextContent";
import Wave from "../../customs/Wave";
import Between from "../../assets/styles/components/Between";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../customs/Button";
import ButtonLayouts from "../../layouts/buttonLayouts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Reports from "../../assets/svg/reports";
import { useСondition } from "../../context/stateContext";

const Tariffs = () => {
  const [tariffs, setTariffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);
  const [selectDetail, setSelectDetail] = useState([]);
  const [plan, setPlan] = useState("");
  const [priceCom, setPriceCom] = useState("");
  const [color, setColor] = useState("");
  
  const [selectedDetail, setSelectedDetail] = useState({
    tariffId: null,
    planId: null,
    color: null,
    colors: [],
  });
  const navigation = useNavigation();
  const { userData } = useСondition();
  const route = useRoute();
  const { objectId, carId } = route.params || {};
  console.log("Объявлениянын ID:", objectId);
  console.log("hhh ID:", carId);
  const comId = carId || objectId || houseId || "default_value";
  const getTeriff = async () => {
    try {
      const response = await url.get("tariffs/");
      setTariffs(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const postTeriff = async () => {
    setPostLoading(true);
    const token = await AsyncStorage.getItem("token");
    const payload = {
      object_type: "car",
      object_id: comId,
      tariff_id: selectedDetail.tariffId,
      plan_id: selectedDetail.planId,
      color: selectedDetail.color || undefined,
    };
    console.log("Payload:", payload);
    try {
      const response = await url.post("tariffs/active", payload, {
        headers: { Authorization: `Token ${token}` },
      });
      if (response.status === 200) {
        Alert.alert("Успешно", "Тариф успешно подключить");
        navigation.navigate('MainScreen')
      } else {
        Alert.alert("Ошибка", "Тариф не удалось подключить");
      }
      console.log("Success:", response.data);
    } catch (error) {
      Alert.alert("Ошибка", "Произошла ошибка при связи с сервером");
      console.log("Error:", error);
    } finally {
      setPostLoading(false);
    }
  };
  useEffect(() => {
    getTeriff();
  }, []);
  const formatDuration = (duration) => {
    const forms = ["день", "дня", "дней"];
    const number = Math.abs(duration) % 100;
    const n1 = number % 10;
    if (number > 10 && number < 20) {
      return `${duration} ${forms[2]}`;
    }
    if (n1 > 1 && n1 < 5) {
      return `${duration} ${forms[1]}`;
    }
    if (n1 === 1) {
      return `${duration} ${forms[0]}`;
    }
    return `${duration} ${forms[2]}`;
  };
  if (loading) {
    return <Loading />;
  }
  if (selectDetail.name) {
    return (
      <ButtonLayouts
        handle={postTeriff}
        loading={postLoading}
        title={`Оплатить ${plan || ""}`}
        color={userData?.balance >= priceCom ? colors.blue : colors.gray}
        disabled={userData?.balance < priceCom}
      >
        <Container none={true} phon={true}>
          <Header
            handleBack={() => {
              if (selectDetail?.name) {
                setSelectDetail([]);
                setPlan("");
              } else {
                navigation.navigate("MainScreen");
              }
            }}
            back={true}
            container={true}
          >
            Продать быстрее
          </Header>
          <ScrollView
            style={{
              flex: 1,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Column gap={10}>
              <Wrapper top={true} padding={[16, 0]}>
                <View style={style.box}>
                  <Flex gap={10}>
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      source={{ uri: selectDetail.img }}
                    />
                    <TextContent
                      fontSize={20}
                      fontWeight={500}
                      color={colors.black}
                    >
                      {selectDetail.name}
                    </TextContent>
                  </Flex>
                  <TextContent
                    top={10}
                    fontSize={14}
                    fontWeight={500}
                    color={colors.gray}
                  >
                    {selectDetail.description}
                  </TextContent>
                </View>
              </Wrapper>
              <Wrapper padding={[16, 16]}>
                <TextContent
                  fontSize={20}
                  fontWeight={500}
                  color={colors.black}
                >
                  Выберите охват
                </TextContent>
                <Column top={16} gap={10}>
                  {selectDetail?.plans?.map((el, id) => (
                    <Wave
                      key={id}
                      handle={() => {
                        setSelectedDetail((prev) => ({
                          ...prev,
                          planId: el.id,
                        }));
                        setPlan(`${el.price} сом`);
                        setPriceCom(`${el.price}`);
                      }}
                    >
                      <View
                        style={{
                          padding: 10,
                          borderRadius: 10,
                          backgroundColor:
                            plan === `${el.price} сом`
                              ? "#1B4DFC26"
                              : colors.phon,
                          borderWidth: 1,
                          borderColor:
                            plan === `${el.price} сом`
                              ? colors.blue
                              : colors.phon,
                        }}
                      >
                        <Between center="center">
                          <TextContent
                            fontSize={14}
                            fontWeight={500}
                            color={colors.black}
                          >
                            {formatDuration(el.duration)}{" "}
                            {el.description && `- ${el.description}`}
                          </TextContent>
                          <TextContent
                            fontSize={20}
                            fontWeight={500}
                            color={colors.blue}
                          >
                            {el.price} сом
                          </TextContent>
                        </Between>
                      </View>
                    </Wave>
                  ))}
                </Column>
              </Wrapper>
              {selectDetail.colors.length > 0 && (
                <Wrapper padding={[16, 16]}>
                  <TextContent
                    fontSize={20}
                    fontWeight={500}
                    color={colors.black}
                  >
                    Выберите цвет
                  </TextContent>
                  <ScrollView
                    style={{
                      marginTop: 16,
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      {selectDetail?.colors?.map((el, id) => (
                        <Wave
                          key={id}
                          handle={() => {
                            setSelectedDetail((prev) => {
                              console.log("Тандалган түс:", el.color);
                              return {
                                ...prev,
                                color: el.color,
                              };
                            });
                          }}
                        >
                          <View
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 6,
                              backgroundColor: el.color || colors.phon,
                              borderWidth: 1,
                              borderColor:
                                selectedDetail.color === el.color
                                  ? colors.blue
                                  : colors.phon,
                            }}
                          ></View>
                        </Wave>
                      ))}
                    </View>
                  </ScrollView>
                </Wrapper>
              )}
              <Wrapper padding={[200, 16]}>
                <TextContent
                  bottom={16}
                  fontSize={20}
                  fontWeight={500}
                  color={colors.black}
                >
                  Текущий баланс
                </TextContent>
                <View style={style.box}>
                  <Column gap={10}>
                    <Flex gap={10}>
                      <Reports />
                      <Column gap={4}>
                        <TextContent
                          fontSize={12}
                          fontWeight={400}
                          color={colors.gray}
                        >
                          Лицевой счёт:
                        </TextContent>
                        <TextContent
                          fontSize={16}
                          fontWeight={500}
                          color={colors.black}
                        >
                          {userData?.username}
                        </TextContent>
                      </Column>
                    </Flex>
                    <Between center={"center"}>
                      <TextContent
                        fontSize={12}
                        fontWeight={400}
                        color={colors.gray}
                      >
                        Баланс:
                      </TextContent>
                      <TextContent
                        fontSize={20}
                        fontWeight={600}
                        color={colors.black}
                      >
                        {userData?.balance} сом
                      </TextContent>
                    </Between>
                    {userData?.balance < priceCom && (
                      <TextContent
                        fontSize={12}
                        fontWeight={500}
                        color={colors.red}
                      >
                        Недостаточно средств на бал��нсе
                      </TextContent>
                    )}
                  </Column>
                </View>
                <Wave
                  style={{
                    marginTop: 10,
                  }}
                  handle={() => navigation.navigate("Balance")}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: colors.blue,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextContent
                      fontSize={16}
                      fontWeight={500}
                      color={colors.blue}
                    >
                      Пополнить баланс
                    </TextContent>
                  </View>
                </Wave>
              </Wrapper>
            </Column>
          </ScrollView>
        </Container>
      </ButtonLayouts>
    );
  }
  return (
    <Container none={true} phon={true}>
      <Header
        handleBack={() => {
          if (selectDetail?.name) {
            setSelectDetail([]);
          } else {
            navigation.goBack();
          }
        }}
        back={true}
        container={true}
      >
        Продать быстрее
      </Header>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Column
          style={{
            paddingBottom: 200,
          }}
          gap={10}
        >
          {tariffs.map((el, id) => {
            if (el.plans.length > 0) {
              return (
                <Wave
                  key={id}
                  handle={() =>
                    setSelectDetail(el) ||
                    setSelectedDetail((prev) => ({
                      ...prev,
                      tariffId: el.id,
                    }))
                  }
                >
                  <Wrapper top={id == 0} padding={[16, 16]}>
                    <View style={style.box}>
                      <Flex gap={10}>
                        <Image
                          style={{
                            width: 24,
                            height: 24,
                          }}
                          source={{ uri: el.img }}
                        />
                        <TextContent
                          fontSize={20}
                          fontWeight={500}
                          color={colors.black}
                        >
                          {el.name}
                        </TextContent>
                      </Flex>
                      <TextContent
                        top={10}
                        fontSize={14}
                        fontWeight={500}
                        color={colors.gray}
                      >
                        {el.description}
                      </TextContent>
                      <Button
                        handle={() => {
                          setSelectDetail({
                            ...el,
                          });
                          setSelectedDetail((prev) => ({
                            ...prev,
                            tariffId: el.id,
                          }));
                        }}
                        top={20}
                        color={colors.blue}
                      >
                        Подключить услугу
                      </Button>
                      {userData?.balance < selectedDetail.price && (
                        <TextContent
                          fontSize={12}
                          fontWeight={500}
                          color={colors.red}
                        >
                          Недостаточно средств на балансе
                        </TextContent>
                      )}
                    </View>
                  </Wrapper>
                </Wave>
              );
            }
          })}
        </Column>
      </ScrollView>
    </Container>
  );
};

const style = StyleSheet.create({
  box: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: colors.phon,
  },
  boxx: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.phon,
  },
});

export default Tariffs;
