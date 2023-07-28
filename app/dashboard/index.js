import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function App() {
  useEffect(() => {
    return;
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Dashboard</Text>
      <StatusBar style="auto" />
    </View>
  );
}
