import React, {useContext, useRef, useState} from "react";
import {Callout, Marker} from "react-native-maps";
import {Text, StyleSheet} from "react-native";
import {Button} from 'react-native-elements';
import CurrentStoreContext from "../contexts/CurrentStore";
import {useNavigation} from "@react-navigation/core";
import useDidUpdate from "../hooks/useDidUpdate";

export default function StoreMarker({store}) {
  const navigation = useNavigation();
  const markerRef = useRef();

  const {currentStore, setCurrentStore} = useContext(CurrentStoreContext);

  useDidUpdate(() => {
    if (currentStore.name === store.name) {
      markerRef.current?.showCallout();
    }
  }, [currentStore]);

  return (
    <Marker
      ref={markerRef}
      title={store.name}
      coordinate={store.coords}
      onPress={(e) => {
        markerRef.current?.showCallout();
      }}
    >
      <Callout
        style={styles.callout}
        onPress={() => {
          setCurrentStore({name: store.name, id: store.id});
          navigation.setOptions({ title: store.name });
        }}
      >
        <Text style={styles.calloutText}>{store.name}{'\n'}</Text>
        <Button
          title={currentStore.name === store.name ? "Selected" : "Select"}
          disabled={currentStore.name === store.name}
        />
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  calloutText: {
    fontWeight: "bold"
  },
  callout: {
    padding: 10
  },
});