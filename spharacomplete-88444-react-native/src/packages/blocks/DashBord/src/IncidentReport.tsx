import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput,
} from "react-native";
// Customizable Area End

import IncidentReportController, {
  Props,
  configJSON,
} from "./IncidentReportController";

// Customizable Area Start
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS } from "../../../framework/src/Globals";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
import CustomButton from "../../../components/src/CustomButton";
import CustomHeader from "../../../components/src/CustomHeader";
import { CheckBox } from "react-native-elements";
import Loader from "../../../components/src/Loader";
// Customizable Area End
export default class IncidentReport extends IncidentReportController {
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
          <Text style={styles.leftText}>{text}:</Text>
        </View>
        <View style={styles.sideTextSubView}>
          <Text style={styles.sideText}>{value}</Text>
        </View>
      </View>
    );
  };

  CheckBoxCS = (name: string, state: string, side: string, testID: string) => {
    return (
      //@ts-ignore
      <CheckBox
        testID={testID}
        key={name}
        title={name}
        checkedIcon={
          <AntDesign
            name="checksquare"
            color={COLORS.darkGray}
            size={scaledSize(16)}
          />
        }
        uncheckedIcon={
          <FontAwesome5 name="stop" color={"#e8e8e8"} size={scaledSize(16)} />
        }
        textStyle={{
          fontSize: scaledSize(12),
          color: "black",
          fontWeight: "400",
        }}
        containerStyle={styles.checkBox}
        checked={
          side === "upper"
            ? state === name
            : side === "lower"
            ? state === name
            : false
        }
        onPress={() =>
          side === "upper"
            ? this.setState({ injured: name })
            : this.setState({ treatmentProvided: name })
        }
      />
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          barStyle={"light-content"}
          showHideTransition={"slide"}
          backgroundColor={"#f17234"}
        />
        <CustomHeader headerText="Incident Report" />
        <ScrollView style={styles.scrollView} bounces={false}>
          <Loader loading={this.state.isLoading} />

          <View style={styles.mainView}>
            <View style={styles.addCaseView}>
              <AntDesign
                name="filetext1"
                color={COLORS.darkorange}
                size={scaledSize(30)}
              />
              <View style={styles.addCaseSubView}>
                <Text style={styles.addCaseText}>Add Case Report</Text>
                <Text style={styles.detailsText}>
                  A few details automatically filled up by the system.
                </Text>
              </View>
            </View>

            <View style={styles.incidentView}>
              {this.sideText(
                configJSON.incidentNumber,
                this.state.reportDetails?.attributes?.incident_no
              )}
              {this.sideText(
                configJSON.respondedAt,
                this.state.reportDetails?.attributes?.responded_at
              )}
              {this.sideText(
                configJSON.arrivalAt,
                this.state.reportDetails?.attributes?.arrival_at
              )}
              {this.sideText(
                configJSON.timing,
                this.state.reportDetails?.attributes?.on_scene_timing
              )}
              {this.sideText(
                configJSON.location,
                this.state.reportDetails?.attributes?.location
              )}
            </View>

            <View style={styles.incidentView}>
              <Text style={styles.leftText}>Incident Description:</Text>
              <Text style={styles.description}>
                Include details on how the incident happended. Factor leading to
                the event and what took place. Be as specific as possible
              </Text>
            </View>

            <TextInput
              testID="descriptionInput"
              placeholder="Description"
              style={styles.input}
              onChangeText={(value) =>
                this.setState({ incidentDescription: value })
              }
            />

            <View style={styles.subView}>
              <Text style={[styles.leftText, { marginTop: 0 }]}>
                Was the individual injured?
              </Text>

              <View style={styles.injuredCheckBoxView}>
                {this.CheckBoxCS(
                  "Yes",
                  this.state.injured,
                  "upper",
                  "injerdOption"
                )}
                {this.CheckBoxCS(
                  "No",
                  this.state.injured,
                  "upper",
                  "notInjerdOption"
                )}
              </View>
            </View>

            <TextInput
              placeholder="Describe the injury, or the body part injured and other info."
              style={styles.input}
              onChangeText={(value) =>
                this.setState({ injuredDescription: value })
              }
            />

            <View style={styles.incidentView}>
              <Text style={styles.leftText}>
                Was medical treatment injured?
              </Text>
              <View style={styles.subContainer}>
                {this.CheckBoxCS(
                  "Yes",
                  this.state.treatmentProvided,
                  "lower",
                  "treatmentProvided"
                )}
                {this.CheckBoxCS(
                  "No",
                  this.state.treatmentProvided,
                  "lower",
                  "treatmentNotProvided"
                )}
                {this.CheckBoxCS(
                  "Refused treatment",
                  this.state.treatmentProvided,
                  "lower",
                  "refusedTreatment"
                )}
              </View>
            </View>

            <View style={styles.btnView}>
              <CustomButton
                testID="submitBtn"
                title="SUBMIT REPORT"
                onPress={() => this.submitReportDetails()}
              />
            </View>
          </View>

          <Modal
            testID="modalOpen"
            visible={this.state.reportModal}
            transparent={true}
          >
            <View
              style={{
                backgroundColor: "rgba(52, 52, 52, 0.8)",
                height: deviceHeight,
              }}
            >
              <View
                style={{
                  width: deviceWidth - scaledSize(40),
                  backgroundColor: "#fff",
                  alignSelf: "center",
                  marginTop: deviceHeight / 4,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    // height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: scaledSize(20),
                  }}
                >
                  <AntDesign
                    name="checkcircle"
                    color={COLORS.darkorange}
                    size={scaledSize(40)}
                  />
                </View>
                <Text
                  style={{
                    marginTop: scaledSize(10),
                    fontSize: scaledSize(18),
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  Report Submitted Successfully
                </Text>
                <Text
                  style={{
                    // marginHorizontal: 10,
                    fontSize: scaledSize(15),
                    alignSelf: "center",
                    // marginTop: scaledSize(5),
                    textAlign: "center",
                  }}
                >
                  and incident #6678 closed
                </Text>

                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#808080",
                    marginTop: scaledSize(20),
                  }}
                />
                <TouchableOpacity
                  testID="goToHomeBtn"
                  onPress={() => this.goToHome()}
                  style={{
                    height: scaledSize(50),
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "600", fontSize: scaledSize(16) }}>
                    GO TO HOME
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
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
  scrollView: {
    backgroundColor: COLORS.white,
  },
  mainView: {
    paddingHorizontal: scaledSize(20),
  },
  addCaseView: {
    flexDirection: "row",
    marginTop: scaledSize(15),
  },
  addCaseSubView: {
    marginHorizontal: scaledSize(15),
  },
  addCaseText: {
    fontSize: scaledSize(16),
    fontWeight: "bold",
  },
  detailsText: {
    marginTop: scaledSize(5),
    color: COLORS.infoGray,
  },
  incidentView: {
    marginTop: scaledSize(15),
  },
  sideTextMainView: {
    flex: 1,
    flexDirection: "row",
    marginBottom: scaledSize(5),
  },
  sideTextSubView: {
    flex: 0.5,
  },
  description: {
    marginTop: scaledSize(5),
    color: COLORS.infoGray,
    fontSize: scaledSize(10),
  },
  checkBox: {
    borderWidth: 0,
    backgroundColor: COLORS.white,
    padding: 0,
    margin: 0,
  },
  input: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
    marginTop: scaledSize(12),
  },
  sideText: {
    color: COLORS.infoGray,
    fontWeight: "600",
    marginTop: 10,
    fontSize: scaledSize(12),
  },
  leftText: {
    marginTop: 10,
    fontSize: scaledSize(12),
    color: COLORS.black,
    fontWeight: "bold",
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaledSize(14),
  },
  injuredCheckBoxView: {
    flexDirection: "row",
    width: "40%",
  },
  subContainer: {
    flexDirection: "row",
    marginTop: scaledSize(10),
  },
  subViewContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnView: {
    alignItems: "center",
    marginTop: scaledSize(50),
    marginBottom: scaledSize(30),
  },
});
// Customizable Area End
