import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import TickAccent from "../assets/tick-accent.js";
import TickGrey from "../assets/tick-grey.js";
export default function App() {
  return (
    <View className="p-6 bg-background flex-1 items-center">
      <View className="w-full mb-10">
        <Text className="font-semibold text-3xl text-white">
          Let's get you started.{" "}
        </Text>
        <Text className="text-text opacity-80  max-w-[70%]">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr
        </Text>
      </View>
      <View className="flex items-center w-full gap-4">
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg"
          placeholder="E-Mail"
          placeholderTextColor={"#ACABAE"}
        ></TextInput>
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg"
          placeholder="Password"
          placeholderTextColor={"#ACABAE"}
        ></TextInput>
        <View className="w-full">
          <View className="w-[50%] bg-white rounded-xl h-2">
            <View className="h-full w-[50%] bg-accent rounded-xl transition-all"></View>
          </View>
          <View className="flex flex-row items-center mt-2">
            <TickAccent />
            <Text className="opacity-60 text-white ml-1 text-xs">
              Min. 8 characters
            </Text>
          </View>
          <View className="flex flex-row items-center mt-2">
            <TickGrey />
            <Text className="opacity-60 text-white ml-1 text-xs">
              At least one number
            </Text>
          </View>
        </View>
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg"
          placeholder="Confirm password"
          placeholderTextColor={"#ACABAE"}
        ></TextInput>
      </View>
      <View className="w-full">
        <TouchableOpacity
          className="bg-white rounded-lg px-2 py-3 w-[50%] mx-auto mt-6"
          onPress={() => router.push("/register")}
        >
          <Text className="font-semibold text-black text-center text-lg leading-tight">
            Sign up
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row gap-1 mx-auto mt-2">
          <Text className="opacity-60 text-white">
            Already have an account?
          </Text>
          <Text className="text-white">Sign in</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
