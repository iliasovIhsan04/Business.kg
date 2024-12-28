import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TextInput, View, Alert } from "react-native";
import Header from "../../components/Header";
import Wrapper from "../../assets/styles/components/Wrapper";
import Column from "../../assets/styles/components/Column";
import Wave from "../../customs/Wave";
import TextContent from "../../assets/styles/components/TextContent";
import { colors } from "../../assets/styles/colors";
import { useСondition } from "../../context/stateContext";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DashBoard from "../../assets/svg/dashboard";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { url } from "../../api/api";
const MyDetails = () => {
  const { userData, setUserData, setHasChanges } = useСondition();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [imageUri, setImageUri] = useState(userData?._avatar);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [name, setName] = useState(userData?.name || "");
  const navigation = useNavigation();
  const toggleModal = (type) => {
    setModalType(type);
    setIsModalVisible(!isModalVisible);
  };
  const prevData = useRef({ email, phone, name });
  useEffect(() => {
    console.log("Жаңыланган маанилер:", { email, phone, name });
    const postUpdateValue = {
      new_name: name,
      new_email: email,
      new_phone: phone,
    };
    if (
      email !== prevData.current.email ||
      phone !== prevData.current.phone ||
      name !== prevData.current.name
    ) {
      console.log("Обновление отправляется");
      postUpdate(postUpdateValue);
      prevData.current = { email, phone, name };
    }
  }, [email, phone, name]);

  const postUpdate = async (postUpdateValue) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("Токен табылган жок");
      return;
    }
    console.log("Sending update request with:", postUpdateValue);
    setLoadUpdate(true);
    try {
      const response = await url.patch(
        "/auth/accounts/update/",
        postUpdateValue,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      if (response.status === 200) {
        console.log("Response:", response);
        setUserData({
          ...userData,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
        });
        setHasChanges(true);
      } else {
        console.log("Ошибка обновления", response);
        Alert.alert("Ошибка", "Не удалось обновить данные.");
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
      Alert.alert("Ошибка", "Не удалось обновить данные.");
    } finally {
      setLoadUpdate(false);
    }
  };

  const chooseImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Нужно разрешение на доступ к галерее");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
        base64: false,
      });
      if (!result.canceled && result.assets.length > 0) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        if (manipulatedImage.uri) {
          setImageUri(manipulatedImage.uri);
          await uploadImage(manipulatedImage.uri);
        } else {
          alert("Ошибка при обработке изображения");
        }
      } else {
        ("");
      }
    } catch (error) {
      console.error("Ошибка при выборе изображения:", error);
      alert("Ошибка при выборе изображения");
    }
  };
  const uploadImage = async (uri) => {
    if (!uri) {
      Alert.alert("Ошибка", "Пожалуйста, выберите изображение");
      return;
    }
    const formData = new FormData();
    formData.append("_avatar", {
      uri: uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await url.post(`/auth/accounts/avatar/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        Alert.alert("Успех", "Фото успешно изменено!");
        setHasChanges(true);
      } else {
        console.error("Ошибка при загрузке изображения:", response);
        Alert.alert("Ошибка", "Не удалось загрузить изображение.");
      }
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
      Alert.alert("Ошибка", "Не удалось загрузить изображение.");
    }
  };
  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Токен не найден");
        throw new Error("Токен не найден");
      }
      const response = await url.get("/auth/accounts/logout/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Выход выполнен успешно:", response.data);
        return response.data;
      } else {
        console.error("Ошибка при выходе, статус код:", response.status);
        throw new Error("Не удалось выполнить выход");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      throw error;
    }
  };
  const deleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("Токен не найден");
      }
      const response = await url.delete("/auth/accounts/delete-account/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 200) {
        Alert.alert("Аккаунт успешно удален:", response.data);
        return response.data;
      } else {
        Alert.alert(
          "Ошибка при удалении аккаунта, статус код:",
          response.status
        );
        Alert.alert("Не удалось удалить аккаунт");
      }
    } catch (error) {
      console.error("Ошибка при удалении аккаунта:", error);
      throw error;
    }
  };
  const handleConfirm = async () => {
    if (modalType === "logout") {
      try {
        await logout();
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("Profile");
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Ошибка при выходе: ", error);
        Alert.alert("Ошибка", "Не удалось выйти из аккаунта.");
      }
    } else if (modalType === "delete") {
      try {
        await deleteAccount();
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("Profile");
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Ошибка при удалении аккаунта:", error);
        Alert.alert("Ошибка", "Не удалось удалить аккаунт.");
      }
    }
    setIsModalVisible(false);
  };

  const formatPhone = (phone) => {
    const cleaned = phone.replace(/[^\d]/g, "");
    const match = cleaned.match(/^(\d{1,3})(\d{1,3})(\d{1,4})$/);
    if (match) {
      return `+${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <>
      <Header back={true} container={true}>
        Мои данные
      </Header>
      <Column gap={6}>
        <Wrapper padding={[16, 16]} top={true}>
          <View style={{ alignItems: "center" }}>
            <Column gap={6} style={{ alignItems: "center" }}>
              <Wave handle={chooseImage}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.avatar} />
                ) : (
                  <DashBoard />
                )}
              </Wave>
              <TextContent fontSize={20} fontWeight={600}>
                {userData?.name}
              </TextContent>
              <Wave handle={chooseImage}>
                <TextContent fontSize={14} fontWeight={500} color={colors.blue}>
                  Изменить фото
                </TextContent>
              </Wave>
            </Column>
          </View>
        </Wrapper>
        <Wrapper padding={["100%", 16]} bottom={true}>
          <Column gap={16}>
            <Column gap={4}>
              <TextContent fontSize={14} fontWeight={400} color={colors.black}>
                Электронная почта
              </TextContent>
              <TextInput
                style={[styles.input, styles.input_from_gray]}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Введите вашу почту"
              />
            </Column>
            <Column gap={4}>
              <TextContent fontSize={14} fontWeight={400} color={colors.black}>
                Номер телефона
              </TextContent>
              <TextInput
                style={[styles.input, styles.input_from_gray]}
                value={JSON.stringify(phone)}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9]/g, "");
                  setPhone(cleanedText);
                }}
                placeholder="Введите номер телефона"
                keyboardType="numeric"
              />
            </Column>
            <Column gap={4}>
              <TextContent fontSize={14} fontWeight={400} color={colors.black}>
                Имя
              </TextContent>
              <TextInput
                style={[styles.input]}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Введите ваше имя"
              />
            </Column>
          </Column>
          <Column gap={24} style={styles.marginTop}>
            <Wave handle={() => navigation.navigate("ChangePassword")}>
              <TextContent fontSize={16} fontWeight={500} color={colors.blue}>
                Сменить пароль
              </TextContent>
            </Wave>
            <Wave handle={() => toggleModal("logout")}>
              <TextContent fontSize={16} fontWeight={500} color={colors.red}>
                Выйти
              </TextContent>
            </Wave>
            <Wave handle={() => toggleModal("delete")}>
              <TextContent fontSize={16} fontWeight={500} color={colors.red}>
                Удалить аккаунт
              </TextContent>
            </Wave>
          </Column>
        </Wrapper>
      </Column>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Column gap={16}>
            <TextContent fontSize={20} fontWeight={600} color={colors.black}>
              {modalType === "logout"
                ? "Выйти с аккаунта?"
                : "Удалить аккаунт?"}
            </TextContent>
            <TextContent fontSize={14} fontWeight={400} color={colors.gray}>
              {modalType === "logout"
                ? "Вам придется повторно выполнить авторизацию"
                : "При удалении аккаунта вся ваша информация будет навсегда удалена."}
            </TextContent>
            <View style={styles.modalButtons}>
              <Wave
                handle={() => setIsModalVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <TextContent
                  fontSize={16}
                  fontWeight={500}
                  color={colors.dark_gray}
                >
                  Отмена
                </TextContent>
              </Wave>
              <Wave
                handle={handleConfirm}
                style={[styles.button, styles.confirmButton]}
              >
                <TextContent
                  fontSize={16}
                  fontWeight={500}
                  color={colors.white}
                >
                  {modalType === "logout" ? "Выйти" : "Удалить"}
                </TextContent>
              </Wave>
            </View>
          </Column>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.phon,
  },
  input_from_gray: {
    backgroundColor: "#D0D0D0",
  },
  marginTop: {
    marginTop: 24,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    paddingBottom: 30,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#E3E3E3",
  },
  confirmButton: {
    backgroundColor: colors.red,
  },
});

export default MyDetails;
