import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import FontAwesome from "@expo/vector-icons/FontAwesome5";

export default function App() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [monitors, setMonitors] = useState([]);
  const [allMonitors, setAllMonitors] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const name = await SecureStore.getItemAsync("user_name");
      const creation_year = await SecureStore.getItemAsync("creation_year");
      setUserData({ name: name, creation_year: creation_year });
    }
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
          setAllMonitors(data.monitor_details);
          setMonitors(data.monitor_details);
          setFetched(true);
        }
      }
    }
    fetchUserData();
    fetchData();
  });

  function changeFilter(filter) {
    setCurrentFilter(filter);
    if (filter === "all") {
      setMonitors(allMonitors);
    }
    if (filter === "up") {
      setMonitors(
        allMonitors.filter((monitor) => monitor.status.toLowerCase() === "up")
      );
    }
    if (filter === "slow") {
      setMonitors(
        allMonitors.filter((monitor) => monitor.status.toLowerCase() === "slow")
      );
    }
  }

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
        <View className="w-full mb-4">
          <Text className="font-semibold text-4xl text-white">
            Your monitors
          </Text>
        </View>
        <View className="w-full">
          <View className="mb-4">
            <View className="flex flex-row items-center mb-2">
              <TouchableOpacity
                onPress={() => changeFilter("all")}
                className={`border-b-4 ${
                  currentFilter === "all" ? "border-accent" : "border-[#212836]"
                }`}
              >
                <Text className="text-white text-lg pr-4">All monitors</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeFilter("up")}
                className={`border-b-4 ${
                  currentFilter === "up" ? "border-accent" : "border-[#212836]"
                }`}
              >
                <Text className="text-white text-lg px-4">Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeFilter("slow")}
                className={`border-b-4 ${
                  currentFilter === "slow"
                    ? "border-accent"
                    : "border-[#212836]"
                }`}
              >
                <Text className="text-white text-lg px-4">Slow</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeFilter("down")}
                className={`border-b-4 ${
                  currentFilter === "down"
                    ? "border-accent"
                    : "border-[#212836]"
                }`}
              >
                <Text className="text-white text-lg px-4">Down</Text>
              </TouchableOpacity>
              <View className="w-full border-b-4 border-[#212836]">
                <Text className="opacity-0 text-lg">asdasd</Text>
              </View>
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
                  {!monitor.favicon || monitor.favicon.startsWith("error_") ? (
                    <FontAwesome name="globe" size={20} color="white" />
                  ) : (
                    <Image
                      className="w-5 h-5 rounded-xl"
                      source={{
                        uri: "data:image/png;base64," + monitor.favicon,
                      }}
                    />
                  )}
                  <View>
                    <Text
                      className="text-white text-xl font-semibold leading-5 w-[71vw]"
                      numberOfLines={1}
                    >
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
