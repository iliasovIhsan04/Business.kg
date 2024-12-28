import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ImagePlaceholder = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
      fill="#1B4DFC"
    />
  </Svg>
);

export default ImagePlaceholder; 