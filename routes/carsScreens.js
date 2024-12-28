import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CarFilter from "../pages/Car/CarFilter";
import CarResult from "../pages/Car/CarResult";
import CarDetail from "../pages/Car/CarDetail";
import CarBusinessList from "../pages/Car/CarBusinessList";
import CarPrivateProfile from "../pages/Car/CarPrivateProfile";
import CarBusinessProfile from "../pages/Car/CarBusinessProfile";
import AddCar from "../pages/Car/AddCar";
import CarrChek from "../pages/Car/CarrChek";
import CarBusinessListDetails from "../pages/Car/CarBusinessListDetails";

const Stack = createStackNavigator();

export default function CarScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="CarFilter" component={CarFilter} />
      <Stack.Screen name="CarResult" component={CarResult} />
      <Stack.Screen name="CarDetail" component={CarDetail} />
      <Stack.Screen name="CarPrivateProfile" component={CarPrivateProfile} />
      <Stack.Screen name="CarBusinessList" component={CarBusinessList} />
      <Stack.Screen name="CarBusinessProfile" component={CarBusinessProfile} />
      <Stack.Screen name="AddCar" component={AddCar} />
      <Stack.Screen name="CarChek" component={CarrChek} />
      <Stack.Screen name="CarBusinessLstDetails" component={CarBusinessListDetails} />
    </Stack.Navigator>
  );
}





