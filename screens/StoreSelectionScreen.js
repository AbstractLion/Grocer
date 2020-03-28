import React from "react";
import {View, Dimensions, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import StoreMarker from '../components/StoreMarker.js';

const test = {
  latitude: 43.800680,
  longitude: -79.336230,
}

export default function StoreSelectionScreen() {
  return (
  <View>
    <MapView
      style={styles.mapStyle}
      initialRegion={{
        latitude: 43.800680,
        longitude: -79.336230,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <MapView.Marker coordinate={test}/>
    </MapView>
  </View>
  );
}

const styles = new StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});