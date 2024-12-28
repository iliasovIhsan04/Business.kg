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
        d="M1.526 5.526a.292.292 0 0 0-.164.504l2.59 2.394a.292.292 0 0 1 .087.272l-.687 3.458a.292.292 0 0 0 .429.312l3.077-1.723a.29.29 0 0 1 .285 0l3.077 1.723a.292.292 0 0 0 .429-.312l-.687-3.459a.291.291 0 0 1 .088-.27l2.588-2.395a.292.292 0 0 0-.163-.504l-3.502-.415a.291.291 0 0 1-.23-.168L7.265 1.741a.292.292 0 0 0-.53 0L5.26 4.943a.292.292 0 0 1-.231.168l-3.502.415Z"
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
