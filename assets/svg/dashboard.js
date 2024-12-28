import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    fill="none"
    {...props}
  >
    <Rect width={100} height={100} fill="#1B4DFC" fillOpacity={0.15} rx={50} />
    <Path
      fill="#427EFF"
      fillOpacity={0.43}
      d="M62.94 34.214c0 7.335-5.947 13.281-13.282 13.281S36.377 41.55 36.377 34.214c0-7.335 5.946-13.281 13.28-13.281 7.336 0 13.282 5.946 13.282 13.28ZM72.236 64.76c0 8.07-10.109 14.61-22.578 14.61-12.47 0-22.578-6.54-22.578-14.61 0-8.068 10.108-14.609 22.578-14.609 12.47 0 22.578 6.541 22.578 14.61Z"
    />
  </Svg>
)
export default SvgComponent
