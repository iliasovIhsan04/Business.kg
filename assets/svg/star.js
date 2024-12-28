import * as React from "react"
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Rect width={40} height={40} fill="url(#a)" rx={7.568} />
    <Rect width={40} height={40} fill="url(#b)" rx={7.568} />
    <Path
      fill="#fff"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M12.18 17.894a.417.417 0 0 0-.234.72l3.699 3.42a.416.416 0 0 1 .125.388l-.982 4.94a.417.417 0 0 0 .613.445l4.397-2.46a.416.416 0 0 1 .406 0l4.396 2.46a.417.417 0 0 0 .612-.444l-.981-4.942a.416.416 0 0 1 .125-.387l3.699-3.42a.417.417 0 0 0-.233-.72l-5.004-.594a.416.416 0 0 1-.329-.239l-2.11-4.575a.417.417 0 0 0-.757 0l-2.11 4.575a.417.417 0 0 1-.33.24l-5.002.593Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        x2={44}
        y1={41.5}
        y2={5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="red" />
        <Stop offset={1} stopColor="#FFD3E0" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={38.044}
        x2={15.584}
        y1={0.765}
        y2={47.491}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF78F1" />
        <Stop offset={1} stopColor="#267CFD" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
