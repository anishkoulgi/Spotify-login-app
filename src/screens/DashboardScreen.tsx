import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Artist, MyText, Skeleton, Track } from "../components";
import { BASE_URL } from "../constants";

const ListSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <Skeleton />
      <Skeleton />
    </View>
  );
};

const DashboardScreen = () => {
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const headers = {
          Authorization: "Bearer " + token,
        };
        const tracks = await axios.get(BASE_URL + "/user/tracks", { headers });
        const artists = await axios.get(BASE_URL + "/user/artists", {
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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={50} color="blue" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MyText style={styles.heading}>Top Tracks</MyText>
      {tracks.length ? (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Track track={item} />}
        />
      ) : (
        <ListSkeleton />
      )}

      <MyText style={styles.heading}>Top Artists</MyText>
      {artists.length ? (
        <FlatList
          data={artists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Artist artist={item} />}
        />
      ) : (
        <ListSkeleton />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  heading: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Circular-std-bold",
  },
  skeletonContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default DashboardScreen;
