// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import StripeWebViewController, { Props } from "./StripeWebViewController";
import { WebView } from "react-native-webview";

export default class StripeWebView extends StripeWebViewController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const url = this.props.route.params?.url?.url;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#54595F"
          translucent={true}
        />
        <WebView
          source={{
            uri: url,
          }}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
// Customizable Area End
