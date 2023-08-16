import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { router } from "expo-router";
import User from "../../../assets/user.js";
import Notification from "../../../assets/notification.js";
import Arrow from "../../../assets/arrow.js";
import Home from "../../../assets/home.js";
import Server from "../../../assets/server.js";
import Add from "../../../assets/add.js";
import List from "../../../assets/list.js";
import Settings from "../../../assets/settings.js";

export default function App() {
  return (
    <View className=" bg-background flex-1 justify-between">
      <View className=" items-center p-6">
        <View className="w-full mb-6 flex flex-row justify-between">
          <View className="flex flex-row items-center gap-2">
            <View className="bg-white rounded-xl w-10 h-10 flex items-center justify-center">
              <User />
            </View>
            <View>
              <Text className="font-semibold text-xl text-white">
                Tim Witzdam
              </Text>
              <Text className="text-text opacity-80">Member since 2023</Text>
            </View>
          </View>
          <View className="bg-white rounded-xl w-10 h-10 flex items-center justify-center">
            <Notification />
          </View>
        </View>
        <View className="w-full mb-10">
          <Text className="font-semibold text-4xl text-white">
            Your monitors
          </Text>
        </View>
        <View className="w-full flex flex-row">
          <View className="bg-[#212836] rounded-xl p-4 w-full mr-4">
            <Text className="text-text text-xl font-semibold mb-2">
              Overall last 7 days
            </Text>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-white text-4xl font-semibold">100%</Text>
              <View className="w-8 h-8 bg-green rounded-full"></View>
            </View>
            <Text className="text-text text-xl font-semibold mb-2">
              Your monitors
            </Text>
            <View>
              <View className="flex flex-row gap-1 mb-2">
                <View className="w-5 h-5 bg-accent rounded-lg "></View>
                <View className="flex flex-row justify-between w-full flex-1">
                  <View>
                    <Text className="text-white text-lg font-semibold leading-5">
                      Favourite 1
                    </Text>
                    <Text className="text-text">agencylabs.ai</Text>
                  </View>
                  <View className="flex flex-row gap-3">
                    <View>
                      <Text className="text-xs text-text">Ping</Text>
                      <Text className="text-white">39ms</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-text">Uptime</Text>
                      <Text className="text-white">99,8%</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-text">Status</Text>
                      <Text className="text-yellow">Slow</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex flex-row gap-1">
                <View className="w-5 h-5 bg-accent rounded-lg "></View>
                <View className="flex flex-row justify-between w-full flex-1">
                  <View className="w-[50%]">
                    <Text
                      className="text-white text-lg font-semibold leading-5 overflow-ellipsis truncate"
                      numberOfLines={1}
                    >
                      Favourite 2asdasdasdasdsadsad
                    </Text>
                    <Text className="text-text">agencylabs.ai</Text>
                  </View>
                  <View className="flex flex-row gap-3">
                    <View>
                      <Text className="text-xs text-text">Ping</Text>
                      <Text className="text-white">39ms</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-text">Uptime</Text>
                      <Text className="text-white">99,8%</Text>
                    </View>
                    <View>
                      <Text className="text-xs text-text">Status</Text>
                      <Text className="text-yellow">Slow</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="w-full flex flex-row items-center mt-2">
              <Text className="text-white font-semibold ml-auto mr-2">
                Show all
              </Text>
              <View className="p-2 bg-white rounded-full w-fit">
                <Arrow />
              </View>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
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
