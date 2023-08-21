import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgTest() {
  const svg = `<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_91_126)">
  <path d="M7.55473 8.35695H4.90263L6.2984 11.8099C6.39563 12.0493 6.28453 12.3177 6.0623 12.4192L4.83318 12.9633C4.60405 13.0649 4.3471 12.9488 4.24988 12.7167L2.92355 9.43781L0.75695 11.7011C0.468225 12.0026 0 11.7702 0 11.3747V0.464861C0 0.0484544 0.498025 -0.154544 0.756925 0.138439L7.86723 7.56626C8.15403 7.8501 7.9424 8.35695 7.55473 8.35695Z" fill="white" fill-opacity="0.6"/>
  </g>
  <defs>
  <clipPath id="clip0_91_126">
  <rect width="8" height="13" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  
  `;

  const Globe = () => <SvgXml xml={svg} width="13px" height="13px" />;
  return <Globe />;
}
