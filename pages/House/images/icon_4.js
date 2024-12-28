import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Rect width={40} height={40} fill="#F1F3F7" rx={20} />
    <G clipPath="url(#a)">
      <Path fill="#fff" fillOpacity={0.01} d="M30 11H10v20h20V11Z" />
      <Path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.334 16c0-.69.56-1.25 1.25-1.25h10.833c.69 0 1.25.56 1.25 1.25v4.583H13.334V16ZM12.5 25.583v1.667M27.5 25.583v1.667"
      />
      <Path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.334 18.5h-2.5c-.69 0-1.25.56-1.25 1.25v.833h5v-.833c0-.69-.56-1.25-1.25-1.25ZM24.166 18.5h-2.5c-.69 0-1.25.56-1.25 1.25v.833h5v-.833c0-.69-.56-1.25-1.25-1.25ZM11.666 21.833c0-.69.56-1.25 1.25-1.25h14.167c.69 0 1.25.56 1.25 1.25v3.75H11.666v-3.75Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M10 11h20v20H10z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
