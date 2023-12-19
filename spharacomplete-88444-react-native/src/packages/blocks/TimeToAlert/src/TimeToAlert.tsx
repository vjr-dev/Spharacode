// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    Modal
   
} from "react-native";

import TimeToAlertController, { Props, configJSON } from "./TimeToAlertController";
import { back1, back2} from "./assets";
import { RFValue } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../../framework/src/Globals";
import LinearGradient from 'react-native-linear-gradient';
import { Countdown } from 'react-native-element-timer'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import ScrollPicker from 'react-native-wheel-scroll-picker';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import moment from "moment";
import { scaledSize } from "framework/src/Utilities";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Donation extends TimeToAlertController {
    constructor(props: Props) {
        super(props);
        this.callRefInput = React.createRef();
    }

    
  
    updateSelectedItem(index: any) {
        this.setState({ selectedItemIndex: index });
    }

  renderScrollPicker = (text, dataSource, testID) => {
    return (
      <View
        style={styles.scrollPickerMainView}
      >
        <View style={styles.scrollPickerSubView}>
          <ScrollPicker
            testID={testID}
            dataSource={dataSource}
            selectedIndex={-1}
            // key={this.state.Key}
            renderItem={(data: any, index: any, isSelected: any) => {}}
            onValueChange={(data: any, selectedIndex: any) => {
              if (text == "hours") {
                this.setState({ Hours: data });
              } else if (text == "min") {
                this.setState({ Miniut: data });
              } else if (text == "sec") {
                this.setState({ Secound: data });
              }
            }}
            wrapperHeight={scaledSize(90)}
            // wrapperWidth={scaledSize(50)}
            wrapperBackground={"transparent"}
            itemHeight={scaledSize(30)}
            highlightColor={"transparent"}
            itemTextStyle={styles.itemTextStyle}
            activeItemTextStyle={styles.activeItemTextStyle}
          />
        </View>
        <Text
          style={styles.timerText}
        >
          {text}
        </Text>
      </View>
    );
  };
    render() {
        

        return (
            <SafeAreaView style={styles.container1}>
                {/* <ScrollView> */}
                <View style={styles.child}>
                    <ImageBackground
                        source={back1}
                        style={styles.image}>
                        <ImageBackground
                            source={back2}
                            style={styles.image2}>
                            <StatusBar backgroundColor={"#f17234"} barStyle="default" />


                            {/* heder */}
              <View style={{ backgroundColor: COLORS.darkorange, height: hp("7%"), width: windowWidth,  alignItems: "center", flexDirection:'row' }}>
                <TouchableOpacity
                    testID="goBackBtn"
                    style={styles.backBtn}
                    onPress={()=>  this.props.navigation.goBack()}
                >
                  <AntDesign
                    name="arrowleft"
                    color={COLORS.black}
                    size={scaledSize(20)}
                  />
                </TouchableOpacity>
                  <Text style={{ fontSize: scaledSize(16), color: COLORS.backgroundGray, fontWeight: "700" ,textAlign:'center',width:"80%"}}>Set Timer</Text>
                                <View style={{ height: "100%", width: "15%" }} />
                            </View>


                            {this.state.TimerStaus == 0 ?
                                 <View
                                 style={styles.subContainer}
                               >
                                 {this.renderScrollPicker(configJSON.hours, this.state.hoursArray, "hourArrBtn")}
                                 {this.renderScrollPicker(configJSON.min, this.state.miniutArray, "minArrBtn")}
                                 {this.renderScrollPicker(configJSON.sec, this.state.secondArray, "secArrBtn")}
                               </View>: 
                                <View style={{ height: "20%", alignItems: "center", marginTop: 50, marginBottom: 20 }}>
                                    <CountdownCircleTimer
                                        testID = "circleTimerBtn"
                                        isPlaying={this.state.TimeRunning}
                                        duration={this.state.Totalsec}
                                        rotation={"clockwise"}
                                        colors={['#f07434', '#e99e67']}
                                        colorsTime={[17, 0]}
                                        // colors={"rgba(255,138,73,1)"}
                                        // colorsTime={[7, 5, 2, 0]}
                                        onComplete={() => this.onComplete()}
                                        strokeWidth={5}
                                    >
                                        {({ remainingTime }) =>
                                            <LinearGradient
                                                colors={['#f89345', '#f07434']}
                                                style={{
                                                    height: "90%",
                                                    width: "90%",
                                                    // backgroundColor: "rgba(255,138,73,1)",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: 200
                                                }}>
                                                {remainingTime > 3600 ?
                                                    <Text style={{ fontSize: 36, color: "#fff", fontWeight: "bold", }}>{this.children1(remainingTime)}</Text> :
                                                    <Text style={{ fontSize: 40, color: "#fff", fontWeight: "bold", }}>{this.children(remainingTime)}</Text>}
                                                {/* <Text style={{ fontSize: 40, color: "#fff", fontWeight: "bold", marginTop: "10%" }}>{this.children1(remainingTime)}</Text> */}
                                                <Text style={{ marginTop: 3 }}>{moment(new Date()).format('LT')}</Text>
                                            </LinearGradient>}
                                    </CountdownCircleTimer>
                                </View>}

                            <View style={{ height: RFValue(100), marginTop: 30, width: windowWidth, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <TouchableOpacity
                                    testID="cancleBtn"
                                    disabled={this.state.TimeRunning || this.state.TimerStaus == 1 ? false : true}
                                    onPress={() => this.setState({ cancelButton: true, TimeRunning: false })}
                                    style={{
                                        height: RFValue(75),
                                        // backgroundColor: COLORS.white,
                                        width: RFValue(75),
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 100,
                                        borderColor: COLORS.darkGray,
                                        borderWidth: 1,
                                        marginLeft: RFValue(15)
                                    }}>
                                    <View style={{ height: RFValue(70), backgroundColor: COLORS.darkGray, width: RFValue(70), alignItems: "center", justifyContent: "center", borderRadius: 50, }}>
                                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                                {!this.state.TimeRunning ? <TouchableOpacity
                                    testID="startClickBtn"
                                    onPress={() => this.startclick()}
                                    style={{
                                        height: RFValue(75),
                                        width: RFValue(75),
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 100,
                                        borderColor: "#546b5a",
                                        borderWidth: 2,
                                        marginRight: RFValue(15)
                                    }}>
                                    <View style={{ height: RFValue(67), backgroundColor: "#546b5a", width: RFValue(67), alignItems: "center", justifyContent: "center", borderRadius: 50, }}>
                                        <Text style={{ color: "#7cc47a", fontWeight: "bold" }}>Start</Text>
                                    </View>
                                </TouchableOpacity> : <TouchableOpacity
                                    testID="pauseBtn"
                                    onPress={() => this.setState({ TimeRunning: !this.state.TimeRunning })}

                                    style={{
                                        height: RFValue(75),
                                        // backgroundColor: COLORS.white,
                                        width: RFValue(75),
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 100,
                                        borderColor: "#6d4b3f",
                                        borderWidth: 2,
                                        marginRight: RFValue(15)
                                    }}>
                                    <View style={{ height: RFValue(67), backgroundColor: "#6d4b3f", width: RFValue(67), alignItems: "center", justifyContent: "center", borderRadius: 50, }}>
                                        <Text style={{ color: "#d06e4a", fontWeight: "bold" }}>Pause</Text>
                                    </View>
                                </TouchableOpacity>}


                            </View>

                            <View style={{ width: windowWidth - RFValue(50), justifyContent: "center", alignItems: 'center', marginTop: RFValue(80) }}>
                                <Text style={{ fontSize: scaledSize(20), textAlign: "center", color: COLORS.ultralightwhite }}>{this.state.userData?.data?.attributes?.first_name} {this.state.userData?.data?.attributes?.last_name}</Text>
                                <Text style={{ fontSize: scaledSize(20), alignSelf: "center", textAlign: "center", color: COLORS.ultralightwhite }}>When timer ends you get the notification to confirm your safe arrival if you don't confirm the same within 60 sec. alert will trigger automatically ...</Text>
                                
                            </View>
                            <Modal
                                visible={this.state.Modal1}
                                // visible={true}
                                transparent={true}>
                                <View style={{ height: windowHeight, width: windowWidth, alignItems: "center", justifyContent: "center", }}>
                                    <View
                                        style={{ width: windowWidth - RFValue(40), alignSelf: "center", justifyContent: "center", alignItems: "center", backgroundColor: "#9ed680", borderRadius: 2 }} >
                                        <Text style={{ textAlign: "center", fontSize: RFValue(16), paddingTop: 35, color: COLORS.black, paddingHorizontal: 50 }}>The timer which you have set has expired, please confirm you reached your location.</Text>
                                        <Text style={{ textAlign: "center", fontSize: RFValue(16), paddingTop: 20, color: COLORS.black, paddingHorizontal: 50 }}>If you have not confirmed within 60 secs, Sphara will send out a notification to your emergency contacts as an emergency alert.</Text>
                                        <Countdown
                                        testID = "countdownBtn"
                                        initialSeconds={59}
                                        ref={this.callRefInput}
                                
                            
                                      autoStart={true}
                                      onTimes={(e) => {
                                        console.log(e);
                                      }}
                                      onEnd={() => this.initPanicAlarm()}
                                    />
                                        <View style={{ height: 40, marginTop: 20, marginBottom: 10, justifyContent: "center", width: "100%", flexDirection: "row" }}>
                                            <TouchableOpacity 
                                            testID="pressyesBtn"
                                            style={{ justifyContent: "center" }} 
                                            onPress={() => this.pressYes()}>
                                                <Text style={{ fontSize: 17, paddingHorizontal: 25 }}>YES</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                testID="pressNoBtn"
                                                style={{ justifyContent: "center" }}
                                                onPress={() => this.initPanicAlarm()}
                                            >
                                                <Text style={{ fontSize: 17, paddingHorizontal: 25 }}>NO</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Modal
                                visible={this.state.cancelButton}
                                // visible={true}
                                transparent={true}>
                                <View style={{ height: windowHeight, width: windowWidth, alignItems: "center", justifyContent: "center" }}>
                                    <View
                                        style={{ width: windowWidth - RFValue(80), backgroundColor: "white" }} >
                                        <Text style={{ fontSize: RFValue(15), padding: 18, color: COLORS.black }}>Do you really want to cancel the Timer?</Text>

                                        <View style={{ width: "100%", borderWidth: 0.5, backgroundColor: COLORS.lightGray }}></View>
                                        <View style={{ flexDirection: "row", marginVertical: 3, justifyContent: "flex-end" }}>
                                            <TouchableOpacity
                                             testID="NoBtn"
                                             onPress={() => this.setState({ TimeRunning: true, cancelButton: false })}>
                                                <Text style={{ fontSize: RFValue(14), paddingVertical: 7, paddingRight: 35 }}>NO</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                testID="cancleCallBtn"
                                                onPress={() => this.Cancelcall()}
                                            >
                                                <Text style={{ fontSize: RFValue(14), paddingVertical: 7, paddingRight: 25 }}>YES</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </ImageBackground>
                    </ImageBackground>
                </View>
                {/* </ScrollView> */}
            </SafeAreaView >

           
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight, width: windowWidth,
        backgroundColor: COLORS.white
    },
    container1: { flex: 1, backgroundColor: COLORS.darkorange },
    child: { width: windowWidth, },

    image: {
        height: windowHeight, width: windowWidth,
    },
    image2: {
        height: '100%', width: windowWidth, alignItems: "center",
    },
  backBtn: {
    marginLeft:scaledSize(15)
  },
  scrollPickerMainView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollPickerSubView: {
    height: RFValue(90), 
    width: "10%",
  },
  itemTextStyle: {
    color: COLORS.ultralightwhite,
    fontSize: scaledSize(18),
  },
  activeItemTextStyle:{
    color: "white", 
    fontSize: scaledSize(25)
  },
  timerText:{
    fontSize: RFValue(18),
    color: "#fff",
    fontWeight: "bold",
    marginLeft: scaledSize(15),
    marginRight: scaledSize(10),
  },
  subContainer: {
    height: "20%",
    width: windowWidth - 20,
    alignItems: "center",
    marginTop: scaledSize(25),
    marginBottom: scaledSize(20),
    flexDirection: "row",
    justifyContent: "center",
  }
});
// Customizable Area End
