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
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import RegistrationSuccessScreenController, {
  Props,
} from "./RegistrationSuccessScreenController";
import { back1, back2, Thanks } from "./assets";
import { COLORS } from "framework/src/Globals";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
import Loader from "../../../components/src/Loader";

export default class RegistrationSuccessScreen extends RegistrationSuccessScreenController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={back1} style={styles.image}>
          <ImageBackground source={back2} style={styles.image2}>
            <View>
              <View style={styles.mainView}>
                <View style={styles.subView}>
                  <Text style={[styles.text1, { marginTop: scaledSize(150) }]}>
                    Registration Successfully finished{" "}
                  </Text>
                  <Image
                    source={Thanks}
                    resizeMode="contain"
                    style={styles.logo}
                  />
                  <Text style={styles.whatNextText}>What is next?</Text>
                  <Text style={[styles.text2, { fontSize: scaledSize(12) }]}>
                    In order to start receiving emergency calls you need to
                    complete your profile and upload your first responder
                    certificate.
                  </Text>
                </View>
              </View>

              <View style={styles.btnView}>
                <TouchableOpacity
                  testID="onCompleteProfileButton"
                  onPress={() => this.onCompleteProfile()}
                  style={styles.btn}
                >
                  <Text style={styles.btnText}>COMPLETE PROFILE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Loader loading={this.state.isLoading} />
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454545",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  image2: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  mainView: {
    alignItems: "center",
    height: "100%",
    flex: 1,
  },
  subView: {
    flex: 1,
    padding: scaledSize(10),
    alignItems: "center",
  },
  logo: {
    height: scaledSize(100),
    width: scaledSize(100),
    marginTop: scaledSize(30),
  },
  text1: {
    fontSize: scaledSize(18),
    textAlign: "center",
    color: COLORS.white,
    marginTop: scaledSize(25),
    fontWeight: "bold",
    letterSpacing: 1,
    width: deviceWidth - scaledSize(90),
  },
  whatNextText: {
    fontSize: scaledSize(16),
    textAlign: "center",
    color: COLORS.white,
    marginTop: scaledSize(25),
    width: deviceWidth - scaledSize(90),
  },
  btnText: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  text2: {
    fontSize: scaledSize(13),
    color: COLORS.infoGray,
    marginTop: 10,
    width: deviceWidth - scaledSize(90),
    fontWeight: "600",
    textAlign: "center",
    alignSelf: "center",
  },
  btnView: {
    alignItems: "center",
    width: deviceWidth,
    justifyContent: "flex-end",
    marginBottom: deviceHeight * 0.05,
  },
  btn: {
    height: scaledSize(50),
    width: deviceWidth - scaledSize(20),
    backgroundColor: COLORS.darkorange,
    borderRadius: scaledSize(30),
    justifyContent: "center",
  },
});

// Customizable Area End
