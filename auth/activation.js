import React, { useRef, useState } from "react";
import Container from "../assets/styles/components/Container";
import Header from "../components/Header";
import { colors } from "../assets/styles/colors";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { url } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BusinessBlue from "../assets/svg/businessBlue";
import Button from "../customs/Button";
import { handleTermsPress } from "../utils/handleTermsPress";
import { handlePrivacyPress } from "../utils/handlePrivacyPress";

const Form = ({ code, setCode }) => {
  const inputs = useRef([]);

  const handleInputChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (index < 5 && text) {
        inputs.current[index + 1].focus();
      }
    }
  };
  
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      const newCode = [...code];
      if (index > 0 && code[index] === "") {
        newCode[index - 1] = "";
        setCode(newCode);
        inputs.current[index - 1].focus();
      } else {
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };
  return (
    <View style={{ height: 80, position: "relative" }}>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <View key={index} style={styles.container}>
            <TextInput
              style={styles.input}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
              keyboardType="numeric"
              ref={(ref) => (inputs.current[index] = ref)}
              editable
              autoFocus={index === 0}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
const Activation = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const formattedCode = code.join("");
    if (formattedCode.length !== 6) {
      Alert.alert("Ошибка", "Введите шестизначный код");
      return;
    }
    setLoading(true);
    const profileData = await AsyncStorage.getItem("profileData"); 
    console.log(profileData);
    try {
      const response = await url.post("auth/accounts/activate/", {
        code: formattedCode,
        username: profileData,
      });
      if (response.data.response === true) {
        Alert.alert("Успешно", response.data.message);
        await AsyncStorage.setItem("token", response.data.token);
        navigation.navigate("Profile");
      } else {
        if (response.data.error === "user_already_exists") {
          Alert.alert("Ошибка", "Такой номер уже существует"); 
        } else if (response.data.error === "invalid_code") {
          Alert.alert("Ошибка", "Неверный код");
        } else {
          Alert.alert("Ошибка", response.data.message || "Код или данные некорректны");
        }
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Ошибка", "Пожалуйста, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  };
  const Again = async () => {
    const email = await AsyncStorage.getItem("email");
    try {
      const response = await url.post("/auth/re-send", {
        email: email,
      });
      if (response.data.response) {
        Alert.alert("Успешно", response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <Container>
        <Header back={true}>Код подтверждения</Header>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <BusinessBlue />
        </View>
        <Text style={styles.description}>
          Мы отправили 6и значный код на ваш номер телефона
        </Text>
        <Form code={code} setCode={setCode} />
        <Button
          top={20}
          color={colors.blue}
          handle={handleSubmit}
          loading={loading}
        >
          Продолжить
        </Button>
        <View style={styles.againContainer}>
          <TouchableOpacity onPress={() => Again()}>
            <Text style={styles.againText}>Отправить снова</Text>
          </TouchableOpacity>
        </View>
      </Container>
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
    </View>
  );
};

const styles = StyleSheet.create({
  againText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.blue,
  },
  againContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  description: {
    alignSelf: "center",
    maxWidth: 300,
    marginTop: 14,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: colors.gray,
  },
  codeContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  container: {
    width: 50,
    height: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: colors.phon,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: colors.black,
    borderRadius: 8,
  },
  container: {
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

export default Activation;
