import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Tabs } from "expo-router/tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

export default function Layout() {
  return (
    <ActionSheetProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#50FFD5",
            tabBarStyle: {
              height: "9%",
              backgroundColor: "#212836",
              borderTopWidth: 0,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              href: "/dashboard",
              tabBarIcon: ({ color }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="home"
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="monitors"
            options={{
              title: "Monitors",
              href: "/dashboard/monitors",
              tabBarIcon: ({ color }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="server"
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="new"
            options={{
              title: "Add monitor",
              href: "/dashboard/new",
              tabBarIcon: ({ color }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="plus"
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings/index"
            options={{
              title: "Settings",
              href: "/dashboard/settings",
              tabBarIcon: ({ color }) => (
                <FontAwesome
                  size={28}
                  style={{ marginBottom: -3 }}
                  name="cog"
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
        <StatusBar style="light" />
      </View>
    </ActionSheetProvider>
  );
}
