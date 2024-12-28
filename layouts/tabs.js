import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../assets/styles/colors";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import Home from "../assets/svg/tabs/main";
import Cart from "../assets/svg/tabs/chat";
import Catalog from "../assets/svg/tabs/love";
import Person from "../assets/svg/tabs/user";
import Add from "../assets/svg/tabs/add";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useСondition } from "../context/stateContext";
import Wave from "../customs/Wave";

const { width: screenWidth } = Dimensions.get("window");

const LayoutTab = ({ fanc, scroll, children }) => {
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);
  const [refreshing, setRefreshing] = useState(false);
  const { condition } = useСondition();

  const names = navigationState.routes[navigationState.index].name;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fanc().finally(() => setRefreshing(false));
  }, []);

  const TabItem = ({ isActive, onPress, Icon, label }) => (
    <Wave handle={onPress} style={styles.circle}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Icon active={isActive} />
        <Text style={[styles.text, isActive && styles.textActive]}>
          {label}
        </Text>
      </View>
    </Wave>
  );

  return (
    <View style={styles.rel_tab}>
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
      <View style={styles.ab_tab}>
        <TabItem
          isActive={names === "MainScreen"}
          onPress={() => navigation.navigate("MainScreen")}
          Icon={Home}
          label="Главная"
        />
        <TabItem
          isActive={names === "Favorites"}
          onPress={async () => {
            const token = await AsyncStorage.getItem("token");
            navigation.navigate(token ? "Favorites" : "Login");
          }}
          Icon={Catalog}
          label="Избранные"
        />
        <View style={styles.floatingButtonContainer}>
          <Wave
            handle={async () => {
              const token = await AsyncStorage.getItem("token");
              if (token) {
                if (condition) {
                  navigation.navigate("AddCategory", {
                    params: { name: "false" },
                  });
                } else {
                  navigation.navigate("CarScreens", { screen: "AddCar" });
                }
              } else {
                navigation.navigate("Login");
              }
            }}
            width={"100%"}
            height={"100%"}
          >
            <View
              style={[
                styles.floatingButton,
                {
                  backgroundColor: condition ? colors.house : colors.blue,
                },
              ]}
            >
              <Add />
            </View>
          </Wave>
        </View>
        <TabItem
          isActive={names === "Chat"}
          onPress={async () => {
            const token = await AsyncStorage.getItem("token");
            navigation.navigate(token ? "Chat" : "Login");
          }}
          Icon={Cart}
          label="Чат"
        />
        <TabItem
          isActive={names === "Profile"}
          onPress={async () => {
            const token = await AsyncStorage.getItem("token");
            navigation.navigate(token ? "Profile" : "Login");
          }}
          Icon={Person}
          label="Профиль"
        />
      </View>
    </View>
  );
};

export default LayoutTab;

const styles = StyleSheet.create({
  rel_tab: {
    flex: 1,
    position: "relative",
  },
  ab_tab: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    minHeight: 40,
    borderTopColor: "#F1F1F1",
    borderTopWidth: 1,
    shadowColor: "#474747",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
  },
  circle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  floatingButtonContainer: {
    position: "relative",
    top: -20,
    width: screenWidth * 0.14,
    height: screenWidth * 0.14,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButton: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.gray,
  },
  textActive: {
    color: colors.black,
  },
});
