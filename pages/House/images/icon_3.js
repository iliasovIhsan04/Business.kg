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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m14.584 16.833 5.833-4.166v16.666h-5.833v-12.5Z"
        clipRule="evenodd"
      />
      <Path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m20.416 16.417 5.833 4.166v8.75M11.666 29.333h16.667"
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
