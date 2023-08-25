import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Linking,
} from "react-native";
import { router } from "expo-router";
import Support from "../../../assets/support.js";
import Arrow from "../../../assets/arrow.js";
import RotatedArrow from "../../../assets/rotated-arrow.js";
import LogOut from "../../../assets/logout.js";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";

export default function App() {
  async function logOutUser() {
    const response = await fetch(`http://192.168.178.33:5000/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": await SecureStore.getItemAsync("auth_token"),
      },
      body: JSON.stringify({
        user_id: await SecureStore.getItemAsync("user_id"),
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      if (data.status === "ok") {
        SecureStore.deleteItemAsync("auth_token");
        SecureStore.deleteItemAsync("user_id");
        router.push("/start-page");
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
    <View className=" bg-background flex-1 justify-between">
      <View className=" items-center p-6">
        <View className="w-full items-center flex-row justify-between">
          <TouchableOpacity
            className="mb-6 flex-row items-center"
            onPress={() => router.back()}
          >
            <RotatedArrow width="30px" />
            <Text className="text-white ml-2 font-medium text-lg">Go back</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full mb-4">
          <Text className="font-semibold text-4xl text-white">Settings</Text>
        </View>
        <View className="w-full grid grid-cols-1 grid-rows-1 gap-4">
          <TouchableOpacity
            className="flex-row justify-between items-center pb-2 border-b-2 border-[#212836]"
            onPress={() => Linking.openURL("mailto:tim@witzdam.com")}
          >
            <View className="flex-row items-center">
              <Support />
              <Text className="ml-2 text-white font-medium text-lg">
                Support
              </Text>
            </View>
            <Arrow fill="white" width="20" height="20" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center pb-2 border-b-2 border-[#212836]"
            onPress={() => logOutUser()}
          >
            <View className="flex-row items-center">
              <LogOut />
              <Text className="ml-2 text-white font-medium text-lg">
                Log out
              </Text>
            </View>
            <Arrow fill="white" width="20" height="20" />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
