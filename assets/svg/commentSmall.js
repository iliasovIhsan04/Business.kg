import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke="#9D9D9D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M5.007 13.701a6 6 0 1 0-2.208-2.208l.002.004a.818.818 0 0 1 .084.168c.011.038.014.072.011.111a.754.754 0 0 1-.046.175l-.513 1.537v.002c-.109.325-.163.487-.124.595a.334.334 0 0 0 .202.202c.108.039.27-.015.593-.123l.004-.001 1.537-.513a.764.764 0 0 1 .175-.047c.04-.002.073.001.111.012a.82.82 0 0 1 .169.085l.003.001Z"
    />
  </Svg>
)
export default SvgComponent