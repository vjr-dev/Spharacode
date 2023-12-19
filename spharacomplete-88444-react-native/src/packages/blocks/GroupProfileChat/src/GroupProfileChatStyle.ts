// Customizable Area Start
import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "framework/src/Globals";
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
    backgroundColor: "#454545",
  },
  modalView: {
    position: "absolute",
    bottom: 15,
    width: sw - 50,
    alignSelf: "center",
  },
  menuView: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#4a4a4a",
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    padding: 15,
    fontSize: RFValue(15),
    color: "#bebebe",
  },
  seperator: {
    height: 1,
    backgroundColor: COLORS.skipGray,
    width: "90%",
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    width: sw - 50,
    backgroundColor: "#fed99f",
    borderRadius: 25,
  },
  cancelText: {
    fontSize: RFValue(13),
  },
  shadowView: {
    backgroundColor: "#3e3e3e",
    width: sw,
    height: sh,
    position: "absolute",
    opacity: 0.6,
    flex: 1,
  },
});
// Customizable Area End
