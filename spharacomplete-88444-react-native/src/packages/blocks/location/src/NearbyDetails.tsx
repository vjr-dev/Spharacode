import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { COLORS } from "framework/src/Globals";
import * as IMAGE from "./assets";
import {
  deviceHeight,
  deviceWidth,
  scaledSize,
} from "../../../framework/src/Utilities";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { chat, call, share } from "./assets";
import CustomMap from "../../../components/src/CustomMap";
export const mapRef: any = React.createRef();
// Customizable Area End

import NearByDetailsController, {
  Props,
  configJSON,
} from "./NearByDetailsController";

export default class NearbyDetails extends NearByDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  sideText = (text: string, value) => {
    return (
      <View style={styles.sideTextMainView}>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.sideText}>{text}:</Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.sideText}>{value}</Text>
        </View>
      </View>
    );
  };

  contactNumberView = (title: string) => {
    return (
      <View style={styles.contactNumberView}>
        <Text style={styles.numberText}>{title}</Text>
        <FontAwesome name="phone" color={COLORS.lightyellow} size={20} />
        <Entypo name="message" color={COLORS.lightyellow} size={20} />
      </View>
    );
  };

  detailsFunction = () => {
    const data: any = this.props.route.params.details;
    if (this.state.contactDetailsTab) {
      return (
        <View>
          <View style={styles.contactDetailSubView}>
            <Text style={styles.headerText}>Detail</Text>
            {this.sideText(configJSON.state, data.location.state)}
            {this.sideText(configJSON.location, data.location.address)}
          </View>
          <View style={styles.contactDetailSecondSubView}>
            {this.contactNumberView(configJSON.policeStationNumber)}
            {this.contactNumberView(configJSON.controlRoomNumber)}
            {this.contactNumberView(configJSON.officeNumber)}
          </View>
        </View>
      );
    } else {
      return (
        <>
          <View style={styles.mapViewStyle}>
            <CustomMap
              currentLatitude={this.state.currentLatitude}
              currentLongitude={this.state.currentLongitude}
              userLatitude={this.state.userLatitude}
              userLongitude={this.state.userLongitude}
            />

            <View style={styles.topView}>
              <View style={styles.yourLocationView}>
                <Entypo
                  name="location-pin"
                  style={{ marginRight: 5 }}
                  color={COLORS.darkorange}
                  size={scaledSize(20)}
                />
                <Text style={styles.yourLocationText}>Your Location</Text>
              </View>
              <Text style={styles.addressTextHeader}>
                F.No. 1609, Patrika Nagar, Hi-tech
              </Text>
            </View>
          </View>
          <View style={styles.buttonsOnMap}>
            <TouchableOpacity
              testID="alert_chat_button"
              // onPress={() => this.onChatPress()}
              style={styles.sideIcon}
            >
              <Image source={chat} style={styles.iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideIcon}>
              <Image source={call} style={styles.iconStyle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sideIcon}>
              <Image source={share} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.bottomView}>
            <Text style={styles.bottomTextView}>
              0.33K<Text style={styles.kmText}>m away</Text>
            </Text>
            <View style={styles.verticleLine} />
            <Text style={styles.bottomTextView}>
              02:46<Text style={styles.kmText}> min</Text>
            </Text>
          </TouchableOpacity>
        </>
      );
    }
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMAGE.back1} style={styles.subContainer}>
          <ImageBackground source={IMAGE.back2} style={styles.subContainer}>
            <StatusBar
              animated={true}
              backgroundColor="#f07135"
              barStyle={"light-content"}
              showHideTransition={"slide"}
            />
            <Text style={styles.mainHeaderText}>Madhapur Polish Station</Text>
            <View style={styles.topTab}>
              <TouchableOpacity
                testID="contactDetailsTab"
                onPress={() =>
                  this.setState({
                    contactDetailsTab: true,
                    directionTab: false,
                  })
                }
                style={[
                  styles.privateView,
                  {
                    borderBottomColor: this.state.contactDetailsTab
                      ? COLORS.lightyellow
                      : COLORS.backgroundGray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.publicText,
                    {
                      color: this.state.contactDetailsTab
                        ? COLORS.lightyellow
                        : COLORS.skipGray,
                      fontSize: scaledSize(16),
                    },
                  ]}
                >
                  Contact Detail
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="directionTab"
                onPress={() =>
                  this.setState({
                    directionTab: true,
                    contactDetailsTab: false,
                  })
                }
                style={[
                  styles.privateView,
                  {
                    borderBottomColor: this.state.directionTab
                      ? COLORS.lightyellow
                      : COLORS.backgroundGray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.privateText,
                    {
                      color: this.state.directionTab
                        ? COLORS.lightyellow
                        : COLORS.skipGray,
                      fontSize: scaledSize(16),
                    },
                  ]}
                >
                  Direction
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ padding: 25 }}> */}
            {this.detailsFunction()}
            {/* </View> */}
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
    // Customizable Area End

  }
}

