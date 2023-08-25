import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

export default function App() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [monitors, setMonitors] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (fetched) return;
      const response = await fetch(
        `http://192.168.178.33:5000/user/${await SecureStore.getItemAsync(
          "user_id"
        )}/monitors`,
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
    fetchData();
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
                Tim Witzdam
              </Text>
              <Text className="text-text opacity-80">Member since 2023</Text>
            </View>
          </View>
          <View className="bg-white rounded-xl w-10 h-10 flex items-center justify-center">
            <FontAwesome name="bell" size={24} color="black" />
          </View>
        </View>
        <View className="w-full mb-4">
          <Text className="font-semibold text-4xl text-white">
            Your monitors
          </Text>
        </View>
        <View className="w-full">
          <View className="mb-4">
            <View className="flex flex-row items-center mb-2 ml-2">
              <TouchableOpacity onPress={() => setCurrentFilter("all")}>
                <Text className="text-white text-lg mr-4">All monitors</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentFilter("up")}>
                <Text className="text-white text-lg mr-4">Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentFilter("slow")}>
                <Text className="text-white text-lg mr-4">Slow</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentFilter("down")}>
                <Text className="text-white text-lg">Down</Text>
              </TouchableOpacity>
            </View>
            <View className="h-[4px] w-full bg-[#212836] rounded-xl flex-row">
              <View
                className="h-full w-20 bg-accent rounded-xl ml-[5%]"
                style={{ opacity: currentFilter === "all" ? 1 : 0 }}
              ></View>
              <View
                className="h-full w-6 bg-accent rounded-xl ml-[7%]"
                style={{ opacity: currentFilter === "up" ? 1 : 0 }}
              ></View>
              <View
                className="h-full w-8 bg-accent rounded-xl ml-[5%]"
                style={{ opacity: currentFilter === "slow" ? 1 : 0 }}
              ></View>
              <View
                className="h-full w-10 bg-accent rounded-xl ml-[7%]"
                style={{ opacity: currentFilter === "down" ? 1 : 0 }}
              ></View>
            </View>
          </View>
          <ScrollView className="h-[75%]">
            {monitors.map((monitor) => (
              <TouchableOpacity
                className="bg-[#212836] rounded-xl p-4 w-full mr-4 mb-4"
                key={monitor.id}
                onPress={() =>
                  router.replace(`/dashboard/monitors/${monitor.id}`)
                }
              >
                <View className="flex-row gap-1 mb-3">
                  <View className="w-5 h-5 bg-accent rounded-lg "></View>
                  <View>
                    <Text className="text-white text-xl font-semibold leading-5">
                      {monitor.name}
                    </Text>
                    <Text className="text-text">{monitor.url}</Text>
                  </View>
                </View>
                <View className="flex flex-row gap-3">
                  <View>
                    <Text className="text-text">Ping</Text>
                    <Text className="text-white text-lg">
                      {monitor.response_time}ms
                    </Text>
                  </View>
                  <View>
                    <Text className="text-text">Uptime</Text>
                    <Text className="text-white text-lg">
                      {monitor.uptime}%
                    </Text>
                  </View>
                  <View>
                    <Text className=" text-text">Last outage</Text>
                    <Text className="text-white text-lg">
                      {monitor.last_outage ? monitor.last_outage : "N/A"}
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
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
