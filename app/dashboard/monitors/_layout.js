import { Slot } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function Layout() {
  return (
    <ActionSheetProvider>
      <View style={{ flex: 1 }}>
        <Slot />
        <StatusBar style="light" />
      </View>
    </ActionSheetProvider>
  );
}
