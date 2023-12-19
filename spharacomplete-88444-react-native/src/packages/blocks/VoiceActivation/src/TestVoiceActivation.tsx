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
  StatusBar
} from "react-native";
import TestVoiceActivationController, {
  Props,
  configJSON
} from "./TestVoiceActivationController";
import { back1, back2, image_back, voice_rec, tick } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";

export default class TestVoiceActivation extends TestVoiceActivationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const text_speech = this.state.SpeechEnd
      ? configJSON.testSuccessfully
      : configJSON.speakToTest;
    const image = this.state.SpeechEnd ? tick : voice_rec;
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
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  testID="btn_testGoBack"
                  style={styles.button1}
                  onPress={() => this.goback()}
                >
                  <Image source={image_back} style={styles.backbutton} />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btn_activePress"
                  onPress={() => void this.ActivatePress()}
                  disabled={!this.state.SpeechEnd}
                >
                  <Text style={styles.textActive}>{configJSON.activate}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.textVoiceActivation}>
                {configJSON.voiceActivation}
              </Text>
              <Text style={styles.textLabel12}>{configJSON.voiceAlarm}</Text>
              <Text style={styles.textLabel12}>{configJSON.activation}</Text>

              <View
                style={{ alignItems: "center", marginTop: RFPercentage(25) }}
              >
                <Text style={styles.textLabel}>{configJSON.phraseBelow}</Text>
                <Text style={styles.textLabel}>{configJSON.noAlert}</Text>
              </View>
              {this.state.TapPress ? (
                <>
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
                              source={image}
                              style={styles.voiceRecordIcon}
                            />
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  </View>
                  <Text style={styles.textTest}>{text_speech}</Text>
                </>
              ) : (
                <TouchableOpacity
                  testID="btn_startSpeech"
                  onPress={() => void this.startSpeechRecognizing()}
                >
                  <View style={styles.voiceView}>
                    <Image source={voice_rec} style={styles.voiceIcon} />
                  </View>
                  <Text style={styles.textTabStart}>
                    {configJSON.tabToStart}
                  </Text>
                </TouchableOpacity>
              )}
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
    backgroundColor: "#ffffffff"
  },
  image: {
    height: windowHeight,
    width: windowWidth
  },
  image2: {
    height: windowHeight,
    width: windowWidth,
    alignItems: "center"
  },
  container1: { flex: 1, backgroundColor: "#454545" },
  child: { width: windowWidth },
  images: { height: 150, width: 150, alignSelf: "center", marginBottom: 20 },
  backbutton: { height: 15, width: 15, tintColor: "#f07233" },
  view1: { height: 60, width: windowWidth, justifyContent: "center" },
  button1: { marginLeft: 20 },
  logo: { height: 100, width: 100, marginTop: 40 },
  text1: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 50,
    width: windowWidth - 20
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
    borderRadius: 50
  },
  ccode: {
    height: 39,
    width: 60,
    backgroundColor: "#444444",
    marginLeft: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  text2: {
    fontSize: 14,
    color: COLORS.orangelight,
    marginTop: 30,
    width: windowWidth - 20
  },
  button2: {
    height: 50,
    width: windowWidth - 30,
    backgroundColor: COLORS.Viewback,
    marginTop: 30,
    borderRadius: 30,
    // alignItems: "center",
    justifyContent: "center"
  },
  view2: {
    flexDirection: "row",
    width: windowWidth - 20,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    height: 30,
    marginVertical: 1
  },
  container_main: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#E56A00',
    marginTop: RFValue(0)
  },
  circlesContainer: {
    width: BASE_SIZE,
    height: BASE_SIZE,
    alignItems: "center"
  },
  circle_1: {
    top: 0,
    position: "absolute",
    width: BASE_SIZE,
    height: BASE_SIZE,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.ultralightwhite,
    opacity: 0.2
  },
  circle_2: {
    top: BASE_SIZE * 0.1, // The amount remaining
    left: BASE_SIZE * 0.1,
    position: "absolute",
    width: BASE_SIZE * 0.8, // 80% of the base size
    height: BASE_SIZE * 0.8,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.lightwhite,
    opacity: 0.2
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
    justifyContent: "center"
  },
  textTabStart: {
    marginTop: RFValue(10),
    color: COLORS.ultralightwhite,
    fontSize: RFValue(12)
  },
  voiceIcon: { height: RFValue(25), width: RFValue(25), resizeMode: "contain" },
  voiceView: {
    backgroundColor: "rgb(241,235,232)",
    height: RFPercentage(10),
    width: RFPercentage(10),
    borderRadius: RFValue(50),
    marginTop: RFPercentage(6),
    justifyContent: "center",
    alignItems: "center"
  },
  textTest: {
    color: COLORS.ultralightwhite,
    fontSize: RFValue(13),
    fontWeight: "400"
  },
  voiceRecordIcon: {
    height: RFValue(25),
    width: RFValue(25),
    resizeMode: "contain"
  },
  voiceRecordView: {
    height: RFPercentage(10),
    width: RFPercentage(10),
    borderRadius: RFValue(50),
    justifyContent: "center",
    alignItems: "center"
  },
  textLabel: {
    color: COLORS.ultralightwhite,
    fontSize: RFValue(13),
    fontWeight: "400"
  },
  textLabel12: {
    fontSize: RFValue(12),
    color: COLORS.ultralightwhite,
    marginTop: RFValue(1),
    width: windowWidth - 20
  },
  textVoiceActivation: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: RFPercentage(2),
    width: windowWidth - 20,
    fontWeight: "600"
  },
  textActive: {
    marginRight: RFPercentage(2),
    fontSize: RFValue(14),
    color: COLORS.orange,
    letterSpacing: 1,
    fontWeight: "500"
  },
  imageContainer: {
    height: 60,
    width: windowWidth,
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
// Customizable Area End