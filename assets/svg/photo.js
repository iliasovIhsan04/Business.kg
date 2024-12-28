import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path fill="#9D9D9D" d="M15 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <Path
      fill="#9D9D9D"
      d="M11.25 2.5 8.963 5H5a2.507 2.507 0 0 0-2.5 2.5v15C2.5 23.875 3.625 25 5 25h20c1.375 0 2.5-1.125 2.5-2.5v-15C27.5 6.125 26.375 5 25 5h-3.962L18.75 2.5h-7.5ZM15 21.25c-3.45 0-6.25-2.8-6.25-6.25s2.8-6.25 6.25-6.25 6.25 2.8 6.25 6.25-2.8 6.25-6.25 6.25Z"
    />
  </Svg>
);
export default SvgComponent;
