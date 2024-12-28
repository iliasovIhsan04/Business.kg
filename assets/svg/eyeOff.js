import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { colors } from "../styles/colors";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke={colors.gray}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.743 5.592c.406-.06.826-.092 1.257-.092 5.105 0 8.455 4.505 9.58 6.287.137.215.205.323.243.49.029.125.029.322 0 .447-.038.166-.107.274-.244.492-.3.474-.757 1.141-1.363 1.865M6.724 7.215c-2.162 1.467-3.63 3.504-4.303 4.57-.137.217-.205.325-.243.492a1.173 1.173 0 0 0 0 .446c.038.167.106.274.242.49C3.546 14.995 6.895 19.5 12 19.5c2.059 0 3.832-.732 5.289-1.723M3 3.5l18 18M9.88 10.379a3 3 0 1 0 4.243 4.243"
    />
  </Svg>
);
export default SvgComponent;
