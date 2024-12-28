import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#FFCC02"
        stroke="#FFCC02"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.167}
        d="M1.525 5.526a.292.292 0 0 0-.163.504L3.95 8.424a.292.292 0 0 1 .088.272l-.688 3.458a.292.292 0 0 0 .43.312l3.077-1.723a.29.29 0 0 1 .285 0l3.077 1.723a.292.292 0 0 0 .428-.312l-.687-3.459a.291.291 0 0 1 .088-.27l2.589-2.395a.292.292 0 0 0-.163-.504l-3.503-.415a.291.291 0 0 1-.23-.168L7.265 1.741a.292.292 0 0 0-.53 0L5.258 4.943a.292.292 0 0 1-.23.168l-3.503.415Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h14v14H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
