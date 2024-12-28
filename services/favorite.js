import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../api/api";
import { CustomAlert } from "../ui/Alert";
import { useNavigation } from "@react-navigation/native";

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  const navigation = useNavigation();
  if (!token) {
    navigation.navigate("Login");
  }
  return token;
};

const header = async () => {
  const token = await getToken();
  return {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
};

export const AddFavorite = async ({ id, car, setIsFavorite }) => {
  const type = car ? "car" : "house";
  try {
    const response = await url.get(`main/like/${id}/${type}/set_like/`, await header());
    console.log("Response data:", response.data);
    setIsFavorite(true);
    CustomAlert({
      type: "success",
      title: "Успешно!",
      text: "Добавлено в избранные",
    });
  } catch (error) {
    console.error("Error setting favorite:", error.message);
  }
};

export const RemoveFavorite = async ({ id, car, setIsFavorite, getFavorite }) => {
  const type = car ? "car" : "house";
  const data = [];

  try {
    const response = await url.get(`main/like/${id}/${type}/remove_like/`, await header());
    data.push(response.data);
    console.log(response.data);
    setIsFavorite(false);
    getFavorite();
    CustomAlert({
      type: "success",
      title: "Успешно!",
      text: "Удалено из избранные",
    });
  } catch (error) {
    console.error("Error removing favorite:", error.message);
  }

  return data;
};
