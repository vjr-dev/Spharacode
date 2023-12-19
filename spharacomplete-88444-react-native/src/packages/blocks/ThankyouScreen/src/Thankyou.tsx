// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import ThankyouController, { Props } from "./ThankyouController";
import { back1, back2, Thanks } from "./assets";
import { COLORS } from "framework/src/Globals";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
import Loader from "../../../components/src/Loader";
export default class Thankyou extends ThankyouController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={back1} style={styles.image}>
          <ImageBackground source={back2} style={styles.image2}>
            <TouchableOpacity
              testID={"outsideClick"}
              onPress={() => this.setState({ istooltipVisible: false })}
              activeOpacity={1}
            >
              <View style={styles.mainView}>
                <View style={styles.subView}>
                  <Image
                    source={Thanks}
                    resizeMode="contain"
                    style={styles.logo}
                  />
                  <Text style={styles.text1}>Thank You!</Text>
                  <Text style={styles.text2}>
                    Your phone number has been verified successfully.
                  </Text>
                </View>

                {this.state.roleID == "1" && (
                  <View style={styles.authCodeView}>
                    {this.state.istooltipVisible ? (
                      <View style={styles.tooltipContainer}>
                        <Text testID={"popupText"} style={styles.tooltipText}>
                          Authentication code is a 6 digit code sent by us to
                          your company which confirm your identity as first
                          respoder.
                        </Text>
                        <View style={styles.triangle} />
                      </View>
                    ) : null}
                    <Text style={styles.authText}>
                      {"Next, please enter "}
                      <Text
                        testID="authCodeLink"
                        onPress={() =>
                          this.setState({ istooltipVisible: true })
                        }
                        style={styles.orangeText}
                      >
                        {"authentication code "}
                      </Text>
                      {"sent \nyou as SMS by your organization"}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.btnView}>
                <TouchableOpacity
                  testID="continueButton"
                  onPress={() => this.onclick()}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>
                    {" "}
                    {this.state.roleID == "1"
                      ? "CONTINUE"
                      : "CONTINUE TO PROFILE"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <Loader loading={this.state.isLoading} />
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
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  subView: {
    padding: scaledSize(10),
    alignItems: "center",
    marginTop: scaledSize(50),
  },
  logo: {
    height: scaledSize(100),
    width: scaledSize(100),
  },
  text1: {
    fontSize: scaledSize(18),
    textAlign: "center",
    color: COLORS.white,
    marginTop: scaledSize(25),
    fontWeight: "bold",
    letterSpacing: 1,
  },
  text2: {
    fontSize: scaledSize(13),
    color: COLORS.infoGray,
    marginTop: 10,
    width: deviceWidth - scaledSize(90),
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
  },
  authText: {
    fontSize: scaledSize(12),
    color: COLORS.infoGray,
    width: deviceWidth - scaledSize(90),
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
    lineHeight: scaledSize(20),
  },
  orangeText: {
    color: COLORS.orangelight,
  },
  btnView: {
    alignItems: "center",
    width: deviceWidth,
    justifyContent: "flex-end",
    marginBottom: deviceHeight * 0.05,
  },
  btn: {
    height: scaledSize(50),
    width: deviceWidth - scaledSize(20),
    backgroundColor: COLORS.darkorange,
    borderRadius: scaledSize(30),
    justifyContent: "center",
  },
  btnText: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  authCodeView: {
    marginTop: scaledSize(100),
    width: "auto",
    alignSelf: "center",
  },
  tooltipContainer: {
    position: "absolute",
    right: scaledSize(10),
    top: scaledSize(-75),
    width: scaledSize(170),
    padding: scaledSize(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.orangelight,
    borderRadius: 5,
  },
  triangle: {
    position: "absolute",
    bottom: scaledSize(-10),
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: scaledSize(5),
    borderRightWidth: scaledSize(5),
    borderBottomWidth: scaledSize(10),
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: COLORS.orangelight,
    transform: [{ rotate: "180deg" }],
  },
  tooltipText: {
    fontSize: scaledSize(10),
    color: COLORS.black,
  },
});

// Customizable Area End
