import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
// Customizable Area End

import FirstResponderDashboardController, {
  Props,
  configJSON,
} from "./FirstResponderDashboardController";

// Customizable Area Start
import { COLORS } from "framework/src/Globals";
import {
  deviceHeight,
  deviceWidth,
  scaledSize,
} from "../../../framework/src/Utilities";
import Entypo from "react-native-vector-icons/Entypo";

export const mapRef: any = React.createRef();
import { SidemenuIcon } from "./assets";
import CustomMap from "../../../components/src/CustomMap";
import Loader from "../../../components/src/Loader";
// Customizable Area End

export default class FirstResponderDashboard extends FirstResponderDashboardController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <Loader loading={this.state.isLoading} />
        <View style={styles.headerView}>
          <TouchableOpacity
            testID="btntoggleDrawer"
            style={styles.drawerButton}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Image source={SidemenuIcon} style={styles.drawerIcon} />
          </TouchableOpacity>

          <View style={styles.headerSubView}>
            <Text testID="btntempClick" style={styles.headerTitle}>
              {configJSON.sphara}
            </Text>
            <View style={styles.headerSubContainerView}>
              <Entypo
                name="location"
                style={{ marginRight: 5 }}
                color={COLORS.backgroundGray}
                size={scaledSize(15)}
              />
              <Text style={styles.addressTextHeader}>
                Patrika Nagar, Hi-tech
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.mapViewStyle}>
          {this.state.currentLatitude && this.state.currentLongitude ? (
            <CustomMap
              currentLatitude={Number(this.state.currentLatitude)}
              currentLongitude={Number(this.state.currentLongitude)}
            />
          ) : null}
        </View>

        <TouchableOpacity style={styles.bottomView}>
          <Text style={styles.bottomTextView}>{configJSON.noEmergencies}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f07135",
  },
  headerView: {
    flexDirection: "row",
    backgroundColor: COLORS.darkorange,
    alignItems: "center",
    paddingVertical: scaledSize(10),
  },
  headerSubView: {
    flex: 0.8,
  },
  headerSubContainerView: {
    flexDirection: "row",
    paddingHorizontal: scaledSize(10),
    justifyContent: "center",
    alignItems: "center",
  },
  addressTextHeader: {
    color: COLORS.backgroundGray,
    fontSize: scaledSize(14),
  },
  mapViewStyle: {
    flex: 1,
  },
  mapStyle: {
    height: "100%",
    width: "100%",
  },
  markerOuterView: {
    height: scaledSize(20),
    width: scaledSize(20),
    borderRadius: scaledSize(10),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  markerInnerDarkView: {
    height: scaledSize(16),
    width: scaledSize(16),
    borderRadius: scaledSize(8),
    backgroundColor: "#f07135",
  },
  markerInnerLightView: {
    height: scaledSize(16),
    width: scaledSize(16),
    borderRadius: scaledSize(8),
    borderWidth: scaledSize(2),
    borderColor: "black",
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.darkorange,
    borderTopLeftRadius: scaledSize(20),
    borderTopRightRadius: scaledSize(20),
    width: "100%",
  },
  bottomTextView: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    letterSpacing: 1,
    textAlign: "center",
    paddingVertical: scaledSize(15),
    paddingHorizontal: scaledSize(20),
  },
  buttonsOnMap: {
    zIndex: 1,
    position: "absolute",
    bottom: scaledSize(60),
    right: scaledSize(15),
    alignSelf: "flex-end",
    flex: 1,
  },
  sideIcon: {
    backgroundColor: COLORS.white,
    borderRadius: scaledSize(25),
    width: scaledSize(50),
    height: scaledSize(50),
    marginBottom: scaledSize(20),
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    height: scaledSize(22),
    width: scaledSize(22),
  },
  loaderView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerButton: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    // marginLeft: scaledSize(20),
    flex: 0.1,
  },
  drawerIcon: {
    width: 23,
    height: 16,
  },
  headerTitle: {
    color: COLORS.backgroundGray,
    fontSize: scaledSize(18),
    fontWeight: "700",
    textAlign: "center",
  },
  getDirectionText: {
    padding: scaledSize(10),
    fontSize: scaledSize(14),
    color: COLORS.darkorange,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  locationHeaderView: {
    backgroundColor: COLORS.darkorange,
    alignItems: "center",
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
  },
  locationHeaderSubView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaledSize(10),
  },
  startedHeaderView: {
    flexDirection: "row",
    backgroundColor: COLORS.darkorange,
    padding: scaledSize(5),
    alignItems: "center",
    justifyContent: "center",
  },
  subView: {
    flex: 1,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginLeft: scaledSize(15),
  },
  subView2: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "auto",
  },
  subView3: {
    flexDirection: "row",
    alignItems: "center",
  },
  subView4: {
    height: scaledSize(20),
    width: scaledSize(20),
    alignItems: "center",
    justifyContent: "center",
  },
  subView5: {
    backgroundColor: COLORS.black,
    borderRadius: scaledSize(3),
    height: scaledSize(6),
    width: scaledSize(6),
  },
  multipleSubViewAddress: {
    fontSize: scaledSize(12),
    color: COLORS.white,
    marginLeft: scaledSize(5),
    fontWeight: "bold",
  },
  subView6: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaledSize(5),
  },
  subView7: {
    alignItems: "center",
    justifyContent: "center",
  },
  multipleSubViewAddress2: {
    flex: 1,
    fontSize: scaledSize(12),
    color: COLORS.white,
    marginLeft: scaledSize(5),
    fontWeight: "bold",
  },
  yourLocationText: {
    fontSize: scaledSize(16),
    color: COLORS.black10,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: scaledSize(12),
    color: COLORS.white,
    marginHorizontal: scaledSize(15),
    marginTop: scaledSize(5),
    marginBottom: scaledSize(10),
  },
  kmText: {
    marginHorizontal: scaledSize(20),
    padding: scaledSize(15),
    fontSize: scaledSize(10),
    color: COLORS.white,
    letterSpacing: 1,
    textAlign: "center",
  },
  verticleLine: {
    height: "70%",
    width: 1,
    backgroundColor: COLORS.white,
  },
  addressView: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    paddingBottom: scaledSize(20),
  },
  addressSubView: {
    flex: 0.7,
    flexDirection: "row",
  },
  addressTextNew: {
    fontSize: scaledSize(14),
    color: COLORS.infoGray,
    fontWeight: "600",
    marginRight: 5,
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
    paddingVertical: 5,
  },
  btnView: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingHorizontal: scaledSize(10),
    justifyContent: "space-between",
  },
  bottomBtn: {
    fontSize: scaledSize(14),
    color: COLORS.black,
    fontWeight: "bold",
    letterSpacing: 1,
    paddingVertical: scaledSize(10),
  },
  arrivalText: {
    width: "100%",
    backgroundColor: "#ffd89f",
    borderTopLeftRadius: scaledSize(20),
    textAlign: "center",
    borderTopRightRadius: scaledSize(20),
    paddingVertical: scaledSize(10),
    fontSize: scaledSize(14),
  },
  arrivalSubView: {
    width: "100%",
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    paddingBottom: scaledSize(30),
  },
  helpText: {
    textAlign: "center",
    marginBottom: scaledSize(20),
    marginTop: scaledSize(10),
    fontSize: scaledSize(14),
    marginHorizontal: scaledSize(15),
  },
  topView: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: "100%",
    paddingVertical: scaledSize(12),
    paddingHorizontal: scaledSize(15),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topViewText: {
    color: COLORS.darkorange,
    fontSize: scaledSize(12),
  },
  arrivalBottomView: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: "100%",
    paddingVertical: scaledSize(8),
    paddingHorizontal: scaledSize(12),
    flexDirection: "row",
    alignItems: "center",
  },
  userNameText: {
    color: COLORS.black,
    fontSize: scaledSize(14),
    marginLeft: scaledSize(10),
  },
  getDirectionView: {
    backgroundColor: COLORS.white,
  },
  circle: {
    height: scaledSize(30),
    width: scaledSize(30),
    borderRadius: 30,
    backgroundColor: COLORS.black,
    marginLeft: scaledSize(10),
  },
  distanceView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmView: {
    width: "100%",
    backgroundColor: COLORS.white,
  },
  confirmArrivalView: {
    width: "100%",
    backgroundColor: COLORS.white,
  },
  addIncidentText: {
    fontSize: scaledSize(9),
    marginTop: scaledSize(10),
  },
  modalMainView: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    height: deviceHeight,
  },
  modalSubView: {
    width: deviceWidth - scaledSize(40),
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: deviceHeight / 4,
    borderRadius: 15,
  },
  iconWrapper: {
    height: scaledSize(50),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaledSize(20),
  },
  reportSubmittedText: {
    margin: scaledSize(10),
    fontSize: scaledSize(18),
    fontWeight: "bold",
    alignSelf: "center",
  },
  incidentCloseText: {
    marginHorizontal: scaledSize(10),
    fontSize: scaledSize(15),
    alignSelf: "center",
    marginTop: scaledSize(10),
    textAlign: "center",
  },
  btnUpLine: {
    marginHorizontal: scaledSize(10),
    fontSize: scaledSize(18),
    alignSelf: "center",
    fontWeight: "bold",
    color: "#f07233",
    marginVertical: scaledSize(20),
  },
  goToHomeBtnView: {
    height: 1,
    width: "100%",
    backgroundColor: "#808080",
    marginTop: scaledSize(20),
  },
  goToHomeBtn: {
    height: scaledSize(50),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  goToHomeText: {
    fontWeight: "600",
    fontSize: scaledSize(18),
  },
});
// Customizable Area End
