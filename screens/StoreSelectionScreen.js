import React, {useState, useEffect} from "react";
import {View, Dimensions, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import StoreMarker from "../components/StoreMarker";

export default function StoreSelectionScreen() {
  const [storeLocations, setStoreLocations] = useState([]);
  useEffect(() => {
    (async() => {
      const response = await fetch('https://grocerserver.herokuapp.com/stores');
      const result = await response.json();
      setStoreLocations(result);
    })();
  }, []);

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