// Customizable Area Start

import { Dimensions, StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from "../../../framework/src/Globals";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

const BASE_SIZE = 255

export const Styles = StyleSheet.create({
  image: {
    height: sh,
    width: sw,
    flex: 1
  },
  image2: {
    height: sh,
    width: sw,
    alignItems: "center",
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontWeight: "bold",
    color: "white",
    paddingTop: 15,
    fontSize: RFValue(19)
  },
  text1: {
    fontWeight: "600",
    textAlign: "center",
    paddingTop: 20,
    paddingHorizontal: 30,
    color: "#a4a4a4",
    fontSize: RFValue(16)
  },
  text2: {
    textAlign: "center",
    paddingTop: 35,
    paddingHorizontal: 30,
    color: "#ffd8a0",
    fontSize: RFValue(13)
  },

  circlesContainer: {
    width: BASE_SIZE,
    height: BASE_SIZE,
    alignItems: 'center',
    marginTop: 30
  },
  circle_1: {
    top: 0,
    position: 'absolute',
    width: BASE_SIZE,
    height: BASE_SIZE,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.ultralightwhite,
    opacity: 0.2
  },
  circle_2: {
    top: BASE_SIZE * 0.1, // The amount remaining
    left: BASE_SIZE * 0.1,
    position: 'absolute',
    width: BASE_SIZE * 0.8, // 80% of the base size
    height: BASE_SIZE * 0.8,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.lightwhite,
    opacity: 0.2

  },
  circle_3: {
    top: BASE_SIZE * 0.2,
    left: BASE_SIZE * 0.2,
    position: 'absolute',
    width: BASE_SIZE * 0.6,
    height: BASE_SIZE * 0.6, // 60% of the base size
    borderRadius: BASE_SIZE * 0.6 / 2,
    backgroundColor: '#FFFFFF'
  },
  map_image: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.darkorange,
    height: "100%",
    width: "100%",
    borderRadius: 100,
    alignSelf: 'center'
  },
  mapView: {
    backgroundColor: "grey",
    flex: 1
  },
  map: {
    width: sw,
    height: sh,
    flex: 1,
    position: 'absolute',
  },
  buttonView: {
    flexDirection: "row",
    width: "70%",
    marginTop: 100,
    marginBottom: 20,
    justifyContent: "space-between"
  },
  buttonText: {
    color: "#fa9547",
    fontSize: RFValue(14),
    fontWeight: "700"
  },
  alertIcon: {
    alignSelf: 'center',
    marginTop: RFValue(60),
  },
  indicatorView: {
    height: sh,
    width: sw,
    alignItems: "center",
    justifyContent: "center"
  },
  indicator: {
    height: 100,
    width: sw - 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },

  previewBaclgroundHeader: {
    backgroundColor: COLORS.darkorange,
    justifyContent: "space-between",
    paddingHorizontal: scaledSize(20),
    paddingVertical: scaledSize(15),
    flexDirection: 'row'
  },
  previewText: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  addressView: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    paddingBottom: scaledSize(20)
  },
  addressSubView: {
    flex: 0.7,
    flexDirection: "row",
  },
  subContainer: {
    flex: 0.3,
  },
  codeBtn: {
    backgroundColor: COLORS.darkGray,
    borderRadius: 20,
    marginLeft: 10,
  },
  codeBtnFont: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5
  },
  addressText: {
    flex: 1,
    fontSize: scaledSize(14),
    color: COLORS.infoGray,
    fontWeight: "600",
    marginRight: 5
  },
  descriptionView: {
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: scaledSize(16),
    color: COLORS.infoGray,
    fontWeight: "600",
  },
  btnView: {
    flexDirection: 'row',
    backgroundColor: COLORS.white
  },
  bottomBtn: {
    fontSize: scaledSize(14),
    color: COLORS.orange,
    fontWeight: "bold",
    letterSpacing: 1,
    paddingVertical: scaledSize(10),
    textAlign: 'center'
  },
  mapViewStyle: {
    height: deviceHeight * 0.35,
    marginBottom: -scaledSize(20)
  },
  bottomTextView: {
    fontSize: scaledSize(14),
    color: COLORS.black,
    letterSpacing: 1,
    textAlign: "center",
    paddingHorizontal: scaledSize(10),
  },
  verticleLine: {
    width: 1,
    backgroundColor: COLORS.black,
  },
  modalBody: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  detailsView: {
    minHeight: deviceHeight * 0.35,
    maxHeight: deviceHeight * 0.45,
    backgroundColor: "rgba(243,243,243,255)",
    borderTopLeftRadius: scaledSize(20),
    borderTopRightRadius: scaledSize(20),
    overflow:'hidden'

  },
  timeText: {
    fontWeight: "bold",
    fontSize: scaledSize(14),
  },
  timeUntilView:{
    flexDirection: "row", 
    paddingBottom: scaledSize(10) 
  },
  descriptionHeaderView:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: scaledSize(10),
    paddingBottom: scaledSize(15),
},
distanceTitleView:{
  backgroundColor: 'rgba(254,216,158,255)',
  borderTopLeftRadius: scaledSize(20),
  borderTopRightRadius: scaledSize(20),
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: scaledSize(10),
  paddingHorizontal: scaledSize(15),
  overflow: 'hidden'
},
distanceText:{
  fontSize: scaledSize(16)
},
locationIcon:{
  marginRight: scaledSize(10), 
  marginTop: scaledSize(5)
},
acknowledgeContainer:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'rgba(0,0,0,0.5)'
},
acknowledgeBody:{
  width: "80%",
  backgroundColor: COLORS.white,
  height: deviceWidth *0.7,
  borderRadius: scaledSize(5),
  marginBottom: scaledSize(150)
},
dispatchedText:{
  textAlign:'center',
  marginVertical: scaledSize(15),
  fontSize: scaledSize(20),
  fontWeight:'bold'
},
descriptionBody:{
  flex:1
},
acknowledgeDescription:{
  marginHorizontal: scaledSize(15),
  marginBottom: scaledSize(15),
  fontSize: scaledSize(12),
  color: COLORS.darkGray
},
lineSeprator:{
  height: 1,
  width:"100%",
  backgroundColor: COLORS.darkGray
},
acknoledgeText:{
  textAlign:'center',
  marginVertical: scaledSize(10),
  fontSize: scaledSize(15),
  color: COLORS.darkGray,
  fontWeight:'bold'
}
});
// Customizable Area End
