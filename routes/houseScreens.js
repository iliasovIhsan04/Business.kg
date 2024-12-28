import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HouseFilter from "../pages/House/HouseFilter";
import AddHouse from "../pages/House/AddHouse";
import HouseCompanyProfile from "../pages/House/HouseCompanyProfile";
import HouseDetail from "../pages/House/HouseDetail";
import HouseResult from "../pages/House/HouseResult";
import HouseResidentialProfile from "../pages/House/HouseResidentialProfile";
import HouseCompanies from "../pages/House/HouseCompanies";
import HouseCompaniesDetail from "../pages/House/HouseCompaniesDetail";
import HousePrivateProfile from "../pages/House/HousePrivateProfile";

const Stack = createStackNavigator();

export default function HouseScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="HouseFilter" component={HouseFilter} />
      <Stack.Screen name="HouseResult" component={HouseResult} />
      <Stack.Screen name="HouseDetail" component={HouseDetail} />
      <Stack.Screen
        name="HouseCompanyProfile"
        component={HouseCompanyProfile}
      />
      <Stack.Screen
        name="HouseResidentialProfile"
        component={HouseResidentialProfile}
      />
      <Stack.Screen name="AddHouse" component={AddHouse} />
      <Stack.Screen name="HouseCompanies" component={HouseCompanies} />
      <Stack.Screen name="HouseCompaniesDetail" component={HouseCompaniesDetail} />
      <Stack.Screen name="HousePrivateProfile" component={HousePrivateProfile} />
    </Stack.Navigator>
  );
}
