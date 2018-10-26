/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import CoolLogin from "./CoolLogin";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CoolLogin />
      </View>
    );
  }
}
