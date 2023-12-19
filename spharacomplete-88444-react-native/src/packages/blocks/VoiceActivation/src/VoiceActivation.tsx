// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  StatusBar,
  Button,
} from "react-native";

import VoiceActivationController, {
  Props,
  configJSON,
} from "./VoiceActivationController";
import { back1, back2, image_back, mic, tick, voice_rec } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MicIcon from "react-native-vector-icons/Feather";
import ModalIcon from "react-native-vector-icons/SimpleLineIcons";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { scaledSize } from "../../../framework/src/Utilities";

export default class VoiceActivation extends VoiceActivationController {
  constructor(props: Props) {
    super(props);
  }

  renderItem = (item: any) => {
    return (
      <TouchableOpacity
        testID="btn_itemClick"
        onPress={() => this.listCall(item)}
        style={[
          styles.renderItemView,
          this.state.Selectedname !== "Select code" &&
            styles.backColor(this.state.Selectedname === item.name),
        ]}
      >
        <View>
          <Text
            style={[
              styles.itemName(this.state.Selectedname === item.name),
              this.state.Selectedname == "Select code" && { color: "white" },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[styles.itemTitle(this.state.Selectedname === item.name)]}
          >
            {item.sub_title}
          </Text>
          {item.name != "Select code" && (
            <TouchableOpacity testID="btn_Mic" style={styles.itemImage}>
              <MicIcon name="mic" color={COLORS.lightorange} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  renderText = () => {
    return (
      <View style={{ marginTop: RFValue(60) }}>
        <Text style={[styles.textTest, { fontSize: RFValue(15) }]}>
          {configJSON.phraseBelow}
        </Text>
        <Text style={[styles.textTest, { fontSize: RFValue(15) }]}>
          {configJSON.noAlert}
        </Text>
      </View>
    );
  };

  render() {
    // const image = this.state.SpeechEnd ? tick : voice_rec;
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <StatusBar
            animated={true}
            backgroundColor="#454545"
            barStyle={"light-content"}
            showHideTransition={"slide"}
          />
          <ImageBackground source={back1} style={styles.image}>
            <ImageBackground source={back2} style={styles.image2}>
              <View style={styles.view1}>
                <TouchableOpacity
                  testID="btnGoBack"
                  style={styles.button1}
                  onPress={() => this.goback()}
                >
                  <Image source={image_back} style={styles.backbutton} />
                </TouchableOpacity>
                {this.state.Selectedname != "Select code" && (
                  <TouchableOpacity
                    testID="activateBtn"
                    onPress={() => this.showPoup()}
                    // disabled={this.state.Selectedname == "Select code" && true}
                  >
                    <Text style={styles.textActive}>{configJSON.activate}</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.textVoiceActivation}>
                {configJSON.voiceActivation}
              </Text>
              <Text style={styles.textLabel}>{configJSON.voiceAlarm}</Text>
              <Text style={styles.textLabel}>{configJSON.activation}</Text>

              {this.state.buttonlist ? (
                <>
                  <TouchableOpacity
                    testID="btn_selectedName"
                    onPress={() => {
                      this.setState({
                        buttonlist: false,
                        show: false,
                        isCodeSelected: true,
                        isCodeActivated: false,
                        flag: "start",
                        iscodeDetected: false,
                      });
                    }}
                    style={styles.button2}
                  >
                    <Text style={styles.textName}>
                      {this.state.Selectedname}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.textActiveLink}>
                    {configJSON.activeLink}
                  </Text>
                </>
              ) : (
                <View style={styles.listContainer}>
                  <FontAwesome
                    name="close"
                    style={{
                      alignSelf: "flex-end",
                      height: scaledSize(15),
                      width: scaledSize(15),
                    }}
                    size={scaledSize(15)}
                    color="orange"
                    onPress={() =>
                      this.setState({
                        Selectedname: "Select code",
                        buttonlist: true,
                      })
                    }
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.Selectedname == "Select code") {
                        this.setState({
                          buttonlist: true,
                          show: true,
                          isCodeSelected: false,
                          isCodeActivated: true,
                        });
                      }
                    }}
                  >
                    <Text style={styles.textNameHeader}>
                      {this.state.Selectedname}
                    </Text>
                  </TouchableOpacity>
                  <FlatList
                    testID="codeList"
                    keyExtractor={(index, item) => index.toString() + item}
                    // data={this.state.Selectedname == "Select code" ? this.state.List : this.state.List2}
                    data={this.state.List}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }: any) => this.renderItem(item)}
                  />
                </View>
              )}

