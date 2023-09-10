import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
} from "react-native";
import Toast from "react-native-root-toast";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function logInUser() {
    Keyboard.dismiss();
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
        await SecureStore.setItemAsync("user_name", data.name);
        await SecureStore.setItemAsync("creation_year", data.creation_year);
        router.replace("/dashboard");
      } else {
        Toast.show(data.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: "#FF0000",
        });
      }
    }
  }
  return (
    <View className="p-6 bg-background flex-1 items-center">
      <View className="w-full mb-10">
        <Text className="font-semibold text-4xl text-white">
          Let's sign you in.
        </Text>
        <Text className="text-text opacity-80 text-lg leading-6 max-w-[70%]">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr
        </Text>
      </View>
      <View className="flex items-center w-full gap-4">
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-4 font-medium text-white text-lg leading-5"
          placeholder="E-Mail"
          placeholderTextColor={"#ACABAE"}
          onChangeText={(text) => setEmail(text)}
          spellCheck={false}
          autoComplete="email"
          autoCapitalize="none"
          inputMode="email"
          keyboardType="email-address"
        ></TextInput>
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-4 font-medium text-white text-lg leading-5"
          placeholder="Password"
          placeholderTextColor={"#ACABAE"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          spellCheck={false}
          autoComplete="new-password"
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
      </View>
      <View className="w-full">
        <Text className="opacity-60 text-white mt-2 text-lg">
          Forgot password?
        </Text>
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
          <Text className="opacity-60 text-white text-lg">
            Don't have an account yet?
          </Text>
          <TouchableOpacity onPress={() => router.replace("/register")}>
            <Text className="text-white text-lg">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
