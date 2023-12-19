// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../../framework/src/Globals";
import {
  apple_pay,
  back1,
  back2,
  google_pay,
  image_back,
  next,
  tick,
} from "./assets";
import PaymentDonationController, { Props } from "./PaymentDonationController";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class PaymentDonation extends PaymentDonationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <KeyboardAvoidingView
                keyboardVerticalOffset={1}
                behavior={"height"}
              >
                <StatusBar backgroundColor={"#f17234"} barStyle="default" />
                <View
                  style={{
                    height: hp("7%"),
                    width: windowWidth,
                    flexDirection: "row",
                    backgroundColor: COLORS.darkorange,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "15%",
                      height: "90%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    testID="backButton"
                    onPress={() => this.goback()}
                  >
                    <Image
                      source={image_back}
                      style={{
                        height: 15,
                        width: 15,
                        tintColor: COLORS.backgroundGray,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      height: "100%",
                      width: "70%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.backgroundGray,
                        fontWeight: "700",
                        fontSize: RFValue(16),
                      }}
                    >
                      Make payement of
                    </Text>
                  </View>
                  <View style={{ height: "100%", width: "15%" }} />
                </View>
                <View
                  style={{
                    height: 120,
                    width: windowWidth,
                    backgroundColor: COLORS.darkorange,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, fontSize: 35 }}>
                    ₹ {this.state.Amount}
                  </Text>
                  {!this.state.paymentdone ? (
                    <View
                      style={{
                        backgroundColor: COLORS.orangelight,
                        paddingHorizontal: 20,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>pending..</Text>
                    </View>
                  ) : null}
                </View>

                <View
                  style={{
                    height: 50,
                    width: windowWidth - 20,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 25,
                  }}
                >
                  <Text style={{ color: COLORS.ultralightwhite }}>
                    Send payment using any of the following methods.
                  </Text>
                </View>
                <TouchableOpacity
                  testID="gPayButton"
                  onPress={() => this.gpayclick()}
                  style={{
                    height: 60,
                    width: windowWidth - 20,
                    alignSelf: "center",
                    backgroundColor: COLORS.Viewback,
                    borderRadius: 50,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 25,
                  }}
                >
                  <Image
                    source={google_pay}
                    style={{
                      backgroundColor: COLORS.white,
                      height: 40,
                      width: 40,
                      marginLeft: 10,
                      borderRadius: 50,
                      alignSelf: "center",
                    }}
                  />

                  <Text
                    style={{
                      alignSelf: "center",
                      color: COLORS.ultralightwhite,
                      width: "65%",
                    }}
                  >
                    Google Pay
                  </Text>
                  <Image
                    source={next}
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: COLORS.ultralightwhite,
                      alignSelf: "center",
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="rPaybutton"
                  onPress={() => this.Rpay()}
                  style={{
                    height: 60,
                    width: windowWidth - 20,
                    alignSelf: "center",
                    backgroundColor: COLORS.Viewback,
                    borderRadius: 50,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 25,
                  }}
                >
                  <Image
                    // source={google_pay}
                    style={{
                      backgroundColor: COLORS.white,
                      height: 40,
                      width: 40,
                      marginLeft: 10,
                      borderRadius: 50,
                      alignSelf: "center",
                    }}
                  />

                  <Text
                    style={{
                      alignSelf: "center",
                      color: COLORS.ultralightwhite,
                      width: "65%",
                    }}
                  >
                    REZORPAY
                  </Text>
                  <Image
                    source={next}
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: COLORS.ultralightwhite,
                      alignSelf: "center",
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="stripePayButton"
                  onPress={() => this._checkSessionAPIcall()}
                  style={{
                    height: 60,
                    width: windowWidth - 20,
                    alignSelf: "center",
                    backgroundColor: COLORS.Viewback,
                    borderRadius: 50,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 25,
                  }}
                >
                  <Image
                    // source={google_pay}
                    style={{
                      backgroundColor: COLORS.white,
                      height: 40,
                      width: 40,
                      marginLeft: 10,
                      borderRadius: 50,
                      alignSelf: "center",
                    }}
                  />

                  <Text
                    style={{
                      alignSelf: "center",
                      color: COLORS.ultralightwhite,
                      width: "65%",
                    }}
                  >
                    STRIPE PAY
                  </Text>
                  <Image
                    source={next}
                    style={{
                      height: 30,
                      width: 30,
                      tintColor: COLORS.ultralightwhite,
                      alignSelf: "center",
                      marginRight: 10,
                      opacity: 0.5,
                    }}
                  />
                </TouchableOpacity>
                {Platform.OS === "ios" ? (
                  <TouchableOpacity
                    testID="applePayButton"
                    onPress={() => this.applepayclick()}
                    style={{
                      height: 60,
                      width: windowWidth - 20,
                      alignSelf: "center",
                      backgroundColor: COLORS.Viewback,
                      borderRadius: 50,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginTop: 25,
                    }}
                  >
                    <Image
                      source={apple_pay}
                      style={{
                        backgroundColor: COLORS.white,
                        height: 40,
                        width: 40,
                        marginLeft: 10,
                        borderRadius: 50,
                        alignSelf: "center",
                      }}
                    />

                    <Text
                      style={{
                        alignSelf: "center",
                        color: COLORS.ultralightwhite,
                        width: "65%",
                      }}
                    >
                      Apple pay
                    </Text>
                    <Image
                      source={next}
                      style={{
                        height: 30,
                        width: 30,
                        tintColor: COLORS.ultralightwhite,
                        alignSelf: "center",
                        marginRight: 10,
                        opacity: 0.5,
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                <Modal transparent={true} visible={this.state.Modal}>
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: COLORS.darkorange,
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      style={{ height: 100, width: 100, alignSelf: "center" }}
                      source={tick}
                    />
                    <Text style={{ fontSize: 35, marginTop: 75 }}>
                      Successful!
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: COLORS.white,
                        marginTop: 5,
                      }}
                    >
                      You donate ₹ {this.state.Amount} to {this.state.to}
                    </Text>
                    <TouchableOpacity
                      testID="doneButton"
                      onPress={() => this.successfulclick()}
                      style={{
                        height: 50,
                        width: windowWidth - 20,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderRadius: 50,
                        marginTop: 75,
                        borderStyle: "dashed",
                      }}
                    >
                      <Text>DONE</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </KeyboardAvoidingView>
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
    backgroundColor: COLORS.white,
  },
  container1: { flex: 1, backgroundColor: COLORS.darkorange },
  child: { width: windowWidth },

  image: {
    height: windowHeight,
    width: windowWidth,
  },
  image2: {
    height: "100%",
    width: windowWidth,
    alignItems: "center",
  },
  btnview: {
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#FF0100",
    height: 60,
    width: 330,
    marginTop: 80,
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  btntxt: {
    fontSize: 15,
    color: "#ffffff",
    letterSpacing: 0.5,
  },
});
// Customizable Area End
