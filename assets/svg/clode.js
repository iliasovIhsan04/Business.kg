import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#9D9D9D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18 18-6-6m0 0L6 6m6 6 6-6m-6 6-6 6"
    />
  </Svg>
);
export default SvgComponent;
