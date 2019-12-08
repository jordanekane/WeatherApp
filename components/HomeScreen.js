import React from "react";
import { StyleSheet, Text, View, ScrollView, Alert, Image } from "react-native";
import MyHeader from "./MyHeader";
import { TextInput, Card, List, Title } from "react-native-paper";
import * as Location from "expo-location";

//my key => 9fb0f39aa274350ac71a4f1de55a8ae0

export default class HomeScreen extends React.Component {
  state = {
    info: {
      name: "loading",
      temp: "loading",
      humidity: "loading",
      desc: "loading",
      icon: "loading"
    },
    location: {}
  };

  getWeather() {
    const apiKey = "9fb0f39aa274350ac71a4f1de55a8ae0";
    const cityName = this.props.navigation.getParam("city", "boston");
    const fetchUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          info: {
            name: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            icon: data.weather[0].icon
          }
        });
      });
  }

  getLocationPermission() {
    const promise = Location.requestPermissionsAsync();

    promise
      .then(data => {
        this.setState({ rejected: false });
        this.getCurrentLocation();
      })
      .catch(() => this.setState({ rejected: true }));
  }

  getCurrentLocation() {
    const promise = Location.getCurrentPositionAsync({});

    promise
      .then(location =>
        this.setState({ location: location.coords, locationFailed: false })
      )
      .catch(() => this.setState({ locationFailed: true }));
  }

  componentDidMount() {
    this.getLocationPermission();
    this.getWeather();
  }

  render() {
    if (this.props.navigation.getParam("city", "boston")) {
      this.getWeather();
    }
    //console.log(this.state.info);

    return (
      <View style={styles.container}>
        <MyHeader title="current weather" />
        <Card style={{ margin: 20 }}>
          <View style={{ padding: 20, alignItems: "center" }}>
            <Title style={styles.text}>{this.state.info.name}</Title>
            <Image
              style={{ width: 120, height: 120 }}
              source={{
                uri: `http://openweathermap.org/img/w/${this.state.info.icon}.png`
              }}
            />
            <Title style={styles.text}>
              TEMPERATURE: {this.state.info.temp} F
            </Title>
            <Title style={styles.text}>
              DESCRIPTION: {this.state.info.desc}
            </Title>
            <Title style={styles.text}>
              HUMIDITY: {this.state.info.humidity} %
            </Title>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefee"
  },
  text: {
    textAlign: "center",
    marginBottom: 10
  }
});
