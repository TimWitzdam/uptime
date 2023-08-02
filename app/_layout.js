import { Slot } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Layout() {
  return (
    <RootSiblingParent>
      <Slot />
    </RootSiblingParent>
  );
}
