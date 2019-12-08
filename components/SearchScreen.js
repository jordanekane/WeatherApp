import React from "react";
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from "react-native";
import MyHeader from "./MyHeader";
import { TextInput, Card, List, Button } from "react-native-paper";

export default class SearchScreen extends React.Component {
  state = {
    text: "",
    cities: []
  };

  async buttonclick() {
    console.log("clicked");
    this.props.navigation.navigate("Current City", { city: this.state.text });
    await AsyncStorage.setItem("mericity", this.state.text);
  }

  async listclicked(name) {
    this.setState({ text: name });
    await AsyncStorage.setItem("mericity", this.state.text);
    this.props.navigation.navigate("Current City", { city: this.state.text });
  }

  fetchCities(text) {
    this.setState({ text });
    fetch("http://autocomplete.wunderground.com/aq?query=" + text)
      .then(data => data.json())
      .then(city => {
        this.setState({
          cities: city.RESULTS.slice(0, 9)
        });
      });
  }

  render() {
    renderCity = (
      <Card>
        <List.Item title="no cities" />
      </Card>
    );
    if (this.state.cities.length > 0) {
      renderCity = this.state.cities.map(city => {
        return (
          <Card
            style={{ margin: 5 }}
            key={city.l}
            onPress={() => this.listclicked(city.name)}
          >
            <List.Item title={city.name} />
          </Card>
        );
      });
    }

    return (
      <View style={styles.container}>
        <MyHeader title="select city" />
        <TextInput
          label="Search"
          value={this.state.text}
          onChangeText={text => this.fetchCities(text)}
        />
        <Button
          mode="contained"
          style={{ margin: 20 }}
          onPress={() => this.buttonclick()}
        >
          update city
        </Button>

        <ScrollView>{renderCity}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefee"
  }
});
