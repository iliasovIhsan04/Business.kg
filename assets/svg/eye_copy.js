import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "../styles/colors";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke={colors.gray}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 12.5s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"
    />
    <Path
      stroke={colors.gray}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
);
export default SvgComponent;
