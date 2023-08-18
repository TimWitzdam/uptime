import { Slot, router } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import Home from "../../assets/home.js";
import Server from "../../assets/server.js";
import Add from "../../assets/add.js";
import List from "../../assets/list.js";
import Settings from "../../assets/settings.js";

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <View>
        <View className="w-full h-16 bg-[#212836] flex flex-row items-center justify-evenly">
          <TouchableOpacity onPress={() => router.replace("/dashboard")}>
            <Home />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/dashboard/monitors")}
          >
            <Server />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("/dashboard/new")}>
            <Add />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/dashboard/events-list")}
          >
            <List />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/dashboard/settings")}
          >
            <Settings />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
