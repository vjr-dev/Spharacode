// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;

export const Styles = StyleSheet.create({
  container: {
    height: sh,
    width: sw,
    flex: 1,
  },
  header_view: {
    height: 60,
    width: sw,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.darkorange,
    flexDirection: "row",
  },
  header_txt: {
    alignSelf: "center",
    color: COLORS.ReviewBlack,
    fontWeight: "500",
    fontSize: RFValue(14),
    marginRight: RFPercentage(19),
  },
  top_tab: {
    flexDirection: "row",
    backgroundColor: COLORS.backgroundGray,
    height: sh * 0.04,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: RFPercentage(1),
  },
  public_txt: {
    color: COLORS.skipGray,
    fontSize: 17,
    marginBottom: 7,
    alignSelf: "center",
    fontWeight: "600",
  },
  private_txt: {
    color: COLORS.lightyellow,
    fontSize: 17,
    marginBottom: 7,
    alignSelf: "center",
    fontWeight: "600",
  },
  private_view: {
    borderBottomColor: COLORS.lightyellow,
    borderBottomWidth: 2,
    width: sw * 0.18,
  },
  public_view: {
    borderBottomColor: COLORS.lightyellow,
    borderBottomWidth: 2,
    width: sw * 0.18,
  },
  alarm_view: {
    marginTop: RFPercentage(3.5),
    marginLeft: RFPercentage(2.5),
  },
  alram_txt: {
    color: COLORS.white,
    fontSize: RFValue(15),
    fontWeight: "600",
  },
  details_main_view: {
    marginTop: RFPercentage(2),
    marginLeft: RFPercentage(2.1),
    justifyContent: "space-between",
  },
  date_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  val_txt: {
    marginTop: RFValue(10),
    color: COLORS.infoGray,
  },
  info_txt: {
    marginRight: RFPercentage(20),
    marginTop: RFValue(10),
    color: COLORS.infoGray,
    alignSelf: "flex-end",
  },
  info_txt1: {
    marginRight: RFPercentage(0),
    marginTop: RFValue(10),
    color: COLORS.infoGray,
    alignSelf: "flex-end",
  },
  info_txt2: {
    marginRight: RFPercentage(10),
    marginTop: RFValue(10),
    color: COLORS.infoGray,
  },
  main_view: {
    borderWidth: 3,
    borderColor: COLORS.darkorange,
    borderRadius: 20,
    height: RFPercentage(19),
    width: sw * 0.87,
    alignSelf: "center",
    marginTop: RFPercentage(4),
    backgroundColor: COLORS.lightorangeback,
  },
  alert_view: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(1),
  },
  alert_txt: {
    color: COLORS.skipGray,
    fontSize: RFValue(13),
    fontWeight: "500",
    paddingHorizontal: 10,
    textAlign: "center",
  },
});
// Customizable Area End
