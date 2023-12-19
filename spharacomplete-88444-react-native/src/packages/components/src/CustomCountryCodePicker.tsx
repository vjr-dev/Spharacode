import { deviceHeight, deviceWidth } from "framework/src/Utilities";
import React, { Component } from "react";
import { Modal, StyleSheet, View } from "react-native";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";

interface Props {
  visible: any;
  onClose: any;
  onSelect: any;
}

interface S {}

export default class CustomCountryCodePicker extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: props.visible,
      onClose: props.onClose,
      onSelect: props.onSelect,
    };
  }

  render() {
    return (
      <Modal transparent={true} visible={this.props.visible}>
        <View style={styles.container}>
          <CountryPicker
            theme={DARK_THEME}
            countryCode={"IN"}
            withFlag={true}
            visible={this.props.visible}
            onSelect={this.props.onSelect}
            onClose={this.props.onClose}
            withCallingCode={true}
            withCountryNameButton={true}
            withCurrencyButton={true}
            withFlagButton={true}
            withFilter={true}
            withModal={false}
            excludeCountries={["AQ", "BV", "TF"]}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
