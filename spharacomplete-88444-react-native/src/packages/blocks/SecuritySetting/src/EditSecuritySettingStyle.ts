// Customizable Area Start
import { Dimensions, Platform, StyleSheet } from "react-native";
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
    flex: 1,
    position: Platform.OS == "ios" ? "absolute" : undefined,
  },
  image2: {
    height: sh,
    width: sw,
    alignItems: "center",
    flex: 1,
    position: Platform.OS == "ios" ? "absolute" : undefined,
  },
  container1: {
    flex: 1,
    backgroundColor: "#454545",
  },
  child: {
    width: sw,
    height: sh,
    flex: 1,
  },
  title: {
    fontSize: 17,
    color: COLORS.ultralightwhite,
    marginTop: 40,
    width: sw - 25,
  },
  btnContainer: {
    alignSelf: "center",
  },
  keyboardAvoiding: {
    position: "absolute",
    width: "100%",
  },
  next: {
    color: COLORS.darkorange,
    paddingBottom: Platform.OS === "android" ? 5 : 30,
  },
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
  textInputView: {
    height: 60,
    width: sw - 25,
    backgroundColor: "rgba(83,83,83,0.48)",
    marginTop: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    height: "100%",
    fontSize: 15,
    width: "90%",
    color: COLORS.ultralightwhite,
  },
  indicatorView: {
    height: sh,
    width: sw,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    height: 100,
    width: sw - 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
// Customizable Area End
