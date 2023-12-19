// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { COLORS } from "../../../framework/src/Globals";
import { back1, back2, camera, image_back } from "./assets";
import MakeDonationController, { Props } from "./FireController";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class AmbulanceNotificationDonation extends MakeDonationController {
  constructor(props: Props) {
    super(props);
  }
  firstLine() {
    return (
      <View style={styles.lineContainer}>
        <TouchableOpacity
          testID="fireScreenInjuredPeopleButton"
          onPress={() => this.staticamount1()}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                this.state.SAmountstatus1 === 1
                  ? COLORS.orangelight
                  : COLORS.Viewback,
            },
          ]}
        >
          <Text
            style={{
              color:
                this.state.SAmountstatus1 === 1
                  ? COLORS.black
                  : COLORS.ultralightwhite,
            }}
          >
            Injured people
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="fireScreenNotInjuredButton"
          onPress={() => this.staticamount2()}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                this.state.SAmountstatus1 === 2
                  ? COLORS.orangelight
                  : COLORS.Viewback,
            },
          ]}
        >
          <Text
            style={{
              color:
                this.state.SAmountstatus1 === 2
                  ? COLORS.black
                  : COLORS.ultralightwhite,
            }}
          >
            Not injured
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  secondLine() {
    return (
      <View style={styles.lineContainer}>
        <TouchableOpacity
          testID="fireScreenSmallAmountButton"
          onPress={() => this.staticamount3()}
          style={[
            styles.buttonStyle2,
            {
              backgroundColor:
                this.state.SAmountstatus2 === 1
                  ? COLORS.orangelight
                  : COLORS.Viewback,
            },
          ]}
        >
          <Text
            style={{
              color:
                this.state.SAmountstatus2 === 1
                  ? COLORS.black
                  : COLORS.ultralightwhite,
            }}
          >
            Small
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="fireScreenMidiumAmountButton"
          onPress={() => this.staticamount4()}
          style={[
            styles.buttonStyle2,
            {
              backgroundColor:
                this.state.SAmountstatus2 === 2
                  ? COLORS.orangelight
                  : COLORS.Viewback,
            },
          ]}
        >
          <Text
            style={{
              color:
                this.state.SAmountstatus2 === 2
                  ? COLORS.black
                  : COLORS.ultralightwhite,
            }}
          >
            Medium
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="fireScreenBigAmountButton"
          onPress={() => this.staticamount5()}
          style={[
            styles.buttonStyle2,
            {
              backgroundColor:
                this.state.SAmountstatus2 === 3
                  ? COLORS.orangelight
                  : COLORS.Viewback,
            },
          ]}
        >
          <Text
            style={{
              color:
                this.state.SAmountstatus2 === 3
                  ? COLORS.black
                  : COLORS.ultralightwhite,
            }}
          >
            Big
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  thirdLine() {
    return (
      <View style={styles.lineContainer}>
        <TouchableOpacity
          testID="fireScreenFlamsAndSmokeButton"
          onPress={() => this.staticamount6()}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                this.state.SAmountstatus3 === 1
                  ? COLORS.orangelight
                  : COLORS.Viewback,
            },
          ]}
        >
          <Text
            style={{
              color:
                this.state.SAmountstatus3 === 1
                  ? COLORS.black
                  : COLORS.ultralightwhite,
            }}
          >
            Flames & Smoke
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="fireScreenJustSmokeButton"
          onPress={() => this.staticamount7()}
          style={[
            styles.buttonStyle,
            {
              backgroundColor:
                this.state.SAmountstatus3 === 2
                  ? COLORS.orangelight
                  : COLORS.Viewback,
            },
          ]}
        >
          <Text
            style={{
              color:
                this.state.SAmountstatus3 === 2
                  ? COLORS.black
                  : COLORS.ultralightwhite,
            }}
          >
            Just Smoke
          </Text>
        </TouchableOpacity>
      </View>
    );
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
                <View
                  style={{
                    height: 60,
                    width: windowWidth,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    testID="fireScreenBackButton"
                    style={{ marginLeft: 20, marginTop: 22 }}
                    onPress={() => this.goback()}
                  >
                    <Image
                      source={image_back}
                      style={{ height: 15, width: 15, tintColor: "#f07233" }}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView>
                  <View style={styles.view1}>
                    <Text style={{ color: COLORS.white, fontSize: 20 }}>
                      Incident Report
                    </Text>
                    <Text
                      style={{
                        color: COLORS.ultralightwhite,
                        fontSize: 16,
                        width: windowWidth - 20,
                        marginTop: 5,
                      }}
                    >
                      Please fill following information as it will provide
                    </Text>
                    <Text
                      style={{
                        color: COLORS.ultralightwhite,
                        fontSize: 16,
                        width: windowWidth - 20,
                      }}
                    >
                      better insight on incident.
                    </Text>
                  </View>

                  <Text
                    style={{
                      paddingHorizontal: RFPercentage(0.5),
                      zIndex: 1,
                      marginLeft: 30,
                      top: 9,
                      width: 90,
                      paddingLeft: 10,
                      backgroundColor: COLORS.headerbackground,
                      color: COLORS.ultralightwhite,
                    }}
                  >
                    Comment
                  </Text>
                  <View
                    style={{
                      height: 100,
                      width: windowWidth - 20,
                      borderWidth: 1,
                      alignSelf: "center",
                      borderColor: COLORS.ultralightwhite,
                      borderRadius: 5,
                    }}
                  >
                    <TextInput
                      testID="fireScreenCommentInput"
                      value={this.state.Comment}
                      onChangeText={(TT) => this.setState({ Comment: TT })}
                      placeholder=""
                      multiline={true}
                      style={{
                        paddingStart: 10,
                        color: COLORS.ultralightwhite,
                      }}
                    />
                  </View>

                  <View style={styles.view4}>
                    <Text style={styles.whitecolor}>
                      Are you seeing people injured?
                    </Text>
                  </View>

                  {/* FirstLine */}
                  {this.firstLine()}

                  <View style={styles.view4}>
                    <Text style={styles.whitecolor}>
                      What is the dimension of the fire?
                    </Text>
                  </View>

                  {/* SecondLine */}
                  {this.secondLine()}

                  <View style={styles.view4}>
                    <Text style={styles.whitecolor}>
                      Are you seeing flames or smoke?
                    </Text>
                  </View>
                  {/* ThirdLine */}
                  {this.thirdLine()}

                  <View style={styles.view4}>
                    <Text style={styles.whitecolor}>Take some pictures</Text>
                  </View>

                  <View
                    style={{
                      height: 50,
                      marginTop: 10,
                      width: windowWidth - 20,
                      alignSelf: "center",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      testID="fireScreenImagePick1"
                      onPress={() => this.takePicture(1)}
                      style={{ height: 50, width: 50 }}
                    >
                      {this.state.images1 == "" ? (
                        <Image
                          source={camera}
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      ) : (
                        <Image
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: 10,
                          }}
                          source={{
                            uri: "data:image/jpeg;base64," + this.state.images1,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID="fireScreenImagePick2"
                      onPress={() => this.takePicture(2)}
                      style={{ height: 50, width: 50 }}
                    >
                      {this.state.images2 == "" ? (
                        <Image
                          source={camera}
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      ) : (
                        <Image
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: 10,
                          }}
                          source={{
                            uri: "data:image/jpeg;base64," + this.state.images2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID="fireScreenImagePick3"
                      onPress={() => this.takePicture(3)}
                      style={{ height: 50, width: 50 }}
                    >
                      {this.state.images3 == "" ? (
                        <Image
                          source={camera}
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      ) : (
                        <Image
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: 10,
                          }}
                          source={{
                            uri: "data:image/jpeg;base64," + this.state.images3,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      testID="fireScreenImagePick4"
                      onPress={() => this.takePicture(4)}
                      style={{ height: 50, width: 50 }}
                    >
                      {this.state.images4 == "" ? (
                        <Image
                          source={camera}
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      ) : (
                        <Image
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: 10,
                          }}
                          source={{
                            uri: "data:image/jpeg;base64," + this.state.images4,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
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
                  <TouchableOpacity
                    testID="fireScreenSendButton"
                    onPress={() => this.sendclick()}
                    style={{
                      height: 50,
                      width: windowWidth - 20,
                      alignSelf: "center",
                      backgroundColor: COLORS.darkorange,
                      borderRadius: 50,
                      marginVertical: 25,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                      SEND
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
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
  container1: { flex: 1, backgroundColor: COLORS.headerbackground },
  child: { width: windowWidth },

  image: {
    height: "100%",
    width: windowWidth,
  },
  image2: {
    height: "100%",
    width: windowWidth,
    alignItems: "center",
  },
  view1: {
    height: 30,
    width: windowWidth - 20,
    alignSelf: "center",
    marginVertical: 40,
    justifyContent: "center",
  },
  whitecolor: { color: COLORS.lightwhite },
  donatbtn: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.Viewback,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  donattext: { color: COLORS.ultralightwhite, marginLeft: 15 },
  arowimage: {
    height: 15,
    width: 15,
    tintColor: COLORS.ultralightwhite,
    marginRight: 18,
  },
  view2: {
    height: 200,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.Viewback,
    borderRadius: 20,
  },
  view3: { height: 50, width: "100%", justifyContent: "center" },
  text1: { color: COLORS.ultralightwhite, marginLeft: 20 },
  line: {
    height: 1,
    width: "90%",
    backgroundColor: COLORS.ultralightwhite,
    alignSelf: "center",
  },
  view4: {
    height: 30,
    width: windowWidth - 20,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  view5: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  view6: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.Viewback,
    borderRadius: 50,
    justifyContent: "center",
    marginTop: 10,
  },
  view7: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    backgroundColor: COLORS.darkorange,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  lineContainer: {
    height: 50,
    width: windowWidth - 20,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  buttonStyle: {
    height: "100%",
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginLeft: 20,
  },
  buttonStyle2: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginLeft: "5%",
  },
});
// Customizable Area End
