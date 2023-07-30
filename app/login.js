import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
export default function App() {
  return (
    <View className="p-6 bg-background flex-1 items-center">
      <View className="w-full mb-10">
        <Text className="font-semibold text-3xl text-white">
          Let's sign you in.
        </Text>
        <Text className="text-text opacity-80  max-w-[70%]">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr
        </Text>
      </View>
      <View className="flex items-center w-full gap-4">
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white"
          placeholder="E-Mail"
          placeholderTextColor={"#ACABAE"}
        ></TextInput>
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white"
          placeholder="Password"
          placeholderTextColor={"#ACABAE"}
        ></TextInput>
      </View>
      <View className="w-full">
        <Text className="opacity-60 text-white mt-2">Forgot password?</Text>
      </View>
      <View className="w-full">
        <TouchableOpacity
          className="bg-white rounded-lg px-2 py-3 w-[50%] mx-auto mt-6"
          onPress={() => router.push("/register")}
        >
          <Text className="font-semibold text-black text-center text-lg leading-tight">
            Sign in
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row gap-1 mx-auto mt-2">
          <Text className="opacity-60 text-white">
            Don't have an account yet?
          </Text>
          <Text className="text-white">Sign up</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
