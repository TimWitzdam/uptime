import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgTest({
  width = "10",
  height = "8",
  fill = "black",
}) {
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.35355 4.35355C9.54882 4.15829 9.54882 3.84171 9.35355 3.64645L6.17157 0.464467C5.97631 0.269204 5.65973 0.269204 5.46447 0.464467C5.2692 0.659729 5.2692 0.976311 5.46447 1.17157L8.29289 4L5.46447 6.82843C5.2692 7.02369 5.2692 7.34027 5.46447 7.53553C5.65973 7.7308 5.97631 7.7308 6.17157 7.53553L9.35355 4.35355ZM-3.88546e-08 4.5L9 4.5L9 3.5L3.88546e-08 3.5L-3.88546e-08 4.5Z" fill="${fill}"/>
    </svg>`;

  const SVG = () => <SvgXml xml={svg} width={width} height={height} />;
  return <SVG />;
}
