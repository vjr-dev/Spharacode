// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  Keyboard,
  
} from "react-native";

import MakeDonationController, { Props } from "./PanicController";
import { back1, back2, image_back, camera } from "./assets";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import {Countdown} from "react-native-element-timer";
import { COLORS } from "../../../framework/src/Globals";
import { Styles } from "./PanicAlertModalStyle";


export default class AmbulanceNotificationDonation extends MakeDonationController {
  constructor(props: Props) {
    super(props);
    this.callRefInput = React.createRef();
  }

  

  
  
  cancel()  {
   Alert.alert(
     "Do you really want to cancel the panic alert?",
     "",
     [
       {
         text: "NO",
         onPress: () =>
           this.callRefInput.current.resume(),
         style: "default",
       },
       {
         text: "YES",
         onPress: () => this.pressYes(),
       },
     ]
   );
     this.callRefInput.current?.pause();
 }
  
  

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <TouchableWithoutFeedback testID="twfIDbtn" onPress={() => Keyboard.dismiss()}>
        <View style={styles.child}>
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      height: 60,
                      width: windowWidth,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginLeft: 20, marginTop: 22 }}
                      testID="gobackbtnID"
                      onPress={() => this.goback()}
                    >
                      <Image
                        source={image_back}
                        style={{ height: 15, width: 15, tintColor: "#f07233" }}
                      />
                    </TouchableOpacity>
                  </View>
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
                  <View
                    style={{
                      marginLeft: RFValue(30),
                      top: RFValue(9),
                      width: RFValue(140),
                      paddingLeft: 10,
                      backgroundColor: COLORS.headerbackground,
                      paddingHorizontal: RFPercentage(0.5),
                      zIndex: 1,
                    }}
                  >
                    <Text style={{ color: COLORS.ultralightwhite }}>
                      Describe problem
                    </Text>
                  </View>
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
                      value={this.state.Comment}
                      testID="commentinputID"
                      onChangeText={(TT) => this.setState({ Comment: TT })}
                      placeholder=""
                      multiline={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        textAlignVertical: "top",
                        padding: 13,
                        color: COLORS.ultralightwhite,
                      }}
                    />
                  </View>

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
                      onPress={() => this.takePicture(1)}
                      testID='imgclick1'
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
                      onPress={() => this.takePicture(2)}
                      testID='imgclick2'
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
                      onPress={() => this.takePicture(3)}
                      testID='imgclick3'
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
                      onPress={() => this.takePicture(4)}
                      testID='imgclick4'
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

                  <View style={{ flex: 1 }}>
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
                  <View style={{ flex: 1 }}>
                   
                    <Modal  visible={this.state.sendAlert} transparent={true}>
                      <ImageBackground
                        source={back1}
                        style={Styles.maincontainer}
                      >
                        <ImageBackground
                          source={back2}
                          style={Styles.maincontainer}
                        >
                          <SafeAreaView>
                            <ScrollView keyboardShouldPersistTaps="always">
                              <View style={Styles.main_txt}>
                                <Text style={Styles.txt_1}>
                                  {this.state.UserProfile?.first_name}
                                </Text>
                                <Text style={Styles.txt_1}>
                                  you are about to call emergency
                                </Text>
                                <Text style={Styles.txt_1}>
                                  The call will start automatically in....
                                </Text>
                              </View>

                              <View style={Styles.container}>
                                <View style={Styles.circlesContainer}>
                                  <TouchableOpacity style={Styles.circle_1} />
                                  <TouchableOpacity style={Styles.circle_2} />
                                  <LinearGradient
                                    
                                    colors={["#f89345", "#f07434"]}
                                    style={Styles.circle_3}
                                  >
                                    <Countdown
                                      initialSeconds={15}
                                      ref={this.callRefInput}
                                      style={Styles.countdown_main}
                                      textStyle={Styles.txt_timer}
                                      autoStart={true}
                                      testID="countdownID"
                                      onEnd={() => this.sendclick()}
                                    />
                                  </LinearGradient>
                                </View>
                              </View>

                              <Text
                                onPress={() => this.cancel()}
                                testID="cancelBtnID"
                                style={Styles.txt_cancel}
                              >
                                CANCEL
                              </Text>
                            </ScrollView>
                          </SafeAreaView>
                        </ImageBackground>
                      </ImageBackground>
                    </Modal>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => this.setState({ sendAlert: true })}
                      testID="sendAlertID"
                    style={{
                      height: 50,
                      marginBottom: RFValue(10),
                      width: windowWidth - 20,
                      alignSelf: "center",
                      backgroundColor: COLORS.darkorange,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                      SEND
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            </ImageBackground>
          </ImageBackground>

        </View>
        </TouchableWithoutFeedback>
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
});
// Customizable Area End
