// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import VerificationController, { Props } from "./VerificationController";
import { back1, back2, LOGO, image_back } from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Verification extends VerificationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <ScrollView>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={styles.view1}>
                    <TouchableOpacity
                      testID="verificationBackButton"
                      style={{ marginLeft: 20 }}
                      onPress={() => this.goback()}
                    >
                      <Image source={image_back} style={styles.backimage} />
                    </TouchableOpacity>
                  </View>
                  <Image source={LOGO} style={styles.logo} />
                  <Text style={styles.text1}>Enter Verification code.</Text>
                  <Text style={styles.text2}>
                    We have sent you an SMS with a code to the number that you
                    provided
                  </Text>

                  <View
                    // source={Rectangle}
                    style={styles.ibackground}
                  >
                    <TextInput
                      testID="verificationCodeInput"
                      onChangeText={(text: string) =>
                        this.setState({ code: text })
                      }
                      placeholderTextColor="#cdcdcd"
                      style={{
                        color: "#cdcdcd",
                        marginLeft: 10,
                        width: "93%",
                        height: 40,
                      }}
                      placeholder="8-Digit Code"
                      keyboardType="number-pad"
                      maxLength={8}
                    />
                  </View>

                  <View style={styles.view2}>
                    <Text style={styles.text3}>Can't receive code? </Text>
                    <TouchableOpacity
                      testID="verificationResenOTPButton"
                      onPress={() => {}}
                    >
                      <Text style={styles.text4}>Resend OTP</Text>
                    </TouchableOpacity>
                    </View>

                  <TouchableOpacity
                    testID="verificationContinueButton"
                    onPress={() => this.otpchack()}
                    style={styles.button}
                  >
                    <Text style={styles.colorwhite}>CONTINUE</Text>
                  </TouchableOpacity>
                  <Modal visible={this.state.Loader} transparent={true}>
                    <View
                      style={{
                        height: windowHeight,
                        width: windowWidth,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          height: 100,
                          width: windowWidth - 20,
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
            </ImageBackground>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#ffffffff",
  },
  image: {
    height: windowHeight,
    width: windowWidth,
  },
  image2: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center",
  },
  container1: { flex: 1, backgroundColor: "#454545" },
  child: { width: windowWidth },
  images: { height: 150, width: 150, alignSelf: "center", marginBottom: 20 },
  view1: { height: 60, width: windowWidth, justifyContent: "center" },
  backimage: { height: 15, width: 15, tintColor: "#f07233" },
  logo: { height: 100, width: 100, marginTop: 40 },
  text1: { fontSize: 20, textAlign: "center", color: "#fff", marginTop: 50 },
  text2: {
    fontSize: 13,
    textAlign: "center",
    color: "#cdcdcd",
    marginTop: 10,
    width: 270,
  },
  ibackground: {
    height: 60,
    width: windowWidth - 20,
    marginTop: 50,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  textinput: {},
  view2: {
    flexDirection: "row",
    width: "90%",
    marginTop: 30,
    justifyContent: "flex-end",
  },
  text3: { fontSize: 13, color: "#cdcdcd" },
  text4: { fontSize: 13, color: "#f07233" },
  button: {
    height: 50,
    width: "90%",
    backgroundColor: "#f07233",
    marginTop: 70,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  colorwhite: { color: "#fff" },
});
// Customizable Area End
