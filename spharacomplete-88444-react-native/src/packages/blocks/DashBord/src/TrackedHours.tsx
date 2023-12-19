import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
// Customizable Area End

import TrackedHoursController, {
  Props,
  configJSON,
} from "./TrackedHoursController";

// Customizable Area Start
import { COLORS } from "framework/src/Globals";
import { deviceHeight, scaledSize } from "../../../framework/src/Utilities";
import { calender, clock } from "./assets";
import Loader from "../../../components/src/Loader";

export const mapRef: any = React.createRef();
// Customizable Area End

export default class TrackedHours extends TrackedHoursController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  displayWorkedTime = (icon: any, lable: string, time: string) => {
    return (
      <View style={styles.displayWorkedTimeBody}>
        <View style={styles.flatListSubView}>
          <Image
            source={icon}
            style={styles.iconStyle}
            //@ts-ignore
            tintColor={COLORS.darkorange}
          />
          <View style={styles.workedHourView}>
            <Text style={styles.workedHourText}>{configJSON.worked}</Text>
            <Text>{lable}</Text>
          </View>
        </View>

        <Text style={styles.hrText}>{time}hr.</Text>
      </View>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#f07135"
          barStyle={"light-content"}
          showHideTransition={"slide"}
        />
        <Loader loading={this.state.isLoading} />
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Dashboard</Text>
        </View>
        <View style={styles.subHeaderView}>
          {this.state.userProfile ? (
            <Image
              style={styles.imageCircle}
              source={{
                uri: this.state.userProfile,
              }}
            />
          ) : (
            <View style={styles.imageCircle} />
          )}
          <Text style={styles.subHeaderText}>{this.state.userName}</Text>
        </View>
        <ScrollView style={styles.mainView}>
          {this.displayWorkedTime(
            clock,
            "Today",
            this.state.houresDetails.Daily_hours
          )}
          {this.displayWorkedTime(
            calender,
            "Week",
            this.state.houresDetails.Weekly_hours
          )}
          {this.displayWorkedTime(
            calender,
            "Month",
            this.state.houresDetails.Monthly_hours
          )}
          <View style={styles.statusUpdateView}>
            <Text style={styles.status}>Status update</Text>
            <Text>
              {this.state.houresDetails.Current_Time} status : At{" "}
              {this.state.houresDetails.Status}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f07135",
  },
  mainView: {
    backgroundColor: "white",
    height: deviceHeight,
  },
  headerView: {
    height: scaledSize(50),
    backgroundColor: COLORS.darkorange,
    justifyContent: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: scaledSize(16),
  },
  subHeaderView: {
    backgroundColor: COLORS.backgroundGray,
    flexDirection: "row",
    height: scaledSize(40),
    alignItems: "center",
    paddingHorizontal: scaledSize(15),
  },
  imageCircle: {
    height: scaledSize(30),
    width: scaledSize(30),
    borderRadius: scaledSize(15),
    backgroundColor: COLORS.white,
  },
  subHeaderText: {
    color: COLORS.white,
    fontSize: scaledSize(14),
    marginLeft: scaledSize(10),
  },
  statusUpdateView: {
    backgroundColor: "#f6e9d6",
    marginHorizontal: scaledSize(15),
    borderRadius: scaledSize(10),
    paddingHorizontal: scaledSize(10),
    paddingVertical: scaledSize(5),
    marginTop: scaledSize(20),
  },
  status: {
    fontWeight: "bold",
  },
  displayWorkedTimeBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scaledSize(15),
    paddingVertical: scaledSize(20),
  },
  flatListSubView: {
    flexDirection: "row",
  },
  workedHourView: {
    marginLeft: scaledSize(10),
  },
  workedHourText: {
    fontSize: scaledSize(11),
  },
  hrText: {
    fontSize: scaledSize(16),
  },
  iconStyle: {
    height: scaledSize(40),
    width: scaledSize(40),
  },
});
// Customizable Area End
