import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MyText from './MyText';

interface Props {
  artist: SpotifyApi.ArtistObjectFull;
}

const Artist: React.FC<Props> = ({ artist }) => {
  const genres = artist.genres.slice(0, 3).join(', ');

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: artist.images[0].url }} style={styles.image} />
      </View>
      <View style={styles.nameContainer}>
        <MyText style={styles.name}>{artist.name}</MyText>
        <MyText style={styles.artist}>{genres}</MyText>
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

export default Artist;
