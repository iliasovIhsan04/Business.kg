import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" fillOpacity={0.01} d="M24 0H0v24h24V0Z" />
      <Path
        stroke="#9D9D9D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        clipRule="evenodd"
      />
      <Path
        stroke="#9D9D9D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2 12h20"
      />
      <Path
        stroke="#9D9D9D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 22c2.21 0 4-4.477 4-10S14.21 2 12 2 8 6.477 8 12s1.79 10 4 10Z"
        clipRule="evenodd"
      />
      <Path
        stroke="#9D9D9D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.93 5.071A9.969 9.969 0 0 0 12 8a9.969 9.969 0 0 0 7.072-2.929M19.072 18.929A9.969 9.969 0 0 0 12 16a9.969 9.969 0 0 0-7.071 2.929"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
