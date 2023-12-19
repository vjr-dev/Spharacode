//@ts-ignore
//@ts-nocheck
// Customizable Area Start

import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Modal,
  Dimensions,

} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CfCustomAlerts2Controller, {
  Props
} from "./CfCustomAlerts2Controller";
import { Styles } from "./CustomAlertStyle";
import * as IMAGE from './assets'
import { COLORS } from "../../../framework/src/Globals";
import { RFValue } from "react-native-responsive-fontsize";
import {Countdown} from 'react-native-element-timer'
import posed from 'react-native-pose';

import LinearGradient from "react-native-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// Customizable Area End

export default class CfCustomAlerts2 extends CfCustomAlerts2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.callRefInput = React.createRef();
    // Customizable Area End

  }


  // Customizable Area Start
  async componentDidMount() {
    let delaySecond= await AsyncStorage.getItem("ShakeEventValue");
    if(delaySecond){
      this.setState({initialSeconds:delaySecond});
    }
    let Token: any = await AsyncStorage.getItem("Token");
    this.setState({ Token: Token })
    this.GetProfile()
    this.getCurrentLocation();
  }

  async UNSAFE_componentWillMount(): Promise<void> {
    this.getCurrentLocation();
  }

  pressYes() {
    this.callRefInput?.current?.pause()
    this.props.navigation.pop()
  }
  cancelPress() {
    Alert.alert(
      "Do you really want to cancel the panic alert?",
      "",
      [
        {
          text: "NO",
          testID: 'No',
          onPress: () => this.callRefInput.current.resume(),
          style: "default"
        },
        {
          testID: 'Yes',
          text: "YES", onPress: () => this.pressYes()
        }
      ]
    );
    this.callRefInput?.current?.pause()
  }

  Box = posed.View({
    exit: {
      x: ({ delta }: any) => delta * 100 + 'vw',
      transition: { duration: 3000 }
    },
    preEnter: { x: ({ delta }: any) => -delta * 100 + 'vw' },
    enter: { rotate: '45deg', x: 0, transition: { duration: 3000 } }
  });
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ImageBackground source={IMAGE.back1} style={Styles.container}>
        <ImageBackground source={IMAGE.back2} style={Styles.container}>
          <SafeAreaView>
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={Styles.main_txt}>
                {/* <Text style={Styles.txt_1}>{this?.state?.UserProfile?.first_name}</Text> */}
                <Text style={Styles.txt_1}>you are about to call emergency</Text>
                <Text style={Styles.txt_1}>The call will start automatically in....</Text>
              </View>
              <View style={styles.container}>
                <View style={styles.circlesContainer}>
                  <TouchableOpacity style={styles.circle_1} />
                  <TouchableOpacity style={styles.circle_2} />

                  <LinearGradient
                    colors={['#f89345', '#f07434']}
                    style={styles.circle_3} >
                    <Countdown
                      testID={"countdown"}
                      initialSeconds={this.state.initialSeconds}
                      ref={this.callRefInput}
                      style={Styles.countdown_main}
                      textStyle={Styles.txt_timer}
                      autoStart={true}
                      onEnd={() => this._onCountDownFinish()}
                    />
                  </LinearGradient>
                </View>
              </View>

              <Text testID="text_cancel" onPress={() => { this.cancelPress() }}
                style={Styles.txt_cancel}>CANCEL
              </Text>
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
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground >
      // Customizable Area End
    );
  }
}

// Customizable Area Start

const BASE_SIZE = 300
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFValue(50)
  },
  circlesContainer: {
    width: BASE_SIZE,
    height: BASE_SIZE,
    alignItems: 'center',
  },
  circle_1: {
    top: 0,
    position: 'absolute',
    width: BASE_SIZE,
    height: BASE_SIZE,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.ultralightwhite,
    opacity: 0.2
  },
  circle_2: {
    top: BASE_SIZE * 0.1, // The amount remaining
    left: BASE_SIZE * 0.1,
    position: 'absolute',
    width: BASE_SIZE * 0.8, // 80% of the base size
    height: BASE_SIZE * 0.8,
    borderRadius: BASE_SIZE / 2,
    backgroundColor: COLORS.lightwhite,
    opacity: 0.2

  },
  circle_3: {
    top: BASE_SIZE * 0.2,
    left: BASE_SIZE * 0.2,
    position: 'absolute',
    width: BASE_SIZE * 0.6,
    height: BASE_SIZE * 0.6, // 60% of the base size
    borderRadius: BASE_SIZE * 0.6 / 2,
    backgroundColor: '#FFFFFF'
  }, box1: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#ff0'
  },
  box2: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#f0f'
  },
  box3: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#0ff'
  },
  box4: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: '#fff'
  },
  container1: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

// Customizable Area End