 // Customizable Area Start
 //@ts-ignore
 //@ts-nocheck
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    StatusBar
} from "react-native";

import GestureTriggerController, { Props, configJSON } from "./GestureTriggerController";
import { back1, back2, image_back, V, H } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import { borderRadius } from "react-select/src/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { RFValue } from "react-native-responsive-fontsize";



export default class GestureTrigger extends GestureTriggerController {
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
                                <TouchableOpacity 
                                   testID="gobackbtn"
                                   style={styles.button1}
                                    onPress={() => this.goback()}
                                 >
                                    <Image
                                        source={image_back}
                                        style={styles.backbutton}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ fontSize: 20, color: COLORS.white, marginTop: 50, width: windowWidth - 20, }}>Gesture Trigger settings.</Text>
                            <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: 10, width: windowWidth - 20 }}>SPHARA app will allows you to shake your phone in order to trigger emergency service,even if your screen is off,your can still shake it,and it'll work!</Text>

                            <View style={{ flexDirection: "row", width: windowWidth - 20, alignSelf: "center", height: 50, alignItems: "center", marginTop: 10 }}>

                                <Text style={{ fontSize: 20, color: COLORS.white, width: "85%", }}>Shake</Text>
                                <Switch 
                                    testID="switchbtn"
                                    trackColor={{ false: COLORS.black, true: COLORS.darkorange }}
                                    thumbColor={COLORS.white}
                                    ios_backgroundColor="#000"
                                    onValueChange={(Val) => this.switch22(Val)}
                                    value={this.state.switch2}
                                    style={styles.switchSize}
                                // style={{ backgroundColor: "red" }}
                                />
                            </View>
                            
                            <Modal
                                visible={this.state.Modal2}
                                // visible={true}
                                transparent={true}>
                                <View style={{ height: windowHeight, width: windowWidth, alignItems: "center", justifyContent: "center", }}>
                                    <View
                                        style={{ height: RFValue(350), width: windowWidth - RFValue(20), alignSelf: "center", justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }} >
                                        <Image
                                            source={H}
                                            style={{ height: RFValue(150) }}
                                        />
                                        <View style={{ height: RFValue(150), width: "90%", alignSelf: "center" }}>
                                            <Text style={{ fontSize: RFValue(20), color: COLORS.black, marginTop: RFValue(10), width: windowWidth - RFValue(20), }} >Shake</Text>
                                            <Text style={{ fontSize: RFValue(14), color: COLORS.black, marginTop: RFValue(10), width: windowWidth - RFValue(20), fontWeight: "200" }}>Shake gesture has been enabled.</Text>
                                            <Text style={{ fontSize: RFValue(14), color: COLORS.black, marginTop: RFValue(5), width: windowWidth - RFValue(20), fontWeight: "200" }}>it will trigger the panic button whenever you</Text>
                                            <Text style={{ fontSize: RFValue(14), color: COLORS.black, marginTop: RFValue(5), width: windowWidth - RFValue(20), fontWeight: "200" }}>will apply this gesture</Text>

                                        </View>
                                        <View style={{ height: 50, width: "100%", alignItems: "flex-end", justifyContent: "center" }}>
                                            <TouchableOpacity
                                               testID="m2closebtn"
                                                onPress={() => this.M2close()}
                                            >
                                                <Text style={{ marginRight: 20, fontSize: 17 }}>CONTINUE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

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
    button1: { marginLeft: 20 },
    switchSize:{
        transform: [{ scaleX: Platform.OS === "android"?1.2:0.9 }, { scaleY: Platform.OS === "android"?1.2:0.9}] 
    },

});
// Customizable Area End
