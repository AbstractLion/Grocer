import React, {useContext, useEffect} from "react";
import {View, Dimensions, StyleSheet, FlatList, Text, Button} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import CurrentStoreContext from '../contexts/CurrentStore';

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
  const navigation = useNavigation();
  const {currentStore, setCurrentStore} = useContext(CurrentStoreContext);
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
      {storeLocations.map(store => {
        return (
          <Marker
              key={store.name}
              title={store.name}
              coordinate={store.coords}
          >
            <Callout style={styles.callout}
              onPress={() => {
                setCurrentStore({name: store.name, id: store.id});
                navigation.setOptions({ title: store.name });
              }}>
              <Text style={styles.calloutText}>{store.name}{'\n'}</Text>
              <Button title={currentStore.name === store.name ? "Selected" : "Select"} disabled={currentStore.name === store.name}/>
            </Callout>
          </Marker>
        )
      })}
    </MapView>
  </View>
  );
}

const styles = new StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutText: {
    fontWeight: "bold"
  },
  callout: {
    padding: 10
  },
});