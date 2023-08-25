import { Slot } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";
import { View, Platform } from "react-native";
import { useEffect, useState } from "react";

export default function Layout() {
  const [paddingTop, setPaddingTop] = useState(null);
  useEffect(() => {
    if (Platform.OS === "android") {
      setPaddingTop("2");
    } else {
      setPaddingTop("10");
    }
  }, []);
  return (
    <RootSiblingParent>
      <View
        className={`flex-1 bg-[#1B1824] ${
          Platform.OS === "android" ? "pt-4" : "pt-10"
        }`}
      >
        <Slot />
        <StatusBar style="light" />
      </View>
    </RootSiblingParent>
  );
}
