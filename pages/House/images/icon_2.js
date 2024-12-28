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
        d="M13.75 28.5v-10l-2.084 1.667 8.333-6.667 8.334 6.667-2.084-1.667v10h-12.5Z"
      />
      <Path
        stroke="#1E1E1E"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.916 23.083V28.5h4.167v-5.417h-4.167Z"
      />
      <Path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeWidth={2}
        d="M13.75 28.5h12.5"
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
