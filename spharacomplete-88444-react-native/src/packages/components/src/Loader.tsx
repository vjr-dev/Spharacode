//@ts-ignore
//@ts-nocheck
import { ActivityIndicator, StyleSheet, View } from "react-native";

import React from "react";

interface myProps {
  loading: boolean;
}
export default function Loader(props: myProps) {
  return props.loading ? (
    <View style={styles.loaderContainer}>
    <ActivityIndicator
      animating={true}
      color="#f07233"
      hidesWhenStopped={true}
      size="large"
    />
  </View>
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    height:'100%',
    width:'100%',
    position:'absolute',
    zIndex:9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0,0,0,0.5)",
  }
});