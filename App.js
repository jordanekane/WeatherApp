import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { TextInput, Card, List } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import SearchScreen from "./components/SearchScreen";
import HomeScreen from "./components/HomeScreen";
import MapScreen from "./components/MapScreen";
import App from "./app/index";

const TabNavigator = createBottomTabNavigator(
  {
    "Current City": HomeScreen,
    Search: SearchScreen,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Current City") {
          iconName = `md-cloud`;
        } else if (routeName === "Search") {
          iconName = `md-options`;
        } else {
          iconName = `md-map`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "gray",
      activeBackgroundColor: "lightblue",
      inactiveBackgroundColor: "lightblue"
    }
  }
);

export default createAppContainer(TabNavigator);
