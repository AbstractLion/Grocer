import React from "react";
import {View, Dimensions, StyleSheet, FlatList, Text, Button} from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const storeLocations = [
  {
    name: "Walmart - Toronto",
    coords: {
      latitude: 43.800680,
      longitude: -79.336230,
    }
  },
  {
    name: "Walmart - Mississauga",
    coords: {
      latitude: 43.200680,
      longitude: -79.436230,
    }
  },
  {
    name: "Walmart - Markham",
    coords: {
      latitude: 43.850080,
      longitude: -73.336230,
    }
  },
  {
    name: "Walmart - Brampton",
    coords: {
      latitude: 43.8040680,
      longitude: -72.336230,
    }
  },
];

export default function StoreSelectionScreen() {
  const navigation = useNavigation();
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
        console.log(store.coords);
        return (
          <MapView.Marker
              key={store.name}
              title={store.name}
              coordinate={store.coords}

          >
            <Callout
                onPress={() => {
                  navigation.setOptions({ title: store.name })
                }}
                style={styles.callout}
            >
              <Text style={styles.calloutText}>{store.name}{'\n'}</Text>
              <Button title="Select"/>
            </Callout>
          </MapView.Marker>
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