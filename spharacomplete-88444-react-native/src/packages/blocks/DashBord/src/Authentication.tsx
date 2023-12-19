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
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar
} from "react-native";
import { COLORS } from "../../../framework/src/Globals";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Props } from "../../dashboard/src/DashboardController";
import { back1, back2 } from "./assets";
import { backIcon } from "../../customform/src/assets";
import AuthenticationController from "./AuthenticationController";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Authentication extends AuthenticationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <StatusBar
          animated={true}
          backgroundColor="#454545"
          barStyle={"light-content"}
          showHideTransition={"slide"}
          // hidden={true}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps={"handled"}
          style={styles.child}
        >
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <View
                style={{
                  flex: 0.9,
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <View>
                  <TouchableOpacity
                    testID="gobackbtn"
                    onPress={() => this.props.navigation.goBack()}
                    style={{ marginTop: RFValue(5) }}
                  >
                    <Image
                      source={backIcon}
                      style={{
                        height: RFValue(20),
                        width: RFValue(20),
                        resizeMode: "center",
                        marginLeft: RFValue(10)
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      marginHorizontal: RFPercentage(2),
                      marginTop: RFPercentage(5)
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: RFValue(20),
                        fontWeight: "700"
                      }}
                    >
                      Enter Authentiation Code.
                    </Text>
                    <Text
                      style={{
                        color: COLORS.lightwhite,
                        fontSize: RFValue(15),
                        fontWeight: "200",
                        marginTop: RFValue(4)
                      }}
                    >
                      Please Confirm your identify by providing code{"\n"}you
                      received as SMS by your organization.
                    </Text>
                  </View>
                  <View style={styles.ibackground}>
                    <TextInput
                      testID="textInput"
                      onChangeText={TT => this.setState({ code: parseInt(TT) })}
                      placeholderTextColor={COLORS.lightwhite}
                      style={{
                        color: "#cdcdcd",
                        marginLeft: RFValue(10),
                        width: "93%",
                        height: RFValue(40)
                      }}
                      placeholder="6-Digit Code"
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      marginRight: RFPercentage(5),
                      marginTop: RFPercentage(3)
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.darkorange,
                        fontSize: RFValue(14)
                      }}
                    >
                      Didn't receive code?
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  testID="otpCheckbtn"
                  onPress={() => this.otpcheck(this.state.code)}
                  style={styles.button}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: RFValue(14)
                    }}
                  >
                    CONFIRM
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#ffffffff"
  },
  image: {
    height: windowHeight,
    width: windowWidth
  },
  image2: {
    height: windowHeight,
    width: windowWidth
    // alignItems: "center",
  },
  container1: { flex: 1, backgroundColor: "#454545" },
  child: { width: windowWidth },
  ibackground: {
    height: RFValue(50),
    width: windowWidth - 20,
    marginTop: RFValue(45),
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
    alignSelf: "center"
  },
  button: {
    height: 50,
    width: "90%",
    backgroundColor: COLORS.darkorange,
    // marginTop: 70,
    // marginTop: windowHeight - 708,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
    // marginBottom:RFPercentage(10)
  }
});
// Customizable Area End
