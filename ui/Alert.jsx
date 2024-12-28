import Toast from "react-native-toast-message";

export const CustomAlert = ({ type, title, text }) => {
  Toast.show({
    type: type,
    text1: title,
    text2: text,
    position: "bottom",
    visibilityTime: 3000,
    onPress: () => Toast.hide(),
  });
};
