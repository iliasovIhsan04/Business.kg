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
        d="M11.666 28.5h16.667"
      />
      <Path
        stroke="#1E1E1E"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.834 21.833h-1.667a.833.833 0 0 0-.833.834v5c0 .46.373.833.833.833h1.667c.46 0 .833-.373.833-.833v-5a.833.833 0 0 0-.833-.834Z"
      />
      <Path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 25.167h.417"
      />
      <Path
        stroke="#1E1E1E"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M25.833 12.667h-8.334a.833.833 0 0 0-.833.833v14.167c0 .46.373.833.833.833h8.334c.46 0 .833-.373.833-.833V13.5a.833.833 0 0 0-.833-.833Z"
      />
      <Path
        fill="#1E1E1E"
        d="M20.833 15.167h-1.667v1.666h1.667v-1.666ZM24.167 15.167H22.5v1.666h1.667v-1.666ZM20.833 18.083h-1.667v1.667h1.667v-1.667ZM24.167 18.083H22.5v1.667h1.667v-1.667ZM24.167 21H22.5v1.667h1.667V21ZM24.167 23.917H22.5v1.666h1.667v-1.666Z"
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
