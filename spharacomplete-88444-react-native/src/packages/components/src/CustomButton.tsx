import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import { COLORS } from "framework/src/Globals";
import { scaledSize } from "framework/src/Utilities";

interface Props {
  onPress: any;
  title: string;
  testID: string;
}

interface S {}

interface SS {}

export default class CustomButton extends BlockComponent<Props, S, SS> {
  render() {
    return (
      <TouchableOpacity testID={this.props.testID} style={styles.btnView} onPress={this.props.onPress}>
        <Text style={styles.btnText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnView: {
    backgroundColor:COLORS.darkorange,
    width:"50%",
    borderRadius:scaledSize(20),
    elevation:10
  },
  btnText: {
    color: COLORS.white,
    textAlign:'center',
    paddingVertical:scaledSize(10)
  },
});
