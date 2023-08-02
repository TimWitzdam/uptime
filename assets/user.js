import React from "react";
import { SvgXml } from "react-native-svg";
export default function SvgTest() {
  const svg = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5879 21.2431C20.3819 17.8125 18.0416 14.9583 14.8773 13.9884C16.794 13.0926 18.125 11.1458 18.125 8.88889C18.125 5.7824 15.6065 3.26389 12.5 3.26389C9.39349 3.26389 6.87498 5.7824 6.87498 8.88889C6.87498 11.1458 8.20599 13.0926 10.125 13.9884C6.96062 14.9583 4.62035 17.8125 4.41433 21.2431C4.39812 21.5093 4.60877 21.7361 4.87729 21.7361C5.12035 21.7361 5.32405 21.5463 5.34025 21.3032C5.56016 17.5417 8.68285 14.5602 12.5 14.5602C16.3171 14.5602 19.4398 17.5417 19.662 21.3032C19.6759 21.5463 19.8796 21.7361 20.125 21.7361C20.3935 21.7361 20.6041 21.5093 20.5879 21.2431ZM7.8009 8.88889C7.8009 6.29398 9.90507 4.18981 12.5 4.18981C15.0949 4.18981 17.199 6.29398 17.199 8.88889C17.199 11.4838 15.0949 13.588 12.5 13.588C9.90507 13.588 7.8009 11.4838 7.8009 8.88889Z" fill="black"/>
  </svg>   
  `;

  const User = () => <SvgXml xml={svg} width="23px" height="23px" />;
  return <User />;
}