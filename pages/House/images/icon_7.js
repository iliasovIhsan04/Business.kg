import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
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
        strokeLinejoin="round"
        strokeWidth={2}
        d="M28.334 29.333v-15H11.667v15h4.167V21h8.333v8.333h4.167Z"
      />
      <Path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 29.333v-4.166"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M10 11h20v20H10z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
