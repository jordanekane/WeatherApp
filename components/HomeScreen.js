import React from "react";
import { StyleSheet, Text, View, ScrollView, Alert, Image } from "react-native";
import MyHeader from "./MyHeader";
import { TextInput, Card, List, Title } from "react-native-paper";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        name: "loading",
        temp: "loading",
        humidity: "loading",
        desc: "loading",
        icon: "loading"
      },
      location: {},
      cityName: ""
    };
  }

  async getWeather() {
    if (this.state.name !== "loading") {
      const apiKey = "c6ae69715df250a4d804789e0b34b343";
      const cityName = this.props.navigation.getParam(
        "city",
        this.state.cityName
      );
      const fetchUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        this.setState({
          info: {
            name: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            icon: data.weather[0].icon
          }
        });
      } catch (e) {
        this.setState({
          info: {
            name: "N/A",
            temp: "N/A",
            humidity: "N/A",
            desc: "N/A",
            icon: "N/A"
          }
        });
      }
    }
  }

  async getLocation() {
    if (cityName !== "") {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        try {
          const location = await Location.getCurrentPositionAsync();
          const cityName = await Location.reverseGeocodeAsync({
            latitude: location.latitude,
            longitude: location.latitude
          });
          this.setState({
            cityName
          });
        } catch (e) {
          alert("Error fetching location");
        }
      }
    }
  }

  componentDidMount() {
    this.getLocation();
    this.getWeather();
  }

  render() {
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
