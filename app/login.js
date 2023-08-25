import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import Toast from "react-native-root-toast";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function logInUser() {
    const response = await fetch(`http://192.168.178.33:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      if (data.status === "ok") {
        await SecureStore.setItemAsync("auth_token", data.auth_token);
        await SecureStore.setItemAsync("user_id", data.user_id);
        router.replace("/dashboard");
      } else {
        Toast.show(
          "Something went wrong. Please use the support page in the settings.",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            backgroundColor: "#FF0000",
          }
        );
      }
    }
  }
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
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg"
          placeholder="E-Mail"
          placeholderTextColor={"#ACABAE"}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg"
          placeholder="Password"
          placeholderTextColor={"#ACABAE"}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
      </View>
      <View className="w-full">
        <Text className="opacity-60 text-white mt-2">Forgot password?</Text>
      </View>
      <View className="w-full">
        <TouchableOpacity
          className="bg-white rounded-lg px-2 py-3 w-[50%] mx-auto mt-6"
          onPress={() => logInUser()}
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
