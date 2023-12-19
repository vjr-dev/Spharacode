// Customizable Area Start
import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
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
    paddingVertical: Platform.OS === "android" ? 15 : 18,
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
  iconImageBackView: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImageBack: {
    height: 20,
    width: 20,
    right: 10,
    tintColor: COLORS.white,
  },
  userImage: {
    height: RFValue(60),
    width: RFValue(60),
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    marginVertical: 20,
    alignSelf: "center",
  },
  videoView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
  },
  videoImageView: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
  },
  videoImage: {
    height: 20,
    width: 20,
  },
  callView: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
  },
  callImage: {
    height: 20,
    width: 20,
  },
  shareView: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
  },
  shareImage: {
    height: 20,
    width: 20,
  },
  optionView: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 5,
  },
  optionImage: {
    height: 20,
    width: 20,
  },
  settingText: {
    width: "95%",
    margin: 10,
  },
  muteChatView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  muteChatText: {
    left: 10,
    fontSize: 18,
  },
  favoriteChatView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  favoriteText: {
    left: 10,
    fontSize: 18,
    //color: COLORS.lightwhite
  },
  notificationView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  notificationText: {
    left: 10,
    fontSize: 18,
  },
  setBackGroundView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  setBackGroundText: {
    left: 10,
    fontSize: 18,
  },
  defaultView: {
    flexDirection: "row",
    alignItems: "center",
  },
  defaultText: {
    right: 10,
    fontSize: 18,
  },
  nextImage: {
    height: 20,
    width: 20,
    right: 10,
  },
  mediaView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  mediaText: {
    left: 10,
    fontSize: 18,
  },
  itemView: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    right: 10,
    fontSize: 18,
  },
  groupCommonText: {
    width: "95%",
    margin: 10,
    marginTop: 25,
  },
  flatListView: {
    height: RFPercentage(14),
    justifyContent: "center",
    marginLeft: 9,
    marginTop: -1,
  },
  plusButtonView: {
    borderColor: COLORS.infoGray,
    borderRadius: 50,
    borderWidth: 1,
    height: RFPercentage(8),
    width: RFPercentage(8),
    marginRight: RFValue(9),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(-1.9),
  },
  plusButtonText: {
    fontSize: RFValue(20),
    color: COLORS.infoGray,
  },
  addNewText: {
    alignSelf: "flex-end",
    marginRight: RFValue(14),
    marginTop: RFValue(3),
    color: COLORS.skipGray,
  },
  userImages: {
    height: RFPercentage(8),
    width: RFPercentage(8),
    borderRadius: 50,
    borderColor: COLORS.white,
    borderWidth: 2,
    //  marginRight:RFValue(18)
  },
  userNameText: {
    marginTop: RFValue(5),
    alignSelf: "center",
    color: COLORS.skipGray,
    width: RFValue(60),
    textAlign: "center",
  },
  blockUserView: {
    backgroundColor: "#363636",
    width: "100%",
    height: RFValue(50),
    marginTop: RFValue(30),
    justifyContent: "center",
  },
  blockUserText: {
    color: COLORS.orange,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "700",
  },
  reportChatView: {
    backgroundColor: "#363636",
    width: "100%",
    height: RFValue(50),
    marginTop: RFValue(10),
    justifyContent: "center",
  },
  reportChatText: {
    color: COLORS.orange,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "700",
  },
});
// Customizable Area End
