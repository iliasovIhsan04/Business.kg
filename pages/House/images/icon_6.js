import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Rect width={40} height={40} fill="#F1F3F7" rx={20} />
    <Path fill="#fff" fillOpacity={0.01} d="M29.167 10h-20v20h20V10Z" />
    <Path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.916 27.5v-10l-2.083 1.667 8.333-6.667 2.5 2"
    />
    <Path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeWidth={2}
      d="M12.917 27.5h7"
    />
    <Path fill="#fff" fillOpacity={0.01} d="M32.667 15.5h-15v15h15v-15Z" />
    <Path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.98}
      d="M21.744 19.875a3.438 3.438 0 0 1 6.846 0h.015a2.813 2.813 0 0 1 0 5.625H21.73a2.813 2.813 0 0 1 0-5.625h.014Z"
    />
    <Path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m25.167 24.25 1.563-1.563M25.167 23.313l-1.875-1.875"
    />
    <Path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.98}
      d="M25 28v-7"
    />
  </Svg>
)
export default SvgComponent
