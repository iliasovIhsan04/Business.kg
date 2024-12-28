import React, { useEffect, useState } from "react";
import Container from "../../assets/styles/components/Container";
import Header from "../../components/Header";
import LayoutTab from "../../layouts/tabs";
import Wrapper from "../../assets/styles/components/Wrapper";
import ImageCustom from "../../customs/Image";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import Flex from "../../assets/styles/components/Flex";
import Between from "../../assets/styles/components/Between";
import More from "../../assets/svg/more";
import Wave from "../../customs/Wave";
import Column from "../../assets/styles/components/Column";
import Reports from "../../assets/svg/reports";
import Button from "../../customs/Button";
import Adv from "../../assets/svg/adv";
import { useСondition } from "../../context/stateContext";
import Loading from "../../ui/Loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import List from "../MainScreen/components/List";
const Profile = () => {
  const state = true;
  const { loading, fetchData, userData, hasChanges, setHasChanges } = useСondition();
  const navigation = useNavigation();
  const [data, setData] = useState({
    car: [],
    house: [],
  });
  const [select, setSelect] = useState("Машина");
  useEffect(() => {
    setData({
      car: userData?.dates?.ads?.car || [],
      house: userData?.dates?.ads?.house || [],
    });
  }, [userData]);

  useFocusEffect(
    React.useCallback(() => {
      if (hasChanges) {
        fetchData();
        setHasChanges(false); 
      }
    }, [hasChanges])
  );

  if (loading) {
    return <Loading color={colors.blue}/>;
  }
  if (userData) {
    return (
      <LayoutTab>
        <Container phon={true} none={true}>
          <Header back={true} container={true}>
            Профиль
          </Header>
          <ScrollView
            style={{
              flex: 1,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Column gap={6}>
              <Wrapper padding={[16, 0]} top={true}>
                <Wave handle={() => navigation.navigate("MyDetails")}>
                  <Between center={"center"}>
                    <Flex gap={10}>
                      <View
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      >
                        <ImageCustom
                         key={userData?._avatar}
                          uri={userData?._avatar}
                          width={60}
                          height={60}
                          borderRadius={50}
                        />
                      </View>
                      <Column gap={4}>
                        <TextContent
                          fontSize={18}
                          fontWeight={500}
                          color={colors.black}
                        >
                          {userData?.name}
                        </TextContent>
                        <TextContent
                          fontSize={14}
                          fontWeight={400}
                          color={colors.gray}
                        >
                          {userData?.phone}
                        </TextContent>
                      </Column>
                    </Flex>
                    <Wave>
                      <More />
                    </Wave>
                  </Between>
                </Wave>
              </Wrapper>
              <Wrapper padding={[16, 16]}>
                <Column gap={10}>
                  <View style={styles.box}>
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
                            {userData?.mkg_id}
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
                      <Button
                        handle={() => navigation.navigate("Balance")}
                        color={colors.black}
                      >
                        Пополнить баланс
                      </Button>
                    </Column>
                  </View>
                  <Flex gap={10}>
                    <Wave
                      handle={() => navigation.navigate("Notifications")}
                      style={{ flex: 1 }}
                    >
                      <View style={styles.box}>
                        <Image
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                          }}
                          source={require("../../assets/images/notif.png")}
                          alt=""
                        />
                        <Flex top={10}>
                          <TextContent
                            fontSize={16}
                            fontWeight={500}
                            color={colors.black}
                          >
                            Уведомления
                          </TextContent>
                          <More />
                        </Flex>
                        <TextContent
                          top={4}
                          fontSize={12}
                          fontWeight={400}
                          color={colors.gray}
                        >
                          Не пропускайте свежие новости
                        </TextContent>
                      </View>
                    </Wave>
                    <Wave
                      handle={() => navigation.navigate("Report")}
                      style={{ flex: 1 }}
                    >
                      <View style={styles.box}>
                        <Image
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                          }}
                          source={require("../../assets/images/reo.png")}
                          alt=""
                        />
                        <Flex top={10}>
                          <TextContent
                            fontSize={16}
                            fontWeight={500}
                            color={colors.black}
                          >
                            Мои отчеты
                          </TextContent>
                          <More />
                        </Flex>
                        <TextContent
                          top={4}
                          fontSize={12}
                          fontWeight={400}
                          color={colors.gray}
                        >
                          Тут хранятся все ваши купленные отчеты
                        </TextContent>
                      </View>
                    </Wave>
                  </Flex>
                  {/* <View style={styles.box}>
                    <Star />
                    <TextContent
                      top={10}
                      fontSize={16}
                      fontWeight={500}
                      color={colors.black}
                    >
                      Мой бизнес-аккаунт
                    </TextContent>
                    <TextContent
                      top={4}
                      fontSize={12}
                      fontWeight={400}
                      color={colors.gray}
                    >
                      Превратите свой профиль в бизнес-аккаунт с расширенными
                      возможностями
                    </TextContent>
                    <Button top={10} color={colors.black}>
                      Перейти на бизнес-аккаунт
                    </Button>
                  </View> */}
                </Column>
              </Wrapper>
              <Wrapper padding={[200, 16]}>
                <TextContent
                  fontSize={20}
                  fontWeight={600}
                  color={colors.black}
                >
                  Мои объявления
                </TextContent>
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
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                  >
                    {select === "Машина" &&
                      (data.car.length > 0 ? (
                        <List data={data.car} love={true} car={true} />
                      ) : (
                        <Column top={50} gap={20}>
                          <View
                            style={{
                              alignItems: "center",
                            }}
                          >
                            <Adv />
                            <TextContent
                              top={20}
                              center={"center"}
                              fontSize={16}
                              fontWeight={400}
                              color={colors.gray}
                            >
                              Превратите свой профиль в бизнес-аккаунт с
                              расширенными возможностями
                            </TextContent>
                          </View>
                          <Button
                            handle={() => {
                              navigation.navigate("CarScreens", {
                                screen: "AddCar",
                              });
                            }}
                            top={10}
                            color={colors.blue}
                          >
                            Добавить объявление
                          </Button>
                        </Column>
                      ))}
                    {select === "Дом" &&
                      (data.house.length > 0 ? (
                        <List data={data.house} love={true} />
                      ) : (
                        <Column top={50} gap={20}>
                          <View
                            style={{
                              alignItems: "center",
                            }}
                          >
                            <Adv />
                            <TextContent
                              top={20}
                              center={"center"}
                              fontSize={16}
                              fontWeight={400}
                              color={colors.gray}
                            >
                              Превратите свой профиль в бизнес-аккаунт с
                              расширенными возможностями
                            </TextContent>
                          </View>
                          <Button
                            handle={() => {
                              navigation.navigate("HouseScreens", {
                                screen: "AddHouse",
                              });
                            }}
                            top={10}
                            color={colors.blue}
                          >
                            Добавить объявление
                          </Button>
                        </Column>
                      ))}
                  </ScrollView>
                </View>
              </Wrapper>
            </Column>
          </ScrollView>
        </Container>
      </LayoutTab>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.phon,
  },
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

export default Profile;
