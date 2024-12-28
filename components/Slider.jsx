import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Back from "../assets/svg/backWhite.js";
import { useNavigation } from "@react-navigation/native";
import Wave from "../customs/Wave.jsx";
import { colors } from "../assets/styles/colors.jsx";
import TextContent from "../assets/styles/components/TextContent.jsx";
import Flex from "../assets/styles/components/Flex.jsx";
import Love from "../assets/svg/heard.js";
import ImageViewer from "react-native-image-zoom-viewer";

const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth - 60;

const Slider = ({ img, height, back, detail, is_urgent }) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexTwo, setCurrentIndexTwo] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / imageWidth);
    setCurrentIndex(index);
  };
  const openModal = (index) => {
    setCurrentIndexTwo(index);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          backgroundColor: colors.white,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToInterval={imageWidth}
        decelerationRate="fast"
        scrollEventThrottle={16}
      >
        {img?.map((item, index) => (
          <Wave
            key={index}
            handle={() => openModal(index)}
            style={[
              styles.imgBox,
              {
                width: imageWidth,
                height: height || 250,
              },
              index === 0 && detail && { marginLeft: 16 },
              index === img.length - 1 && detail && { marginRight: 16 },
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={[
                styles.img,
                index === 0 && detail && styles.leftBorderRadius,
                index === img.length - 1 && detail && styles.rightBorderRadius,
              ]}
            />
            {is_urgent && (
              <View style={styles.urgentTag}>
                <TextContent style={styles.urgentText}>срочно</TextContent>
              </View>
            )}
          </Wave>
        ))}
      </ScrollView>

      <View style={styles.indexDisplay}>
        <TextContent style={styles.indexText}>
          {currentIndex + 1}/{img.length}
        </TextContent>
      </View>

      {!back && (
        <Wave style={styles.backIcon} handle={() => navigation.goBack()}>
          <Back />
        </Wave>
      )}

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalHeader}>
            <Flex gap={10}>
              <Wave style={styles.modalCloseButton} handle={closeModal}>
                <View style={{ width: 24, height: 24 }}>
                  <Back />
                </View>
              </Wave>
              <TextContent style={styles.modalTitle}>
                {currentIndexTwo + 1} из {img.length}
              </TextContent>
            </Flex>
            <Wave handle={closeModal}>
              <Love />
            </Wave>
          </View>
          <ImageViewer
            imageUrls={img.map((item) => ({ url: item.image }))}
            index={currentIndexTwo}
            onSwipeDown={closeModal}
            enableSwipeDown
            style={styles.modalImage}
            renderIndicator={() => null}
            onChange={(index) => setCurrentIndexTwo(index)}
            loadingRender={() => (
              <ActivityIndicator size="large" color="#fff" />
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  imgBox: {
    position: "relative",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  leftBorderRadius: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightBorderRadius: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  urgentTag: {
    top: 6,
    left: 6,
    position:'absolute',
    borderRadius: 4,
    backgroundColor: colors.red,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  urgentText: {
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "600",
    color: colors.white,
  },
  indexDisplay: {
    top: 6,
    right: 22,
    position: "absolute",
    borderRadius: 4,
    backgroundColor: "#08080899",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  indexText: {
    textTransform: "uppercase",
    fontSize: 14,
    fontWeight: "400",
    color: colors.white,
  },
  backIcon: {
    top: 50,
    left: 16,
    width: 30,
    height: 30,
    position: "absolute",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  modalImageWrapper: {
    width: windowWidth,
    height: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Slider;
