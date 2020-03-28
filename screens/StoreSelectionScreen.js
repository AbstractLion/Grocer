import React from "react";
import {View, Dimensions, StyleSheet, FlatList, Text, Button} from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const storeLocations = [
  {
    name: "Walmart Toronto Downsview",
    coords: {
      latitude: 43.7577199,
      longitude: -79.491159,
    }
  },
  {
    name: "Walmart Erin Mills",
    coords: {
      latitude: 43.5603944,
      longitude: -79.714509,
    }
  },
  {
    name: "Walmart Markham",
    coords: {
      latitude: 43.867632,
      longitude: -79.2929858,
    }
  },
  {
    name: "Walmart Brampton East",
    coords: {
      latitude: 43.7407067,
      longitude: -79.6972618,
    }
  },
  {
    name: "Foody Mart Scarborough",
    coords: {
      latitude: 43.8151643,
      longitude: -79.3248755,
    }
  },
  {
    name: "Nations Fresh Foods",
    coords: {
      latitude: 43.5508372,
      longitude: -79.7213554,
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