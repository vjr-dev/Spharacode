// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
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
import AuthenticationController from "./AuthenticationController";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
import Loader from "../../../components/src/Loader";

export default class Authentication extends AuthenticationController {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={back1} style={styles.image}>
          <ImageBackground source={back2} style={styles.image2}>
            <View>
              <ScrollView>
                <View style={styles.mainView}>
                  <Text style={styles.text1}>Enter Authentication Code.</Text>
                  <Text style={styles.text2}>
                    Please Confirm your identity by providing code you received
                    as SMS by your organization.
                  </Text>

                  <View style={styles.ibackground}>
                    <TextInput
                      testID="authenticationCodeInput"
                      onChangeText={(value) =>
                        this.setState({ code: value })
                      }
                      placeholderTextColor="#cdcdcd"
                      style={styles.verificationCodeInput}
                      placeholder="8-Digit Code"
                      keyboardType="number-pad"
                      maxLength={8}
                    />
                  </View>

                  <View style={styles.notReciveCodeView}>
                    <TouchableOpacity>
                      <Text
                        style={[
                          styles.text3,
                          {
                            marginTop: 0,
                            color: COLORS.orange,
                            marginLeft: scaledSize(5),
                          },
                        ]}
                      >
                        Didn't receive code?
                      </Text>
                    </TouchableOpacity>
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
            <Loader loading={this.state.isLoading}/>
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454545",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  image2: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  mainView: {
    minHeight: deviceHeight,
    minWidth: deviceWidth,
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
  notReciveCodeView: {
    flexDirection: "row",
    marginTop: scaledSize(25),
    justifyContent: "flex-end",
    marginRight: scaledSize(20),
  },
  text3: {
    fontSize: scaledSize(13),
    textAlign: "center",
    color: COLORS.infoGray,
    marginTop: scaledSize(10),
    fontWeight: "600",
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
});
// Customizable Area End
