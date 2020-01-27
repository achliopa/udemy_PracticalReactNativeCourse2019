import React, { useState} from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();
    const mapRegion = {
        latitude: 40.55,
        longitude: 23.05,
        latitudeDelta: 0.022,
        longitudeDelta: 0.0421,
    }

    const selectLocation = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    };

    let markerCoordinates;

    if (selectedLocation){
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }
    return (
        <MapView 
            style={styles.map} 
            region={mapRegion} 
            onPress={selectLocation}
        >
            <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default MapScreen;