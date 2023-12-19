// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../../framework/src/Globals";
import AlertsController, { Props } from "./AlertsController";
import { Styles } from "./AlertsStyle";
import * as IMAGE from "./assets";
const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;

export default class Alerts extends AlertsController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={IMAGE.back1} style={Styles.container}>
        <ImageBackground source={IMAGE.back2} style={Styles.container}>
          <SafeAreaView>
            <ScrollView style={{ marginBottom: RFPercentage(1), height: sh }}>
              {/* <View
                style={Styles.header_view}
              >
                <TouchableOpacity style={{ marginLeft: 0, height: 60, width: 60, alignItems: "center", justifyContent: "center" }} onPress={() => this.props.navigation.pop()}>
                  <Icon name="chevron-left" color={COLORS.black} size={18} />
                </TouchableOpacity>
                <Text style={Styles.header_txt}>11-08-2020</Text>
              </View> */}
              <View
                style={{
                  height: hp("7%"),
                  width: sw,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  backgroundColor: COLORS.darkorange,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  testID="alertsBackButton"
                  style={{
                    alignItems: "center",
                    height: "90%",
                    justifyContent: "center",
                    width: "15%",
                  }}
                  onPress={() => this.props.navigation.pop()}
                >
                  <Image
                    source={IMAGE.image_back}
                    style={{
                      height: 15,
                      width: 15,
                      tintColor: COLORS.backgroundGray,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    height: "100%",
                    width: "70%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.backgroundGray,
                      fontWeight: "700",
                      fontSize: RFValue(16),
                    }}
                  >
                    {this.props.route.params?.date}
                  </Text>
                </View>
                <View style={{ height: "100%", width: "15%" }} />
              </View>
              <View style={Styles.top_tab}>
                <TouchableOpacity
                  testID="alertsDetailsButton"
                  onPress={() => this.setState({ Detail: true, Chat: false })}
                  style={[
                    Styles.public_view,
                    {
                      borderBottomColor: this.state.Detail
                        ? COLORS.lightyellow
                        : COLORS.backgroundGray,
                    },
                  ]}
                >
                  <Text
                    style={[
                      Styles.public_txt,
                      {
                        color: this.state.Detail
                          ? COLORS.lightyellow
                          : COLORS.skipGray,
                      },
                    ]}
                  >
                    Detail
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    Styles.private_view,
                    {
                      borderBottomColor: this.state.Chat
                        ? COLORS.lightyellow
                        : COLORS.backgroundGray,
                    },
                  ]}
                >
                  <Text
                    style={[
                      Styles.private_txt,
                      {
                        color: this.state.Chat
                          ? COLORS.lightyellow
                          : COLORS.skipGray,
                      },
                    ]}
                  >
                    Chat
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.Detail ? (
                <View style={{ width: "100%" }}>
                  <View style={Styles.alarm_view}>
                    <Text style={Styles.alram_txt}>Alert detail</Text>
                  </View>
                  <View style={Styles.details_main_view}>
                    <View style={Styles.date_view}>
                      <Text style={{ color: COLORS.infoGray }}>Date :</Text>
                      <Text
                        style={{
                          marginRight: RFPercentage(15),
                          color: COLORS.infoGray,
                          alignSelf: "flex-end",
                        }}
                      >
                        {this.props.route.params?.date}
                      </Text>
                    </View>
                    <View style={Styles.date_view}>
                      <Text style={Styles.val_txt}>Time :</Text>
                      <Text style={Styles.info_txt}>
                        {this.props.route.params?.time}
                      </Text>
                    </View>
                    <View style={Styles.date_view}>
                      <Text style={Styles.val_txt}>Emergency called # : </Text>
                      <Text
                        style={[
                          Styles.info_txt1,
                          { marginRight: RFPercentage(20.5) },
                        ]}
                      >
                        {this.props.route.params?.alertType}
                      </Text>
                    </View>
                    <View style={Styles.date_view}>
                      <Text
                        style={[
                          Styles.val_txt,
                          { marginRight: RFPercentage(8) },
                        ]}
                      >
                        Location :
                      </Text>
                      <Text style={[Styles.info_txt2, {}]}>
                        {this.props.route.params?.address}
                      </Text>
                    </View>
                    <View style={Styles.date_view}>
                      <Text style={Styles.val_txt}>Status report:</Text>
                      <Text
                        style={[
                          Styles.info_txt,
                          { marginRight: RFPercentage(21.5) },
                        ]}
                      >
                        {this.props.route.params?.name}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={Styles.main_view}>
                    {/* <Icon name="exclamation-triangle" color={COLORS.orange} size={RFValue(31)} style={{ alignSelf: 'center', marginTop: RFValue(10) }} /> */}
                    <Image
                      source={IMAGE.alert_icon}
                      style={{
                        alignSelf: "center",
                        marginTop: RFValue(10),
                        height: RFValue(30),
                        width: RFValue(30),
                      }}
                    ></Image>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: RFValue(14),
                        fontWeight: "500",
                        marginTop: RFValue(4),
                      }}
                    >
                      New Alert!
                    </Text>
                    <View style={Styles.alert_view}>
                      <Text style={Styles.alert_txt}>
                        SPHARA!!! I'm being followed. I'm scared. Send help!
                      </Text>
                      {/* <Text style={Styles.alert_txt}>scared. Send help!</Text> */}
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground>
    );
  }
}
// Customizable Area End
