import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MyText from './MyText';

interface Props {
  track: SpotifyApi.TrackObjectFull;
}

const Track: React.FC<Props> = ({ track }) => {
  const artists = track.artists.map((artist) => artist.name).join(', ');

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: track.album.images[0].url }}
          style={styles.image}
        />
      </View>
      <View style={styles.nameContainer}>
        <MyText style={styles.name}>{track.name}</MyText>
        <MyText style={styles.artist}>{artists}</MyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
  },
  nameContainer: {
    paddingHorizontal: 10,
  },
  name: {
    fontFamily: 'Circular-std-medium',
  },
  artist: {
    color: '#666666',
    fontSize: 14,
  },
});

export default Track;
