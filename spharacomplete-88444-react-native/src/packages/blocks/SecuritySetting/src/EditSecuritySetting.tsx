// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS } from "../../../framework/src/Globals";
import { back1, back2, image_back } from "./assets";
import SecuritySettingController, {
  Props,
} from "./EditSecuritySettingController";
import { Styles } from "./EditSecuritySettingStyle";

export default class SecuritySetting extends SecuritySettingController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        testID="keyboardDismissButton"
        onPress={() => Keyboard.dismiss()}
      >
        <SafeAreaView style={Styles.container1}>
          <View style={Styles.child}>
            <StatusBar
              animated={true}
              backgroundColor="#454545"
              barStyle={"light-content"}
              showHideTransition={"slide"}
              // hidden={true}
            />
            <ImageBackground source={back1} style={Styles.image}>
              <ImageBackground source={back2} style={Styles.image2}>
                <View style={Styles.view1}>
                  <TouchableOpacity
                    testID="backButton"
                    style={Styles.button1}
                    onPress={() => this.goback()}
                  >
                    <Image source={image_back} style={Styles.backbutton} />
                  </TouchableOpacity>
                </View>

                {/* <Text style={{ fontSize: 20, color: COLORS.white, marginTop: 50, width: windowWidth - 20, }}>EDIIIT Security.</Text> */}
                <Text style={Styles.title}>
                  Enter backup email to reset passcode
                </Text>
                {/* <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: 5, width: windowWidth - 20 }}>your passcode when you are trying to re-login or</Text>
                            <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: 5, width: windowWidth - 20 }}>restore your profile</Text> */}

                <View style={Styles.textInputView}>
                  <TextInput
                    testID="emailInput"
                    value={this.state.Email}
                    onChangeText={(Val) => this.setState({ Email: Val })}
                    style={Styles.textinput}
                    placeholder="Email"
                    placeholderTextColor={COLORS.ultralightwhite}
                    onFocus={() =>
                      setTimeout(() => {
                        this.setState({ NextButtonBottom: 0 });
                      }, 30)
                    }
                  />
                </View>

                <View style={[Styles.textInputView, { marginTop: 30 }]}>
                  <TextInput
                    testID="confirmEmailInput"
                    value={this.state.CEmail}
                    onChangeText={(Val) => this.setState({ CEmail: Val })}
                    style={Styles.textinput}
                    placeholder="Confirm email"
                    placeholderTextColor={COLORS.ultralightwhite}
                    onFocus={() =>
                      setTimeout(() => {
                        this.setState({ NextButtonBottom: 0 });
                      }, 30)
                    }
                  />
                </View>

                {/* <TouchableOpacity
                                onPress={() => this.NextClick()}
                                style={{position:"absolute",bottom:25}}
                            >
                                <Text style={{ color: COLORS.darkorange }}>NEXT</Text>
                            </TouchableOpacity> */}
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : undefined}
                  style={[
                    Styles.keyboardAvoiding,
                    {
                      bottom:
                        Platform.OS == "ios"
                          ? 130
                          : this.state.NextButtonBottom,
                    },
                  ]}
                >
                  <TouchableOpacity
                    testID="nextButton"
                    onPress={() => this.NextClick()}
                    style={Styles.btnContainer}
                  >
                    <Text style={Styles.next}>NEXT</Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>

                <Modal visible={this.state.Loader} transparent={true}>
                  <View style={Styles.indicatorView}>
                    <View style={Styles.indicator}>
                      <ActivityIndicator
                        animating={true}
                        size={"large"}
                        color="#f07233"
                      />
                    </View>
                  </View>
                </Modal>
              </ImageBackground>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
// Customizable Area End
