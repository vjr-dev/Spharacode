import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import { COLORS } from "framework/src/Globals";
import { scaledSize } from "framework/src/Utilities";

interface Props {
  headerText: string;
}

interface S {}

interface SS {}

export default class CustomHeader extends BlockComponent<Props, S, SS> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{this.props.headerText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: scaledSize(40),
    backgroundColor: COLORS.darkorange,
    justifyContent: "center",
  },
  headerText: {
    textAlign: "center",
    color: COLORS.black,
    fontWeight: "700",
    fontSize: scaledSize(16),
  },
});
