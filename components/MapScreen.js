import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import MyHeader from "./MyHeader";
import { TextInput, Card, List } from "react-native-paper";
import MapView from "react-native-maps";

export default class MapScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="map view" />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefee"
  },
  map: {
    flex: 1
  }
});
