import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M1.601 10.708.285 1.903A1 1 0 0 1 1.72.86l24.49 12.246a1 1 0 0 1 0 1.788L1.704 27.148a1 1 0 0 1-1.437-1.035l1.334-9.43a1 1 0 0 1 .862-.851l7.59-.982c1.137-.148 1.171-1.782.041-1.978L2.42 11.545a1 1 0 0 1-.819-.837Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={28}
        x2={-0.061}
        y1={28}
        y2={0.062}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#CB2905" />
        <Stop offset={1} stopColor="#1B4DFC" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
