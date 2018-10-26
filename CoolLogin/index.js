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
      eyeBallLeftMargin: 0
    };
    this.spinValue = new Animated.Value(0);
  }

  userKeyPress = function(e) {
    //add a way to make the aniation in sequence not parralel
    let oldVal = this.state.eyeBallLeftMargin;
    console.log(oldVal);
    let changeVal = 0.01;
    const maxVal = 0.32;
    const minVal = 0;

    if (e.nativeEvent.key == "Backspace") {
      changeVal *= -1;
    }

    //set the new val even if it's reached the end
    const newVal = oldVal + changeVal;
    this.setState({
      eyeBallLeftMargin: newVal
    });

    //either (old value is below max and increasing) OR (old value above min and decreasing)
    if (oldVal < maxVal && oldVal >= minVal) {
      Animated.timing(this.spinValue, {
        toValue: newVal,
        duration: 400,
        easing: Easing.linear
      }).start();
    }
  };
  passChange(e) {
    console.log(e);
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
              <Input
                placeholder="Username"
                keyboardType="default"
                onKeyPress={this.userKeyPress.bind(this)}
              />
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
