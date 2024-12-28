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
    <Path
      stroke="#1E1E1E"
      strokeWidth={2}
      d="M26.375 13.5h-12.75c-.621 0-1.125.504-1.125 1.125v12.75c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-12.75c0-.621-.504-1.125-1.125-1.125Z"
    />
    <Path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeWidth={2}
      d="M17.5 13.5v15M22.5 13.5v15M12.5 18.5h15M12.5 23.5h15"
    />
  </Svg>
)
export default SvgComponent
