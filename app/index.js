import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Redirect } from "expo-router";
import { router } from "expo-router";
import Toast from "react-native-root-toast";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    async function checkIfLoggedIn() {
      let result = await SecureStore.getItemAsync("auth_token");
      return result;
    }

    checkIfLoggedIn().then((result) => {
      if (!result) {
        console.log("Not logged in");
        setLoggedIn(false);
      } else {
        fetch("http://192.168.178.33:5000/check-auth-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ auth_token: result }),
        }).then(async (res) => {
          const data = await res.json();
          if (data.status === "ok") {
            setLoggedIn(true);
          } else {
            Toast.show("Issue logging in, please login again.", {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              backgroundColor: "#FF0000",
            });
            await SecureStore.deleteItemAsync("auth_token");
            router.replace("/login");
          }
        });
      }
    });
  }, []);

  if (loggedIn === null) {
    return (
      <View>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else if (loggedIn) {
    return <Redirect href="/dashboard" />;
  } else {
    return <Redirect href="/start-page" />;
  }
}
