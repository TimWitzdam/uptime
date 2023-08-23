import React from "react";
import { SvgXml } from "react-native-svg";

export default function SvgTest({
  width = "33",
  height = "26",
  fill = "white",
}) {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 31 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.939341 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939341 10.9393ZM31 10.5L2 10.5V13.5L31 13.5V10.5Z" fill="${fill}"/>
    </svg>
  `;

  const Arrow = () => <SvgXml xml={svg} width={width} height={height} />;
  return <Arrow />;
}
