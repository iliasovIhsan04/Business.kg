import { Linking } from "react-native";

export const handlePrivacyPress = () => {
  Linking.openURL("https://example.com/privacy");
};
