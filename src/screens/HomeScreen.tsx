import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import axios from 'axios';
import { Button, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL, spotifyCredentials } from '../constants';
import { RootNavProp } from '../navigation/types';

WebBrowser.maybeCompleteAuthSession();

const scopes = ['user-top-read', 'user-read-email', 'user-read-private'];

interface Props {
  navigation: RootNavProp<'GetStartedScreen'>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  };

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

  React.useEffect(() => {
    (async () => {
      try {
        if (response?.type === 'success') {
          const { code } = response.params;
          const resp = await axios.post(BASE_URL + '/auth/login', { code });
          console.log(resp.data.token);
          await AsyncStorage.setItem('token', resp.data.token);
          navigation.navigate('DashboardScreen');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title='LOGIN WITH SPOTIFY'
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
