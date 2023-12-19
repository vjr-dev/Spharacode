// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../../../framework/src/Globals";
import { Styles } from "./AlertListStyle";
import AlertsListController, { Props } from "./AlertsListController";
import * as IMAGE from "./assets";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;

export default class AlertList extends AlertsListController {
  constructor(props: Props) {
    super(props);
  }
  renderAlerts(item: any, index: number) {
    return (
      <View
        key={it.id}
        style={{
          marginBottom: 10,
          marginTop: 5,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#3F4040",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          testID="onPressAlert"
          onPress={() =>
            this.props.navigation.navigate("Alerts", {
              date: it.date,
              time: it.time,
              name: it.status_report,
              address: it.address,
              alertType: it.alert_type,
            })
          }
        >
          <View
            style={{
              marginHorizontal: 12,
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: COLORS.white,
              }}
            >
              {it.date}
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  marginTop: 5,
                  flex: 1,
                  fontSize: 13,
                  fontWeight: "600",
                  color: COLORS.infoGray,
                }}
              >
                {it.address}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={Styles.safeareaView}>
        <ImageBackground source={IMAGE.back1} style={Styles.container}>
          <ImageBackground source={IMAGE.back2} style={Styles.container}>
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
                testID="alertsListBackButton"
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
                  My Alert
                </Text>
              </View>
              <View style={{ height: "100%", width: "15%" }} />
            </View>

            {this.state.Loader ? (
              <View style={{ flex: 1 }}>
                <Modal visible={this.state.Loader} transparent={true}>
                  <View
                    style={{
                      height: windowHeight,
                      width: windowWidth,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 100,
                        width: windowWidth - 20,
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator
                        animating={true}
                        size={"large"}
                        color="#f07233"
                      />
                    </View>
                  </View>
                </Modal>
              </View>
            ) : (
              <ScrollView
                style={{
                  width: "100%",
                  marginTop: 15,
                  alignSelf: "center",
                  flex: 1,
                }}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {[Object.keys(this.state.Channels)].map(
                  (item: any, index: number) => {
                    return (
                      <View key={index.toString() + "_outer_id"}>
                        <Text style={Styles.header}>{item}</Text>
                        {this.state.Channels[item]?.map(
                          (it: any, index: number) => {
                            return this.renderAlerts(item, index);
                          }
                        )}
                      </View>
                    );
                  }
                )}
                {/* <SectionList
                  sections={this.state.Channels}
                  keyExtractor={(item, index) => item + index}
                  renderItem={renderItem}
                  renderSectionHeader={({ section: { date } }) => (
                    <Text style={Styles.header}>{date}</Text>
                    // <Text style={Styles.header}>{Obje}</Text>
                  )}
                /> */}
              </ScrollView>
            )}
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
// Customizable Area End
