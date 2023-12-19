import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { back1, back2 } from "./assets";
import { COLORS } from "framework/src/Globals";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
import AntDesign from "react-native-vector-icons/AntDesign";
import Loader from "../../../components/src/Loader";
// Customizable Area End

import NewPhoneNumberVerificationController, {
  Props,
} from "./NewPhoneNumberVerificationController";

export default class NewPhoneNumberVerification extends NewPhoneNumberVerificationController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  
  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={back1} style={styles.bgImage}>
          <ImageBackground source={back2} style={styles.bgImage}>
            <View>
              <ScrollView>
                <View style={styles.mainView}>
                  <AntDesign
                    testID="backButton"
                    name="left"
                    style={styles.backBtn}
                    color={COLORS.darkorange}
                    size={scaledSize(15)}
                    onPress={() => this.props.navigation.goBack()}
                  />
                  <Text style={styles.text1}>Enter Verification Code.</Text>
                  <Text style={styles.text2}>
                    {`We have sent you an OTP to ${this.props.route.params.newPhoneNumber}`}
                  </Text>

                  <View style={styles.ibackground}>
                    <TextInput
                      testID="verificationCodeInput"
                      value = {this.state.code}
                      onChangeText={(value) => this.setState({ code: value })}
                      placeholderTextColor="#cdcdcd"
                      style={styles.verificationCodeInput}
                      placeholder="8-Digit Code"
                      keyboardType="number-pad"
                      maxLength={8}
                    />
                  </View>
                </View>
              </ScrollView>
              <View style={styles.btnView}>
                <TouchableOpacity
                  testID="confirmButton"
                  onPress={() => this.confirmBtn()}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>CONFIRM</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Loader loading={this.state.isLoading} />
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: "#454545",
  },
  bgImage: {
    height: "100%",
    width: "100%",
    alignItems: "center"
  },
  mainView: {
    minHeight: deviceHeight,
    minWidth: deviceWidth,
  },
  backBtn: {
    margin: scaledSize(15),
  },
  text1: {
    fontSize: scaledSize(18),
    color: COLORS.white,
    marginTop: scaledSize(50),
    fontWeight: "bold",
    letterSpacing: 1,
    paddingHorizontal: scaledSize(20),
  },
  btnText: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  text2: {
    fontSize: scaledSize(13),
    color: COLORS.infoGray,
    marginTop: scaledSize(10),
    paddingHorizontal: scaledSize(20),
    fontWeight: "600",
  },
  ibackground: {
    height: scaledSize(60),
    width: deviceWidth - scaledSize(20),
    marginTop: scaledSize(50),
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
    alignSelf: "center",
  },
  verificationCodeInput: {
    color: COLORS.infoGray,
    marginLeft: scaledSize(10),
    fontSize: scaledSize(14),
  },
  btnView: {
    alignItems: "center",
    width: deviceWidth,
    justifyContent: "flex-end",
    marginBottom: deviceHeight * 0.05,
  },
  btn: {
    height: scaledSize(50),
    width: deviceWidth - 20,
    backgroundColor: COLORS.darkorange,
    borderRadius: 30,
    justifyContent: "center",
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Customizable Area End
});