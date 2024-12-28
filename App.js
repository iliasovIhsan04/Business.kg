import React from "react";
import { StateHouseProvider } from "./context/stateHouseContext";
import { StateCarProvider } from "./context/stateCarContext";
import { СonditionProvider } from "./context/stateContext";
import { AuthProvider } from "./context/authContext";
import { StatusBar, View, Animated, Text, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import MainScreens from "./routes/main";
import store from "./store/store";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export default function App() {
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 16,
          fontWeight: "bold",
        }}
        text2Style={{
          fontSize: 14,
          color: "red",
        }}
      />
    ),
    my_custom_type: ({ text1, props }) => (
      <View
        style={{
          height: 60,
          width: "100%",
          backgroundColor: "#ffbf00",
          padding: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>{text1}</Text>
        <Text>{props.subtitle}</Text>
      </View>
    ),
  };

  return (
    <Provider store={store}>
      <СonditionProvider>
        <AuthProvider>
          <StateHouseProvider>
            <StateCarProvider>
              <MainScreens />
              <Toast config={toastConfig} />
            </StateCarProvider>
          </StateHouseProvider>
        </AuthProvider>
      </СonditionProvider>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
    </Provider>
  );
}
