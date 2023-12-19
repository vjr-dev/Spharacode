import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { COLORS } from "framework/src/Globals";
import * as IMAGE from "./assets";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
import Loader from "../../../components/src/Loader";
// Customizable Area End

import RejectAlertController, {
  Props
} from "./RejectAlertController";

export default class RejectAlert extends RejectAlertController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMAGE.back1} style={styles.subContainer}>
          <ImageBackground source={IMAGE.back2} style={styles.subContainer}>
            <View style={styles.headerView} />
            <View style={styles.mainView}>
              <Loader loading={this.state.isLoading} />
              <ScrollView style={styles.subView}>
                <Text style={styles.headerText}>
                  Why did you have to reject the emergency?
                </Text>
                <Text style={styles.instuctionText}>
                  Select from pre-defined options if that was the reason of
                  cancelation.
                </Text>
                {this.state.buttonlist ? (
                  <>
                    <TouchableOpacity
                      testID="cancellationOptionsButton"
                      onPress={() => {
                        this.setState({ buttonlist: false });
                      }}
                      style={styles.button2}
                    >
                      <Text testID={"reasonText"} style={styles.textName}>
                        {this.state.selectedRejectOption?.attributes?.title ?? "Cancellation options"}
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.listContainer}>
                    <View>
                      <Text style={styles.textNameHeader}>
                        {this.state.selectedRejectOption?.attributes?.title ?? "Cancellation options"}
                      </Text>
                    </View>
                    <FlatList
                      testID="codeList"
                      keyExtractor={(item, index) => `id_${index}`}
                      data={this.state.rejectOptions}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item }: any) => {
                        return (
                          <TouchableOpacity
                            testID="reasonSelectButton"
                            onPress={() => this.listCall(item)}
                            style={[
                              styles.renderItemView,
                              { backgroundColor: this.state.selectedRejectOption?.id === item.id ? COLORS.orangelight : "transparent" }
                            ]}
                          >
                            <View>
                              <Text
                                style={{ ...styles.itemName, color: this.state.selectedRejectOption?.id === item.id ? "#000" : COLORS.lightwhite, }}>
                                {item.attributes.title}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )}
                {this.state.selectedRejectOption?.attributes?.title == "Other" && (
                  <TextInput
                    testID="otherReasonInput"
                    placeholder="Comment Here."
                    value={this.state.otherReason}
                    style={styles.commentHereInput}
                    placeholderTextColor={COLORS.infoGray}
                    onChangeText={(text: string) => this.setState({ otherReason: text })}
                  />
                )}
              </ScrollView>
              <View style={styles.btnView}>
                <TouchableOpacity
                  testID="sendButton"
                  onPress={() => this.onSubmit()}
                  style={styles.sendReporBtn}
                >
                  <Text style={styles.btnText}>SEND REPORT</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  },
  mainView: {
    flex: 1
  },
  headerView: {
    height: scaledSize(50),
    backgroundColor: COLORS.darkorange,
  },
  subView: {
    flex: 1,
    padding: scaledSize(20),
  },
  headerText: {
    fontWeight: "bold",
    color: COLORS.white,
    paddingTop: scaledSize(5),
    fontSize: scaledSize(19),
  },
  instuctionText: {
    color: COLORS.infoGray,
    fontWeight: "600",
    marginTop: scaledSize(15),
  },
  button2: {
    height: scaledSize(50),
    backgroundColor: COLORS.Viewback,
    marginTop: scaledSize(30),
    borderRadius: scaledSize(30),
    justifyContent: "center",
  },
  textName: {
    justifyContent: "center",
    color: COLORS.ultralightwhite,
    paddingHorizontal: 20,
  },
  listContainer: {
    height: scaledSize(200),
    backgroundColor: COLORS.Viewback,
    borderRadius: scaledSize(25),
    marginTop: scaledSize(30),
  },
  textNameHeader: {
    height: scaledSize(50),
    width: "100%",
    justifyContent: "center",
    color: COLORS.ultralightwhite,
    paddingHorizontal: scaledSize(20),
    paddingTop: scaledSize(17),
  },
  renderItemView: {
    marginTop: scaledSize(0),
    paddingBottom: scaledSize(5),
    height: scaledSize(40),
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  itemName: {
    marginLeft: scaledSize(10),
    fontSize: scaledSize(13),
  },
  commentHereInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.infoGray,
    color: COLORS.infoGray,
    fontSize: scaledSize(14),
    marginTop: scaledSize(20),
    paddingBottom: scaledSize(5),
    fontWeight: "300",
  },
  btnView: {
    alignItems: "center",
    paddingBottom: scaledSize(70),
  },
  sendReporBtn: {
    height: scaledSize(50),
    width: deviceWidth - scaledSize(20),
    backgroundColor: COLORS.darkorange,
    borderRadius: scaledSize(30),
    justifyContent: "center",
  },
  btnText: {
    fontSize: scaledSize(14),
    color: COLORS.white,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
  },
  // Customizable Area Start
});
