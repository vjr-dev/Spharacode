// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;

export const Styles = StyleSheet.create({
  container: {
    height: sh,
    width: sw,
    flex: 1,
  },
  safeareaView: {
    flex: 1,
    backgroundColor: "#f17234",
  },
  modalView: {
    position: "absolute",
    bottom: 15,
    width: sw - 30,
    alignSelf: "center",
  },
  menuView: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: COLORS.Viewback,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    padding: 15,
    fontSize: RFValue(15),
    color: COLORS.white,
  },
  seperator: {
    height: 1,
    backgroundColor: COLORS.skipGray,
    width: "90%",
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fed99f",
    borderRadius: 25,
  },
  cancelText: {
    paddingVertical: 17,
    fontSize: RFValue(13),
  },
  shadowView: {
    backgroundColor: "#3e3e3e",
    width: sw,
    height: sh,
    position: "absolute",
    opacity: 0.6,
    // zIndex:1,
    flex: 1,
  },
  header: {
    marginLeft: RFValue(10),
    fontSize: RFValue(14),
    color: COLORS.infoGray,
  },
});
// Customizable Area End
