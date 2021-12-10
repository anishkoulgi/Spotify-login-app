import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants';
import { MyText, Track } from '../components';
import Artist from '../components/Artist';

const DashboardScreen = () => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: 'Bearer ' + token,
        };
        const tracks = await axios.get(BASE_URL + '/user/tracks', { headers });
        const artists = await axios.get(BASE_URL + '/user/artists', {
          headers,
        });
        // console.log(tracks.data);
        setTracks(tracks.data.tracks);
        setArtists(artists.data.artists);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <MyText style={styles.heading}>Top Tracks</MyText>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Track track={item} />}
      />
      <MyText style={styles.heading}>Top Artists</MyText>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Artist artist={item} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  heading: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Circular-std-bold',
  },
});

export default DashboardScreen;
