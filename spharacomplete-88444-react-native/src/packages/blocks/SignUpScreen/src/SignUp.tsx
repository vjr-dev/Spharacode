// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import { COLORS } from "../../../framework/src/Globals";
import { back1, back2, image_back, LOGO } from "./assets";
import SignUpController, { Props } from "./SignUpController";
import {
  deviceHeight,
  deviceWidth,
  scaledSize,
} from "../../../framework/src/Utilities";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class SignUp extends SignUpController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={back1} style={styles.image}>
          <ImageBackground source={back2} style={styles.image2}>
            <View>
              <ScrollView
                contentContainerStyle={styles.subContainer}
                bounces={false}
              >
                <View style={styles.subView}>
                  <View style={styles.mainview}>
                  <TouchableOpacity
                    testID="backButton"
                    style={styles.button1}
                    onPress={() => this.goback()}
                  >
                    <Image source={image_back} style={styles.backimage} />
                  </TouchableOpacity>
                </View>
                  <Image source={LOGO} style={styles.logo} />

                  {this.state.roleID == 1 ? (
                    <Text testID={"firstResponderTitle"} style={styles.headerText}>Welcome to Sphara</Text>
                  ) : (
                    <Text testID={"civilianTitle"} style={styles.headerText}>Sign Up</Text>
                  )}

                  {this.state.roleID === 1 ? (
                    <Text testID={"firstResponderLabel"} style={styles.subText}>
                      Provide your work phone number which you were enrolled at
                      your work. So we can be able to send you confirmation as
                      authentication code
                    </Text>
                  ) : (
                    <Text testID={"civilianLabel"} style={styles.subText}>
                      Provide your phone number so we can be able to send you
                      confirmation code
                    </Text>
                  )}

                  <View style={styles.textInputView}>
                    <TouchableOpacity
                      testID="CountryCodeButton"
                      onPress={() => this.setState({ Cmodal: true })}
                      style={styles.ccode}
                    >
                      <Text testID={"stateCodeText"} style={styles.countryCodeText}>
                        +{this.state.Code}
                      </Text>
                      <AntDesign
                        name="caretdown"
                        style={styles.downArrow}
                        color={COLORS.infoGray}
                        size={scaledSize(10)}
                      />
                    </TouchableOpacity>
                    <TextInput
                      testID="phoneNumberInput"
                      value={this.state.Number}
                      onChangeText={(TT) =>
                        this.setState({ Number: TT })
                      }
                      placeholderTextColor={COLORS.infoGray}
                      style={styles.colorWhite}
                      placeholder=" Phone Number"
                      keyboardType="number-pad"
                    />
                  </View>

                  <Text style={styles.grayText}>
                    By continuing, you are indicating that you agree to the
                  </Text>

                  <View style={styles.privacyPolicyView}>
                    <TouchableOpacity>
                      <Text style={styles.underLineText}>Privacy Policies</Text>
                    </TouchableOpacity>
                    <Text style={[styles.grayText, { marginTop: 0 }]}>
                      {" "}
                      and{" "}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.underLineText}>Terms.</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.haveAcountView}>
                    <Text style={[styles.grayText, { marginTop: 0 }]}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      testID="logInLink"
                      onPress={() => this.loginscreen()}
                    >
                      <Text
                        style={[
                          styles.grayText,
                          { marginTop: 0, color: COLORS.orange, marginLeft: 5 },
                        ]}
                      >
                        Log in
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Modal transparent={true} visible={this.state.Cmodal}>
                    <View
                      style={{
                        height: deviceHeight,
                        width: deviceWidth,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <CountryPicker
                        testID="countryPicker"
                        theme={DARK_THEME}
                        countryCode={"IN"}
                        withFlag={true}
                        visible={this.state.Cmodal}
                        onSelect={(Country) => this.codelcik(Country)}
                        onClose={() => this.setState({ Cmodal: false })}
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
                  <Modal visible={this.state.Loader} transparent={true}>
                    <View
                      style={{
                        height: deviceHeight,
                        width: deviceWidth,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          height: 100,
                          width: deviceWidth - 20,
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ActivityIndicator
                          animating={true}
                          size={"large"}
                          color="#f07233"
                        />
                      </View>
                    </View>
                  </Modal>
                </View>
              </ScrollView>

              <View style={styles.btnView}>
                <TouchableOpacity
                  testID="continueButton"
                  onPress={() => this.onclick()}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>CONTINUE</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  subContainer: {
    // flex: 1,
    // height: deviceHeight,
    flexGrow: 1,
  },
  subView: {
    alignItems: "center",
    height: "100%",
    flex: 1,
    // backgroundColor:'red'
  },
  mainview: {
    height: 60,
    width: deviceWidth,
    justifyContent: "center",
  },
  button1: {
    marginLeft: 20,
  },
  backimage: {
    height: 15,
    width: 15,
    tintColor: "#f07233",
  },
  logo: {
    height: scaledSize(100),
    width: scaledSize(100),
    marginTop: scaledSize(40),
  },
  headerText: {
    fontSize: scaledSize(18),
    textAlign: "center",
    color: COLORS.white,
    marginTop: scaledSize(25),
    fontWeight: "bold",
    letterSpacing: 1,
  },
  btnText: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  subText: {
    fontSize: scaledSize(13),
    textAlign: "center",
    color: COLORS.infoGray,
    marginTop: scaledSize(10),
    width: deviceWidth - 70,
    fontWeight: "600",
  },
  textInputView: {
    height: scaledSize(60),
    marginTop: scaledSize(30),
    marginBottom: scaledSize(40),
    alignItems: "center",
    flexDirection: "row",
    width: deviceWidth - 20,
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  countryCodeText: {
    color: COLORS.white,
    fontSize: scaledSize(14),
  },
  ccode: {
    height: scaledSize(35),
    width: scaledSize(60),
    backgroundColor: "#444444",
    marginLeft: scaledSize(10),
    borderRadius: scaledSize(25),
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row'
  },
  grayText: {
    fontSize: scaledSize(13),
    textAlign: "center",
    color: COLORS.infoGray,
    marginTop: scaledSize(10),
    fontWeight: "600",
  },
  privacyPolicyView: {
    flexDirection: "row",
  },
  underLineText: {
    color: COLORS.white,
    fontSize: scaledSize(13),
    textDecorationLine: "underline",
  },
  haveAcountView: {
    flexDirection: "row",
    marginTop: scaledSize(35),
  },
  btnView: {
    // position: "relative",
    // bottom: 75,
    alignItems: "center",
    width: deviceWidth,
    // flex: 1,
    justifyContent: "flex-end",
    marginBottom: deviceHeight * 0.05,
  },
  btn: {
    height: scaledSize(50),
    width: deviceWidth - 20,
    // marginTop: scaledSize(120),
    backgroundColor: COLORS.darkorange,
    borderRadius: 30,
    justifyContent: "center",
  },
  colorWhite: {
    color: "#fff",
    marginLeft: scaledSize(10),
    fontSize: scaledSize(13),
  },
  downArrow: {
    marginLeft: scaledSize(5),
  },
});
// Customizable Area End
