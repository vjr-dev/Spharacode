// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../../framework/src/Globals";
import {
  back1,
  back2,
  Edit,
  FB,
  image_back,
  IN,
  LD,
  Profile,
  TW,
  WH,
} from "./assets";
import SocialMediaIntegrationController, {
  Props,
} from "./SocialMediaIntegrationController";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import CheckBox from "react-native-check-box";

export default class GestureTrigger extends SocialMediaIntegrationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <StatusBar
            animated={true}
            backgroundColor="#454545"
            barStyle={"light-content"}
            showHideTransition={"slide"}
            // hidden={true}
          />
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <View style={styles.view1}>
                <TouchableOpacity
                  testID="socialMediaBackButton"
                  style={styles.button1}
                  onPress={() => this.goback()}
                >
                  <Image source={image_back} style={styles.backbutton} />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  fontSize: RFValue(20),
                  color: COLORS.white,
                  marginTop: 50,
                  width: windowWidth - 20,
                  fontWeight: "700",
                }}
              >
                Social Media Access.
              </Text>
              <Text
                style={{
                  fontSize: RFValue(13),
                  color: COLORS.ultralightwhite,
                  marginTop: 10,
                  width: windowWidth - 20,
                }}
              >
                Connect SPHARA with social media to alert your
              </Text>
              <Text
                style={{
                  fontSize: RFValue(13),
                  color: COLORS.ultralightwhite,
                  marginTop: 5,
                  width: windowWidth - 20,
                }}
              >
                friend and friends in times of emergency.
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth - 20,
                  alignSelf: "center",
                  height: 50,
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <Image
                  source={WH}
                  style={{
                    height: RFValue(25),
                    width: RFValue(25),
                    marginRight: RFValue(15),
                    marginLeft: RFValue(5),
                    tintColor: COLORS.ultralightwhite,
                  }}
                />
                <View style={{ width: "70%", height: "100%" }}>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: COLORS.lightwhite,
                      width: "100%",
                    }}
                  >
                    Whatsapp
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(11),
                      color: COLORS.ultralightwhite,
                      width: "100%",
                    }}
                  >
                    allows app to send alert message via Whatsapp
                  </Text>
                </View>
                <Switch
                  testID="socialMediaWhatsappSwitch"
                  trackColor={{ false: COLORS.black, true: COLORS.darkorange }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor="#000"
                  onValueChange={(Vala) => this.switch11(Vala)}
                  value={this.state.switch1}
                  // style={{ backgroundColor: "red" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth - 20,
                  alignSelf: "center",
                  height: 50,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Image
                  source={FB}
                  style={{
                    height: RFValue(25),
                    width: RFValue(25),
                    marginRight: RFValue(15),
                    marginLeft: RFValue(5),
                    tintColor: COLORS.ultralightwhite,
                  }}
                />
                <View style={{ width: "70%", height: "100%" }}>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: COLORS.lightwhite,
                      width: "100%",
                    }}
                  >
                    Facebook Post
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(11),
                      color: COLORS.ultralightwhite,
                      width: "100%",
                    }}
                  >
                    allows app to post alert message in Facebook wall.
                  </Text>
                </View>
                <Switch
                  testID="socialMediaFacebookSwitch"
                  trackColor={{ false: COLORS.black, true: COLORS.darkorange }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor="#000"
                  onValueChange={(Val) => this.switch22(Val)}
                  value={this.state.switch2}
                  // style={{ backgroundColor: "red" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth - 20,
                  alignSelf: "center",
                  height: 50,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Image
                  source={IN}
                  style={{
                    height: RFValue(25),
                    width: RFValue(25),
                    marginRight: RFValue(15),
                    marginLeft: RFValue(5),
                    tintColor: COLORS.ultralightwhite,
                  }}
                />
                <View style={{ width: "70%", height: "100%" }}>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: COLORS.lightwhite,
                      width: "100%",
                    }}
                  >
                    Instagram
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(11),
                      color: COLORS.ultralightwhite,
                      width: "100%",
                    }}
                  >
                    allows app to post alert message in Instagram feed.
                  </Text>
                </View>
                <Switch
                  testID="socialMediaInstagramSwitch"
                  trackColor={{ false: COLORS.black, true: COLORS.darkorange }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor="#000"
                  onValueChange={(Val) => this.switch33(Val)}
                  value={this.state.switch3}
                  // style={{ backgroundColor: "red" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth - 20,
                  alignSelf: "center",
                  height: 50,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Image
                  source={TW}
                  style={{
                    height: RFValue(25),
                    width: RFValue(25),
                    marginRight: RFValue(15),
                    marginLeft: RFValue(5),
                    tintColor: COLORS.ultralightwhite,
                  }}
                />
                <View style={{ width: "70%", height: "100%" }}>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: COLORS.lightwhite,
                      width: "100%",
                    }}
                  >
                    Twitter
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(11),
                      color: COLORS.ultralightwhite,
                      width: "100%",
                    }}
                  >
                    allows app to post alert message in Twitter.
                  </Text>
                </View>
                <Switch
                  testID="socialMediaTwitterSwitch"
                  trackColor={{ false: COLORS.black, true: COLORS.darkorange }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor="#000"
                  onValueChange={(Val) => this.switch44(Val)}
                  value={this.state.switch4}
                  // style={{ backgroundColor: "red" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth - 20,
                  alignSelf: "center",
                  height: 50,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Image
                  source={LD}
                  style={{
                    height: RFValue(25),
                    width: RFValue(25),
                    marginRight: RFValue(15),
                    marginLeft: RFValue(5),
                    tintColor: COLORS.ultralightwhite,
                  }}
                />
                <View style={{ width: "70%", height: "100%" }}>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: COLORS.lightwhite,
                      width: "100%",
                    }}
                  >
                    Linkedin
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(11),
                      color: COLORS.ultralightwhite,
                      width: "100%",
                    }}
                  >
                    allows app to post alert message in Linkedin.
                  </Text>
                </View>
                <Switch
                  testID="socialMediaLinkedinSwitch"
                  trackColor={{ false: COLORS.black, true: COLORS.darkorange }}
                  thumbColor={COLORS.white}
                  ios_backgroundColor="#000"
                  onValueChange={(Val) => this.switch55(Val)}
                  value={this.state.switch5}
                  // style={{ backgroundColor: "red" }}
                />
              </View>

              <Modal
                visible={this.state.Modal1}
                // visible={true}
                transparent={true}
              >
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
                      width: windowWidth - RFValue(20),
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <View
                      style={{
                        height: 50,
                        width: "100%",
                        backgroundColor: "#e3e3e3",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ marginLeft: 20 }}>WhatsApp Access</Text>
                    </View>

                    <View
                      style={{
                        height: 65,
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                      }}
                    >
                      <Image
                        source={Profile}
                        style={{
                          height: 50,
                          width: 50,
                          marginLeft: 15,
                          borderRadius: 50,
                        }}
                      />
                      <TouchableOpacity>
                        <Image
                          source={Edit}
                          style={{ height: 20, width: 20, marginTop: 45 }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          height: "100%",
                          width: "77%",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ justifyContent: "center" }}>
                          Enter your Whatsapp account number{" "}
                        </Text>
                        <TextInput
                          testID="socialMediaWhatappAccountNumberInput"
                          style={{ borderBottomWidth: 1, height: "60%" }}
                          value={this.state.whnumber}
                          onChangeText={(VV) => this.setState({ whnumber: VV })}
                        />
                      </View>
                    </View>
                    <View style={{ width: "100%", marginTop: 30 }}>
                      <Text style={{ width: "85%", marginLeft: "15%" }}>
                        App will send alert messages to only those contacts
                        which you have saved in emergency contacts list. ensure
                        those contacts have account in Whatsapp.
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: 50,
                      }}
                    >
                      <CheckBox
                        testID="whatsappcheckBox"
                        style={{
                          alignSelf: "center",
                          marginLeft: 20,
                          marginRight: 10,
                        }}
                        onClick={() => {
                          this.setState({
                            Check1: !this.state.Check1,
                          });
                        }}
                        isChecked={this.state.Check1}
                        // checkedCheckBoxColor={this.state.Check1 ? "#f07233" : "#fff"}
                        // disabled={true}
                      />
                      <Text style={{ width: "75%" }}>
                        Allow SPHARA to access your WhatsApp account.
                      </Text>
                    </View>

                    <View
                      style={{
                        height: 50,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      <TouchableOpacity
                        testID="whatsappModalCancelButton"
                        onPress={() => this.M1close()}
                      >
                        <Text style={{ marginRight: 20, fontSize: 17 }}>
                          CANCEL
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID="whatsappModalContinueButton"
                        onPress={() => this.M1Continue()}
                        disabled={!this.state.Check1}
                      >
                        <Text
                          style={{
                            marginRight: 20,
                            fontSize: 17,
                            color: this.state.Check1 ? "black" : "gray",
                          }}
                        >
                          CONTINUE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <Modal
                visible={this.state.Modal2}
                // visible={true}
                transparent={true}
              >
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
                      width: windowWidth - RFValue(20),
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <View
                      style={{
                        height: RFValue(50),
                        width: "100%",
                        backgroundColor: "#e3e3e3",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ marginLeft: RFValue(20) }}>
                        Facebook Access
                      </Text>
                    </View>

                    <View
                      style={{
                        height: RFValue(65),
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: RFValue(15),
                      }}
                    >
                      <Image
                        source={Profile}
                        style={{
                          height: RFValue(50),
                          width: RFValue(50),
                          marginLeft: RFValue(15),
                          borderRadius: RFValue(50),
                        }}
                      />
                      <TouchableOpacity>
                        <Image
                          source={Edit}
                          style={{
                            height: RFValue(20),
                            width: RFValue(20),
                            marginTop: RFValue(45),
                          }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          height: "100%",
                          width: "77%",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ justifyContent: "center" }}>
                          Enter your account
                        </Text>
                        <TextInput
                          testID="socialMediaFacebookAccountInput"
                          keyboardType="email-address"
                          style={{ borderBottomWidth: 1, height: "60%" }}
                          value={this.state.whnumber}
                          onChangeText={(VV) => this.setState({ fbname: VV })}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: RFValue(50),
                      }}
                    >
                      <CheckBox
                        testID="facebookcheckBox"
                        style={{
                          marginLeft: RFValue(20),
                          marginRight: RFValue(10),
                        }}
                        onClick={() => {
                          this.setState({
                            Check2: !this.state.Check2,
                          });
                        }}
                        isChecked={this.state.Check2}
                        // checkedCheckBoxColor={this.state.Check1 ? "#f07233" : "#fff"}
                        // disabled={true}
                      />
                      <View style={{ width: "75%" }}>
                        <Text style={{ width: "100%" }}>
                          SPHARA is requesting to do the following.
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: RFValue(10),
                          }}
                        >
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>1</Text>
                          </View>
                          <Text>Access my basic Information.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>2</Text>
                          </View>
                          <Text>Post alert message on my wall.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>3</Text>
                          </View>
                          <Text>Access my profile Information.</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        height: RFValue(50),
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        marginTop: RFValue(50),
                      }}
                    >
                      <TouchableOpacity
                        testID="facebookModalCancelButton"
                        onPress={() => this.M2close()}
                      >
                        <Text
                          style={{ marginRight: RFValue(20), fontSize: 17 }}
                        >
                          CANCEL
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID="facebookModalContinueButton"
                        onPress={() => this.M2Continue()}
                        disabled={!this.state.Check2}
                      >
                        <Text
                          style={{
                            marginRight: RFValue(20),
                            fontSize: RFValue(17),
                            color: this.state.Check2 ? "black" : "gray",
                          }}
                        >
                          CONTINUE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <Modal
                visible={this.state.Modal3}
                // visible={true}
                transparent={true}
              >
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
                      width: windowWidth - RFValue(20),
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <View
                      style={{
                        height: RFValue(50),
                        width: "100%",
                        backgroundColor: "#e3e3e3",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ marginLeft: RFValue(20) }}>
                        Instagram Access
                      </Text>
                    </View>

                    <View
                      style={{
                        height: RFValue(65),
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: RFValue(15),
                      }}
                    >
                      <Image
                        source={Profile}
                        style={{
                          height: RFValue(50),
                          width: RFValue(50),
                          marginLeft: RFValue(15),
                          borderRadius: RFValue(50),
                        }}
                      />
                      <TouchableOpacity>
                        <Image
                          source={Edit}
                          style={{
                            height: RFValue(20),
                            width: RFValue(20),
                            marginTop: RFValue(45),
                          }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          height: "100%",
                          width: "77%",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ justifyContent: "center" }}>
                          Enter your account
                        </Text>
                        <TextInput
                          testID="socialMediaInstagramAccountInput"
                          keyboardType="email-address"
                          style={{ borderBottomWidth: 1, height: "60%" }}
                          value={this.state.whnumber}
                          onChangeText={(VV) => this.setState({ inname: VV })}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: RFValue(50),
                      }}
                    >
                      <CheckBox
                        testID="instagramcheckBox"
                        style={{
                          marginLeft: RFValue(20),
                          marginRight: RFValue(10),
                        }}
                        onClick={() => {
                          this.setState({
                            Check3: !this.state.Check3,
                          });
                        }}
                        isChecked={this.state.Check3}
                        // checkedCheckBoxColor={this.state.Check1 ? "#f07233" : "#fff"}
                        // disabled={true}
                      />
                      <View style={{ width: "75%" }}>
                        <Text style={{ width: "100%" }}>
                          SPHARA is requesting to do the following.
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: RFValue(10),
                          }}
                        >
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>1</Text>
                          </View>
                          <Text>Access my basic Information.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>2</Text>
                          </View>
                          <Text>Post alert message on my wall.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>3</Text>
                          </View>
                          <Text>Access my profile Information.</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        height: RFValue(50),
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        marginTop: RFValue(50),
                      }}
                    >
                      <TouchableOpacity
                        testID="instagramModalCancelButton"
                        onPress={() => this.M3close()}
                      >
                        <Text
                          style={{ marginRight: RFValue(20), fontSize: 17 }}
                        >
                          CANCEL
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID="instagramModalContinueButton"
                        onPress={() => this.M3Continue()}
                        disabled={!this.state.Check3}
                      >
                        <Text
                          style={{
                            marginRight: RFValue(20),
                            fontSize: RFValue(17),
                            color: this.state.Check3 ? "black" : "gray",
                          }}
                        >
                          CONTINUE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={this.state.Modal4}
                // visible={true}
                transparent={true}
              >
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
                      width: windowWidth - RFValue(20),
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <View
                      style={{
                        height: RFValue(50),
                        width: "100%",
                        backgroundColor: "#e3e3e3",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ marginLeft: RFValue(20) }}>
                        Twitter Access
                      </Text>
                    </View>

                    <View
                      style={{
                        height: RFValue(65),
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: RFValue(15),
                      }}
                    >
                      <Image
                        source={Profile}
                        style={{
                          height: RFValue(50),
                          width: RFValue(50),
                          marginLeft: RFValue(15),
                          borderRadius: RFValue(50),
                        }}
                      />
                      <TouchableOpacity>
                        <Image
                          source={Edit}
                          style={{
                            height: RFValue(20),
                            width: RFValue(20),
                            marginTop: RFValue(45),
                          }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          height: "100%",
                          width: "77%",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ justifyContent: "center" }}>
                          Enter your account
                        </Text>
                        <TextInput
                          testID="socialMediaTwitterAccountInput"
                          keyboardType="email-address"
                          style={{ borderBottomWidth: 1, height: "60%" }}
                          value={this.state.whnumber}
                          onChangeText={(VV) => this.setState({ twname: VV })}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: RFValue(50),
                      }}
                    >
                      <CheckBox
                        testID="twittercheckBox"
                        style={{
                          marginLeft: RFValue(20),
                          marginRight: RFValue(10),
                        }}
                        onClick={() => {
                          this.setState({
                            Check4: !this.state.Check4,
                          });
                        }}
                        isChecked={this.state.Check4}
                        // checkedCheckBoxColor={this.state.Check1 ? "#f07233" : "#fff"}
                        // disabled={true}
                      />
                      <View style={{ width: "75%" }}>
                        <Text style={{ width: "100%" }}>
                          SPHARA is requesting to do the following.
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: RFValue(10),
                          }}
                        >
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>1</Text>
                          </View>
                          <Text>Access my basic Information.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>2</Text>
                          </View>
                          <Text>Post alert message on my wall.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>3</Text>
                          </View>
                          <Text>Access my profile Information.</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        height: RFValue(50),
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        marginTop: RFValue(50),
                      }}
                    >
                      <TouchableOpacity
                        testID="twitterModalCancelButton"
                        onPress={() => this.M4close()}
                      >
                        <Text
                          style={{ marginRight: RFValue(20), fontSize: 17 }}
                        >
                          CANCEL
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID="twitterModalContinueButton"
                        onPress={() => this.M4Continue()}
                        disabled={!this.state.Check4}
                      >
                        <Text
                          style={{
                            marginRight: RFValue(20),
                            fontSize: RFValue(17),
                            color: this.state.Check4 ? "black" : "gray",
                          }}
                        >
                          CONTINUE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              <Modal
                visible={this.state.Modal5}
                // visible={true}
                transparent={true}
              >
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
                      width: windowWidth - RFValue(20),
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <View
                      style={{
                        height: RFValue(50),
                        width: "100%",
                        backgroundColor: "#e3e3e3",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ marginLeft: RFValue(20) }}>
                        Linkedin Access
                      </Text>
                    </View>

                    <View
                      style={{
                        height: RFValue(65),
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: RFValue(15),
                      }}
                    >
                      <Image
                        source={Profile}
                        style={{
                          height: RFValue(50),
                          width: RFValue(50),
                          marginLeft: RFValue(15),
                          borderRadius: RFValue(50),
                        }}
                      />
                      <TouchableOpacity>
                        <Image
                          source={Edit}
                          style={{
                            height: RFValue(20),
                            width: RFValue(20),
                            marginTop: RFValue(45),
                          }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          height: "100%",
                          width: "77%",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ justifyContent: "center" }}>
                          Enter your account
                        </Text>
                        <TextInput
                          testID="socialMediaLinkedInAccountInput"
                          keyboardType="email-address"
                          style={{ borderBottomWidth: 1, height: "60%" }}
                          value={this.state.whnumber}
                          onChangeText={(VV) => this.setState({ ldname: VV })}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: RFValue(50),
                      }}
                    >
                      <CheckBox
                        testID="linkedincheckBox"
                        style={{
                          marginLeft: RFValue(20),
                          marginRight: RFValue(10),
                        }}
                        onClick={() => {
                          this.setState({
                            Check5: !this.state.Check5,
                          });
                        }}
                        isChecked={this.state.Check5}
                        // checkedCheckBoxColor={this.state.Check1 ? "#f07233" : "#fff"}
                        // disabled={true}
                      />
                      <View style={{ width: "75%" }}>
                        <Text style={{ width: "100%" }}>
                          SPHARA is requesting to do the following.
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: RFValue(10),
                          }}
                        >
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>1</Text>
                          </View>
                          <Text>Access my basic Information.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>2</Text>
                          </View>
                          <Text>Post alert message on my wall.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <View
                            style={{
                              height: RFValue(20),
                              width: RFValue(20),
                              backgroundColor: "#cccccc",
                              borderRadius: RFValue(2),
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: RFValue(15),
                            }}
                          >
                            <Text style={{ color: "#fff" }}>3</Text>
                          </View>
                          <Text>Access my profile Information.</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        height: RFValue(50),
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        marginTop: RFValue(50),
                      }}
                    >
                      <TouchableOpacity
                        testID="linkedinModalCancelButton"
                        onPress={() => this.M5close()}
                      >
                        <Text
                          style={{ marginRight: RFValue(20), fontSize: 17 }}
                        >
                          CANCEL
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID="linkedInModalContinueButton"
                        onPress={() => this.M5Continue()}
                        disabled={!this.state.Check5}
                      >
                        <Text
                          style={{
                            marginRight: RFValue(20),
                            fontSize: RFValue(17),
                            color: this.state.Check5 ? "black" : "gray",
                          }}
                        >
                          CONTINUE
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>

              {/* <Text style={{ fontSize: RFValue(14), color: COLORS.black, marginTop: RFValue(5), width: windowWidth - RFValue(20), fontWeight: "200" }}>will apply this gesture</Text> */}

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
  backbutton: { height: 15, width: 15, tintColor: "#f07233" },
  view1: { height: 60, width: windowWidth, justifyContent: "center" },
  button1: { marginLeft: 20 },
});
// Customizable Area End
