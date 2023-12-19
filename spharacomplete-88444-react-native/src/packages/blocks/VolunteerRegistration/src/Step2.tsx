
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
    TextInput,
    Modal,
    ActivityIndicator,
    StatusBar

} from "react-native";

import VolunteerRegistrationController, { Props } from "./Step2Controller";
import { back1, back2, image_back, tick } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default class VolunteerRegistration extends VolunteerRegistrationController {
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
                                    testID="imageBackBtn"
                                    style={styles.button1} onPress={() => this.goback()}>
                                    <Image
                                        source={image_back}
                                        style={styles.backbutton}
                                    />
                                </TouchableOpacity>
                                {this.ison() ? <TouchableOpacity
                                    testID="varifycickBtn"
                                    style={styles.button1} onPress={() => this.Verifyclick()}>
                                    <Text style={{ color: COLORS.darkorange, marginRight: 20, fontWeight: "600" }}>VERIFY</Text>
                                </TouchableOpacity> : null}

                            </View>

                            <Text style={{ fontSize: 20, color: COLORS.white, marginTop: 50, width: windowWidth - 20, }}>
                                Step 2-Enter Confirmation Number</Text>
                            <Text style={{ fontSize: 15, color: COLORS.ultralightwhite, marginTop: 10, width: windowWidth - 20 }}>
                                Please enter confirmation number which you received from ypur local first-responder department.</Text>
                            <View style={{ flexDirection: "row", width: windowWidth - 20, alignSelf: "center", height: 50, alignItems: "center", marginTop: 50, backgroundColor: COLORS.Viewback, borderRadius: 50 }}>


                                <TextInput
                                testID="Otpcode"
                                    style={{ color: COLORS.ultralightwhite, marginLeft: 10, width: "100%" }}
                                    maxLength={4}
                                    value={this.state.Number}
                                    onChangeText={(value) => this.setState({ Number: value })}
                                    placeholder="4-Digit Code"
                                    placeholderTextColor={COLORS.ultralightwhite}
                                    keyboardType="number-pad"
                                    secureTextEntry={true}
                                />

                            </View>


                            <Modal
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
                                    testID="modelContinue"
                                        onPress={() => this.modalclick()}
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
    backbutton: { height: 15, width: 15, tintColor: "#f07233", },
    view1: { height: 60, width: windowWidth, justifyContent: "space-between", flexDirection: "row", },
    button1: { marginLeft: 20, marginTop: 22 },

});
// Customizable Area End
