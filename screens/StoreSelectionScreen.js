import React, {useContext} from "react";
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
    name: "Walmart Erin Mills",
    coords: {
      latitude: 43.5603944,
      longitude: -79.714509,
    },
    id: 1
  },
  {
    name: "Walmart Markham",
    coords: {
      latitude: 43.867632,
      longitude: -79.2929858,
    },
    id: 2
  },
  {
    name: "Walmart Brampton East",
    coords: {
      latitude: 43.7407067,
      longitude: -79.6972618,
    },
    id: 3
  },
  {
    name: "Foody Mart Scarborough",
    coords: {
      latitude: 43.8151643,
      longitude: -79.3248755,
    },
    id: 4
  },
  {
    name: "Nations Fresh Foods",
    coords: {
      latitude: 43.5508372,
      longitude: -79.7213554,
    },
    id: 5
  },
  {
    name: "Metro Warden Ave",
    coords: {
      latitude: 43.797456,
      longitude: -79.3200992,
    },
    id: 6
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
              navigation.setOptions({ title: store.name });
              setCurrentStore({name: store.name, id: store.id})
            }}>
              <Text style={styles.calloutText}>{store.name}{'\n'}</Text>
              <Button
                title="Select"
              />
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
  }
});