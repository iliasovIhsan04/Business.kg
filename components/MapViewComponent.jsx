import React, { useState } from "react";
import { Modal, Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../assets/styles/colors";
import Button from "../customs/Button";
import Wave from "../customs/Wave";
import Back from "../assets/svg/back";
import MapView, { Marker } from "react-native-maps";
import WebView from "react-native-webview";

const MapViewComponent = ({ coord1, coord2, names, descriptions }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const latitude = coord1;
  const longitude = coord2;
  const name = "Title" || names;
  const description = `${"Kyrgyzstan"}, ${"Bishkek"}` || descriptions;

  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markerCoordinate = {
    latitude: latitude,
    longitude: longitude,
  };

  const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Map</title>
            <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
            <style>
                html, body, #map {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                ymaps.ready(init);
    
                function init() {
                    var myMap = new ymaps.Map("map", {
                        center: [${latitude}, ${longitude}],
                        zoom: 14
                    });
    
                    // Создание кастомного макета иконки
                    var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div style="color: #000; font-weight: bold;">$[properties.iconContent]</div>'
                    );
    
                    var myPlacemark = new ymaps.Placemark([${latitude}, ${longitude}], {
                        hintContent: '${name}',
                        balloonContent: '${description}'
                    }, {
                        iconLayout: 'default#image',
                        // Путь к кастомной иконке (можно заменить на любой другой)
                        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Замените на нужный URL
                        // Размеры иконки
                        iconImageSize: [40, 40], // Увеличенные размеры
                        // Смещение иконки
                        iconImageOffset: [-20, -40]
                    });
    
                    myMap.geoObjects.add(myPlacemark);
                }
            </script>
        </body>
        </html>
      `;

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Button
        top={16}
        handle={() => setModalVisible(true)}
        color={colors.phon}
        textColor={colors.black}
      >
        Посмотреть на карте
      </Button>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.map}>
          <View style={styles.mapHeader}>
            <View
              style={{
                width: "100%",
                height: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <Wave handle={() => setModalVisible(false)}>
                  <Back />
                </Wave>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    width: "80%",
                    fontSize: 18,
                    fontWeight: "500",
                    color: colors.black,
                  }}
                >
                  {name}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.mapBody}>
            {Platform.OS == "ios" ? (
              <MapView
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                <Marker
                  coordinate={markerCoordinate}
                  title={name}
                  description={description}
                />
              </MapView>
            ) : (
              <WebView
                originWhitelist={["*"]}
                source={{ html: htmlContent }}
                style={{
                  width: Dimensions.get("window").width,
                  flex: 1,
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mapHeader: {
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 60 : 42,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomColor: "#F1F1F1",
    borderBottomWidth: 0.5,
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mapBody: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapViewComponent;
