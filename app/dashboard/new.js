import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Switch,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import User from "../../assets/user.js";
import Notification from "../../assets/notification.js";
import Arrow from "../../assets/arrow.js";
import Home from "../../assets/home.js";
import Server from "../../assets/server.js";
import Add from "../../assets/add.js";
import List from "../../assets/list.js";
import Settings from "../../assets/settings.js";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";

export default function App() {
  const [monitorData, setMonitorData] = useState({
    type: "https",
    name: "",
    url: "",
    keyword: null,
    port: null,
    downtime_notifications: false,
    ssl_notifications: false,
  });
  const [loading, setLoading] = useState(false);

  function setType(text) {
    setMonitorData((prevData) => ({ ...prevData, type: text }));
  }

  function setName(text) {
    setMonitorData((prevData) => ({ ...prevData, name: text }));
  }

  function setUrl(text) {
    setMonitorData((prevData) => ({ ...prevData, url: text }));
  }

  function setKeyword(text) {
    setMonitorData((prevData) => ({ ...prevData, keyword: text }));
  }

  function setPort(text) {
    setMonitorData((prevData) => ({ ...prevData, port: text }));
  }

  async function createMonitor() {
    if (loading) return;
    if (monitorData.name === "") {
      Toast.show("Please enter a name.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#FF0000",
      });
      return;
    }
    if (monitorData.url === "") {
      Toast.show("Please enter a URL.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#FF0000",
      });
      return;
    }
    if (monitorData.type === "ping" && monitorData.port === null) {
      Toast.show("Please enter a port.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#FF0000",
      });
      return;
    }
    if (monitorData.type === "keyword" && monitorData.keyword === "") {
      Toast.show("Please enter a keyword.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#FF0000",
      });
      return;
    }
    setLoading(true);
    const user_id = await SecureStore.getItemAsync("user_id");
    fetch(`http://192.168.178.33:5000/user/${user_id}/monitors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": await SecureStore.getItemAsync("auth_token"),
      },
      body: JSON.stringify(monitorData),
    })
      .then(async (res) => {
        const data = await res.json();
        setLoading(false);
        if (data.status === "ok") {
          router.replace("/dashboard");
        } else {
          Toast.show(data.message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            backgroundColor: "#FF0000",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Toast.show("An error occurred. Please try again later.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: "#FF0000",
        });
      });
  }

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
        <View className="w-full mb-6">
          <Text className="font-semibold text-4xl text-white">Add monitor</Text>
        </View>
        <View className="w-full flex flex-row items-center justify-between mb-6">
          <TouchableOpacity
            className="bg-[#212836] rounded-lg py-3 mr-4 flex-1"
            onPress={() => setType("https")}
          >
            <Text
              className={
                monitorData.type === "https"
                  ? "text-accent font-medium text-center transition-colors"
                  : "text-white font-medium text-center transition-colors"
              }
            >
              HTTP/-s
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#212836] rounded-lg py-3 mr-4 flex-1"
            onPress={() => setType("keyword")}
          >
            <Text
              className={
                monitorData.type === "keyword"
                  ? "text-accent font-medium text-center transition-colors"
                  : "text-white font-medium text-center transition-colors"
              }
            >
              Keyword
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#212836] rounded-lg py-3 flex-1"
            onPress={() => setType("ping")}
          >
            <Text
              className={
                monitorData.type === "ping"
                  ? "text-accent font-medium text-center transition-colors"
                  : "text-white font-medium text-center transition-colors"
              }
            >
              Ping
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full">
          <TextInput
            className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg mb-4"
            placeholder="Name"
            placeholderTextColor={"#ACABAE"}
            onChangeText={(text) => setName(text)}
            value={monitorData.name}
          ></TextInput>
          <TextInput
            className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg mb-4"
            placeholder="URL/IP-address"
            placeholderTextColor={"#ACABAE"}
            onChangeText={(text) => setUrl(text)}
            value={monitorData.url}
            spellCheck={false}
            inputMode="url"
            autoCapitalize="none"
          ></TextInput>
          {monitorData.type === "keyword" && (
            <TextInput
              className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg mb-4"
              placeholder="Keyword"
              placeholderTextColor={"#ACABAE"}
              onChangeText={(text) => setKeyword(text)}
              value={monitorData.keyword}
            ></TextInput>
          )}
          {monitorData.type === "ping" && (
            <TextInput
              className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-2 font-medium text-white text-lg mb-4"
              placeholder="Port"
              placeholderTextColor={"#ACABAE"}
              onChangeText={(text) => setPort(text)}
              value={monitorData.port}
              keyboardType="numeric"
            ></TextInput>
          )}
          <View className="w-full justify-between items-center flex-row mb-4">
            <Text className="text-white text-lg opacity-60 font-medium">
              Downtime notifications
            </Text>
            <Switch
              trackColor={{ false: "#212836", true: "#212836" }}
              thumbColor={
                monitorData.downtime_notifications ? "#50FFD5" : "#f4f3f4"
              }
              value={monitorData.downtime_notifications}
              onValueChange={() =>
                setMonitorData((prevData) => ({
                  ...prevData,
                  downtime_notifications: !prevData.downtime_notifications,
                }))
              }
            ></Switch>
          </View>
          <View className="w-full justify-between items-center flex-row">
            <Text className="text-white text-lg opacity-60 font-medium">
              SSL notifications
            </Text>
            <Switch
              trackColor={{ false: "#212836", true: "#212836" }}
              thumbColor={monitorData.ssl_notifications ? "#50FFD5" : "#f4f3f4"}
              value={monitorData.ssl_notifications}
              onValueChange={() =>
                setMonitorData((prevData) => ({
                  ...prevData,
                  ssl_notifications: !prevData.ssl_notifications,
                }))
              }
            ></Switch>
          </View>
        </View>
        <View className="w-full">
          <TouchableOpacity
            className="bg-white rounded-lg px-2 py-3 w-[50%] mx-auto mt-6 flex items-center justify-center flex-row"
            onPress={createMonitor}
          >
            {loading ? (
              <ActivityIndicator color="#000000" className="mr-2" />
            ) : null}
            <Text className="font-semibold text-black text-center text-lg leading-tight">
              Start monitoring
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View className="w-full h-16 bg-[#212836] flex flex-row items-center justify-evenly">
          <TouchableOpacity onPress={() => router.replace("/dashboard")}>
            <Home />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/dashboard/monitor-list")}
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
