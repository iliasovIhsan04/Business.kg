import React, { useRef, useState } from "react";
import Container from "../assets/styles/components/Container";
import Header from "../components/Header";
import BusinessBlue from "../assets/svg/businessBlue";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Platform,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../api/api";
import { colors } from "../assets/styles/colors";
import { StyleSheet } from "react-native";
import Button from "../customs/Button";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import InputCustom from "../customs/Input";
import { handleTermsPress } from "../utils/handleTermsPress";
import { handlePrivacyPress } from "../utils/handlePrivacyPress";
import TextContent from "../assets/styles/components/TextContent";
import Wave from "../customs/Wave";
import Flex from "../assets/styles/components/Flex";
import { useСondition } from "../context/stateContext";

const width = Dimensions.get("window").width - 32;
const widthd = Dimensions.get("window").width + 80;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [phone, setPhone] = useState({
    value: "+996 ",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });
  const [name, setName] = useState({
    value: "",
    error: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });
  const [register, setRegister] = useState(false);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(-activeTab * width)).current;
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const { fetchData } = useСondition();

  const handleTabPress = (index) => {
    if (activeTab === index) return;
    setActiveTab(index);
    Animated.timing(translateX, {
      toValue: index * -widthd,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    Animated.spring(indicatorPosition, {
      toValue: index * (width / 2),
      friction: 15,
      tension: 80,
      useNativeDriver: false,
    }).start();
  };
  const handleGestureEvent = (event) => {
    const { translationX } = event.nativeEvent;
    const minTranslateX = -widthd;
    const maxTranslateX = 0;
    const newTranslateX = Math.max(
      Math.min(translationX + -activeTab * widthd, maxTranslateX),
      minTranslateX
    );
    translateX.setValue(newTranslateX);
    const newIndicatorPosition = Math.max(
      Math.min(-translationX + (activeTab * width) / 2, width / 2),
      0
    );
    indicatorPosition.setValue(newIndicatorPosition);
  };

  const handleSwipeEnd = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -width / 3 && activeTab === 0) {
      handleTabPress(1);
    } else if (translationX > width / 3 && activeTab === 1) {
      handleTabPress(0);
    } else {
      Animated.timing(translateX, {
        toValue: activeTab * -widthd,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      Animated.spring(indicatorPosition, {
        toValue: activeTab * (width / 2),
        friction: 15,
        tension: 80,
        useNativeDriver: false,
      }).start();
    }
  };

  const formatPhoneNumberSend = (number) => {
    return number.replace(/\s+/g, "");
  };

  const handleSubmit = async () => {
    if (activeTab === 0 && phone.value.length !== 17) {
      setPhone({ ...phone, error: "Введите корректный телефонный номер" });
    } else {
      setLoading(true);
      const registerData = {
        username:
          activeTab === 0 ? formatPhoneNumberSend(phone.value) : email.value,
        password: password.value,
        confirm_password: passwordConfirm.value,
      };

      const loginData = {
        username:
          activeTab === 0 ? formatPhoneNumberSend(phone.value) : email.value,
        password: password.value,
      };

      try {
        if (register) {
          const response = await url.post(
            "auth/accounts/register/",
            registerData
          );

          if (response.data.response === true) {
            setPhone({ ...phone, error: "" });
            setEmail({ ...email, error: "" });
            setName({ ...name, error: "" });
            setPassword({ ...password, error: "" });
            setPasswordConfirm({ ...passwordConfirm, error: "" });
            navigation.navigate("Activation");
            await AsyncStorage.setItem(
              "profileData",
              activeTab === 0 ? email.value : phone.value
            );
          } else {
            setName({
              ...name,
              error: response.data?.name,
            });
            setEmail({
              ...email,
              error: response.data?.email,
            });
            setPhone({
              ...phone,
              error: response.data?.phone,
            });
            setPassword({
              ...password,
              error: response.data?.password,
            });
            setPasswordConfirm({
              ...passwordConfirm,
              error: response.data.confirm_password,
            });
            if (response.data.message) {
              Alert.alert("Ошибка", response.data.message);
            }
          }
        } else {
          const response = await url.post("auth/accounts/login/", loginData);
          if (response.data.response === true) {
            setPhone({ ...phone, error: "" });
            setEmail({ ...email, error: "" });
            setPassword({ ...password, error: "" });
            navigation.navigate("Profile");
            await AsyncStorage.setItem(
              "profileData",
              activeTab === 0 ? email.value : phone.value
            );
            await AsyncStorage.setItem("token", response.data.token);
            fetchData();
          } else {
            setEmail({
              ...email,
              error: response.data?.email,
            });
            setPhone({
              ...phone,
              error: response.data?.phone,
            });
            setPassword({
              ...password,
              error: response.data?.password,
            });
            if (response.data.message) {
              Alert.alert("Ошибка", response.data.message);
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatPhoneNumber = (text) => {
    let cleaned = text.replace(/\D/g, "").replace(/^996/, "");

    if (cleaned.length > 9) {
      cleaned = cleaned.slice(0, 9);
    }

    let formattedNumber = "+996 ";
    if (cleaned.length > 0) formattedNumber += cleaned.slice(0, 3);
    if (cleaned.length >= 4) formattedNumber += " " + cleaned.slice(3, 5);
    if (cleaned.length >= 6) formattedNumber += " " + cleaned.slice(5, 7);
    if (cleaned.length >= 8) formattedNumber += " " + cleaned.slice(7, 9);

    setPhone({ ...phone, value: formattedNumber, error: "" });
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <Container flex={true}>
        <Header back={true} homeBack={true}>
          Вход
        </Header>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <BusinessBlue />
        </View>
        <Animated.View
          style={{
            marginTop: 30,
            position: "relative",
          }}
        >
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => handleTabPress(0)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 0 && styles.activeTabText,
                ]}
              >
                Телефон
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress(1)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 1 && styles.activeTabText,
                ]}
              >
                Почта
              </Text>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[styles.indicator, { left: indicatorPosition }]}
          />
        </Animated.View>
      </Container>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleSwipeEnd}
      >
        <Animated.View
          style={[styles.contentContainer, { transform: [{ translateX }] }]}
        >
          <View style={styles.tabContent}>
            {register && (
              <InputCustom
                error={name.error}
                value={name.value}
                onChangeText={(text) =>
                  setName({ ...name, value: text, error: "" })
                }
                placeholder="Введите имя"
              />
            )}
            <InputCustom
              error={phone.error}
              value={phone.value}
              phone={true}
              numeric={true}
              onChangeText={formatPhoneNumber}
            />
            <InputCustom
              error={password.error}
              value={password.value}
              onChangeText={(text) =>
                setPassword({ ...password, value: text, error: "" })
              }
              placeholder="Введите пороль"
              password={true}
            />
            {register && (
              <InputCustom
                error={passwordConfirm.error}
                value={passwordConfirm.value}
                onChangeText={(text) =>
                  setPasswordConfirm({
                    ...passwordConfirm,
                    value: text,
                    error: "",
                  })
                }
                placeholder="Повторите пороль"
                password={true}
              />
            )}
            <Button color={colors.blue} handle={handleSubmit} loading={loading}>
              Продолжить
            </Button>
            <Flex
              top={12}
              style={{
                justifyContent: "center",
              }}
              gap={6}
            >
              <TextContent fontSize={14} fontWeight={400} color={colors.gray}>
                {register ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}
              </TextContent>
              <Wave handle={() => setRegister(!register)}>
                <TextContent fontSize={15} fontWeight={500} color={colors.blue}>
                  {register ? "Войти" : "Зарегистрироваться"}
                </TextContent>
              </Wave>
            </Flex>
          </View>
          <View style={styles.tabContent}>
            {register && (
              <InputCustom
                error={name.error}
                value={name.value}
                onChangeText={(text) =>
                  setName({ ...name, value: text, error: "" })
                }
                placeholder="Введите имя"
              />
            )}
            <InputCustom
              error={email.error}
              email={true}
              value={email.value}
              onChangeText={(text) =>
                setEmail({ ...email, value: text, error: "" })
              }
              placeholder="Введите электронную почту"
            />
            <InputCustom
              error={password.error}
              value={password.value}
              onChangeText={(text) =>
                setPassword({ ...password, value: text, error: "" })
              }
              placeholder="Введите пороль"
              password={true}
            />
            {register && (
              <InputCustom
                error={passwordConfirm.error}
                value={passwordConfirm.value}
                onChangeText={(text) =>
                  setPasswordConfirm({
                    ...passwordConfirm,
                    value: text,
                    error: "",
                  })
                }
                placeholder="Повторите пороль"
                password={true}
              />
            )}
            <Button color={colors.blue} handle={handleSubmit} loading={loading}>
              Продолжить
            </Button>
            <Flex
              top={12}
              style={{
                justifyContent: "center",
              }}
              gap={6}
            >
              <TextContent fontSize={14} fontWeight={400} color={colors.gray}>
                {register ? "Уже есть аккаунт?" : "Ещё нет аккаунта?"}
              </TextContent>
              <Wave handle={() => setRegister(!register)}>
                <TextContent fontSize={15} fontWeight={500} color={colors.blue}>
                  {register ? "Войти" : "Зарегистрироваться"}
                </TextContent>
              </Wave>
            </Flex>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.container}>
        <Text style={styles.text}>
          Продолжая авторизацию, вы соглашаетесь с{" "}
          <Text style={styles.link} onPress={handleTermsPress}>
            пользовательским соглашением
          </Text>{" "}
          и{" "}
          <Text style={styles.link} onPress={handlePrivacyPress}>
            политикой конфиденциальности
          </Text>
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    borderBottomColor: colors.phon,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    marginBottom: 12,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray,
  },
  activeTabText: {
    color: colors.black,
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    width: width / 2,
    height: 4,
    backgroundColor: colors.blue,
    borderRadius: 10,
  },
  contentContainer: {
    position: "static",
    left: -40,
    marginTop: 20,
    flexDirection: "row",
    width: widthd * 2,
    flex: 1,
  },
  tabContent: {
    width: widthd / 2,
    flex: 1,
    paddingHorizontal: 56,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS == "ios" ? 40 : 20,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    color: "#000",
  },
  link: {
    color: "#1856CD",
    textDecorationLine: "underline",
  },
});

export default Login;
