import React, { useRef, useState } from "react";
import Container from "../../../assets/styles/components/Container";
import Header from "../../../components/Header";
import LayoutTab from "../../../layouts/tabs";
import {
  Animated,
  Dimensions,
  Easing,
  Platform,
  Text,
  View,
} from "react-native";
import { colors } from "../../../assets/styles/colors";
import { StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

const width = Dimensions.get("window").width - 32;
const widthd = Dimensions.get("window").width + 80;

const Slide = ({ data, searchData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(-activeTab * width)).current;
  const indicatorPosition = useRef(new Animated.Value(0)).current;

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
        backgroundColor: colors.white,
      }}
    >
      <Container flex={true}>
        <Header back={true}>Избранные</Header>
        <Animated.View
          style={{
            marginTop: 20,
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
                Объявления
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
                Поиски
              </Text>
            </TouchableOpacity>
          </View>
          <Animated.View
            style={[styles.indicator, { left: indicatorPosition }]}
          />
        </Animated.View>
      </Container>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleSwipeEnd}
      >
        <Animated.View
          style={[styles.contentContainer, { transform: [{ translateX }] }]}
        >
          <View style={styles.tabContent}>{data}</View>
          <View style={styles.tabContent}>{searchData}</View>
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
    borderBottomColor: colors.phon,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    marginBottom: 12,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray,
  },
  activeTabText: {
    color: colors.black,
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    width: width / 2,
    height: 4,
    backgroundColor: colors.blue,
    borderRadius: 10,
  },
  contentContainer: {
    position: "static",
    left: -40,
    flexDirection: "row",
    width: widthd * 2,
    flex: 1,
  },
  tabContent: {
    width: widthd / 2,
    flex: 1,
    paddingHorizontal: 56,
  },
});

export default Slide;
