import React from "react";
// Customizable Area Start
import { StyleSheet, Dimensions, Platform } from "react-native";
// Customizable Area End

const viewportHeight = Dimensions.get("window").height;
const viewportWidth = Dimensions.get("window").width;

import MapView from "react-native-maps";

import MapsController, { Props, configJSON } from "./MapsController";

export default class Maps extends MapsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  map: {
    width: viewportWidth,
    height: viewportHeight,
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});
// Customizable Area End
