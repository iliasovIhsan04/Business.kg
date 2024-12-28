import React, { useState } from "react";
import Header from "../../components/Header";
import Wrapper from "../../assets/styles/components/Wrapper";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import Column from "../../assets/styles/components/Column";
import { colors } from "../../assets/styles/colors";
import TextContent from "../../assets/styles/components/TextContent";
import Button from "../../customs/Button";
import Photo from "../../assets/svg/photo.js";
import Between from "../../assets/styles/components/Between";
import Wave from "../../customs/Wave";
import axios from "axios";
const CarrChek = () => {
  const [activeTab, setActiveTab] = useState("vin");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const Carchek = async () => {
    if (!inputValue.trim()) {
      alert("Пожалуйста, введите значение.");
      return;
    }
    setUserData(null);
    try {
      setLoading(true);
      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MzI2Mjk5MDUsImV4cCI6MjA0Nzk4OTkwNSwidXNlcm5hbWUiOiI5OTY3MDkzNjIzNjAiLCJpcCI6IjE2Mi4xNTguNzkuMTc5IiwiaWQiOjk2Mzc3OSwicGhvbmUiOiI5OTY3MDkzNjIzNjAiLCJuYW1lIjoiIn0.QF2DRk_gI-zgXZARmJwJi-6bp8e28GtJqoQeb7xk3wJNYdbh7qXwk66nZsH-FhumWPyIhbSDdjyPIPsQnUCN9HBiIKE69aNWYGA36Iqrias2jySAw6KgtiXzSSuyC4nnY18VUNX1g240gnsADBNoEK0gLaCTvHUc9xbWTgBpXZc7bKw9uxYXyXjlREeg3Hd6RTDHjzfaOGD-8AIQswijFTacrlH3gxg5fUcST820D0MnnjtG-r3sBu46uAyzOpco7fCcYSJ2jfhP1tWqgH0_VkcL2v2iGisrtTUosJjvXSVmMwCGy9n8YiCZldkCmmDYzCxPLc9cy4e7mYSeSAvKlE9CiS41rRrq8YnbB3a9OUv9GzHTjUefhLpP0615cJqNHmN6ufDIUPXPrYIw_q0Abtw6e_8xZ1fs3R86TGLsR-kn0eCx7LF2gF89DVbbqaHsH8dcGCJpIexiZIPnMwmOk0I3uUWr63m0Ohsi0CL1KiZ7frTWgdVIJSXNH4Oq-HoGY-lAl0hEVD3sXlIfeJ-NHXR17xFKrdzq2F8XFdE9VCEgS60Mae1MPg7wWtnFzstUx5JKmBS2rlPNw7CgD0epmEhfLgc8Lr8Zysj-4ImO3uNOr4Iy42Bh3fDFSrj27yLhFYV44ckTEcUoHqYPbZuPX7GqIsfynJDMb377BJfNJnM";
      const url = `https://doubledragon.mashina.kg:443/v1/public/gov/carcheck?license_plate=${inputValue}`;
      console.log("Запрос отправляется на URL:", url);
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "auto-auth":
            "o0DfPm0UNcXwHFJpeKcNu8DxEGulHpUwuyXUvmVuDepb45tkTEjM8M42uryf9SAVqwXN1ct5C",
        },
      });
      if (response.data && Object.keys(response.data).length > 0) {
        setUserData(response.data);
        alert("Данные успешно получены.");
      } else {
        alert("Данные не найдены.");
      }
    } catch (error) {
      alert("Произошла ошибка при запросе данных.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Column gap={6}>
      <Wrapper top={true}>
        <Header homeBack={true} back={true}>
          Carcheck
        </Header>
      </Wrapper>
      <Wrapper padding={[16, 16]}>
        <Column gap={16}>
          <View style={styles.tab_container}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "vin" && styles.active_tab]}
              onPress={() => setActiveTab("vin")}
            >
              <TextContent
                fontSize={15}
                fontWeight={500}
                color={activeTab === "vin" ? colors.white : colors.black}
              >
                По Vin коду
              </TextContent>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "number" && styles.active_tab]}
              onPress={() => setActiveTab("number")}
            >
              <TextContent
                fontSize={15}
                fontWeight={500}
                color={activeTab === "number" ? colors.white : colors.black}
              >
                По гос номери
              </TextContent>
            </TouchableOpacity>
          </View>
          <Between style={styles.vin_input_box}>
            <TextInput
              style={styles.vin_input}
              placeholder="Введите госномер"
              placeholderTextColor={colors.gray}
              value={inputValue}
              onChangeText={(text) => setInputValue(text.toUpperCase())}
            />
            <Wave>
              <Photo />
            </Wave>
          </Between>
          <Button
            color={colors.blue}
            textColor={colors.white}
            disabled={loading}
            handle={Carchek}
          >
            {loading ? "Идет поиск..." : "Найти"}
          </Button>
        </Column>
      </Wrapper>
      <View style={styles.box_end}>
        <TextContent fontSize={20} fontWeight={600} color={colors.black}>
          Наши источники данных
        </TextContent>
        <Column gap={8} style={{ marginTop: 16 }}>
  {loading ? (
    <TextContent fontSize={16} color={colors.gray} fontWeight={400}>
      Поиск данных...
    </TextContent>
  ) : userData ? Object.keys(userData).length > 0 ? (
    <>
      <Column>
        <TextContent fontSize={14} color={colors.gray} fontWeight={400}>
          Госномер:
        </TextContent>
        <TextContent fontSize={16} color={colors.black} fontWeight={500}>
          {userData?.car?.govPlate || "Данные отсутствуют"}
        </TextContent>
      </Column>
      <Column>
        <TextContent fontSize={14} color={colors.gray} fontWeight={400}>
          Марка/модел:
        </TextContent>
        <TextContent fontSize={16} color={colors.black} fontWeight={500}>
          {userData?.car?.brand || "Неизвестно"} / {userData?.car?.model || "Неизвестно"}
        </TextContent>
      </Column>
      <Column>
        <TextContent fontSize={14} color={colors.gray} fontWeight={400}>
          Год выпуска:
        </TextContent>
        <TextContent fontSize={16} color={colors.black} fontWeight={500}>
          {userData?.car?.year || "Данные отсутствуют"}
        </TextContent>
      </Column>
      <Column>
        <TextContent fontSize={14} color={colors.gray} fontWeight={400}>
          Объем двигателя:
        </TextContent>
        <TextContent fontSize={16} color={colors.black} fontWeight={500}>
          {userData?.car?.engineVolume || "Данные отсутствуют"}
        </TextContent>
      </Column>
      <Column>
        <TextContent fontSize={14} color={colors.gray} fontWeight={400}>
          Тип топлива:
        </TextContent>
        <TextContent fontSize={16} color={colors.black} fontWeight={500}>
          {userData?.car?.motorType || "Данные отсутствуют"}
        </TextContent>
      </Column>
      <Column>
        <TextContent fontSize={14} color={colors.gray} fontWeight={400}>
          Разрешение на тонировку стекол:
        </TextContent>
        <TextContent fontSize={16} color={colors.black} fontWeight={500}>
          {userData?.car?.tintingWindow?.length > 0
            ? userData.car.tintingWindow.join(", ")
            : "Отсутствует"}
        </TextContent>
      </Column>
      <Column>
        <TextContent fontSize={14} color={colors.gray} fontWeight={400}>
          Особые отметки:
        </TextContent>
        <TextContent fontSize={16} color={colors.black} fontWeight={500}>
          {userData?.car?.specialNotes?.length > 0
            ? userData.car.specialNotes.join(", ")
            : "Отсутствует"}
        </TextContent>
      </Column>
    </>
  )  : (
    <TextContent fontSize={16} color={colors.red} fontWeight={400}>
      Данные не найдены.
    </TextContent>
  )
 : null}
</Column>
      </View>
    </Column>
  );
};
const styles = StyleSheet.create({
  box_end: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tab_container: {
    flexDirection: "row",
    width: "100%",
    height: 36,
    backgroundColor: colors.phon,
    borderRadius: 8,
    paddingVertical: 2,
  },
  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  active_tab: {
    backgroundColor: colors.black,
  },
  vin_input_box: {
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: colors.phon,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  vin_input: {
    width: "80%",
    height: "100%",
    color: colors.black,
    backgroundColor: colors.phon,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "400",
  },
});

export default CarrChek;
