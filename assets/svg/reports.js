import * as React from "react";
import Svg, {
  Rect,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Rect width={40} height={40} fill="url(#a)" rx={7.568} />
    <G strokeWidth={2} clipPath="url(#b)">
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.991 13.984 23.892 10l2.306 3.995-9.207-.01Z"
        clipRule="evenodd"
      />
      <Path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="round"
        d="M10 15a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1V15Z"
      />
      <Path stroke="#fff" strokeLinecap="round" d="M30 16.25v12" />
      <Path
        stroke="#6B88EB"
        strokeLinejoin="round"
        d="M31 24h-4.703C25.028 24 24 22.88 24 21.5s1.028-2.5 2.297-2.5H31"
      />
    </G>
    <Defs>
      <LinearGradient
        id="a"
        x1={3.5}
        x2={36.5}
        y1={33}
        y2={14.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#1B4DFC" />
        <Stop offset={1} stopColor="#7C94E6" />
      </LinearGradient>
      <ClipPath id="b">
        <Path fill="#fff" d="M8 8h24v24H8z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
