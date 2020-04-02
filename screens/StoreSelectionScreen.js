import React from "react";
import {View, Dimensions, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import StoreMarker from "../components/StoreMarker";

const storeLocations = [
  {
    name: "Walmart Toronto Downsview",
    coords: {
      latitude: 43.7577199,
      longitude: -79.491159,
    },
    id: 0
  },
  {
    name: "Metro Warden Ave",
    coords: {
      latitude: 43.797456,
      longitude: -79.3200992,
    },
    id: 1
  },
];

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
      {storeLocations.map(store => <StoreMarker
        key={store.name}
        store={store}
      />)}
    </MapView>
  </View>
  );
}

const styles = new StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});