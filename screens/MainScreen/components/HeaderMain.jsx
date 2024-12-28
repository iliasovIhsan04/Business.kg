import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
  Easing,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { colors } from "../../../assets/styles/colors";
import Business from "../svg/business";
import { useСondition } from "../../../context/stateContext";
import Bell from "../../../assets/svg/bell";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width - 32;
const widthd = Dimensions.get("window").width + 80;

const HeaderMain = ({ carContent, houseContent }) => {
  const { condition, CarActive, HouseActive } = useСondition();
  const [activeTab, setActiveTab] = useState(condition ? 1 : 0);
  const translateX = useRef(new Animated.Value(-activeTab * width)).current;
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    if (activeTab === 0) {
      CarActive();
    } else {
      HouseActive();
    }
  }, [activeTab]);

  const handleTabPress = (index) => {
    if (activeTab === index) return;
    setActiveTab(index);
    Animated.timing(translateX, {
      toValue: index * -widthd,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    Animated.spring(indicatorPosition, {
      toValue: index * (width / 2),
      friction: 15,
      tension: 80,
      useNativeDriver: false,
    }).start();
  };
  const handleGestureEvent = (event) => {
    const { translationX } = event.nativeEvent;
    const minTranslateX = -widthd;
    const maxTranslateX = 0;
    const newTranslateX = Math.max(
      Math.min(translationX + -activeTab * widthd, maxTranslateX),
      minTranslateX
    );
    translateX.setValue(newTranslateX);
    const newIndicatorPosition = Math.max(
      Math.min(-translationX + (activeTab * width) / 2, width / 2),
      0
    );
    indicatorPosition.setValue(newIndicatorPosition);
  };

  const handleSwipeEnd = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -width / 3 && activeTab === 0) {
      handleTabPress(1);
    } else if (translationX > width / 3 && activeTab === 1) {
      handleTabPress(0);
    } else {
      Animated.timing(translateX, {
        toValue: activeTab * -widthd,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
      Animated.spring(indicatorPosition, {
        toValue: activeTab * (width / 2),
        friction: 15,
        tension: 80,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 70 : 52,
        backgroundColor: activeTab === 0 ? colors.blue : colors.house,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <View style={{ width: 24, height: 24 }} />
        <Business />
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Bell />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <Animated.View
          style={{
            marginTop: 28,
            position: "relative",
          }}
        >
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => handleTabPress(0)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 0 && styles.activeTabText,
                ]}
              >
                Машины
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress(1)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 1 && styles.activeTabText,
                ]}
              >
                Дома
              </Text>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[styles.indicator, { left: indicatorPosition }]}
          />
        </Animated.View>
      </View>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleSwipeEnd}
      >
        <Animated.View
          style={[styles.contentContainer, { transform: [{ translateX }] }]}
        >
          <View style={styles.tabContent}>{carContent}</View>
          <View style={styles.tabContent}>{houseContent}</View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    borderBottomColor: "#FFFFFFB2",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    marginBottom: 16,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFFB2",
  },
  activeTabText: {
    color: colors.white,
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    width: width / 2,
    height: 4,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  contentContainer: {
    position: "static",
    left: -40,
    marginTop: 20,
    flexDirection: "row",
    width: widthd * 2,
    flex: 1,
  },
  tabContent: {
    width: widthd / 2,
    flex: 1,
    paddingHorizontal: 40,
  },
});

export default HeaderMain;
