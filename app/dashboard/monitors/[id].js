import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Globe from "../../../assets/globe.js";
import Cursor from "../../../assets/cursor.js";
import ShortArrow from "../../../assets/short-arrow.js";
import { LineChart } from "react-native-gifted-charts";

export default function App() {
  const [currentTimeSelected, setCurrentTimeSelected] = useState(7);
  const [monitorDetails, setMonitorDetails] = useState({});
  const [fetched, setFetched] = useState(false);
  const [yAxisOffset, setYAxisOffset] = useState(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    async function fetchData() {
      if (fetched) return;
      const response = await fetch(
        `http://192.168.178.33:5000/user/${await SecureStore.getItemAsync(
          "user_id"
        )}/monitors/${id}`,
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
          setMonitorDetails(data.monitor_details);
          setFetched(true);
        }
      }
    }
    fetchData();
    calculateYAxisOffset();
  });

  function calculateYAxisOffset() {
    if (!monitorDetails.ping_graph_data) return null;
    if (yAxisOffset) return null;

    console.log(monitorDetails.ping_graph_data);

    let lowestValue = Number.MAX_VALUE; // Initialize with a large value
    for (const obj of monitorDetails.ping_graph_data) {
      if (obj.value < lowestValue) {
        lowestValue = obj.value;
      }
    }

    let highestValue = Number.MIN_VALUE; // Initialize with a small value
    for (const obj of monitorDetails.ping_graph_data) {
      if (obj.value > highestValue) {
        highestValue = obj.value;
      }
    }

    let offset = 0;
    if (highestValue - lowestValue > 800) {
      offset = lowestValue - lowestValue * 0.5;
    } else {
      offset = lowestValue - lowestValue * 0.3;
    }

    setYAxisOffset(offset);
  }

  return (
    <View className=" bg-background flex-1 justify-between">
      {fetched ? (
        <ScrollView className="p-6">
          <View className="w-full mb-6">
            <View>
              <Text>Go back</Text>
            </View>
          </View>

          <View className="w-full mb-4">
            <View className="flex-row">
              <View className="w-10 h-10 bg-accent rounded-lg mr-2"></View>
              <View>
                <Text className="font-semibold text-4xl text-white">
                  {monitorDetails.metadata.name}
                </Text>
                <View className="flex-row items-center">
                  <Globe />
                  <Text className="text-text font-medium ml-1">
                    {monitorDetails.metadata.url}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Cursor />
                  <Text className="text-text font-medium ml-1">
                    {monitorDetails.metadata.type === "https"
                      ? "HTTPs"
                      : monitorDetails.metadata.type === "keyword"
                      ? "Keyword"
                      : monitorDetails.metadata.type === "ping"
                      ? "Ping"
                      : "Unknown"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="w-full">
            <View className="items-end mb-4">
              <View className="px-8 py-3 bg-[#212836] w-fit rounded-lg flex-row items-center">
                <Text className="text-white mr-1">7 days</Text>
                <ShortArrow />
              </View>
            </View>
            <View className="w-full bg-[#212836] px-4 pt-4 pb-2 rounded-lg">
              {yAxisOffset ? (
                <LineChart
                  className="w-full"
                  areaChart
                  width={Dimensions.get("window").width - 100}
                  data={monitorDetails.ping_graph_data}
                  thickness={3}
                  yAxisColor="rgba(0,0,0,0)"
                  yAxisTextStyle={{ color: "white" }}
                  xAxisColor="rgba(0,0,0,0)"
                  verticalLinesColor="rgba(0,0,0,0)"
                  color="#50FFD5"
                  startFillColor1="#4CD0B1"
                  dataPointTextColor="white"
                  focusedDataPointColor={"white"}
                  textColor1="white"
                  backgroundColor={"#212836"}
                  yAxisOffset={yAxisOffset}
                  noOfSections={7}
                  initialSpacing={0}
                  textShiftY={-10}
                  endOpacity1={0}
                  hideRules
                  focusEnabled
                  showDataPointOnFocus
                  showTextOnFocus
                  curved
                  adjustToWidth
                  disableScroll
                />
              ) : null}
            </View>
            <View className="w-full my-4 bg-[#212836] rounded-lg p-5">
              <Text className="text-white text-xl font-medium mb-3">
                Currently
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-text">Status</Text>
                  <Text className="text-green text-lg font-medium">
                    {monitorDetails.status}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text">Response time</Text>
                  <Text className="text-white text-lg font-medium">
                    {monitorDetails.response_time.latest}ms
                  </Text>
                </View>
                <View className="flex-1"></View>
              </View>
            </View>
            <View className="w-full mb-4 bg-[#212836] rounded-lg p-5">
              <Text className="text-white text-xl font-medium mb-3">
                Uptime
              </Text>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-text">Last 24h</Text>
                  <Text className="text-white text-lg font-medium">
                    {monitorDetails.uptime["1d"]}%
                  </Text>
                </View>
                <View>
                  <Text className="text-text">Last 7 days</Text>
                  <Text className="text-white text-lg font-medium">
                    {monitorDetails.uptime["7d"]}%
                  </Text>
                </View>
                <View>
                  <Text className="text-text">Last 30 days</Text>
                  <Text className="text-white text-lg font-medium">
                    {monitorDetails.uptime["30d"]}%
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-full mb-4 bg-[#212836] rounded-lg p-5">
              <Text className="text-white text-xl font-medium mb-3">
                Avg. Response time
              </Text>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-text">Last 24h</Text>
                  <Text className="text-white text-lg font-medium">
                    {monitorDetails.response_time["1d"]}ms
                  </Text>
                </View>
                <View>
                  <Text className="text-text">Last 7 days</Text>
                  <Text className="text-white text-lg font-medium">
                    {monitorDetails.response_time["7d"]}ms
                  </Text>
                </View>
                <View>
                  <Text className="text-text">Last 30 days</Text>
                  <Text className="text-white text-lg font-medium">
                    {monitorDetails.response_time["30d"]}ms
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text className="text-white text-xl font-medium mb-3">
                Recent events
              </Text>
              <View className="grid grid-cols-1 grid-rows-1 gap-4">
                <View className="bg-[#212836] rounded-lg p-4">
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 bg-accent rounded-full mr-2"></View>
                    <View>
                      <View>
                        <Text className="text-white text-lg font-medium">
                          Went back up
                        </Text>
                        <Text className="text-text">5 days ago</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className="mb-10"></View>
        </ScrollView>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}
