import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import { Container, Header, Content, Form, Item, Input } from "native-base";

const styles = StyleSheet.create({
  eyeball: {
    width: 100,
    height: 75,
    borderWidth: 1,
    borderRadius: 50
  }
});
export default class CoolLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eyeBallLeftMargin: 0
    };
    this.spinValue = new Animated.Value(0);
  }

  userChange() {
    //add a way to make the aniation in sequence not parralel
    let oldVal = this.state.eyeBallLeftMargin;
    console.log(oldVal);

    if (oldVal < 1) {
      Animated.timing(this.spinValue, {
        toValue: 0.03 + oldVal,
        duration: 400,
        easing: Easing.linear
      }).start(
        this.setState({
          eyeBallLeftMargin: oldVal + 0.03
        })
      );
    }
  }
  userBackSpace() {
    //add a way to make the aniation in sequence not parralel
    let oldVal = this.state.eyeBallLeftMargin;
    console.log(oldVal);

    if (oldVal < 1) {
      Animated.timing(this.spinValue, {
        toValue: 0.03 + oldVal,
        duration: 400,
        easing: Easing.linear
      }).start(
        this.setState({
          eyeBallLeftMargin: oldVal + 0.03
        })
      );
    }
  }
  passChange() {
    console.log("password changed");
  }
  render() {
    let { eyeBallLeftPosition } = this.state;
    const left = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    });

    return (
      <Container>
        <Header />
        <Content>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.eyeball}>
              <Animated.Image
                style={{ width: 50, height: 50, top: 5, left }}
                source={require("../../assets/inner-eye2.png")}
              />
            </View>
            <View style={styles.eyeball}>
              <Animated.Image
                style={{ width: 50, height: 50, top: 5, left }}
                source={require("../../assets/inner-eye2.png")}
              />
            </View>
          </View>
          <Form>
            <Item>
              <Input placeholder="Username" onChangeText={this.userChange.bind(this)} />
            </Item>
            <Item last>
              <Input placeholder="Password" onChangeText={this.passChange.bind(this)} />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
