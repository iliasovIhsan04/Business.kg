import React from "react";
import { Image, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

const ImageCustom = ({ uri, width, height, borderRadius }) => {
  if (!uri) return null;

  const fileExtension = uri.split(".").pop().toLowerCase();

  if (fileExtension === "svg") {
    return (
      <SvgUri
        width={width}
        height={height}
        uri={uri}
        style={[
          styles.image,
          {
            width: width,
            height: height,
            borderRadius: borderRadius,
          },
        ]}
      />
    );
  }
  
  return (
    <Image
      style={[
        styles.image,
        {
          width: width,
          height: height,
          borderRadius: borderRadius,
        },
      ]}
      source={{ uri }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    overflow: "hidden",
    resizeMode: "cover",
  },
});

export default ImageCustom;
