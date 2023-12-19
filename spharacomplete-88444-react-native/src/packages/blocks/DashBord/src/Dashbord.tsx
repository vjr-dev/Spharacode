// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Switch,
  TouchableWithoutFeedback,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import DashbordController, { Props } from "./DashbordController";
import {
  SidemenuIcon,
  imgBgDashbrd,
  imgBg1,
  imgBg2,
  imgBg3,
  imgBg4,
  ambulance,
  call,
  police,
  fire,
  PanicBtn,
  image_panic,
  image_voice,
  up_arrows,
} from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightFromPercentage } from "framework/src/Utilities";



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default class Dashbord extends DashbordController {
  constructor(props: Props) {
    super(props);
  }



  render() {



    const EmergencyAssistanceMenu = ({
      text,
      onPress,
    }: {
      text: string;
      onPress: () => void;
    }) => {
      return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.MenuTitleTxt}>{text}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <SafeAreaView style={styles.container1}>
        <SafeAreaView style={styles.container2}>
          <StatusBar
            animated={true}
            barStyle={"light-content"}
            showHideTransition={"slide"}
            backgroundColor={"#f17234"}
          // hidden={true}
          />


          <TouchableWithoutFeedback
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            testID="modalShowbtn"
            onPress={() => this.setState({ ModalShow: false })}
            style={{ borderWidth: 10 }}
          >
            <View style={styles.child}>
              {/* Header */}
              <View style={styles.headerView}>
                <TouchableOpacity
                  testID="btntoggleDrawer"
                  style={styles.drawerButton}
                  onPress={() => this.props.navigation.openDrawer()}
                >
                  <Image source={SidemenuIcon} style={styles.drawerIcon} />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 70 }}>
                  <Text 
                  testID="btntempClick"  
                  onPress={() => this.TempClick()} style={styles.headerTitle} >SPHARA</Text>
                

               
                  

                
                      
                
                
                </View>
                <TouchableOpacity 
                 testID="modalopenbtn"
                 onPress={() => this.openModal()}>

                  <MaterialIcon
                    name="more-vert"
                    color={COLORS.backgroundGray}
                    size={30}
                  />

                </TouchableOpacity>
              </View>
            
              {

  
this.state.ModalShow ? (

<View style={{
  backgroundColor: COLORS.white,
   top:heightFromPercentage(5.5),
 
  width: '50%',
  paddingVertical: RFPercentage(2),
  
  position: 'absolute',
  right: RFPercentage(4.5),
  borderWidth: 1,
  zIndex:99999
  
}}>

  <Text style={{ marginLeft: RFValue(10), color: COLORS.black, fontSize: RFValue(13), fontWeight: '500' }}>Quick Settings.</Text>
  <View style={{ marginTop: RFValue(10), marginLeft: RFValue(10), width: '90%',paddingLeft: RFValue(25) }}>
    <View style={{ flexDirection: 'row', width: '90%',justifyContent:'center',alignItems:'center' }}>
      <View>
        <Image source={image_voice} style={{ marginTop: RFValue(3), height: RFValue(14), width: RFValue(14), resizeMode: 'contain' }} />
      </View>
      <Text style={{ marginLeft: RFValue(10), marginTop: RFValue(3), fontSize: RFValue(12), color: COLORS.infoGray }}>Voice</Text>
    
      <Switch
        testID="switchbtn"
        style={styles.switchSize}
        trackColor={{ false: COLORS.switchDarkGray, true: COLORS.darkorange }}
        thumbColor={COLORS.white}
        ios_backgroundColor={COLORS.infoGray}

        onValueChange={(Vala) => this.setState({ switch1: Vala })}
        value={this.state.switch1}
      />
     
    </View>
    <View style={{ flexDirection: 'row', width: '90%',justifyContent:'center',alignItems:'center' }}>
      <View>
        <Image source={image_panic} style={{ marginTop: RFValue(3), height: RFValue(13), width: RFValue(13), resizeMode: 'contain' }} />
      </View>
      <Text style={{ marginLeft: RFValue(10), marginTop: RFValue(3), fontSize: RFValue(12), color: COLORS.infoGray }}>Panic Siren</Text>
    
      <Switch
        testID="panicTogglebtn"
        style={styles.switchSize2}
        trackColor={{ false: COLORS.switchDarkGray, true: COLORS.darkorange }}
        thumbColor={COLORS.white}
        ios_backgroundColor={COLORS.infoGray}
        onValueChange={(Vala): any =>  this.onPanicSirenToggle(Vala)}
   
        value={this.state.switch2}
      />
    
    </View>
  </View>
</View>


) : null
}
              {this.state.isEmergencyScreenV ? (
                <ScrollView bounces={false} style={styles.scrollContainer}>
                  <View style={styles.scrollInnerView}>
                    <View style={styles.emergencyAssistance}>
                      <TouchableOpacity
                        testID="emergencyscreen"
                        onPress={() => {
                          this.setState({ isEmergencyScreenV: false });
                        }}
                      >
                        <Text style={{ color: "#fff" }}>
                          One click emergency assistance
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <EmergencyAssistanceMenu
                      testID="robberyBtn"
                      text="ROBBERY"
                      onPress={() => {
                        this.customformScreenClick(1);
                      }}
                    />
                    <EmergencyAssistanceMenu
                      testID="accidentBtn"
                      text="ACCIDENT"
                      onPress={() => {
                        this.customformScreenClick(2);
                      }}
                    />
                    <EmergencyAssistanceMenu
                      testID="armedPersonBtn"
                      text="ARMED PERSON"
                      onPress={() => {
                        this.customformScreenClick(3);
                      }}
                    />
                    <EmergencyAssistanceMenu
                      testID = "harassmentbtn"
                      text="HARASSMENT"
                      onPress={() => {
                        this.customformScreenClick(4);
                      }}
                    />
                    <EmergencyAssistanceMenu
                      testID = "hostileBtn"
                      text="HOSTILE SITUATION"
                      onPress={() => {
                        this.customformScreenClick(5);
                      }}
                    />
                    <TouchableOpacity
                      testID="btn1"
                      style={{ marginTop: 80, padding: 50 }}
                      onPress={() => {
                        this.setState({ isEmergencyScreenV: false });
                      }}
                    >

                      <Image
                        source={up_arrows}

                      />
                    </TouchableOpacity>

                  </View>
                </ScrollView>
              ) : (
                <>
                  <ScrollView>
                    <TouchableOpacity
                      testID="emergencybtn"
                      onPress={() => {
                        this.setState({ isEmergencyScreenV: true });
                      }}
                    >
                      <View
                        style={[
                          styles.emergencyAssistance,
                          { backgroundColor: "#474747", borderWidth: 1 },
                        ]}
                      >
                        <Text style={{ color: "#fff" }}>
                          One click emergency assistance
                        </Text>
                        <View style={styles.indicator} />
                      </View>
                    </TouchableOpacity>



                    <View style={{ marginTop: 30 }}>
                      <ImageBackground
                        source={imgBgDashbrd}
                        resizeMode="contain"
                        style={{ height: hp("43.2%") }}
                      >
                        <View style={styles.centerView}>
                          <View style={styles.rawView}>
                            <View
                              style={[
                                styles.buttonView,
                                { justifyContent: "flex-end" },
                              ]}
                            >
                              <ImageBackground
                                source={imgBg1}
                                style={styles.ambulanceBackView}
                              >
                                <TouchableOpacity
                                 testID="ambulanceBtn"
                                  onPress={() =>
                                    this.props.navigation.navigate("AmbulanceScreen")
                                  }
                                  style={styles.scrollInnerView}
                                >
                                  <Image
                                    source={ambulance}
                                    resizeMode="contain"
                                  />
                                  <Text style={styles.buttonText}>Ambulence</Text>
                                </TouchableOpacity>
                              </ImageBackground>
                            </View>
                            <View
                              style={[
                                styles.buttonView,
                                { justifyContent: "flex-end" },
                              ]}
                            >
                              <ImageBackground
                                source={imgBg2}
                                style={styles.policeBackView}
                              >
                                <TouchableOpacity
                                  testID="onCallpolicebtn"
                                  onPress={():any => 
                                    this.onCallPolice()
                                  }
                                  style={styles.scrollInnerView}
                                >
                                  <Image source={police} resizeMode="contain" />
                                  <Text style={styles.buttonText}>Police</Text>
                                </TouchableOpacity>
                              </ImageBackground>
                            </View>
                          </View>
                          <View style={styles.rawView}>
                            <View style={styles.buttonView}>
                              <ImageBackground
                                source={imgBg3}
                                style={styles.fireBackView}
                              >
                                <TouchableOpacity
                                 testID="fireBtn"
                                  onPress={() =>
                                    this.props.navigation.navigate("FireScreen")
                                  }
                                  style={styles.fireButton}
                                >
                                  <Image source={fire} resizeMode="contain" />
                                  <Text
                                    style={[
                                      styles.buttonText,
                                      { paddingLeft: 5 },
                                    ]}
                                  >
                                    Fire
                                  </Text>
                                </TouchableOpacity>
                              </ImageBackground>
                            </View>
                            <View style={styles.buttonView}>
                              <ImageBackground
                                source={imgBg4}
                                style={styles.callBackView}
                              >
                                <TouchableOpacity
                                  testID="cfcustomBtn"
                                  onPress={() =>
                                    this.props.navigation.navigate(
                                      "CfCustomAlerts2", { initialSeconds: 15 }
                                    )
                                  }
                                  style={styles.callButton}
                                >
                                  <Image source={call} resizeMode="contain" />
                                  <Text
                                    style={[
                                      styles.buttonText,
                                      { paddingLeft: 5 },
                                    ]}
                                  >
                                    Call
                                  </Text>
                                </TouchableOpacity>
                              </ImageBackground>
                            </View>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>



                    <View style={styles.emergencyTextView}>
                      <Text style={{ color: "#fff" }}>
                        Please press only when in an emergency!
                      </Text>

                      <TouchableOpacity
                        testID="panicBtn"
                        style={{ marginTop: 15 }}
                        onPress={() => this.props.navigation.navigate("PanicScreen")}
                      >
                        <Image
                          source={PanicBtn}
                          resizeMode="contain"
                          style={{}}
                        />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>

                </>
              )}

              

            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
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
  container1: {
    flex: 1,
    backgroundColor: COLORS.ultradarkorange,

  },
  container2: {
    flex: 1,
    backgroundColor: "#454545",

  },
  child: {
    width: windowWidth,

  },
  headerView: {
    backgroundColor: COLORS.darkorange,
    height: hp("7%"),
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  drawerButton: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerIcon: {
    width: 23,
    height: 16,
  },
  headerTitle: {
    color: COLORS.backgroundGray,
    fontSize: 16,
    fontWeight: "700",
  },
  images: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginTop: 20,
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: 200,
  },
  text1: {
    fontSize: 25,
    textAlign: "center",
    color: "#fff",
    marginTop: 50,
  },
  text2: {
    fontSize: 13,
    textAlign: "center",
    color: "#cdcdcd",
    marginTop: 10,
    width: 270,
  },
  button: {
    height: 50,
    width: "90%",
    backgroundColor: "#515151",
    marginTop: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    height: 50,
    width: "90%",
    backgroundColor: "#515151",
    marginTop: 20,
    marginBottom: 234,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  colorwhite: {
    color: "#fff",
  },
  MenuTitleTxt: {
    color: "#F99546",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
  scrollContainer: {
    height: windowHeight,
    width: windowWidth,
  },
  scrollInnerView: {
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyAssistance: {
    height: hp("7.1%"),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    width: wp("8.5%"),
    height: 4,
    borderRadius: 20,
    marginTop: 15,
    backgroundColor: "#6A6A66",
  },
  centerView: {
    alignContent: "center",
    height: "100%",
    marginTop: 5,
  },
  rawView: {
    height: hp("21.6%"),
    flexDirection: "row",
  },
  buttonView: {
    width: "50%",
    height: "100%",
  },
  ambulanceBackView: {
    alignItems: "center",
    right: 5,
    alignSelf: "flex-end",
    justifyContent: "center",
    height: Platform.OS === "ios" ? hp("15.5%") : hp("17.5%"),
    width: wp("27%"),
  },
  buttonText: { color: "#F99546", paddingTop: 5 },
  policeBackView: {
    alignItems: "center",
    left: 5,
    justifyContent: "center",
    height: Platform.OS === "ios" ? hp("15.5%") : hp("17.5%"),
    width: wp("27%"),
  },
  fireBackView: {
    alignSelf: "flex-end",
    right: 4,
    alignItems: "flex-end",
    height: hp("17.5%"),
    width: wp("27%"),
  },
  fireButton: {
    right: 17,
    marginTop: 20,
  },
  callBackView: {
    height: hp("17.5%"),
    width: wp("27%"),
    left: 4,
  },
  callButton: {
    marginTop: 20,
    left: 20,
  },
  emergencyTextView: {
    alignItems: "center",
    marginTop: 45,
    marginBottom: 20,
  },
  switchSize: {
    transform: [{ scaleX: Platform.OS === "android" ? 1 : 0.8 }, { scaleY: Platform.OS === "android" ? 1 : 0.8 }],
    right: 10,
    marginLeft: RFPercentage(10)
  },
  switchSize2: {
    transform: [{ scaleX: Platform.OS === "android" ? 1 : 0.8 }, { scaleY: Platform.OS === "android" ? 1 : 0.8 }],
    right: 10,
    marginLeft: RFPercentage(5.6)
  },
});
// Customizable Area End
