import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import StartPageHighFive from "../assets/start-page-high-five.js";

export default function App() {
  return (
    <View className="p-6 bg-background flex-1 items-center">
      <StartPageHighFive />
      <View className="flex items-center">
        <Text className="font-semibold text-3xl text-white">
          All Systems Up?
        </Text>
        <Text className="font-semibold text-3xl  text-accent">Yes 🎉</Text>
        <Text className="text-text text-center mt-2">
          Check on your systems with ease, use {"\n"} simple or advanced
          functionality and {"\n"} receive notifications. {"\n"}
        </Text>
      </View>
      <View className="bg-gray-500 w-[80%] rounded-xl flex flex-row">
        <TouchableOpacity
          className="bg-white rounded-xl px-2 py-3 w-[50%]"
          onPress={() => router.push("/register")}
        >
          <Text className="font-semibold text-black text-center text-lg leading-tight">
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-2 py-3 w-[50%]"
          onPress={() => router.push("/login")}
        >
          <Text className="font-semibold text-white text-center text-lg leading-tight">
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
