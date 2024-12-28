import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HouseScreens from "./houseScreens";
import CarScreens from "./carsScreens";
import MainScreen from "../screens/MainScreen/MainScreen";
import Favorites from "../screens/Favorites/Favorites";
import Chat from "../screens/Chat/Chat";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "../assets/styles/colors";
import Profile from "../screens/Profile/Profile";
import Login from "../auth/login";
import Activation from "../auth/activation";
import ChangePassword from "../auth/сhangePassword";
import Report from "../screens/Report/Report";
import Balance from "../screens/Balance/Balance";
import AddCategory from "../pages/House/AddCategory";
import Notif from "../screens/Notif/Notif";
import MyDetails from "../screens/MyDetails/MyDetails";
import Tariffs from "../screens/Tariffs/Tariffs";
const Stack = createStackNavigator();

export default function MainScreens() {
  const [splash, setSplash] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start();
    
    const timer = setTimeout(() => {
      setSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#CB2905", "#1B4DFC"],
  });

  if (splash) {
    return (
      <Animated.View
        style={[
          styles.splashContainer,
          { backgroundColor: interpolatedBackgroundColor },
        ]}
      >
        <Animated.Text
          style={[
            styles.splashText,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          Business KG
        </Animated.Text>
      </Animated.View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}
          initialRouteName="MainScreen"
        >
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="HouseScreens" component={HouseScreens} />
          <Stack.Screen name="CarScreens" component={CarScreens} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Activation" component={Activation} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="Notifications" component={Notif} />
          <Stack.Screen name="Balance" component={Balance} />
          <Stack.Screen name="AddCategory" component={AddCategory} />
          <Stack.Screen name="MyDetails" component={MyDetails} />
          <Stack.Screen name="Tariffs" component={Tariffs} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});
