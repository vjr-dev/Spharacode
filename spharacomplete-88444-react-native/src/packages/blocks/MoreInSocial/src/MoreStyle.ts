// Customizable Area Start

import { Dimensions, StyleSheet } from "react-native";
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
    bottom: 0,
    width: sw,
    alignSelf: "center",
    backgroundColor: "#4a4a4a",
  },
  shadowView: {
    backgroundColor: "#3e3e3e",
    width: sw,
    height: sh,
    position: "absolute",
    opacity: 0.6,
    flex: 1,
  },
  menuContainer: {
    flexWrap: "wrap",
    marginBottom: 23,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  menuButton: {
    marginTop: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  menuImage: {
    width: 20,
    height: 20,
  },
  menuText: {
    fontSize: 13,
    paddingTop: 5,
    paddingHorizontal: 23,
    color: COLORS.infoGray,
  },
});
// Customizable Area End
