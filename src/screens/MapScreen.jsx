import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

const MapScreen = ({ route }) => {
  const latitude = route.params.geolocation?.latitude;
  const longitude = route.params.geolocation?.longitude;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType='standard'
        minZoomLevel={15}
        showsUserLocation={true}>
        {route.params && <Marker title={route.params?.location ?? 'I`m here'} coordinate={{ latitude, longitude }} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1,
  },
});

export default MapScreen;
