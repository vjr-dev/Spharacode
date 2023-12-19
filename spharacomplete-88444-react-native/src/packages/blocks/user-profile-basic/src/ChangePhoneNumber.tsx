import React from "react";
// Customizable Area Start
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../framework/src/Globals";
import {
  deviceHeight,
  deviceWidth,
  scaledSize,
} from "../../../framework/src/Utilities";
import { back1, back2 } from "./assets";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomCountryCodePicker from "../../../components/src/CustomCountryCodePicker";
import Loader from "../../../components/src/Loader";
// Customizable Area End

import ChangePhoneNumberController, {
  Props,
} from "./ChangePhoneNumberController";

export default class ChangePhoneNumber extends ChangePhoneNumberController {
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
              <ScrollView
                contentContainerStyle={styles.subContainer}
                bounces={false}
              >
                <View style={styles.mainView}>
                  <AntDesign
                    testID="backButton"
                    name="left"
                    style={styles.backBtn}
                    color={COLORS.darkorange}
                    size={scaledSize(15)}
                    onPress={() => this.props.navigation.goBack()}
                  />
                  <Text style={styles.changeNumberText}>
                    Change Phone Number
                  </Text>

                  <View style={styles.centerAlign}>
                    <View style={styles.textInputView}>
                      <TouchableOpacity
                        testID="countryCodeOldPhoneButton"
                        onPress={() =>
                          this.setState({
                            countryModal: true,
                            openModelFor: "oldNumberModal",
                          })
                        }
                        style={styles.countryCode}
                      >
                        <Text testID="oldNumberCountryCodeText" style={styles.countryCodeText}>
                          +{this.state.oldNumberCountryCode}
                        </Text>
                        <AntDesign
                          name="caretdown"
                          style={styles.downArrow}
                          color={COLORS.infoGray}
                          size={scaledSize(10)}
                        />
                      </TouchableOpacity>
                      <TextInput
                        testID="oldPhoneNumberInput"
                        value={this.state.oldPhoneNumber}
                        onChangeText={(value) =>
                          this.setState({ oldPhoneNumber: value })
                        }
                        placeholderTextColor={COLORS.infoGray}
                        style={styles.colorWhite}
                        placeholder="Old phone number"
                        keyboardType="number-pad"
                      />
                    </View>
                    <View style={styles.textInputView}>
                      <TouchableOpacity
                        testID="countryCodeNewPhoneButton"
                        onPress={() =>
                          this.setState({
                            countryModal: true,
                            openModelFor: "newNumberModal",
                          })
                        }
                        style={styles.countryCode}
                      >
                        <Text testID="newNumberCountryCodeText" style={styles.countryCodeText}>
                          +{this.state.newNumberCountryCode}
                        </Text>
                        <AntDesign
                          name="caretdown"
                          style={styles.downArrow}
                          color={COLORS.infoGray}
                          size={scaledSize(10)}
                        />
                      </TouchableOpacity>
                      <TextInput
                        testID="newPhoneNumberInput"
                        value={this.state.newPhoneNumber}
                        onChangeText={(value) =>
                          this.setState({ newPhoneNumber: value })
                        }
                        placeholderTextColor={COLORS.infoGray}
                        style={styles.colorWhite}
                        placeholder="New phone number"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                  <CustomCountryCodePicker
                    visible={this.state.countryModal}
                    onClose={() => this.setState({ countryModal: false })}
                    onSelect={(Country: any) => this.countryCodeSelect(Country)}
                  />
                </View>
              </ScrollView>

              <View style={styles.btnView}>
                <TouchableOpacity
                  testID="continueButton"
                  onPress={() => this.validateDetails()}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>UPDATE</Text>
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
    alignItems: "center",
  },
  subContainer: {
    flexGrow: 1,
  },
  mainView: {
    height: "100%",
    flex: 1,
  },
  backBtn: {
    margin: scaledSize(15),
  },
  changeNumberText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: scaledSize(15),
    marginTop: scaledSize(20),
    marginBottom: scaledSize(50),
    marginLeft: scaledSize(15),
  },
  centerAlign: {
    alignItems: "center",
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
  btnText: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  textInputView: {
    height: scaledSize(60),
    marginTop: scaledSize(20),
    alignItems: "center",
    flexDirection: "row",
    width: deviceWidth - 20,
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  countryCode: {
    height: scaledSize(35),
    width: scaledSize(60),
    backgroundColor: "#444444",
    marginLeft: scaledSize(10),
    borderRadius: scaledSize(25),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  countryCodeText: {
    color: COLORS.darkorange,
    fontSize: scaledSize(14),
    fontWeight: "bold",
  },
  downArrow: {
    marginLeft: scaledSize(5),
  },
  colorWhite: {
    color: "#fff",
    marginLeft: scaledSize(10),
    fontSize: scaledSize(13),
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
  // Customizable Area End
});
