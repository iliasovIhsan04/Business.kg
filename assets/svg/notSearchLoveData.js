import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={73}
    height={72}
    fill="none"
    {...props}
  >
    <Path
      stroke="#F1F3F7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6}
      d="m45.5 45 18 18m-33-12c-11.598 0-21-9.402-21-21 0-8.555 5.116-15.915 12.455-19.189A20.926 20.926 0 0 1 30.5 9c11.598 0 21 9.402 21 21 0 3.22-.725 6.272-2.02 9-3.371 7.095-10.603 12-18.98 12Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4.125}
      d="M44 10.115C39.667-.474 24.5.654 24.5 14.188 24.5 27.72 44 39 44 39s19.5-11.279 19.5-24.812C63.5.654 48.333-.474 44 10.115Z"
    />
    <Path
      fill="#D0D0D0"
      stroke="#D0D0D0"
      strokeLinecap="round"
      strokeWidth={4.125}
      d="M44 11.783c-3.667-8.607-16.5-7.69-16.5 3.31S44 35.26 44 35.26s16.5-9.167 16.5-20.167c0-11-12.833-11.917-16.5-3.31Z"
    />
  </Svg>
);
export default SvgComponent;
