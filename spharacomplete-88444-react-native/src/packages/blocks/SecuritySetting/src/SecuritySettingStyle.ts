// Customizable Area Start
import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    height: sh,
    width: sw,
    backgroundColor: "#ffffffff",
  },
  image: {
    height: sh,
    width: sw,
  },
  container1: {
    flex: 1,
    backgroundColor: "#454545",
  },
  child: { width: sw },
  backbutton: {
    height: 15,
    width: 15,
    tintColor: "#f07233",
  },
  view1: {
    height: 60,
    width: sw,
    justifyContent: "center",
  },
  button1: { marginLeft: 20 },
  security: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 40,
    width: sw - 25,
  },
  description: {
    fontSize: 16,
    color: COLORS.ultralightwhite,
    marginTop: 10,
    width: sw - 25,
  },
  switchView: {
    flexDirection: "row",
    width: sw - 25,
    alignSelf: "center",
    height: 50,
    alignItems: "center",
    marginTop: 40,
  },
  switchSize: {
    transform: [
      { scaleX: Platform.OS === "android" ? 1.2 : 0.9 },
      { scaleY: Platform.OS === "android" ? 1.2 : 0.9 },
    ],
  },
  switchText: {
    fontSize: 20,
    color: COLORS.white,
    width: "85%",
  },
  optionView: {
    height: 35,
    width: sw - 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
    color: COLORS.ultralightwhite,
  },
  optionAction: {
    fontSize: 18,
    color: COLORS.darkorange,
  },
  modalView: {
    height: sh,
    width: sw,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCenteredView: {
    height: RFValue(170),
    width: sw - RFValue(70),
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  alertMessageView: {
    width: sw - RFValue(90),
    alignSelf: "center",
  },
  alertMessage: {
    fontSize: RFValue(16),
    color: COLORS.black,
    paddingTop: 30,
    paddingBottom: 50,
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.ultralightwhite,
  },
  alertBox: {
    flex: 1,
    justifyContent: "center",
  },
  alertButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 110,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  noText: {
    fontSize: 15,
    color: COLORS.ultralightwhite,
  },
});
// Customizable Area End
