import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Redirect } from "expo-router";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    async function checkIfLoggedIn() {
      let result = await SecureStore.getItemAsync("auth_token");
      return result;
    }

    checkIfLoggedIn().then((result) => {
      setLoggedIn(true);
      return;
      if (!result) {
        console.log("Not logged in");
        setLoggedIn(false);
      } else {
        console.log("Logged in");
        setLoggedIn(true);
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
