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
import { Styles } from "./EditSecuritySettingStyle";
import SecuritySettingController, {
  Props,
} from "./UpdateSecuritySettingController";

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

                <Text style={Styles.title}>
                  Enter a 8-digit passcode which you will be asked for when you
                  are trying to login to new device or restore your
                  profile.Please keep this passcode safely for your future
                  reference.
                </Text>

                <View style={Styles.textInputView}>
                  <TextInput
                    testID="passcodeInput"
                    style={Styles.textinput}
                    maxLength={8}
                    value={this.state.Pass}
                    onChangeText={(value) => this.setState({ Pass: value })}
                    placeholder="8-Digit Code"
                    placeholderTextColor={COLORS.ultralightwhite}
                    keyboardType="number-pad"
                    secureTextEntry={true}
                    onFocus={() =>
                      setTimeout(() => {
                        this.setState({ NextButtonBottom: 0 });
                      }, 30)
                    }
                  />
                </View>
                <View style={[Styles.textInputView, { marginTop: 30 }]}>
                  <TextInput
                    testID="confirmPasscodeInput"
                    style={Styles.textinput}
                    maxLength={8}
                    value={this.state.CPass}
                    onChangeText={(value) => this.setState({ CPass: value })}
                    placeholder="Confirm Code"
                    placeholderTextColor={COLORS.ultralightwhite}
                    keyboardType="number-pad"
                    secureTextEntry={true}
                    onFocus={() =>
                      setTimeout(() => {
                        this.setState({ NextButtonBottom: 0 });
                      }, 30)
                    }
                  />
                </View>

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
                    onPress={() => this.NextCLick()}
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
