import { Image } from "react-native";
import { SvgUri } from "react-native-svg";

export const renderImage = ({ uri, width, style, height }) => {
  if (uri) {
    const fileExtension = uri.split(".").pop().toLowerCase();

    if (fileExtension === "svg") {
      return <SvgUri style={style} width={width} height={height} uri={uri} />;
    } else {
      return (
        <Image
          style={[
            {
              width: width,
              height: height,
              objectFit: "cover",
              resizeMode: "cover",
            },
            style,
          ]}
          source={{ uri }}
        />
      );
    }
  }
};
