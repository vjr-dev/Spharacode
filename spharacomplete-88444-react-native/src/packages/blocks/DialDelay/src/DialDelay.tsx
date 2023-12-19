// Customizable Area Start
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

import DialDelayController, { Props } from "./DialDelayController";
import { back1, back2, image_back } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { RFValue } from "react-native-responsive-fontsize";
import Slider from '@react-native-community/slider';



export default class DialDelay extends DialDelayController {
    constructor(props: Props) {
        super(props);
    }

    

    render() 
    
    
    {



    let left: any
    if(this.state.value1 * RFValue(1.5) - RFValue(80) > RFValue(210))
    {
    left = RFValue(210)
    }
    else 
    {
        if(this.state.value1 * RFValue(1.5) - RFValue(80) > RFValue(1))
        {
            left = this.state.value1 * RFValue(1.5) - RFValue(80)
           }
           else
           {
            left = RFValue(1)
          }
    }

    let txtValue: any
    if (this.state.value1 <= 59) {
      txtValue = this.state.value1 + " second";
    } else if (this.state.value1 <= 119) {
      txtValue = "1 minute";
    } else if (this.state.value1 == 180) {
      txtValue = "3 minutes";
    } else {
      txtValue = "2 minutes";
    }
    

        return (
            <SafeAreaView style={styles.container1}>
                <View style={styles.child}>
                    <StatusBar
                        animated={true}
                        backgroundColor="#454545"
                        barStyle={"light-content"}
                        showHideTransition={"slide"}
                    
                    />
                    <ImageBackground
                        source={back1}
                        style={styles.image}>
                        <ImageBackground
                            source={back2}
                            style={styles.image2}>

                            <SafeAreaView>
                                <View
                                    style={styles.view1}
                                >
                                    <TouchableOpacity style={styles.button1} onPress={() => this.goback()} testID="bckbtnID">
                                        <Image
                                            source={image_back}
                                            style={styles.backbutton}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ paddingHorizontal: 25, justifyContent: "center" }}
                                        testID="btnSetID"
                                        onPress={() => this.setClick()}>
                                        <Text style={{ color: COLORS.darkorange, fontSize: 18 }}>SET</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontSize: 20, color: COLORS.white, marginTop: RFValue(50), width: windowWidth - 20, alignSelf: "center" }}>Dial Delay.</Text>
                                <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: RFValue(10), width: windowWidth - 20, alignSelf: "center" }}>This setting will enable number of seconds delay need to connect with your local emergency number.</Text>

                                <View style={{
                                    height: RFValue(100), width: windowWidth,
                                    backgroundColor: COLORS.backgroundGray,
                                    
                                    marginTop: RFValue(60)
                                }}>
                                    <View style={{ height: "100%", width: windowWidth - RFValue(50), alignSelf: 'center', alignItems: "center", justifyContent: "space-evenly", flexDirection: "row" }}>
                                        <Text style={{ color: COLORS.lightwhite, marginLeft: RFValue(15), marginTop: RFValue(16) }}>30 sec.</Text>
                                        <View style={{ height: "100%", width: RFValue(300), justifyContent: "center" }}>
                                            <View style={{ width: RFValue(100), left: left, backgroundColor: COLORS.orangelight, borderRadius: RFValue(50) }}>
                                                <Text style={{ textAlign: 'center', color: COLORS.black, }}>{txtValue}</Text>
                                            </View>
                                            <View style={{ width: RFValue(300), alignItems: "center", marginTop: 5 }}>
                                                <Slider
                                                    style={{ width: RFValue(235), alignItems: "center", justifyContent: "center" }}
                                                    value={this.state.value1}
                                                    minimumValue={30}
                                                    maximumValue={180}
                                                    onValueChange={(V) => this.setState({ value1: V })}
                                                    minimumTrackTintColor={COLORS.darkorange}
                                                    maximumTrackTintColor={COLORS.ultralightwhite}
                                                    thumbTintColor={COLORS.white}

                                                    step={1}
                                                /></View>
                                        </View>
                                        <Text style={{ color: COLORS.lightwhite, marginRight: RFValue(15), marginTop: RFValue(16) }}>3 min.</Text>
                                    </View>
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
                            </SafeAreaView>

                        </ImageBackground>
                    </ImageBackground >
                </View >
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
    view1: { height: 60, width: windowWidth, justifyContent: "space-between", flexDirection: "row" },
    button1: {
        width: 15,
        height: 15,
        padding: 25,
        justifyContent: "center",
        alignItems: "center"
    },

});
// Customizable Area End
