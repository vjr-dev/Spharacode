// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Modal,

} from "react-native";

import FirstResponderSetWorkingHoursController from "./FirstResponderSetWorkingHoursController";
import { COLORS } from "framework/src/Globals";
import * as IMAGE from "./assets";
import AntDesign from "react-native-vector-icons/AntDesign";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
export default class FirstResponderSetWorkingHours extends FirstResponderSetWorkingHoursController {

  

  renderItemInsideModal = (item,index) => {

    return (
      
      <TouchableOpacity onPress={() => this.toggleEnterTimeItemSelection(item,index)} key={index} testID="toggleItemInsideModal">
      <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: item.selectedIn ? '#fed8a0':'#eeeeee'  , alignItems: 'center', justifyContent: 'center' }}>
        <Text>{item.day.charAt(0)}</Text>
      </View>
      </TouchableOpacity>

    )


  }

  renderItemInsideModalOut = (item,index) => {
  

       return (
         
         <TouchableOpacity onPress={() => this.toggleEnterTimeItemSelection(item,index)} key={index}  testID="toggleItemOutsideModal">
         <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: item.selectedOut ? '#fed8a0':'#eeeeee'  , alignItems: 'center', justifyContent: 'center' }}>
           <Text>{item.day.charAt(0)}</Text>
         </View>
         </TouchableOpacity>
   
       )
   
   
     }
     // visible={this.state.modalVisibleFrom}
      //on button close this.clickOnCancel("inTimeModal")
      //on thirdbox renderItemInsideModal
     renderCommonModal = (whenTime) => {
     // console.log("renderCommonModal",this.state.currentIndexFrom,this.state.currentIndexTo)
      return (
        <Modal
        animationType="slide"
        visible={this.state.modalVisibleFrom || this.state.modalVisibleTo}
        transparent={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.box1}>

              <View>
                <Text style={styles.dayModalText}>{this.state.modalVisibleFrom ? this.state.selectedDayIn : this.state.selectedDayOut}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  testID="hourClock"
                  onPress={() => this.toggleClockDesign("hour")}>
                  <Text style={styles.hourModalText}>{this.state.hourTime}</Text>
                </TouchableOpacity>
                <Text style={styles.colonModalText}>:</Text>
                <TouchableOpacity 
                testID="miuteClock"
                onPress={() => this.toggleClockDesign("minute")}>
                  <Text style={styles.minuteModalText}>{this.state.minuteTime === 0 ? "00": this.state.minuteTime}</Text>
                </TouchableOpacity>
                <View style={{ paddingLeft: 5, justifyContent: 'center' }}>
                  <Text 
                  testID="timeModeAM"
                  style={this.state.timeMode === 'AM' ? styles.ampmActive : styles.ampm} 
                  onPress={() => this.handleTimeMode('AM')}>AM</Text>
                  <Text
                  testID="timeModePM" 
                  style={this.state.timeMode === 'PM' ? styles.ampmActive : styles.ampm} 
                  onPress={() => this.handleTimeMode('PM')}>PM</Text>
                </View>
              </View>

            </View>
            <View style={styles.box2}>
              {this.state.toggleClockHHMM ?
                this.HourClockDesign() : this.minuteClockDesign()

              }

            </View>
            <View style={styles.box3}>

            <View style={{ paddingLeft: 12,marginBottom: scaledSize(20) }}>
                <View>
                  <Text style={{ color: '#626262', fontSize: 18, fontWeight: 'bold' }}>Additional Options</Text>
                </View>
                <View>
                  <Text style={{ color: '#929292' }}>Copy Start time to the following days: </Text>
                </View>

              </View>
              <View style={{ width:'100%', height: 'auto' ,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                {
                  this.state.weekData?.map((item,index) => {
                  return  this.state.modalVisibleFrom ? this.renderItemInsideModal(item,index) : this.renderItemInsideModalOut(item,index)

                  } )
                }
                
                {/* <FlatList
                  data={this.state.weekData}
                  keyExtractor={(item) => item.id}
                  renderItem={this.state.modalVisibleFrom ? this.renderItemInsideModal : this.renderItemInsideModalOut}
                  horizontal
                  contentContainerStyle={{alignItems:'center',justifyContent:'space-around'}}
                /> */}


              </View>
            </View>
            <View style={styles.box4}>

              <TouchableOpacity
                testID="modalCancel"
                style={[styles.button, styles.buttonClose]}
                onPress={() =>  this.state.modalVisibleFrom ? this.clickOnCancel("inTimeModal") : this.clickOnCancel("outTimeModal")}>
                <Text style={styles.textStyle}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="modalSave"
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.clickOnSaveModal()}>
                <Text style={styles.textStyle}>SAVE</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      )
     }


  renderItem = ({item,index}) => {
  
    
   let itemClickFrom = (dayItem,index,time) => {
     if(time== 'inTime') {
       
       this.toggleModalFrom(dayItem,index)
       this.setState({hourTime: '12',hourDegree:0,minuteTime:'00',minuteDegree:0,timeMode:""})
     }
     else {
      this.toggleModalTo(dayItem, index)
      this.setState({hourTime: '12',hourDegree:0,minuteTime:'00',minuteDegree:0,timeMode:""})
     }
    };
   let itemRemoveFrom = (item,index,time) => {
    
        this.toggleDaySelection(item,index,time)
        this.saveButtonDisabled()
    }


    return (
      <View>
        <View style={styles.mainView}>
          <Text style={styles.daysText}>{item?.day}</Text>
          <View style={styles.subView}>
            {
                item?.inTime.length > 0 ?


          (    
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{color: COLORS.skipGray,marginRight:5}}>{item?.inTime}</Text>
            <AntDesign
                   testID="timeFromCancel"
                   name="closecircleo"
                   color={COLORS.skipGray}
                   size={scaledSize(20)}
                   onPress={() => itemRemoveFrom(item, index,"inTime")}
                 />
                 </View>
                  )
                  :

                (<AntDesign
                  testID="timeFromAdd"
                  name="pluscircleo"
                  color={COLORS.skipGray}
                  size={scaledSize(20)}
                  onPress={() => itemClickFrom(item,index,"inTime")}
                />)

              
                
              }
                 <Text style={styles.toText}>to</Text>

              {
                item?.outTime.length > 0 ?

                (    
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color: COLORS.skipGray,marginRight:5}}>{item?.outTime}</Text>
                  <AntDesign
                         testID="timeToCancel"
                         name="closecircleo"
                         color={COLORS.skipGray}
                         size={scaledSize(20)}
                         onPress={() => itemRemoveFrom(item, index,"outTime")}
                       />
                       </View>
                        )
                        :
      
                      (<AntDesign
                        testID="timeToAdd"
                        name="pluscircleo"
                        color={COLORS.skipGray}
                        size={scaledSize(20)}
                        onPress={() => itemClickFrom(item,index,"outTime")}
                      />)


              }




         
         
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    );
  };

  HourClockDesign = () => {
    const squareSize = 100;
    const anchorPointX = 0;
    const anchorPointY = 0;
    return (
      <View style={styles.clock}>


        <View style={[styles.secHand,
        {
          transform: [
            { translateX: anchorPointX - 1 },
            { translateY: anchorPointY - squareSize / 2 },
            { rotateZ: `${this.state.hourDegree}deg` },
            { translateX: (anchorPointX - 1) },
            { translateY: (anchorPointY - squareSize / 2) },
          ],
        },
        ]} />





        <TouchableOpacity testID="htwelve" style={[styles.twelve, this.state.hourTime === '12' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('12')}>
          <Text>12</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="hone" style={[styles.one, this.state.hourTime === '01' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('01')}>
          <Text>1</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="htwo" style={[styles.two, this.state.hourTime === '02' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('02')}>
          <Text>2</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="hthree" style={[styles.three, this.state.hourTime === '03' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('03')}>
          <Text>3</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="hfour" style={[styles.four, this.state.hourTime === '04' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('04')}>
          <Text >4</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="hfive" style={[styles.five, this.state.hourTime === '05' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('05')}>
          <Text >5</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="hsix" style={[styles.six, this.state.hourTime === '06' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('06')}>
          <Text>6</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="hseven" style={[styles.seven, this.state.hourTime === '07' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('07')}>
          <Text>7</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="height" style={[styles.eight, this.state.hourTime === '08' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('08')}>
          <Text>8</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="hnine" style={[styles.nine, this.state.hourTime === '09' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('09')}>
          <Text >9</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="hten" style={[styles.ten, this.state.hourTime === '10' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('10')}>
          <Text>10</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="heleven" style={[styles.eleven, this.state.hourTime === '11' ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleHourPress('11')}>
          <Text>11</Text>
        </TouchableOpacity>

        <View style={styles.centerDot} />
      </View>
    )
  }

  minuteClockDesign = () => {
    const squareSize = 100;
    const anchorPointX = 0;
    const anchorPointY = 0;

    return (
      <View style={styles.clock}>


        <View style={[styles.secHand,
        {
          transform: [
            { translateX: anchorPointX - 1 },
            { translateY: anchorPointY - squareSize / 2 },
            { rotateZ: `${this.state.minuteDegree}deg` },
            { translateX: (anchorPointX - 1) },
            { translateY: (anchorPointY - squareSize / 2) },
          ],
        },
        ]} />





        <TouchableOpacity testID="mzero" style={[styles.twelve, this.state.minuteDegree === 0 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress("00")}>
          <Text>00</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mfive" style={[styles.one, this.state.minuteDegree === 30 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('05')}>
          <Text>05</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mten" style={[styles.two, this.state.minuteDegree === 60 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('10')}>
          <Text>10</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mfiftin" style={[styles.three, this.state.minuteDegree === 90 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('15')}>
          <Text>15</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mtwenty" style={[styles.four, this.state.minuteDegree === 120 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('20')}>
          <Text >20</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mtwentyfive" style={[styles.five, this.state.minuteDegree === 150 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('25')}>
          <Text >25</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mthirty" style={[styles.six, this.state.minuteDegree === 180 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('30')}>
          <Text>30</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mthirtyfive" style={[styles.seven, this.state.minuteDegree === 210 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('35')}>
          <Text>35</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mfourty" style={[styles.eight, this.state.minuteDegree === 240 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('40')}>
          <Text>40</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mfourtyfive" style={[styles.nine, this.state.minuteDegree === 270 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('45')}>
          <Text >45</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mfifty" style={[styles.ten, this.state.minuteDegree === 300 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('50')}>
          <Text>50</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="mfiftyfive" style={[styles.eleven, this.state.minuteDegree === 330 ? styles.secHandCircle : styles.secHandCircleNone]} onPress={() => this.handleMinutePress('55')}>
          <Text>55</Text>
        </TouchableOpacity>




        <View style={styles.centerDot} />
      </View>
    )

  }


  render() {

    return (

      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
        bounces={false}
      >
        <TouchableWithoutFeedback
        testID="touchableWithoutFeedback"
          onPress={() => {
            this.hideKeyboard();
          }}
        >

          <ImageBackground source={IMAGE.back1} style={styles.subContainer}>
            <ImageBackground source={IMAGE.back2} style={styles.subContainer}>
              <SafeAreaView>
              {
                this.renderCommonModal()
              }
                
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>

                 <AntDesign
                    testID="gobackBtn"
                    name="left"
                    style={styles.backBtn}
                    color={COLORS.darkorange}
                    size={scaledSize(15)}
                    onPress={() => this.goBack()}
                  />
                  <TouchableOpacity 
                  testID="postweekdata" 
                  onPress={() => this.sendWeekDatatoAPI()}
                  disabled={this.state.btnDisabled ? true : false}
                  >
                  <Text style={{marginRight:20,fontSize:16,color: this.state.btnDisabled ? COLORS.darkGray :COLORS.darkorange}}>SAVE</Text>
                  </TouchableOpacity>

                </View>
                <Text style={styles.headerText}>Set Working Hours</Text>
                <FlatList
                  data={this.state.weekData}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.id}
                  testID="mainFlatlist"
                />
              </SafeAreaView>
            </ImageBackground>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    height: deviceHeight,
    width: deviceWidth,
  },
  backBtn: {
    margin: scaledSize(15),
  },
  headerText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: scaledSize(15),
    marginTop: scaledSize(20),
    marginBottom: scaledSize(50),
    marginLeft: scaledSize(15),
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaledSize(15),
    paddingVertical: scaledSize(20),
    backgroundColor: COLORS.backgroundGray,
  },
  daysText: {
    color: COLORS.white,
  },
  subView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center"
  },
  toText: {
    paddingHorizontal: scaledSize(10),
    color: COLORS.skipGray,
  },
  divider: {
    borderBottomColor: COLORS.skipGray,
    borderBottomWidth: 1,
    marginHorizontal: scaledSize(10),
  },
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  modalView: {

    width: deviceWidth*0.9,
    height: deviceWidth*1.5,

    backgroundColor: "gray"
  },

  dayModalText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: "#e78f54"
  },
  hourModalText: {
    fontSize: 32,
    fontWeight: '400',
    color: "#5f5544"
  },
  colonModalText: {
    fontSize: 32,
    fontWeight: '600',
    color: "#5f5544"

  },
  minuteModalText: {
    fontSize: 32,
    fontWeight: '400',
    color: "#5f5544"
  },
  ampm: {
    fontSize: 12,
    color: '#eec993',
    fontWeight: 'bold'
  },
  ampmActive: {
    fontSize: 12,
    color: 'black',
  },
  box1: {
    //flex: 1.5, // 10% space
    backgroundColor: '#ffd89e',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 10,
  },
  box2: {
    flex: 1, // 50% space
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  box3: {
    paddingTop: scaledSize(20),
    paddingBottom: scaledSize(30),
   // flex: 3, // 35% space
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderColor: "#e1e2e2",
    justifyContent: 'space-around'
  },
  box4: {
    paddingVertical: scaledSize(20),
   // flex: 1, // 5% space
    backgroundColor: '#fff',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "#e1e2e2"
  },
  textStyle: {
    fontWeight: "bold",
    color: "#717171"
  },
  clock: {
    width: scaledSize(230),
    height: scaledSize(230),
    borderRadius: 150,
    position: 'absolute',
    top: '55%',
    left: '55%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    fontSize: 24,
    color: '#444',
    textAlign: 'center',
    backgroundColor: "#eeeeee"
  },

  // hourHand: {
  //   position: 'absolute',
  //   width: 6,
  //   height: 60,
  //   backgroundColor: '#222',
  //   top: '30%',
  //   left: '49%',
  //   transform: [{ translateY: -30 }], // Adjust translateY to the half of the height (30)
  // },
  // minHand: {
  //   position: 'absolute',
  //   width: 4,
  //   height: 80,
  //   backgroundColor: '#444',
  //   top: '22.5%',
  //   left: '49%',
  //   transform: [{ translateY: -40 }], // Adjust translateY to the half of the height (40)
  // },
  // secHandContainer: {
  //   position: 'absolute',
  //   top: '10.5%',
  //   left: '48.8%',
  //   transform: [{ translateY: -50 }],
  //   backgroundColor: "yellow",
  //   flexDirection: "column-reverse",
  //   width: 7,
  // },
  secHand: {
    position: 'absolute',
    width: 3,
    height: 100,
    backgroundColor: '#fed8a0',
    top: '50.5%',
    left: '51%',
    transform: [{ translateY: -30 }], // Adjust translateY to the half of the height (59)
  },
  secHandCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fed8a0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },

  secHandCircleNone: {
    width: 30,
    height: 30,
    borderRadius: 15,

    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  twelve: {
    position: 'absolute',
    //fontFamily: 'Source Sans Pro',
    fontWeight: '700',

    top: 10,
    left: '46%',

  },
  one: {
    position: 'absolute',
    //fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    top: '10%',
    right: '26%',
  },
  eleven: {
    position: 'absolute',
    // fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    top: '10%',
    left: '26%',
  },
  two: {
    position: 'absolute',
    // fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    top: '25%',
    right: '10%',
  },
  three: {
    position: 'absolute',
    //fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    right: '5%',
    top: '46%',
  },
  four: {
    position: 'absolute',
    //fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    right: 30,
    top: '67%',
  },
  five: {
    position: 'absolute',
    //fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    right: 65,
    top: '81%',
  },
  six: {
    position: 'absolute',
    //fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    bottom: 5,
    left: '45%',
  },
  seven: {
    position: 'absolute',
    // fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    left: 70,
    top: '82%',
  },
  eight: {
    position: 'absolute',
    // fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    left: 30,
    top: '67%',
  },
  nine: {
    position: 'absolute',
    // fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    left: 10,
    top: '46%',
  },
  ten: {
    position: 'absolute',
    //  fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    top: '25%',
    left: '10%',
  },
  centerDot: {
    backgroundColor: '#da9e6f',
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7, // Half of the width/height for a circular shape
    top: '50%', // Centered vertically
    left: '50.5%', // Centered horizontally
    transform: [{ translateX: -6 }, { translateY: -6 }], // Centered properly
    zIndex: 2,
    borderColor: "#fff",
    borderWidth: 2,

    //border: '2px solid #fff', // React Native doesn't support 'px' units
  },
});
// Customizable Area End
