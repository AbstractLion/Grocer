import React from "react";
import MapView, {Marker} from 'react-native-maps';

export default function StoreMarker(props) {
    return (
        <Marker coordinate={props.latlng}/>
    )
}