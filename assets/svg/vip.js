import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#FFCC02"
      stroke="#FFCC02"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.167}
      d="M3.792 12.75h6.416l1.75-6.125-2.917 1.458L7 4 4.958 8.083 2.041 6.625l1.75 6.125Z"
    />
    <Path
      stroke="#FFCC02"
      strokeWidth={1.167}
      d="M2.042 6.625a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75ZM7 4a.875.875 0 1 0 0-1.75A.875.875 0 0 0 7 4ZM11.959 6.625a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Z"
    />
  </Svg>
);
export default SvgComponent;
