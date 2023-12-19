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
    SafeAreaView,
    TouchableOpacity,
    Switch,
    Modal,
    ActivityIndicator,
    StatusBar

} from "react-native";

import VolunteerRegistrationController, { Props } from "./VolunteerRegistrationController";
import { back1, back2, tick, radio_button, image_back, tick2, Eradio } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class VolunteerRegistration extends VolunteerRegistrationController {
    constructor(props: Props) {
        super(props);
    }

    switchFn() {
        if(this.state.VolunteerState == 0){
            return(
            <View>
                <View style={{ height: 1, width: windowWidth - 10, backgroundColor: COLORS.ultralightwhite }} />
                    <View style={{ height: 230, width: windowWidth, alignItems: "center", backgroundColor: COLORS.backgroundGray }}>
                        <Text style={{ color: COLORS.white, marginVertical: 22 }}>Choose Volunter Type</Text>
                        <View style={{ height: 140, width: windowWidth - 20, borderColor: COLORS.ultralightwhite, borderWidth: 1 }}>
                            <View style={{ flexDirection: "row", height: 69.5, alignItems: "center" }}>
                                <Text style={{ width: "77%", marginLeft: 10, color: COLORS.white }}>As public Volunteer</Text>
                                <TouchableOpacity
                                    testID="clickBtn"
                                    onPress={()=>this.setState({ ispublick: true })}
                                    style={{ height: "99%", width: "20%", alignItems: "center", justifyContent: "center" }}>
                                    <Image
                                        source={radio_button}
                                        style={{ width: 20, height: 20, tintColor: this.state.ispublick ? COLORS.darkorange : COLORS.ultralightwhite }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: 1, width: "100%", backgroundColor: COLORS.ultralightwhite }} />
                            <View style={{ flexDirection: "row", height: 69.5, alignItems: "center" }}>
                                <Text style={{ width: "77%", marginLeft: 10, color: COLORS.darkGray }}>As Registered Volunteer</Text>
                                <TouchableOpacity disabled={true} style={{ height: "99%", width: "20%", alignItems: "center", justifyContent: "center" }}>
                                    <Image
                                        source={radio_button}
                                        style={{ width: 20, height: 20, tintColor: COLORS.ultralightwhite }}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    {this.state.ispublick ? <View><TouchableOpacity
                        testID="startClickID"
                        onPress={()=> this.startclick()}
                        style={{ height: 30, width: "100%", alignItems: "center", justifyContent: "center", marginTop: 50 }}>
                        <Text style={{ color: COLORS.darkorange, fontSize: 16 }}>Start Verification Process</Text>

                    </TouchableOpacity>
                        <Text style={{ fontSize: 16, color: COLORS.lightwhite, marginTop: 15, width: windowWidth - 20 }}>
                            Reset all notification setting,including custom notification setting for your chats.</Text></View> : null}
                </View>
            );
        }else if(this.state.VolunteerState == 1){
            return(
                <View>
                    <View style={{ height: 1, width: windowWidth - 10, backgroundColor: COLORS.ultralightwhite }} />
                    <View style={{ height: 230, width: windowWidth, alignItems: "center", backgroundColor: COLORS.backgroundGray }}>
                        <Text style={{ color: COLORS.white, marginVertical: 22 }}>Choose Volunter Type</Text>
                        <View style={{ height: 140, width: windowWidth - 20, borderColor: COLORS.ultralightwhite, borderWidth: 1 }}>
                            <View style={{ flexDirection: "row", height: 69.5, alignItems: "center" }}>
                                <TouchableOpacity style={{ height: "99%", width: "10%", alignItems: "center", justifyContent: "center" }}>
    
                                    <Image
                                        source={radio_button}
                                        style={{ width: 20, height: 20, tintColor: COLORS.darkorange }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ width: "55%", marginLeft: 10, color: COLORS.white }}>As public Volunteer</Text>
                                <View style={{ height: "100%", width: "32%", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                    <Image source={tick2} style={{ height: 10, width: 10, tintColor: COLORS.lightorange }} />
                                    <Text style={{ fontSize: 10, color: COLORS.ultralightwhite, marginLeft: 6 }}>Verified</Text>
                                </View>
                            </View>
                            <View style={{ height: 1, width: "100%", backgroundColor: COLORS.ultralightwhite }} />
                            <View style={{ flexDirection: "row", height: 69.5, alignItems: "center" }}>
                                <TouchableOpacity disabled={true} style={{ height: "99%", width: "10%", alignItems: "center", justifyContent: "center" }}>
                                    <Image
                                        source={Eradio}
                                        style={{ width: 30, height: 30, tintColor: COLORS.ultralightwhite }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ width: "55%", marginLeft: 10, color: COLORS.darkGray }}>As Registered Volunteer</Text>
    
                            </View>
                        </View>
                    </View>
    
                </View>
            );
        }else{
            return <View></View>
        }
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
                                    testID="goBackBtn"
                                    style={styles.button1}
                                    onPress={()=> this.goback()}>
                                    <Image
                                        source={image_back}
                                        style={styles.backbutton}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ fontSize: 20, color: COLORS.white, marginTop: 50, width: windowWidth - 20, }}>
                                Your Volunteering Profile.</Text>
                            <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: 10, width: windowWidth - 20 }}>
                                Set your volunteering profile type and ensure your</Text>
                            <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: 5, width: windowWidth - 20 }}>
                                help to nearby victims by getting alerts.</Text>


                            <View style={{ flexDirection: "row", width: windowWidth, alignSelf: "center", height: 65, alignItems: "center", marginTop: 40, backgroundColor: COLORS.backgroundGray }}>

                                <Text style={{ fontSize: 16, color: COLORS.white, width: "77%", marginLeft: 20 }}>Intrested in volunteering?</Text>
                                <Switch
                                    testID="switch11Value"
                                    trackColor={{ false: COLORS.black, true: COLORS.darkorange }}
                                    thumbColor={COLORS.white}
                                    ios_backgroundColor="#000"
                                    onValueChange={(Vala: any) => this.switch11(Vala)}
                                    value={this.state.switch1}
                                    style={styles.switchSize}
                                />
                            </View>
                            {this.state.switch1 ?

                                this.switchFn()
                                : null}


                            <Modal
                                testID="modalOpen"
                                visible={this.state.Modal1}
                                // visible={true}
                                transparent={true}
                            >

                                <View
                                    style={{ width: windowWidth - 40, backgroundColor: "#fff", alignSelf: "center", marginTop: windowHeight / 4, borderRadius: 15 }}
                                >

                                    <View style={{ height: 50, alignItems: "center", justifyContent: 'center', marginTop: 20 }}
                                    >
                                        <Image
                                            source={tick}
                                            style={{ height: 30, width: 30, tintColor: '#f07233' }}
                                        />
                                    </View>
                                    <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold', alignSelf: "center" }}>Verification Done!</Text>
                                    <Text style={{ marginHorizontal: 10, fontSize: 15, alignSelf: "center", marginTop: 10, textAlign: "center", }}>Congratulation,You have become SPHARA verified volunteer</Text>
                                    <Text style={{ marginHorizontal: 10, fontSize: 18, alignSelf: "center", fontWeight: "bold", color: "#f07233", marginVertical: 20 }}></Text>
                                    <View style={{ height: 1, width: "100%", backgroundColor: "#808080", marginTop: 20 }} />
                                    <TouchableOpacity
                                        testID="startModelID"
                                        onPress={()=>this.startclick()}
                                        style={{ height: 50, width: '100%', alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontWeight: '600', fontSize: 18 }}>CONTINUE</Text>

                                    </TouchableOpacity>
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
    switchSize: {
        transform: [{ scaleX: Platform.OS === "android" ? 1.2 : 0.9 }, { scaleY: Platform.OS === "android" ? 1.2 : 0.9 }]
    },
});

// Customizable Area End
