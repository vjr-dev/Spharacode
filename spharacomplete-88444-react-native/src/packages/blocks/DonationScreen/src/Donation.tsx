// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../../framework/src/Globals";
import { Thanks } from "./assets";
import DonationController, { Props } from "./DonationController";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Donation extends DonationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container1}>
        <View style={styles.child}>
          <View style={styles.image}>
            <Image source={Thanks} resizeMode="contain" style={styles.logo} />
            <StatusBar backgroundColor={"#f17234"} barStyle="default" />
            <Text style={styles.text1}>
              Thank you for considering making donation!
            </Text>
            <Text style={styles.text2}>
              SPHARA needs your help to ensure funds and resources continue to
              be available to the brave men and women who protect and save our
              communities every day. Any amount you can donate is appreciated
              and will have our complete gratitude’s.
            </Text>

            <TouchableOpacity
              testID="socialWelfareActtivityButton"
              onPress={() => this.onclick()}
              style={styles.button}
            >
              <Text style={styles.colorwhite}>SOCIAL WELFARE ACTIVITY</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="spharaButton"
              onPress={() => this.onSpharaclick()}
              style={styles.button2}
            >
              <Text style={styles.colorwhite}>SPHARA</Text>
            </TouchableOpacity>
          </View>
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
  image: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: COLORS.lightorangeback,
    alignItems: "center",
  },
  container1: { flex: 1, backgroundColor: "#f17234" },
  child: { width: windowWidth },
  images: { height: RFValue(150), width: RFValue(150), alignSelf: "center" },
  logo: { height: RFValue(100), width: RFValue(100), marginTop: RFValue(50) },
  text1: {
    fontSize: 19,
    textAlign: "center",
    color: COLORS.black,
    marginTop: RFValue(40),
    width: windowWidth - RFValue(12),
    fontWeight: "500",
  },
  text2: {
    fontSize: 13,
    textAlign: "center",
    color: COLORS.black,
    marginTop: RFValue(10),
    width: windowWidth - RFValue(35),
  },
  button: {
    height: 50,
    width: "90%",
    backgroundColor: COLORS.darkorange,
    marginTop: RFValue(100),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    height: 50,
    width: "90%",
    backgroundColor: COLORS.backgroundGray,
    marginTop: RFValue(40),
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  colorwhite: { color: COLORS.white },
});
// Customizable Area End
