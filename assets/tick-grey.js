import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgTest() {
  const svg = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.29729 0.916672L4.125 6.21821L1.70225 3.9215L0 5.62467L4.125 9.625L11 2.61938L9.29729 0.916672Z" fill="white" fill-opacity="0.6"/>
  </svg>  
  `;

  const TickGrey = () => <SvgXml xml={svg} width="13px" height="13px" />;
  return <TickGrey />;
}
