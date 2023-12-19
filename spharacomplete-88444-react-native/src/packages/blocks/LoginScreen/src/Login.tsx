//Customizable Area Start
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
  StatusBar,
 
} from "react-native";

import LoginController, { Props} from "./LoginController";
import { back1, back2, LOGO} from "./assets";
import { COLORS } from "../../../framework/src/Globals";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import { scaledSize } from "framework/src/Utilities";





export default class Login extends LoginController {
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
              <ScrollView>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {/* <View style={styles.view1}>
                    <TouchableOpacity
                      style={styles.button1}
                      onPress={() => this.goback()}
                    >
                      <Image source={image_back} style={styles.backbutton} />
                    </TouchableOpacity>
                  </View> */}
                  <Image source={LOGO} style={styles.logo} />
                  <Text
                    style={styles.text1}>Log in to continue.</Text>
                  <View
                    // source={Rectangle}
                    style={styles.imageback}
                  >
                    <TouchableOpacity
                      testID="Cmodal"
                      onPress={() => this.setState({ Cmodal: true })}
                      style={styles.ccode}
                    >
                      <Text style={{ color: COLORS.white }}>
                        +{this.state.Code}
                      </Text>
                      <AntDesign
                        name="caretdown"
                        style={styles.downArrow}
                        color={COLORS.infoGray}
                        size={scaledSize(10)}
                      />
                    </TouchableOpacity>

                    <TextInput
                      testID="inputBtn"
                      value={this.state.Number}
                      onChangeText={(TT) =>
                        this.setState({ Number: parseInt(TT) })
                      }
                      placeholderTextColor="#cdcdcd"
                      style={{
                        color: "#fff",
                        marginLeft: 10,
                        width: "80%",
                        height: 40,
                      }}
                      placeholder="Phone Number"
                      keyboardType="number-pad"
                    // maxLength={10}
                    />
                  </View>

                  <TouchableOpacity  
                   testID="goSignupBtn"
                   onPress={() => this.goSignupScreen()}>
                    <Text style={styles.text2}>
                      Don't have an account? Sign up
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    testID="varificationgoBtn"
                    onPress={() => this.varificationgo()}
                    // onPress={() => this.props.navigation.navigate("VoiceActivation")}
                    style={styles.button2}
                  >
                    <Text style={{ color: "#fff" }}>CONTINUE</Text>
                  </TouchableOpacity>
                  <Modal transparent={true} visible={this.state.Cmodal}>
                    <View
                      style={{
                        height: windowHeight,
                        width: windowWidth,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      {/* <View
                                        style={{ height: 400, width: windowWidth-20, backgroundColor: "#515151",borderRadius:10,alignItems:"center" }}
                                    >
                                        <View style={{height:50,width:"100%"}}>
                                            <TouchableOpacity
                                            onPress={()=>this.modalclose()}
                                            style={{height:"100%",width:50,alignSelf:"flex-end",alignItems:"center",justifyContent:"center"}}>                                                
                                            <Text style={{color:COLORS.white,fontSize:25}}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <FlatList
                                            data={this.state.codedata}
                                            style={{ height: 400, width: windowWidth - 20 }}
                                            renderItem={({ item, index }: any) => {
                                                return (
                                                    <>
                                                        <TouchableOpacity 
                                                        onPress={()=>this.codelcik(item)}
                                                        style={{ height: 25, width: windowWidth - 20, alignSelf: "center", marginTop: 10, flexDirection: "row", alignItems: "center",justifyContent:"space-around" }}>

                                                            <Text style={{color:COLORS.white}}>+{item.dial_code}</Text>
                                                            <Text style={{color:COLORS.white,width:150}}>{item.name}</Text>
                                                            <Text style={{color:COLORS.white}}>{item.code}</Text>

                                                        </TouchableOpacity>
                                                        <View style={{ height: 1, width: "90%", backgroundColor: "#cdcdcd", marginTop: 10, alignSelf:"center" }} />
                                                    </>
                                                )
                                            }}
                                        />

                                    </View> */}
                      <CountryPicker
                        testID = "countrypickerBtn"
                        // countryCode={true}
                        theme={DARK_THEME}
                        countryCode={"IN"}
                        withFlag={true}
                        visible={this.state.Cmodal}
                        onSelect={(Country) => this.codelcik(Country)}
                        onClose={() => this.setState({ Cmodal: false })}
                        withCallingCode={true}
                        withCountryNameButton={true}
                        withCurrencyButton={true}
                        withFlagButton={true}
                        withFilter={true}
                        withModal={false}
                        excludeCountries={["AQ", "BV", "TF"]}
                      />
                    </View>
                  </Modal>

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
  backbutton: { height: 15, width: 15, tintColor: "#f07233" },
  view1: { height: 60, width: windowWidth, justifyContent: "center" },
  button1: { marginLeft: 20 },
  logo: { height: 100, width: 100, marginTop: 40 },
  text1: { fontSize: 20, textAlign: "center", color: "#fff", marginTop: 50 },
  imageback: {
    height: 60,
    width: windowWidth - 25,
    marginVertical: 100,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(83,83,83,0.48)",
    borderRadius: 50,
  },
  ccode: {
    height: 39,
    width: 60,
    backgroundColor: "#444444",
    marginLeft: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row'
  },
  text2: { fontSize: 16, color: "#fed89e", padding: 10 },
  button2: {
    height: 50,
    width: "90%",
    backgroundColor: "#f07233",
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  downArrow: {
    marginLeft: scaledSize(5),
  },
});
// Customizable Area End
