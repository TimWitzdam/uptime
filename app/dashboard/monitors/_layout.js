import { Slot, router } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import Home from "../../../assets/home.js";
import Server from "../../../assets/server.js";
import Add from "../../../assets/add.js";
import List from "../../../assets/list.js";
import Settings from "../../../assets/settings.js";
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
