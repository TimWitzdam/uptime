import React from "react";
import { SvgXml } from "react-native-svg";

export default function SvgTest({
  width = "33",
  height = "26",
  fill = "white",
}) {
  const svg = `
    <svg width="30" height="30" viewBox="0 0 30 30" fill="${fill}" xmlns="http://www.w3.org/2000/svg">
<path d="M15 26V28C17.342 28 19.202 27.147 20.623 26H15Z" fill="${fill}"/>
<path d="M5 16V18C5 20.5 7 21 7 21C7 21 9 27 15 27" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M26 17H23C23 10.76 20 8 20 8C17 15 7 10 7 17H4C4 17 4 16.882 4 13C4 6 10 2 15 2C19 2 20 4 20 4C24 4 26 9 26 13V17Z" fill="${fill}"/>
<path d="M15.5 21C15.324 21 14.676 21 14.5 21C13.672 21 13 21.672 13 22.5C13 23.328 13.672 24 14.5 24C14.676 24 15.324 24 15.5 24C16.328 24 17 23.328 17 22.5C17 21.672 16.328 21 15.5 21Z" fill="${fill}"/>
<path d="M16 23H21C23.209 23 25 21.209 25 19V16" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M25 20H23V15H25C26.105 15 27 15.895 27 17V18C27 19.105 26.105 20 25 20Z" fill="${fill}"/>
</svg>

  `;

  const SVG = () => <SvgXml xml={svg} width={width} height={height} />;
  return <SVG />;
}
