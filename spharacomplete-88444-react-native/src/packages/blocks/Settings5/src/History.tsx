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
  ScrollView,
} from "react-native";

import { COLORS } from "framework/src/Globals";
import * as IMAGE from "./assets";
import AntDesign from "react-native-vector-icons/AntDesign";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../../components/src/Loader";
// Customizable Area End

import HistoryController, { 
  Props, 
  configJSON 
} from "./HistoryController";

export default class History extends HistoryController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  
  // Customizable Area Start

  renderItem = (item: any , date: string) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={styles.timeView}>
            <Text style={styles.idText}>{item.responded_at}</Text>
          </View>
          <View style={styles.labelView}>
            <View style={{flex:1}}>
              <Text testID={"incidentNoText"} style={styles.idText}>Incident {item.incident_id}</Text>
              <Text style={styles.statusText}>{item.status_report}</Text>
            </View>
            <TouchableOpacity
              testID="historyItem"
              onPress={() => this.onHistoryPress(item, date)}
            >
              <Image source={IMAGE.right_arrow} style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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
                testID="goBackBtn"
                style={styles.backBtn}
                onPress={() => this.props.navigation.goBack()}
              >
                <AntDesign
                  name="arrowleft"
                  color={COLORS.black}
                  size={scaledSize(20)}
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>{configJSON.alertHistory}</Text>
            </View>
            <View style={{flex:1}}>
            <Loader loading={this.state.isLoading} />
            {
              this.state.historyData.length > 0 || this.state.isLoading?
              <ScrollView 
              style={styles.scrollViewStyle}
              contentContainerStyle={{paddingBottom: scaledSize(50)}}
            >
              {
                this.state.historyData.map((dayData: any) => {
                  return (
                    <View>
                      <Text style={styles.dateText}>{dayData.date_category.date_category}</Text>
                      {
                        dayData.data.map((item:any)=>{
                          return this.renderItem(item, dayData.date_category.date_category)
                        })
                      }
                    </View>
                  )
                })
              }
            </ScrollView>
            :
            <View style={styles.notFoundView}>
              <Text testID={"noDataFoundText"} style={styles.notFoundText}>{configJSON.notFound}</Text>
            </View>
            }
           
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
  bgMobileInput: {
    flex: 1,
  },
  subContainer: {
    height: deviceHeight,
    width: deviceWidth,
    flex: 1,
  },
  dateText: {
    color: COLORS.infoGray,
    fontWeight: "600",
    marginTop: scaledSize(10),
    marginBottom: scaledSize(5)
  },
  idText: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: scaledSize(14),
  },
  statusText: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: scaledSize(12),
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
  scrollViewStyle:{
    padding: scaledSize(25)
  },
  notFoundView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  notFoundText:{
    color: COLORS.white,
    fontWeight: "500",
    fontSize: scaledSize(13),
  },
  timeView:{
    width: scaledSize(70)
  },
  labelView:{
    flex:1, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent:'flex-start' 
  }
  // Customizable Area End
});