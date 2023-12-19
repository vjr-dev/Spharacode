// Customizable Area Start
//@ts-nocheck
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Button,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Modal,
    ActivityIndicator,
    StatusBar

} from "react-native";

import AlertMessageSettingController, { Props, configJSON } from "./AlertMessageSettingController";
import { back1, back2, LOGO, radio_button, image_back } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import { borderRadius } from "react-select/src/theme";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Switch } from "react-native-gesture-handler";
import Slider from '@react-native-community/slider';
import { Tooltip } from 'react-native-elements';
import CheckBox from "react-native-check-box";
// import CountryPicker from 'react-native-country-codes-picker'



export default class AlertMessageSetting extends AlertMessageSettingController {
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
                                    testID="btnGoback"
                                    style={styles.button1} onPress={() => this.goback()}
                                >
                                    <Image
                                        source={image_back}
                                        style={styles.backbutton}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                   testID="btnEditClick"
                                    style={{ marginRight: 20, marginTop: 0 }}
                                    onPress={() => this.Editclcik()}>
                                    <Text style={{ color: COLORS.darkorange, fontSize: 18 }}>Edit</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}>

                                <Text style={{ fontSize: 20, color: COLORS.white, marginTop: RFValue(20), width: windowWidth - 20, }}>Alert Message.</Text>
                                <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: RFValue(10), width: windowWidth - 20 }}>This default message will send contact number as well as location to your friends facebook account,WhatsApp account and mobile contacts in case of emergency.</Text>

                                <Text style={{ paddingHorizontal: RFPercentage(0.5), zIndex: 1, top: 9, paddingLeft: 10, backgroundColor: COLORS.headerbackground, color: COLORS.ultralightwhite, alignSelf: "flex-start", marginLeft: 40 }}>Default Message</Text>
                                <View style={{ height: 100, width: windowWidth - 20, borderWidth: 1, alignSelf: "center", borderColor: COLORS.ultralightwhite, borderRadius: 5 }}>

                                    <TextInput
                                       testID="textInput"
                                        value={this.state.Message}
                                        onChangeText={(TT) => this.setState({ Message: TT })}
                                        placeholder=""
                                        multiline={true}
                                        style={{ width: "95%", height: "100%", color: COLORS.lightwhite, alignSelf: "center" }}
                                    />
                                </View>
                                <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: RFValue(10), width: windowWidth - 20 }}>Click edit to enter customize alert message</Text>

                                <Text style={{ fontSize: 16, color: COLORS.white, marginTop: RFValue(30), width: windowWidth - 20 }}>Send Emergency Alert To:</Text>
                                <Text style={{ fontSize: 16, color: COLORS.ultralightwhite, marginTop: RFValue(8), width: windowWidth - 20 }}>You can choose who can receive alert messages.</Text>

                                <View style={{ width: windowWidth - 20, height: 30, marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                    <Text style={{ color: COLORS.white }}>Emergency contacts & first responders</Text>
                                    <CheckBox
                                        testID="checkBoxOne"
                                        isChecked={this.state.Checkbox1}
                                        style={{ alignSelf: "center", marginLeft: 20 }}
                                        onClick={() => { this.setState({ Checkbox1: !this.state.Checkbox1 }) }}
                                        // this.onPresscheckbox(item.keyval)
                                        checkedCheckBoxColor="#fff"
                                        uncheckedCheckBoxColor="#fff"
                                    />
                                </View>
                                <View style={{ width: windowWidth - 20, height: 30, marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                    <Text style={{ color: COLORS.white }}>Only First-responders</Text>
                                    <CheckBox
                                        testID = "checkBoxTwo"
                                        isChecked={this.state.Checkbox2}
                                        style={{ alignSelf: "center", marginLeft: 20 }}
                                        onClick={() => { this.setState({ Checkbox2: !this.state.Checkbox2 }) }}
                                        // this.onPresscheckbox(item.keyval)
                                        checkedCheckBoxColor="#fff"
                                        uncheckedCheckBoxColor="#fff"
                                    />
                                </View>
                                <View style={{ width: windowWidth - 20, height: 30, marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                    <Text style={{ color: COLORS.white }}>Emergency contacts</Text>
                                    <CheckBox
                                        testID = "checkBoxThree"
                                        isChecked={this.state.Checkbox3}
                                        style={{ alignSelf: "center", marginLeft: 20 }}
                                        onClick={() => { this.setState({ Checkbox3: !this.state.Checkbox3 }) }}
                                        // this.onPresscheckbox(item.keyval)
                                        checkedCheckBoxColor="#fff"
                                        uncheckedCheckBoxColor="#fff"
                                    />
                                </View>
                                <View style={{ width: windowWidth - 20, height: 30, marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                    <Text style={{ color: COLORS.white }}>Verified volunteers</Text>
                                    <CheckBox
                                        testID = "checkBoxFour"
                                        isChecked={this.state.Checkbox4}
                                        style={{ alignSelf: "center", marginLeft: 20 }}
                                        onClick={() => { this.setState({ Checkbox4: !this.state.Checkbox4 }) }}
                                        // this.onPresscheckbox(item.keyval)
                                        checkedCheckBoxColor="#fff"
                                        uncheckedCheckBoxColor="#fff"
                                    />
                                </View>
                                <View style={{ width: windowWidth - 20, height: 30, marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                    <Text style={{ color: COLORS.white }}>Non - verified volunteers</Text>
                                    <CheckBox
                                        testID = "checkBoxFive"
                                        isChecked={this.state.Checkbox5}
                                        style={{ alignSelf: "center", marginLeft: 20 }}
                                        onClick={() => { this.setState({ Checkbox5: !this.state.Checkbox5 }) }}
                                        // this.onPresscheckbox(item.keyval)
                                        checkedCheckBoxColor="#fff"
                                        uncheckedCheckBoxColor="#fff"
                                    />
                                </View>
                                <TouchableOpacity
                                    testID="sendclickBtn"
                                    onPress={() => this.sendclick()}
                                    style={{ height: 50, width: windowWidth - 20, alignSelf: "center", backgroundColor: COLORS.darkorange, borderRadius: 50, marginVertical: 25, alignItems: "center", justifyContent: "center" }}
                                >
                                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>SEND</Text>
                                </TouchableOpacity>
                            </ScrollView>
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
    view1: { width: windowWidth, justifyContent: "space-between", flexDirection: "row" },
    button1: { marginLeft: 20 },

});
// Customizable Area End
