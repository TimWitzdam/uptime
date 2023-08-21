import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgTest() {
  const svg = `<svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.46967 6.53033C5.76256 6.82322 6.23744 6.82322 6.53033 6.53033L11.3033 1.75736C11.5962 1.46447 11.5962 0.989593 11.3033 0.696699C11.0104 0.403806 10.5355 0.403806 10.2426 0.696699L6 4.93934L1.75736 0.696699C1.46447 0.403806 0.989593 0.403806 0.696699 0.696699C0.403806 0.989593 0.403806 1.46447 0.696699 1.75736L5.46967 6.53033ZM6.75 6V5H5.25V6H6.75Z" fill="white"/>
  </svg>
  `;

  const Arrow = () => <SvgXml xml={svg} width="13px" height="13px" />;
  return <Arrow />;
}
