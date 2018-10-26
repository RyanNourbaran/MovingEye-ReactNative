import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import { Container, Header, Content, Form, Item, Input } from "native-base";

const styles = StyleSheet.create({
  eyeball: {
    width: 150,
    height: 75,
    borderWidth: 1,
    borderRadius: 50,
    marginLeft: 10
  }
});
export default class CoolLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEyeBallLeftStyle: 0,
      passEyeBallLeftStyle: 0
    };
    this.left = new Animated.Value(0);
    this.spin = new Animated.Value(0);
  }

  userKeyPress = function(e) {
    //add a way to make the aniation in sequence not parralel
    let oldVal = this.state.userEyeBallLeftStyle;
    let changeVal = 0.01;
    const maxVal = 0.32;
    const minVal = 0;

    if (e.nativeEvent.key == "Backspace") {
      changeVal *= -1;
    }

    //set the new val even if it's reached the end
    if ((newVal = oldVal + changeVal) < 0) {
      newVal = 0;
    }

    this.setState({
      userEyeBallLeftStyle: newVal
    });

    //Value must be between the min and max. Until then, do no animations (but inc/dec. the value)
    if (oldVal < maxVal && oldVal >= minVal) {
      Animated.timing(this.left, {
        toValue: newVal,
        duration: 400,
        easing: Easing.linear
      }).start();
      Animated.timing(this.spin, {
        toValue: -newVal,
        duration: 400,
        easing: Easing.linear
      }).start();
    }
  };
  passKeyPress = function(e) {
    //add a way to make the aniation in sequence not parralel
    let oldVal = this.state.passEyeBallLeftStyle;
    let changeVal = 0.01;
    const maxVal = 0.32;
    const minVal = 0;

    if (e.nativeEvent.key == "Backspace") {
      changeVal *= -1;
    }

    //set the new val even if it's reached the end
    if ((newVal = oldVal + changeVal) < 0) {
      newVal = 0;
    }

    this.setState({
      passEyeBallLeftStyle: newVal
    });

    //Value must be between the min and max. Until then, do no animations (but inc/dec. the value)
    if (oldVal < maxVal && oldVal >= minVal) {
      Animated.timing(this.left, {
        toValue: newVal,
        duration: 400,
        easing: Easing.linear
      }).start();

      Animated.timing(this.spin, {
        toValue: -newVal,
        duration: 400,
        easing: Easing.linear
      }).start();
    }
  };

  render() {
    const left = this.left.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    });

    const spin = this.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <Container>
        <Header />
        <Content>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.eyeball}>
              <Animated.Image
                style={{ width: 50, height: 50, top: 15, left, transform: [{ rotate: spin }] }}
                source={require("../../assets/inner-eye2.png")}
              />
            </View>
            <View style={styles.eyeball}>
              <Animated.Image
                style={{ width: 50, height: 50, top: 15, left, transform: [{ rotate: spin }] }}
                source={require("../../assets/inner-eye2.png")}
              />
            </View>
          </View>
          <Form>
            <Item>
              <Input
                placeholder="Username"
                keyboardType="default"
                onKeyPress={this.userKeyPress.bind(this)}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                keyboardType="default"
                onKeyPress={this.passKeyPress.bind(this)}
                secureTextEntry={true}
                onFocus={() => this.setState({ passEyeBallLeftStyle: 0 })}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
