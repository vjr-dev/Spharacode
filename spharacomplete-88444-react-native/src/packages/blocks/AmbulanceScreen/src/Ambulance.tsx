// Customizable Area Start
//@ts-nocheck
import React from "react";

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    Image,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Modal,
    ActivityIndicator

} from "react-native";

import MakeDonationController, { Props } from "./AmbulanceController";
import { back1, back2, image_back, camera } from "./assets";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { COLORS } from "../../../framework/src/Globals";



export default class AmbulanceNotificationDonation extends MakeDonationController {
    constructor(props: Props) {
        super(props);
    }

    renderAmbulanceData(item,key) {

        return (
            <TouchableOpacity
                key={key}
                testID="ambulanceoptiontId"
                onPress={() => this.setState({ SelectedAmbulance: item.id })}
                style={[styles.renderAmbulancebtn,{backgroundColor: this.state.SelectedAmbulance == item.id ? COLORS.orangelight : COLORS.Viewback}]}
            >
                <Text style={{color: this.state.SelectedAmbulance == item.id ? COLORS.black : COLORS.ultralightwhite }}>{item.ambulance_for}</Text>
            </TouchableOpacity>
        )
    }


    render() {
        return (

            <SafeAreaView style={styles.container1}>
                <View style={styles.child}>
                    <ImageBackground
                        source={back1}
                        style={styles.image}>
                        <ImageBackground
                            source={back2}
                            style={styles.image2}>
                            <KeyboardAvoidingView
                                keyboardVerticalOffset={1}
                                behavior={Platform.OS == 'ios' ? 'height' : 'width'}>

                                <View style={styles.btnbck1}>
                                    <TouchableOpacity style={styles.btnbck2} onPress={() => this.goback()} testID="btnGoBack">
                                        <Image
                                            source={image_back}
                                            style={styles.btnbck3} />
                                    </TouchableOpacity>
                                </View>


                                <ScrollView>

                                    <View style={styles.view1}>
                                        <Text style={styles.header}>Incident Report</Text>
                                        <Text style={styles.subHeader1}>Please fill following information as it will provide</Text>
                                        <Text style={styles.subHeader2}>better insight on incident.</Text>
                                    </View>
 
                                    <View style={styles.view4}>
                                        <Text style={styles.whitecolor}>Call Ambulance for?</Text>
                                    </View>

                                    <Modal visible={this.state.Loader} transparent={true}                                >
                                        <View style={{ height: windowHeight, width: windowWidth, alignItems: "center", justifyContent: "center", }}>
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
                                  
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: windowWidth, alignSelf: "center", paddingRight: 5 }}>
                                        {this.state.Ambulancedata?.map((item: { ambulance_for: any, id: any },key) => (

                                            this.renderAmbulanceData(item,key)

                                        ))}
                                    </View>


                                    <View style={styles.view4}>
                                        <Text style={styles.whitecolor}>How many people need treatment?</Text>
                                    </View>

                                    <View style={styles.view6}>
                                        <TextInput
                                            testID="numericvaluetext"
                                            value={this.state.People + ""}
                                            maxLength={10}
                                            keyboardType="number-pad"
                                            style={{ marginLeft: 20, color: COLORS.ultralightwhite }}
                                            placeholderTextColor={COLORS.ultralightwhite}
                                            placeholder=""
                                            onChangeText={(TT) => this.setState({ People: TT })}
                                        />
                                    </View>


                                    <View style={styles.view4}>
                                        <Text style={styles.whitecolor}>Take some pictures</Text>
                                    </View>


