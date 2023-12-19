// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../../framework/src/Globals";
import { back1, back2, image_back } from "./assets";
import SecuritySettingController, { Props } from "./SecuritySettingController";
import { Styles } from "./SecuritySettingStyle";

export default class SecuritySetting extends SecuritySettingController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
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
            <ImageBackground
              source={back2}
              style={[Styles.image, { alignItems: "center" }]}
            >
              <View style={Styles.view1}>
                <TouchableOpacity
                  testID="backButton"
                  style={Styles.button1}
                  onPress={() => this.goback()}
                >
                  <Image source={image_back} style={Styles.backbutton} />
                </TouchableOpacity>
              </View>

              <Text style={Styles.security}>Security.</Text>
              <Text style={Styles.description}>
                When 2-step is tuned ON.you will prompted for your passcode when
                you are trying to re-login or restore your profile
              </Text>

              <View style={Styles.switchView}>
                <Text style={Styles.switchText}>2-step Verification</Text>
                <Switch
                  testID="twoStepSwitch"
                  trackColor={{ false: COLORS.black, true: COLORS.darkorange }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor="#000"
                  onValueChange={(Vala) => this.switch11(Vala)}
                  value={this.state.switch1}
                  style={Styles.switchSize}
                  // style={{ backgroundColor: "red" }}
                />
              </View>
              {this.state.switch1 ? (
                <>
                  <View
                    style={[
                      Styles.optionView,
                      { marginTop: Platform.OS === "android" ? 40 : 50 },
                    ]}
                  >
                    <Text style={Styles.optionText}>Edit Passcode</Text>
                    <TouchableOpacity
                      testID="editPasscodeButton"
                      onPress={() => this.Editbuttonclick()}
                    >
                      <Text style={[Styles.optionAction, { marginRight: 15 }]}>
                        EDIT
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[Styles.optionView, { marginTop: 35 }]}>
                    <Text style={Styles.optionText}>Update Email</Text>
                    <TouchableOpacity
                      testID="editEmailButton"
                      onPress={() => this.Updatebuttonclick()}
                    >
                      <Text style={Styles.optionAction}>UPDATE</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : null}

              <Modal visible={this.state.Modal1} transparent={true}>
                <View style={Styles.modalView}>
                  <View style={Styles.modalCenteredView}>
                    <View style={Styles.alertMessageView}>
                      <Text style={Styles.alertMessage}>
                        Do you really want to disable the 2-step verification?{" "}
                      </Text>
                    </View>
                    <View style={Styles.seperator} />
                    <View style={Styles.alertBox}>
                      <View style={Styles.alertButtonView}>
                        <TouchableOpacity
                          testID="noButton"
                          style={{ width: 50 }}
                          onPress={() =>
                            this.setState({ Modal1: false, switch1: true })
                          }
                        >
                          <Text style={Styles.noText}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          testID="yesButton"
                          style={{ width: 50 }}
                          onPress={() =>
                            this.setState({ Modal1: false, switch1: false })
                          }
                        >
                          <Text
                            style={[Styles.noText, { color: COLORS.black }]}
                          >
                            YES
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* <View style={Styles.alertButtonView}>
                                            <TouchableOpacity
                                                style={{alignSelf:"flex-end",backgroundColor:"yellow"}}
                                                onPress={() => this.setState({ Modal1: false, switch1: true })}
                                            >
                                                <Text style={Styles.noText}>NO</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState({ Modal1: false, switch1: false })}>
                                                <Text style={{ fontSize: 17 }}>YES</Text>
                                            </TouchableOpacity>
                                        </View> */}
                  </View>
                </View>
              </Modal>

              <Modal visible={this.state.Loader} transparent={true}>
                <View style={Styles.modalView}>
                  <View
                    style={[Styles.modalCenteredView, { height: RFValue(100) }]}
                  >
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
    );
  }
}
// Customizable Area End
