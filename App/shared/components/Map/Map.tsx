import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "../../../theme/colors";

const Map = ({ longitude, latitude, markerName }) => {
  return (
    <MapView
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      focusable={false}
      zoomEnabled={false}
      rotateEnabled={false}
      zoomTapEnabled={false}
      pitchEnabled={false}
      scrollEnabled={false}
      style={styles.map}
    >
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title={markerName}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 150,
    borderColor: Colors.colorLightGrey,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

Map.defaultProps = {
  longitude: 0,
  latitude: 0,
  markerName: "N/A",
};

export default Map;
