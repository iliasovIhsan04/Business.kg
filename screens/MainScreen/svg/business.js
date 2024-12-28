import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={119}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M.058 14V1.089h9.899c.454 0 .866.113 1.237.34.383.228.687.532.915.915.227.37.34.783.34 1.237V6.11c0 .155-.012.305-.036.448-.024.144-.065.281-.125.413.203.274.364.561.484.86.132.3.197.598.197.897v2.78c0 .454-.113.872-.34 1.255-.227.37-.532.67-.915.896-.383.227-.8.341-1.255.341H.058Zm2.582-2.385h7.711c.06 0 .114-.018.162-.054a.223.223 0 0 0 .071-.161V8.835a.17.17 0 0 0-.071-.143.223.223 0 0 0-.162-.072h-7.71a.223.223 0 0 0-.162.072.194.194 0 0 0-.054.143V11.4c0 .06.018.113.054.161a.262.262 0 0 0 .161.054Zm0-5.38h7.21c.059 0 .107-.018.143-.054a.262.262 0 0 0 .053-.16V3.688a.194.194 0 0 0-.053-.144.17.17 0 0 0-.144-.071H2.64a.223.223 0 0 0-.161.071.194.194 0 0 0-.054.144V6.02c0 .06.018.114.054.161a.262.262 0 0 0 .161.054ZM17.345 14c-.454 0-.872-.114-1.255-.34a2.68 2.68 0 0 1-.896-.897 2.42 2.42 0 0 1-.323-1.238V3.6h2.349v7.837c0 .06.018.113.054.161a.263.263 0 0 0 .161.054h5.434c.06 0 .107-.018.143-.054a.223.223 0 0 0 .072-.161V3.599h2.349v7.926c0 .455-.114.867-.34 1.238-.216.37-.509.67-.88.896-.37.227-.789.341-1.255.341h-5.613Zm12.012 0c-.455 0-.867-.114-1.238-.34a2.68 2.68 0 0 1-.896-.897 2.322 2.322 0 0 1-.341-1.238v-.394h2.349v.305c0 .06.018.113.054.161a.263.263 0 0 0 .161.054h5.434c.06 0 .107-.018.143-.054a.223.223 0 0 0 .072-.161v-1.238a.17.17 0 0 0-.072-.143.17.17 0 0 0-.143-.072h-5.523c-.455 0-.867-.113-1.238-.34a2.68 2.68 0 0 1-.896-.897 2.321 2.321 0 0 1-.341-1.238V6.074c0-.454.113-.867.34-1.237.228-.371.527-.67.897-.897.37-.227.783-.34 1.238-.34h5.612c.467 0 .885.113 1.256.34.37.227.67.526.896.897.227.37.341.783.341 1.237v.394h-2.367v-.304a.17.17 0 0 0-.072-.144.17.17 0 0 0-.143-.072h-5.434a.223.223 0 0 0-.161.072.194.194 0 0 0-.054.144V7.4c0 .06.018.113.054.161a.263.263 0 0 0 .161.054h5.523c.467 0 .885.114 1.256.34.37.228.67.527.896.897.227.371.341.783.341 1.238v1.434c0 .455-.114.867-.34 1.238a2.68 2.68 0 0 1-.897.896c-.37.227-.79.341-1.256.341h-5.612Zm9.89 0V3.6h2.35V14h-2.35Zm0-11.44V.191h2.35V2.56h-2.35ZM43.678 14V3.6h8.088c.454 0 .867.113 1.237.34.383.227.682.526.897.897.227.37.34.783.34 1.237V14h-2.348V6.164a.17.17 0 0 0-.072-.144.17.17 0 0 0-.144-.072h-5.433a.223.223 0 0 0-.162.072.194.194 0 0 0-.053.144V14h-2.35Zm14.54 0c-.455 0-.867-.114-1.238-.34a2.68 2.68 0 0 1-.896-.897 2.322 2.322 0 0 1-.34-1.238V6.074c0-.454.113-.867.34-1.237.227-.371.526-.67.896-.897.371-.227.784-.34 1.238-.34h5.613c.454 0 .866.113 1.237.34.383.227.681.526.897.897.227.37.34.783.34 1.237v3.91h-8.213v1.452c0 .06.018.113.054.161a.263.263 0 0 0 .161.054h7.998V14h-8.087Zm-.126-6.133h5.864V6.164a.17.17 0 0 0-.072-.144.17.17 0 0 0-.143-.072h-5.434a.223.223 0 0 0-.161.072.194.194 0 0 0-.054.144v1.703ZM70.457 14c-.454 0-.866-.114-1.237-.34a2.68 2.68 0 0 1-.897-.897 2.322 2.322 0 0 1-.34-1.238v-.394h2.349v.305c0 .06.018.113.054.161a.263.263 0 0 0 .161.054h5.434c.06 0 .107-.018.143-.054a.223.223 0 0 0 .072-.161v-1.238a.17.17 0 0 0-.072-.143.17.17 0 0 0-.143-.072h-5.524c-.454 0-.866-.113-1.237-.34a2.68 2.68 0 0 1-.897-.897 2.321 2.321 0 0 1-.34-1.238V6.074c0-.454.113-.867.34-1.237.228-.371.527-.67.897-.897.37-.227.783-.34 1.237-.34h5.613c.467 0 .885.113 1.256.34.37.227.669.526.896.897.227.37.34.783.34 1.237v.394h-2.366v-.304a.17.17 0 0 0-.072-.144.17.17 0 0 0-.143-.072h-5.434a.223.223 0 0 0-.161.072.194.194 0 0 0-.054.144V7.4c0 .06.018.113.054.161a.262.262 0 0 0 .161.054h5.523c.467 0 .885.114 1.256.34.37.228.669.527.896.897.227.371.34.783.34 1.238v1.434c0 .455-.113.867-.34 1.238a2.68 2.68 0 0 1-.896.896c-.371.227-.79.341-1.256.341h-5.613Zm12.294 0c-.454 0-.867-.114-1.237-.34a2.68 2.68 0 0 1-.897-.897 2.32 2.32 0 0 1-.34-1.238v-.394h2.348v.305c0 .06.018.113.054.161a.263.263 0 0 0 .162.054h5.433c.06 0 .108-.018.144-.054a.223.223 0 0 0 .071-.161v-1.238a.17.17 0 0 0-.071-.143.17.17 0 0 0-.144-.072h-5.523a2.32 2.32 0 0 1-1.237-.34 2.68 2.68 0 0 1-.897-.897 2.32 2.32 0 0 1-.34-1.238V6.074c0-.454.113-.867.34-1.237.227-.371.526-.67.897-.897a2.32 2.32 0 0 1 1.237-.34h5.613c.466 0 .884.113 1.255.34.37.227.67.526.897.897.227.37.34.783.34 1.237v.394H88.49v-.304a.17.17 0 0 0-.071-.144.17.17 0 0 0-.144-.072h-5.433a.223.223 0 0 0-.162.072.194.194 0 0 0-.054.144V7.4c0 .06.018.113.054.161a.262.262 0 0 0 .162.054h5.523c.466 0 .884.114 1.255.34.37.228.67.527.897.897.227.371.34.783.34 1.238v1.434c0 .455-.113.867-.34 1.238-.228.37-.526.67-.897.896-.37.227-.789.341-1.255.341H82.75Zm9.926 0v-2.35h2.35V14h-2.35Zm4.063 0V.192h2.35v7.424h1.846l3.712-4.017h2.511v.646L103.016 8.8l4.125 4.554V14h-2.493l-3.712-4.017h-1.847V14H96.74Zm13.099 4.107v-2.368h6.259a.17.17 0 0 0 .143-.071.17.17 0 0 0 .072-.144V14h-5.738c-.443 0-.855-.114-1.238-.34a2.683 2.683 0 0 1-.896-.897 2.323 2.323 0 0 1-.341-1.238V6.074c0-.454.114-.867.341-1.237.227-.371.526-.67.896-.897.383-.227.795-.34 1.238-.34h5.63c.455 0 .867.113 1.238.34.37.227.663.526.878.897.228.37.341.783.341 1.237v9.558c0 .466-.107.885-.323 1.255-.215.37-.514.664-.896.879-.371.227-.783.34-1.238.34h-6.366Zm.825-6.456h5.434c.06 0 .107-.018.143-.054a.223.223 0 0 0 .072-.161V6.164a.17.17 0 0 0-.072-.144.17.17 0 0 0-.143-.072h-5.434a.224.224 0 0 0-.161.072.193.193 0 0 0-.054.144v5.272c0 .06.018.113.054.161a.264.264 0 0 0 .161.054Z"
    />
  </Svg>
);
export default SvgComponent;