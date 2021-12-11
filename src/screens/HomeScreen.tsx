import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgXml } from "react-native-svg";

import {
  BASE_URL,
  headphones,
  spotifyCredentials,
  spotifyLogo,
} from "../constants";
import { RootNavProp } from "../navigation/types";
import { MyText } from "../components";

WebBrowser.maybeCompleteAuthSession();

const scopes = ["user-top-read", "user-read-email", "user-read-private"];

interface Props {
  navigation: RootNavProp<"GetStartedScreen">;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
  };

  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: spotifyCredentials.clientId,
      scopes,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri(),
    },
    discovery
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (response?.type === "success") {
          setLoading(true);
          const { code } = response.params;
          const resp = await axios.post(BASE_URL + "/auth/login", { code });
          console.log(resp.data.token);
          await AsyncStorage.setItem("token", resp.data.token);
          if (isMounted.current) setLoading(false);
          navigation.navigate("DashboardScreen");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [response]);

  return (
    <View style={styles.container}>
      <View>
        <SvgXml xml={headphones} height={70} width={70} />
      </View>
      <MyText style={styles.header}>Sign In to Get Started!</MyText>
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
        activeOpacity={0.7}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <>
            <SvgXml xml={spotifyLogo} height={25} width={25} />
            <MyText style={styles.buttonText}>Log in with Spotify</MyText>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginTop: 10,
    fontSize: 32,
    fontFamily: "Circular-std-bold",
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
  },
});

export default HomeScreen;
