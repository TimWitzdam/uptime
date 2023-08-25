import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import TickAccent from "../assets/tick-accent.js";
import TickGrey from "../assets/tick-grey.js";
import Toast from "react-native-root-toast";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  function setName(text) {
    setFormData((prevData) => ({ ...prevData, name: text }));
  }

  function setEmail(text) {
    setFormData((prevData) => ({ ...prevData, email: text }));
  }

  function setPassword(text) {
    const strength = getPasswordStrength(text);
    setPasswordStrength(strength);
    setFormData((prevData) => ({ ...prevData, password: text }));
  }

  function setConfirmPassword(text) {
    setFormData((prevData) => ({ ...prevData, confirmPassword: text }));
  }

  function getPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) {
      strength += 1;
    }

    if (/[A-Z]/.test(password)) {
      strength += 1;
    }

    if (/\d/.test(password)) {
      strength += 1;
    }

    if (/[!@#$%^&*()\-_=+{};:,<.>]/.test(password)) {
      strength += 1;
    }

    return strength;
  }

  function register() {
    Keyboard.dismiss();
    if (
      formData.name.length < 1 ||
      formData.email.length < 1 ||
      formData.password.length < 1 ||
      formData.confirmPassword.length < 1
    ) {
      Toast.show("Please make sure to fill out all fields", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#FF0000",
      });
      return;
    }
    if (!/[^@]+@[^@]+\.[^@]+/.test(formData.email)) {
      Toast.show("Please enter a valid email", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#FF0000",
      });
      return;
    }
    if (!/^(?=.*\d).{8,}$/.test(formData.password)) {
      Toast.show("Please make sure the password requirements are met.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#FF0000",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Toast.show("Passwords do not match", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: "#FF0000",
      });
      return;
    }
    setLoading(true);
    fetch("http://192.168.178.33:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json();
        setLoading(false);
        if (data.status === "ok") {
          await SecureStore.setItemAsync("auth_token", data.auth_token);
          await SecureStore.setItemAsync("user_id", data.user_id);
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
        setLoading(false);
        Toast.show("An error occurred. Please try again later.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: "#FF0000",
        });
      });
  }

  return (
    <View className="p-6 flex-1 items-center bg-background">
      <View className="w-full mb-10">
        <Text className="font-semibold text-4xl text-white">
          Let's get you started.
        </Text>
        <Text className="text-text opacity-80 text-lg leading-6 max-w-[70%]">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr
        </Text>
      </View>
      <View className="flex items-center w-full gap-4">
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-4 font-medium text-white text-lg leading-5"
          placeholder="Name"
          placeholderTextColor={"#ACABAE"}
          onChangeText={(text) => setName(text)}
          value={formData.name}
          spellCheck={false}
          autoComplete="name"
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-4 font-medium text-white text-lg leading-5"
          placeholder="E-Mail"
          placeholderTextColor={"#ACABAE"}
          onChangeText={(text) => setEmail(text)}
          value={formData.email}
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
          value={formData.password}
          secureTextEntry={true}
          spellCheck={false}
          autoComplete="new-password"
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        {formData.password.length >= 1 ? (
          <View className="w-full">
            <View className="w-[50%] bg-white rounded-xl h-2">
              <View
                className="h-full rounded-xl bg-accent"
                style={{
                  width: `${(passwordStrength / 4) * 100}%`,
                }}
              ></View>
            </View>
            <View className="flex flex-row items-center mt-2">
              {formData.password.length >= 8 ? <TickAccent /> : <TickGrey />}
              <Text className="opacity-60 text-white ml-1 text-xs">
                Min. 8 characters
              </Text>
            </View>
            <View className="flex flex-row items-center mt-2">
              {/\d/.test(formData.password) ? <TickAccent /> : <TickGrey />}
              <Text className="opacity-60 text-white ml-1 text-xs">
                At least one number
              </Text>
            </View>
          </View>
        ) : null}
        <TextInput
          className="rounded-lg flex flex-row border border-[#ACABAE] w-full pl-3 py-4 font-medium text-white text-lg leading-5"
          placeholder="Confirm password"
          placeholderTextColor={"#ACABAE"}
          onChangeText={(text) => setConfirmPassword(text)}
          value={formData.confirmPassword}
          secureTextEntry={true}
          spellCheck={false}
          autoComplete="new-password"
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
      </View>
      <View className="w-full">
        <TouchableOpacity
          className="bg-white rounded-lg px-2 py-3 w-[50%] mx-auto mt-6 flex items-center justify-center flex-row"
          onPress={register}
        >
          {loading ? (
            <ActivityIndicator color="#000000" className="mr-2" />
          ) : null}
          <Text className="font-semibold text-black text-center text-lg leading-tight">
            Sign up
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row gap-1 mx-auto mt-2">
          <Text className="opacity-60 text-white text-lg">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text className="text-white text-lg">Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