              {this.state.flag == "start" &&
                this.state.Selectedname == "Select code" &&
                this.state.buttonlist == true && (
                  <>
                    {this.renderText()}
                    <TouchableOpacity
                      testID="startSpeechBtn"
                      // onPress={() => this.startSpeechRecognizing()}
                      // onPress={() => this._toggleListening()}
                      onPress={() => this._startProcessing()}
                    >
                      <View style={styles.voiceView}>
                        <Image source={voice_rec} style={styles.voiceIcon} />
                      </View>
                      <Text style={[styles.textTest, { marginTop: 10 }]}>
                        {configJSON.tabToStart}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              {this.state.flag == "inProgress" && (
                <>
                  {this.renderText()}
                  <View style={styles.container_main}>
                    <View style={styles.circlesContainer}>
                      <TouchableOpacity style={styles.circle_1} />
                      <TouchableOpacity style={styles.circle_2} />
                      <LinearGradient
                        colors={["#f89345", "#f07434"]}
                        style={styles.circle_3}
                        j
                      >
                        <View>
                          <View style={styles.voiceRecordView}>
                            <Image
                              source={voice_rec}
                              style={styles.voiceRecordIcon}
                            />
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  </View>
                  <Text style={styles.textTest}>{configJSON.speakToTest}</Text>
                </>
              )}
              {this.state.flag == "success" && (
                <>
                  {this.renderText()}

                  <View style={styles.container_main}>
                    <View style={styles.circlesContainer}>
                      <TouchableOpacity style={styles.circle_1} />
                      <TouchableOpacity style={styles.circle_2} />
                      <LinearGradient
                        colors={["#f89345", "#f07434"]}
                        style={styles.circle_3}
                      >
                        <View>
                          <View style={styles.voiceRecordView}>
                            <Image
                              source={tick}
                              style={styles.voiceRecordIcon}
                            />
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  </View>
                  <Text style={styles.textTest}>
                    {configJSON.testSuccessfully}
                  </Text>
                </>
              )}
              {this.state.isError && (
                <View style={styles.errorBox}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    {this.state.errorMessage}
                  </Text>
                </View>
              )}
              <Modal visible={this.state.Loader} transparent={true}>
                <View style={styles.modalContainer}>
                  <View style={styles.lodarView}>
                    <ActivityIndicator
                      animating={true}
                      size={"large"}
                      color="#f07233"
                    />
                  </View>
                </View>
              </Modal>

              <View style={[styles.centeredView, { position: "absolute" }]}>
                <Modal transparent={true} visible={this.state.isModalVisible}>
                  <View
                    style={[
                      styles.centeredView,
                      {
                        backgroundColor: this.state.modalVisible
                          ? "rgba(0,0,0,0.5)"
                          : "",
                      },
                    ]}
                  >
                    <View style={styles.modalView}>
                      <View style={{ marginTop: 20 }}>
                        <ModalIcon
                          name="check"
                          // style={{ transform: [{ rotateY: "180deg" }] }}
                          size={50}
                          color="orange"
                        />
                      </View>
                      <Text style={styles.title}>Voice alarm Activated</Text>
                      <View
                        style={[
                          styles.viewPlan,
                          {
                            marginTop: 25,
                            flexDirection: "row",
                            justifyContent: "space-around",
                          },
                        ]}
                      >
                        <Text testID="paymentBtn" style={styles.viewPlanText}>
                          CANCLE
                        </Text>
                        <TouchableOpacity
                          testID="cancleBtn"
                          onPress={() => this.actionOnContinue()}
                        >
                          <Text style={styles.viewPlanText}>CONTINUE</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const BASE_SIZE = 150;
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
  view1: {
    height: 60,
    width: windowWidth,
    justifyContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button1: { marginLeft: 20 },
  logo: { height: 100, width: 100, marginTop: 40 },
  text1: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 50,
    width: windowWidth - 20,
  },
  text3: { fontSize: 16, color: COLORS.ultralightwhite, marginTop: 10 },
  text4: { fontSize: 16, color: COLORS.ultralightwhite },
  imageback: {
    height: 60,
    width: windowWidth - 25,
    marginVertical: 100,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#515151",
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
  },
  text2: {
    fontSize: 14,
    color: COLORS.orangelight,
    marginTop: 30,
    width: windowWidth - 20,
  },
  button2: {
    height: 50,
    width: windowWidth - 30,
    backgroundColor: COLORS.Viewback,
    marginTop: 30,
    borderRadius: 30,
    // alignItems: "center",
    justifyContent: "center",
  },
  view2: {
    flexDirection: "row",
    width: windowWidth - 20,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    height: 30,
    marginVertical: 1,
  },
  textLabel: {
    fontSize: 16,
    color: COLORS.ultralightwhite,
    marginTop: 10,
    width: windowWidth - 20,
  },
  textVoiceActivation: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 50,
    width: windowWidth - 20,
  },
  textName: {
    justifyContent: "center",
    color: COLORS.ultralightwhite,
    paddingHorizontal: 20,
  },
  textNameHeader: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    color: COLORS.ultralightwhite,
    paddingHorizontal: 20,
    paddingTop: 17,
  },
  textActiveLink: {
    fontSize: 12,
    color: COLORS.ultralightwhite,
    marginTop: 10,
  },
  listContainer: {
    height: 200,
    width: windowWidth - 30,
    backgroundColor: COLORS.Viewback,
    borderRadius: 25,
    marginTop: 30,
  },
  renderItemView: {
    marginTop: RFValue(0),
    paddingBottom: RFValue(5),
    height: RFValue(40),
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  itemName: (isSelected) => ({
    marginLeft: RFValue(10),
    fontSize: RFValue(13),
    color: isSelected ? "#000" : COLORS.lightwhite,
  }),
  itemTitle: (isSelected) => ({
    marginLeft: RFValue(10),
    fontSize: RFValue(11.5),
    marginTop: RFValue(1.5),
    color: isSelected ? "#000" : COLORS.infoGray,
  }),
  itemImage: { width: "10%", alignSelf: "flex-end", marginTop: RFValue(-20) },
  modalContainer: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  backColor: (isSelected) => ({
    backgroundColor: isSelected ? COLORS.orangelight : "transparent",
  }),
  lodarView: {
    height: 100,
    width: windowWidth - 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textActive: {
    marginRight: RFPercentage(2),
    fontSize: RFValue(14),
    color: COLORS.orange,
    letterSpacing: 1,
    fontWeight: "500",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    width: Dimensions.get("window").width - 50,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    padding: 15,
    color: COLORS.black,
    fontSize: RFValue(17),
    fontWeight: "bold",
  },
  desc: {
    padding: 10,
    fontSize: RFValue(15),
    textAlign: "center",
    color: "#908d8c",
  },
  viewPlan: {
    borderTopWidth: 0.5,
    borderTopColor: COLORS.darkGray,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  viewPlanText: {
    fontSize: RFValue(13),
    color: "#727170",
    fontWeight: "bold",
    paddingVertical: 18,
  },
  closeIcon: {
    justifyContent: "center",
    alignSelf: "flex-end",
    alignItems: "center",
    marginRight: 15,
    marginTop: 13,
  },
  textTabStart: {
    marginTop: RFValue(10),
    color: COLORS.ultralightwhite,
    fontSize: RFValue(12),
  },
  voiceIcon: { height: RFValue(25), width: RFValue(25), resizeMode: "contain" },
  voiceView: {
    backgroundColor: "rgb(241,235,232)",
    height: RFPercentage(10),
    width: RFPercentage(10),
    borderRadius: RFValue(50),
    marginTop: RFPercentage(6),
    justifyContent: "center",
    alignItems: "center",
  },
  container_main: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#E56A00',
    marginTop: RFValue(0),
  },
  circlesContainer: {
    width: BASE_SIZE,
    height: BASE_SIZE,
    alignItems: "center",
  },
  circle_1: {
    top: 0,
    position: "absolute",
    width: BASE_SIZE,
    height: BASE_SIZE,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.ultralightwhite,
    opacity: 0.2,
  },
  circle_2: {
    top: BASE_SIZE * 0.1, // The amount remaining
    left: BASE_SIZE * 0.1,
    position: "absolute",
    width: BASE_SIZE * 0.8, // 80% of the base size
    height: BASE_SIZE * 0.8,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.lightwhite,
    opacity: 0.2,
  },
  circle_3: {
    top: BASE_SIZE * 0.22,
    left: BASE_SIZE * 0.22,
    position: "absolute",
    width: BASE_SIZE * 0.55,
    height: BASE_SIZE * 0.55, // 60% of the base size
    borderRadius: (BASE_SIZE * 0.6) / 2,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  voiceRecordIcon: {
    height: RFValue(25),
    width: RFValue(25),
    resizeMode: "contain",
  },
  voiceRecordView: {
    height: RFPercentage(10),
    width: RFPercentage(10),
    borderRadius: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
  },
  textTest: {
    color: COLORS.ultralightwhite,
    fontSize: RFValue(13),
    fontWeight: "400",
    textAlign: "center",
  },
});
// Customizable Area End
