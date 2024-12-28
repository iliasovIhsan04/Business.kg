import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke="#9D9D9D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M8 5.63C6.667 2.5 2 2.833 2 6.833s6 7.334 6 7.334 6-3.334 6-7.334c0-4-4.667-4.333-6-1.203Z"
    />
  </Svg>
);
export default SvgComponent;
