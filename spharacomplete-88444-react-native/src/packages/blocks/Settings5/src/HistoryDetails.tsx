import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";
// Customizable Area End

import HistoryDetailsController, {
  Props,
  configJSON,
} from "./HistoryDetailsController";

// Customizable Area Start
import { COLORS } from "framework/src/Globals";
import * as IMAGE from "./assets";
import AntDesign from "react-native-vector-icons/AntDesign";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
import ConversationScreen from "../../ChatInSocial/src/ConversationScreen";
import Loader from "../../../components/src/Loader";
// Customizable Area End

export default class HistoryDetails extends HistoryDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  sideText = (text: string, value: any) => {
    return (
      <View style={styles.sideTextMainView}>
        <View style={styles.sideTextSubView}>
          <Text style={styles.sideText}>{text}:</Text>
        </View>
        <View style={styles.sideTextSubView}>
          <Text style={styles.sideText}>{value}</Text>
        </View>
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    const data = this.props.route.params.details;
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
                testID="goBackBtn"
                style={styles.backBtn}
                onPress={() => this.props.navigation.goBack()}
              >
                <AntDesign
                  name="left"
                  color={COLORS.black}
                  size={scaledSize(18)}
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>
                {this.state.details ? data.date_category : configJSON.chat}
              </Text>
            </View>
            <View style={styles.topTab}>
              <TouchableOpacity
                testID="detailsTabBtn"
                onPress={() => this.onDetailsPress()}
                style={[
                  styles.publicView,
                  {
                    borderBottomColor: this.state.details
                      ? COLORS.lightyellow
                      : COLORS.backgroundGray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.publicText,
                    {
                      color: this.state.details
                        ? COLORS.lightyellow
                        : COLORS.skipGray,
                      fontSize: scaledSize(16),
                    },
                  ]}
                >
                  {configJSON.details}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="chatTabBtn"
                onPress={() => this.onChatPress()}
                style={[
                  styles.privateView,
                  {
                    borderBottomColor: this.state.chat
                      ? COLORS.lightyellow
                      : COLORS.backgroundGray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.privateTxt,
                    {
                      color: this.state.chat
                        ? COLORS.lightyellow
                        : COLORS.skipGray,
                      fontSize: scaledSize(16),
                    },
                  ]}
                >
                  {configJSON.chat}
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.details ? (
              <ScrollView
                bounces={false}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
              >
                <Text style={styles.incidentText}>
                  {configJSON.incidentDetail}
                </Text>
                {this.sideText(configJSON.incidentNumber, data.incident_no)}
                {this.sideText(configJSON.respondedAt, data.responded_at)}
                { data.status_report !== "cancelled by you" ? this.sideText(configJSON.arrivalAt, data.arrival_at):null}
                { data.status_report !== "cancelled by you" ? this.sideText(configJSON.timing, data.on_scene_timing):null}
                {this.sideText(configJSON.statusReport, data.status_report)}
              </ScrollView>
            ) : (
              <View style={{ flex: 1 }}>
                <Loader loading={this.state.isLoading} />
                {
                  this.state.chatDetails ?
                  <ConversationScreen
                  navigation={this.props.navigation}
                  route={
                    {
                      params:{
                        chatNumber: this.state.chatDetails.data.guid,
                        mainConversationId:  this.state.chatDetails.data.conversationId,
                        userName:  this.state.chatDetails.data.name,
                        userAvtar: "",
                        userType: 2,
                        isMessageViewOnly: "true",
                      }
                    }
                  }
                  id={""}
                />
                :null
                }
              </View>
            )}
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
  mainView: {
    // padding: scaledSize(25),
  },
  topTab: {
    flexDirection: "row",
    backgroundColor: COLORS.backgroundGray,
    height: deviceHeight * 0.06,
    justifyContent: "space-around",
    alignItems: "center",
  },
  publicView: {
    borderBottomColor: COLORS.lightyellow,
    borderBottomWidth: 2,
    width: deviceWidth * 0.18,
  },
  publicText: {
    color: COLORS.skipGray,
    fontSize: 17,
    marginBottom: 7,
    alignSelf: "center",
    fontWeight: "600",
  },
  privateView: {
    borderBottomColor: COLORS.lightyellow,
    borderBottomWidth: 2,
    width: deviceWidth * 0.18,
  },
  privateTxt: {
    color: COLORS.lightyellow,
    fontSize: 17,
    marginBottom: 7,
    alignSelf: "center",
    fontWeight: "600",
  },
  sideText: {
    color: COLORS.infoGray,
    fontWeight: "600",
    marginTop: scaledSize(10),
    fontSize: scaledSize(14),
  },
  sideTextMainView: {
    flex: 1,
    flexDirection: "row",
  },
  sideTextSubView: {
    flex: 0.5,
  },
  incidentText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: scaledSize(16),
    marginBottom: scaledSize(15),
  },
  alertBox: {
    alignItems: "center",
    backgroundColor: "#f2eeeb",
    paddingHorizontal: scaledSize(30),
    paddingVertical: scaledSize(10),
    borderWidth: 2,
    borderColor: COLORS.orange,
    borderRadius: 20,
  },
  alertText: {
    fontSize: scaledSize(16),
    fontWeight: "bold",
    marginTop: scaledSize(5),
  },
  alertBoxSubText: {
    fontSize: scaledSize(16),
    textAlign: "center",
    fontWeight: "600",
    marginTop: scaledSize(10),
    color: COLORS.darkGray,
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
  headerText: {
    flex: 0.8,
    textAlign: "center",
    color: COLORS.black,
    fontSize: scaledSize(14),
    marginVertical: scaledSize(14),
  },
  scrollView: {
    height: "100%",
    padding: scaledSize(25),
    marginBottom: scaledSize(5),
  },
  // Customizable Area End

});
