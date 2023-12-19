// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";

import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    StatusBar
    
} from "react-native";
import AlarmDelayController, { Props } from "./AlarmDelayController";
import { back1, back2, image_back } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { RFValue } from "react-native-responsive-fontsize";
import Slider from '@react-native-community/slider';  



export default class AlarmDelay extends AlarmDelayController {
    constructor(props: Props) {
        super(props);
    }

    
    

    render() {
        return (
            <SafeAreaView style={styles.container1}>
                <View style={styles.child}>
                    <StatusBar
                        animated={true}
                        backgroundColor="#454545"
                        barStyle={"light-content"}
                        showHideTransition={"slide"}
                    // hidden={true}
                    />
                    <ImageBackground
                        source={back1}
                        style={styles.image}>
                        <ImageBackground
                            source={back2}
                            style={styles.image2}>


                            <View
                                style={styles.view1}
                            >
                                {/* <TouchableOpacity style={styles.button1} onPress={() => this.goback()}>
                                    <Image
                                        source={image_back}
                                        style={styles.backbutton}
                                    />
                                </TouchableOpacity> */}
                                <TouchableOpacity 
                                testID="backBtnId"
                                style={styles.button1} 
                                onPress={() => this.goback()}>
                                    <Image
                                        source={image_back}
                                        style={styles.backbutton}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ fontSize: 20, color: COLORS.white, marginTop: RFValue(40), width: windowWidth - 20, }}>Alarm Delay.</Text>
                            <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: RFValue(10), width: windowWidth - 20 }}>Set number of seconds from when the SOS button is pushed until the alarm triggerd.</Text>




                            <View style={{ height: RFValue(50), width: windowWidth, flexDirection: "row", alignItems: "center", marginTop: 25, justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 20, color: COLORS.lightwhite, marginLeft: RFValue(10) }}>Voice Activation alarm delay.</Text>
                                <TouchableOpacity
                                testID="setClickId"
                                    onPress={() => this.setclick()}
                                    style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ marginRight: RFValue(15), color: COLORS.darkorange, fontSize: 20 }}>SET</Text>
                                </TouchableOpacity>
                            </View>



                            <View style={{ height: RFValue(100), width: windowWidth, alignSelf: 'center', backgroundColor: COLORS.backgroundGray, alignItems: "center", justifyContent: "space-evenly", flexDirection: "row" }}>
                                <Text style={{ color: COLORS.lightwhite, marginLeft: RFValue(30), marginTop: RFValue(16) }}>5</Text>
                                <View style={{ height: "100%", width: RFValue(320), justifyContent: "center" }}>
                                    <View style={{ width: RFValue(100), left: this.state.value1 * RFValue(4) - RFValue(20), backgroundColor: COLORS.orangelight, borderRadius: RFValue(50) }}>
                                        <Text style={{ textAlign: 'center', color: COLORS.black, }}>{this.state.value1} Second</Text>
                                    </View>
                                    <View style={{ width: RFValue(320), alignItems: "center", marginTop: 5 }}>
                                        <Slider
                                        testID="silderValue"
                                            style={{ width: RFValue(275), alignItems: "center", justifyContent: "center" }}
                                            value={this.state.value1}
                                            // onSlidingStart={true}
                                            minimumValue={5}
                                            maximumValue={60}
                                            onValueChange={(V) => this.setState({ value1: V })}
                                            minimumTrackTintColor={COLORS.darkorange}
                                            maximumTrackTintColor={COLORS.ultralightwhite}
                                            thumbTintColor={COLORS.white}
                                            step={1}
                                        /></View>
                                </View>
                                <Text style={{ color: COLORS.lightwhite, marginRight: RFValue(30), marginTop: RFValue(16) }}>60</Text>
                            </View>


                            {/* ------ 2 ------ */}

                            <View style={{ height: RFValue(50), width: windowWidth, flexDirection: "row", alignItems: "center", marginTop: 25, justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 20, color: COLORS.lightwhite, marginLeft: RFValue(10) }}>Gesture trigger delay.</Text>
                                <TouchableOpacity
                                testID="SetClickId"
                                    onPress={() => this.setclick()}
                                    style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ marginRight: RFValue(15), color: COLORS.darkorange, fontSize: 20 }}>SET</Text>
                                </TouchableOpacity>
                            </View>



                            <View style={{ height: RFValue(100), width: windowWidth, alignSelf: 'center', backgroundColor: COLORS.backgroundGray, alignItems: "center", justifyContent: "space-evenly", flexDirection: "row" }}>
                                <Text style={{ color: COLORS.lightwhite, marginLeft: RFValue(30), marginTop: RFValue(16) }}>5</Text>
                                <View style={{ height: "100%", width: RFValue(320), justifyContent: "center" }}>
                                    <View style={{ width: RFValue(100), left: this.state.value2 * RFValue(4) - RFValue(20), backgroundColor: COLORS.orangelight, borderRadius: RFValue(50) }}>
                                        <Text style={{ textAlign: 'center', color: COLORS.black, }}>{this.state.value2} Second</Text>
                                    </View>
                                    <View style={{ width: RFValue(320), alignItems: "center", marginTop: 5 }}>
                                        <Slider
                                        testID="sildervalue2"
                                        style={{ width: RFValue(275), alignItems: "center", justifyContent: "center" }}
                                        value={this.state.value2}
                                        // onSlidingStart={true}
                                        minimumValue={5}
                                        maximumValue={60}
                                        onValueChange={(V) => this.setState({ value2: V })}
                                        minimumTrackTintColor={COLORS.darkorange}
                                        maximumTrackTintColor={COLORS.ultralightwhite}
                                        thumbTintColor={COLORS.white}

                                        step={1}
                                    /></View>
                                </View>
                                <Text style={{ color: COLORS.lightwhite, marginRight: RFValue(30), marginTop: RFValue(16) }}>60</Text>
                            </View>



                            <Modal visible={this.state.Loader} transparent={true}>
                                <View style={{ height: windowHeight, width: windowWidth, alignItems: "center", justifyContent: "center" }}>
                                    <View
                                        style={{ height: 100, width: windowWidth - 20, alignSelf: "center", justifyContent: "center", alignItems: "center", }} >
                                        <ActivityIndicator
                                            animating={true}
                                            size={"large"}
                                            color="#f07233"
                                        />
                                    </View>
                                </View>
                            </Modal>

                        </ImageBackground>
                    </ImageBackground>
                </View>
            </SafeAreaView >
            
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight, width: windowWidth,
        backgroundColor: "#ffffffff"
    },
    image: {
        height: windowHeight, width: windowWidth,
    },
    image2: {
        height: windowHeight, width: windowWidth, alignItems: "center",
    },
    container1: { flex: 1, backgroundColor: "#454545" },
    child: { width: windowWidth, },
    backbutton: { height: 15, width: 15, tintColor: "#f07233" },
    view1: { height: 60, width: windowWidth, justifyContent: "center" },
    button1: {
        width: 15,
        height: 15,
        padding: 25,
        justifyContent: "center",
        alignItems: "center",
    },

});

// Customizable Area End