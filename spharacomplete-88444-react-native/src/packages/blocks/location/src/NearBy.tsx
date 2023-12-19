import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";

import { COLORS } from "framework/src/Globals";
import * as IMAGE from "./assets";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
// Customizable Area End

import NearByController, { Props, configJSON } from "./NearByController";

export default class NearBy extends NearByController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderItem = ({ item }) => {
    return (
      <View style={styles.flatListMainView}>
        <View style={styles.flatListWidth}>
          <Text style={styles.stationName}>{item?.stationName}</Text>
          <Text style={styles.addressText}>{item?.location?.address}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("NearbyDetails", {
              details: item,
            })
          }
        >
          <Image source={IMAGE.right_arrow} />
        </TouchableOpacity>
      </View>
    );
  };

  detailsFunction = () => {
    if (this.state.policeTab) {
      return (
        <View>
          <FlatList
            // keyExtractor={(item, index) => index.toString()}
            data={this.state.policeStatinDetails}
            renderItem={this.renderItem}
          />
        </View>
      );
    } else if (this.state.medialTab) {
      return <Text>{configJSON.medicaTab}</Text>;
    } else {
      return <Text>{configJSON.fireStationTab}</Text>;
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
            <View style={styles.headerView}>
              <TouchableOpacity
                testID="goBackBn"
                style={styles.backBtn}
                onPress={() => this.props.navigation.goBack()}
              >
                <AntDesign
                  name="arrowleft"
                  color={COLORS.black}
                  size={scaledSize(20)}
                />
              </TouchableOpacity>
              <View style={styles.headerSubView}>
                <View style={styles.loactionView}>
                  <Entypo
                    name="location"
                    style={{ marginRight: scaledSize(5) }}
                    color={COLORS.black}
                    size={scaledSize(15)}
                  />
                  <Text style={styles.yourLocationText}>
                    Nearest facilities
                  </Text>
                </View>
                <Text style={styles.headerAddressText}>
                  F.No. 1609, Patrika Nagar, Hi-tech
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.backBtn, { alignItems: "flex-start" }]}
              >
                <AntDesign
                  name="search1"
                  color={COLORS.black}
                  size={scaledSize(18)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.topTab}>
              <TouchableOpacity
                testID="policeTabBtn"
                onPress={() =>
                  this.setState({
                    policeTab: true,
                    medialTab: false,
                    fireStationTab: false,
                  })
                }
                style={[
                  styles.tabContainer,
                  {
                    borderBottomColor: this.state.policeTab
                      ? COLORS.lightyellow
                      : COLORS.backgroundGray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.publicText,
                    {
                      color: this.state.policeTab
                        ? COLORS.lightyellow
                        : COLORS.skipGray,
                      fontSize: scaledSize(16),
                    },
                  ]}
                >
                  Police
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="medicalTabBtn"
                onPress={() =>
                  this.setState({
                    medialTab: true,
                    policeTab: false,
                    fireStationTab: false,
                  })
                }
                style={[
                  styles.tabContainer,
                  {
                    borderBottomColor: this.state.medialTab
                      ? COLORS.lightyellow
                      : COLORS.backgroundGray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.privateText,
                    {
                      color: this.state.medialTab
                        ? COLORS.lightyellow
                        : COLORS.skipGray,
                      fontSize: scaledSize(16),
                    },
                  ]}
                >
                  Medical
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="fireStationTabBtn"
                onPress={() =>
                  this.setState({
                    fireStationTab: true,
                    policeTab: false,
                    medialTab: false,
                  })
                }
                style={[
                  styles.tabContainer,
                  {
                    borderBottomColor: this.state.fireStationTab
                      ? COLORS.lightyellow
                      : COLORS.backgroundGray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.privateText,
                    {
                      color: this.state.fireStationTab
                        ? COLORS.lightyellow
                        : COLORS.skipGray,
                      fontSize: scaledSize(16),
                    },
                  ]}
                >
                  Fire Station
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 25 }}>{this.detailsFunction()}</View>
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
  addressText: {
    color: COLORS.infoGray,
    fontWeight: "600",
    marginTop: 5,
    fontSize: scaledSize(12),
  },
  stationName: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: scaledSize(14),
  },
  topTab: {
    flexDirection: "row",
    backgroundColor: COLORS.backgroundGray,
    height: deviceHeight * 0.06,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabContainer: {
    borderBottomColor: COLORS.lightyellow,
    borderBottomWidth: 2,
  },
  publicText: {
    color: COLORS.skipGray,
    fontSize: 17,
    marginBottom: 7,
    alignSelf: "center",
    fontWeight: "600",
  },
  privateText: {
    color: COLORS.lightyellow,
    fontSize: 17,
    marginBottom: 7,
    fontWeight: "600",
  },
  headerView: {
    flexDirection: "row",
    backgroundColor: COLORS.darkorange,
    alignItems: "center",
  },
  backBtn: {
    flex: 0.1,
    alignItems: "flex-end",
  },
  headerSubView: {
    flex: 0.8,
    alignItems: "center",
  },
  loactionView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaledSize(10),
  },
  yourLocationText: {
    fontSize: scaledSize(14),
    color: COLORS.black10,
  },
  headerAddressText: {
    fontSize: scaledSize(10),
    color: COLORS.white,
    fontWeight: "bold",
    marginHorizontal: scaledSize(15),
    marginTop: scaledSize(5),
    marginBottom: scaledSize(10),
  },
  flatListMainView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  flatListWidth: {
    width: "90%",
  },
  // Customizable Area End
});
