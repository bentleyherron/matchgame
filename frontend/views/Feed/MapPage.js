import React from 'react';
import {Container} from 'native-base';
import MapView from 'react-native-maps';

export default function MapPage({route, navigation}) {
    return(
            <MapView region={{latitude: 33.7371583, longitude: -84.36821, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} />
    )
}