const styles = StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    backgroundColor: "#f07135",
  },
  subContainer: {
    height: deviceHeight,
    width: deviceWidth,
    flex: 1,
  },
  mainHeaderText: {
    backgroundColor: COLORS.darkorange,
    textAlign: "center",
    paddingVertical: scaledSize(15),
    fontSize: scaledSize(16),
  },
  addressTextHeader: {
    fontSize: scaledSize(12),
    marginHorizontal: scaledSize(15),
    marginTop: scaledSize(5),
    marginBottom: scaledSize(10),
  },
  topTab: {
    flexDirection: "row",
    backgroundColor: COLORS.backgroundGray,
    height: deviceHeight * 0.06,
    justifyContent: "space-around",
    alignItems: "center",
  },
  publicText: {
    color: COLORS.skipGray,
    fontSize: scaledSize(16),
    marginBottom: scaledSize(7),
    alignSelf: "center",
    fontWeight: "600",
  },
  privateView: {
    borderBottomColor: COLORS.lightyellow,
    borderBottomWidth: 2,
  },
  privateText: {
    color: COLORS.lightyellow,
    fontSize: scaledSize(17),
    marginBottom: scaledSize(7),
    fontWeight: "600",
  },
  sideTextMainView: {
    flexDirection: "row",
  },
  sideText: {
    color: COLORS.infoGray,
    fontWeight: "600",
    marginTop: scaledSize(10),
    fontSize: scaledSize(16),
  },
  numberText: {
    color: COLORS.infoGray,
    fontWeight: "600",
    fontSize: scaledSize(16),
    width: "60%",
  },
  headerText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: scaledSize(16),
    marginBottom: 15,
  },
  contactNumberView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.backgroundGray,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop: 10,
  },
  mapStyle: {
    height: "100%",
    width: "100%",
  },
  userName: {
    fontSize: scaledSize(13),
    color: "#919392",
    textAlign: "center",
    paddingTop: scaledSize(5),
  },
  mapViewStyle: {
    flex: 1,
  },
  markerOuterView: {
    height: scaledSize(20),
    width: scaledSize(20),
    borderRadius: scaledSize(10),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.darkorange,
    borderTopLeftRadius: scaledSize(20),
    borderTopRightRadius: scaledSize(20),
    paddingBottom: scaledSize(15),
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
  verticleLine: {
    height: "70%",
    width: 1,
    backgroundColor: COLORS.white,
  },
  topView: {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: "100%",
    paddingVertical: scaledSize(8),
    justifyContent: "space-between",
    alignItems: "center",
  },
  yourLocationView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaledSize(10),
  },
  yourLocationText: {
    fontSize: scaledSize(16),
    color: COLORS.darkorange,
  },
  contactDetailSubView: {
    padding: scaledSize(20),
  },
  contactDetailSecondSubView: {
    marginTop: scaledSize(20),
  },
  kmText: {
    marginHorizontal: scaledSize(20),
    padding: scaledSize(15),
    fontSize: scaledSize(10),
    color: COLORS.white,
    letterSpacing: 1,
    textAlign: "center",
  },
  // Customizable Area End
});
