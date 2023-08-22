import { Slot } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <RootSiblingParent>
      <Slot />
      <StatusBar style="light" />
    </RootSiblingParent>
  );
}
