import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

export default function App() {
  const [monitors, setMonitors] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchMonitors() {
      if (fetched) return;
      const response = await fetch(
        `http://192.168.178.33:5000/user/${await SecureStore.getItemAsync(
          "user_id"
        )}/monitors?limit=2`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": await SecureStore.getItemAsync("auth_token"),
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        if (data.status === "ok") {
          setMonitors(data.monitor_details);
          setFetched(true);
        }
      }
    }
    async function fetchUptime() {
      if (fetched) return;
      const response = await fetch(
        `http://192.168.178.33:5000/user/${await SecureStore.getItemAsync(
          "user_id"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": await SecureStore.getItemAsync("auth_token"),
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        if (data.status === "ok") {
          setUserData(data.user);
        }
      }
    }
    fetchMonitors();
    fetchUptime();
  });

  return (
    <View className=" bg-background flex-1 justify-between">
      <View className=" items-center p-6">
        <View className="w-full mb-6 flex flex-row justify-between">
          <View className="flex flex-row items-center gap-2">
            <View className="bg-white rounded-xl w-10 h-10 flex items-center justify-center">
              <FontAwesome name="user" size={24} color="black" />
            </View>
            <View>
              <Text className="font-semibold text-xl text-white">
                {userData.name}
              </Text>
              <Text className="text-text opacity-80">
                Member since {userData.creation_year}
              </Text>
            </View>
          </View>
          <View className="bg-white rounded-xl w-10 h-10 flex items-center justify-center">
            <FontAwesome name="bell" size={24} color="black" />
          </View>
        </View>
        <View className="w-full mb-10">
          {userData.down_within_last_5_minutes ? (
            <View>
              <Text className="font-semibold text-4xl text-white">
                Some sites are
              </Text>
              <Text className="font-semibold text-4xl text-red">down 🔴</Text>
            </View>
          ) : (
            <View>
              <Text className="font-semibold text-4xl text-white">
                Everything is
              </Text>
              <Text className="font-semibold text-4xl text-accent">up 🎉</Text>
            </View>
          )}
        </View>
        <View className="w-full flex flex-row">
          <View className="bg-[#212836] rounded-xl p-4 w-full mr-4">
            <Text className="text-text text-xl font-semibold mb-2">
              Overall last 7 days
            </Text>
            {fetched ? (
              <View className="flex flex-row items-center gap-2">
                <Text className="text-white text-4xl font-semibold">
                  {userData.uptime}%
                </Text>
                <View
                  className={`w-8 h-8 rounded-full ${
                    userData.uptime === 100 || userData.uptime >= 99
                      ? "bg-green"
                      : userData.uptime >= 95
                      ? "bg-yellow"
                      : fetched
                      ? "bg-red"
                      : ""
                  }`}
                ></View>
              </View>
            ) : (
              <View className="flex flex-row items-center gap-2">
                <Text className="text-white text-4xl font-semibold">
                  Loading...
                </Text>
              </View>
            )}
            <Text className="text-text text-xl font-semibold mb-2">
              Your monitors
            </Text>
            <View>
              {fetched ? (
                monitors.map((monitor) => (
                  <TouchableOpacity
                    className="flex flex-row gap-1 mb-2"
                    key={monitor.id}
                    onPress={() =>
                      router.replace(`/dashboard/monitors/${monitor.id}`)
                    }
                  >
                    <View className="w-5 h-5 bg-accent rounded-lg "></View>
                    <View className="flex flex-row justify-between w-full flex-1">
                      <View>
                        <Text className="text-white text-2xl font-semibold leading-6">
                          {monitor.name}
                        </Text>
                        <Text className="text-text">{monitor.url}</Text>
                      </View>
                      <View className="flex flex-row gap-3">
                        <View>
                          <Text className="text-text">Ping</Text>
                          <Text className="text-lg text-white">
                            {monitor.response_time}ms
                          </Text>
                        </View>
                        <View>
                          <Text className="text-text">Uptime</Text>
                          <Text className="text-lg text-white">
                            {monitor.uptime}%
                          </Text>
                        </View>
                        <View>
                          <Text className="text-text">Status</Text>
                          <Text
                            className={`text-lg ${
                              monitor.status.toLowerCase() === "up"
                                ? "text-green"
                                : monitor.status.toLowerCase() === "down"
                                ? "text-red"
                                : "text-yellow"
                            }`}
                          >
                            {monitor.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View className="flex flex-row gap-1 mb-2">
                  <View className="w-5 h-5 bg-accent rounded-lg "></View>
                  <View className="flex flex-row justify-between w-full flex-1">
                    <View>
                      <Text className="text-white text-lg font-semibold leading-5">
                        Loading...
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              className="w-full flex flex-row items-center mt-2"
              onPress={() => router.replace("/dashboard/monitors")}
            >
              <Text className="text-lg text-white font-semibold ml-auto mr-2">
                Show all
              </Text>
              <View className="w-8 h-8 bg-white rounded-full items-center justify-center">
                <FontAwesome name="arrow-right" size={12} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