                                    <View style={{ height: 50, marginTop: 10, width: windowWidth - 20, alignSelf: "center", flexDirection: "row", justifyContent: "space-around" }}>
                                        <TouchableOpacity
                                            testID="imgclick1"
                                            onPress={() => this.takePicture(1)}
                                            style={{ height: 50, width: 50 }}>
                                            {this.state.images1 == "" ? <Image
                                                source={camera}
                                                style={{ height: "100%", width: "100%" }}
                                            /> : <Image
                                                style={{ height: "100%", width: "100%", borderRadius: 10 }}
                                                source={{ uri: "data:image/jpeg;base64," + this.state.images1 }}
                                            />}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.takePicture(2)}
                                            testID="imgclick2"
                                            style={{ height: 50, width: 50 }}>
                                            {this.state.images2 == "" ? <Image
                                                source={camera}
                                                style={{ height: "100%", width: "100%" }}
                                            /> : <Image
                                                style={{ height: "100%", width: "100%", borderRadius: 10 }}
                                                source={{ uri: "data:image/jpeg;base64," + this.state.images2 }}
                                            />}


                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.takePicture(3)}
                                            testID="imgclick3"
                                            style={{ height: 50, width: 50 }}>
                                            {this.state.images3 == "" ? <Image
                                                source={camera}
                                                style={{ height: "100%", width: "100%" }}
                                            /> : <Image
                                                style={{ height: "100%", width: "100%", borderRadius: 10 }}
                                                source={{ uri: "data:image/jpeg;base64," + this.state.images3 }}
                                            />}


                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.takePicture(4)}
                                            testID="imgclick4"
                                            style={{ height: 50, width: 50 }}>
                                            {this.state.images4 == "" ? <Image
                                                source={camera}
                                                style={{ height: "100%", width: "100%" }}
                                            /> : <Image
                                                style={{ height: "100%", width: "100%", borderRadius: 10 }}
                                                source={{ uri: "data:image/jpeg;base64," + this.state.images4 }}
                                            />}


                                        </TouchableOpacity>


                                    </View>

                                    <TouchableOpacity
                                     testID="onSendClickHitPostAPI"
                                        onPress={() => this.sendclick()}
                                        style={{ height: 50, width: windowWidth - 20, alignSelf: "center", backgroundColor: COLORS.darkorange, borderRadius: 50, marginVertical: 25, alignItems: "center", justifyContent: "center" }}
                                    >
                                        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>SEND</Text>
                                    </TouchableOpacity>

                                </ScrollView>
                            </KeyboardAvoidingView>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </SafeAreaView>


        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight, width: windowWidth,
        backgroundColor: COLORS.white
    },
    container1: { flex: 1, backgroundColor: COLORS.headerbackground },
    child: { width: windowWidth, },

    image: {
        height: '100%', width: windowWidth,
    },
    image2: {
        height: '100%', width: windowWidth, alignItems: "center",
    },
    view1: { height: 30, width: windowWidth - 20, alignSelf: "center", marginTop: 40, justifyContent: "center" },
    whitecolor: { color: COLORS.lightwhite },
    donatbtn: { height: 50, width: windowWidth - 20, alignSelf: "center", backgroundColor: COLORS.Viewback, borderRadius: 50, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    donattext: { color: COLORS.ultralightwhite, marginLeft: 15 },
    arowimage: { height: 15, width: 15, tintColor: COLORS.ultralightwhite, marginRight: 18 },
    view2: { height: 200, width: windowWidth - 20, alignSelf: "center", backgroundColor: COLORS.Viewback, borderRadius: 20 },
    view3: { height: 50, width: "100%", justifyContent: "center" },
    text1: { color: COLORS.ultralightwhite, marginLeft: 20 },
    line: { height: 1, width: "90%", backgroundColor: COLORS.ultralightwhite, alignSelf: "center" },
    view4: { height: 30, width: windowWidth - 20, alignSelf: "center", marginTop: 40, justifyContent: "center" },
    view5: { height: 50, width: windowWidth - 20, alignSelf: "center", marginTop: 20, justifyContent: "space-between", flexDirection: "row" },
    view6: { height: 50, width: windowWidth - 20, alignSelf: "center", backgroundColor: COLORS.Viewback, borderRadius: 50, justifyContent: "center", marginTop: 10 },
    view7: { height: 50, width: windowWidth - 20, alignSelf: "center", backgroundColor: COLORS.darkorange, borderRadius: 50, marginBottom: 20, alignItems: "center", justifyContent: "center" },
    renderAmbulancebtn : { height: 50, paddingHorizontal: 20, marginLeft: 5, alignItems: "center", justifyContent: "center", borderRadius: 50, marginTop: 10 },
    btnbck1: { height: 60, width: windowWidth, justifyContent: "space-between", flexDirection: 'row' },
    btnbck3: {height: 15, width: 15, tintColor: "#f07233" },
    btnbck2: { marginLeft: 20, marginTop: 22 },
    header: { color: COLORS.white, fontSize: 20 },
    subHeader1: { color: COLORS.ultralightwhite, fontSize: 16, width: windowWidth - 20, marginTop: 5 },
    subHeader2: { color: COLORS.ultralightwhite, fontSize: 16, width: windowWidth - 20 },

});
// Customizable Area End
