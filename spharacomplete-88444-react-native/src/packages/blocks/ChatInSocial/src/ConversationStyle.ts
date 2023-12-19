// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../framework/src/Globals";

const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;

export const Styles = StyleSheet.create({
  container: {
    height: "100%",
    width: sw,
    flex: 1,
  },
  safeareaView: {
    flex: 1,
    backgroundColor: "#454545",
    // height: "100%",
    width: sw,
  },
  child: {
    width: sw,
    flex: 1,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  newInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    padding: 10,
    height: 50,
  },
  listView: {
    flex: 2,
    padding: 10,
  },
  contactText: {
    backgroundColor: COLORS.orangelight,
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
// Customizable Area End
