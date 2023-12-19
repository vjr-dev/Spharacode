// Customizable Area Start
//@ts-nocheck
//@ts-ignore
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
    FlatList,
    KeyboardAvoidingView,
    StatusBar
    
} from "react-native";

import MakeDonationController, { Props } from "./MakeDonationController";
import { back1, back2, down_arrow, image_back } from "./assets";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { COLORS } from "../../../framework/src/Globals";



export default class Donation extends MakeDonationController {
    constructor(props: Props) {
        super(props);
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
                                style={{ flex: 1 }}
                                keyboardVerticalOffset={1}
                                behavior={Platform.OS == 'ios' ? 'height' : 'width'}
                            >
                                <StatusBar backgroundColor={"#f17234"} barStyle="default" />
                                <View style={{ height: windowHeight - 220 }}>

                                    <View style={{ height: hp("7%"), width: windowWidth, justifyContent: "space-between", flexDirection: 'row', backgroundColor: COLORS.darkorange, alignItems: "center" }}>
                                        <TouchableOpacity style={{alignItems:"center",height:"90%",justifyContent:"center", width: "15%"}} testID="btnGoBack" onPress={() => this.goback()}>
                                            <Image
                                                source={image_back}
                                                style={{ height: 15, width: 15, tintColor: COLORS.backgroundGray }} />
                                        </TouchableOpacity>
                                        <View style={{ height: "100%", width: "70%", alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ color: COLORS.backgroundGray,fontWeight: '700',fontSize: RFValue(16)}}>Make Donation</Text>
                                        </View>
                                        <View style={{ height: "100%", width: "15%"}} />
                                    </View>
                                    <ScrollView>
                                    <View
                                        style={styles.view1}
                                    >
                                        <Text style={styles.whitecolor}>Donate to</Text>

                                    </View>

                                    {this.state.DModal ? <TouchableOpacity
                                        testID="modaltoggleID"
                                        onPress={() => this.setState({
                                            DModal: false
                                        })}
                                        style={styles.donatbtn}
                                    >
                                        <Text style={styles.donattext}>{this.state.Donatt_to}</Text>
                                        <Image
                                            source={down_arrow}
                                            style={styles.arowimage}
                                        />

                                    </TouchableOpacity> : <View
                                        style={styles.view2}
                                    >
                                        <View style={styles.view3}>
                                            <Text style={styles.text1}>Donate to</Text>
                                        </View>
                                        <View style={styles.line} />
                                        <FlatList
                                            data={this.state.final_list}
                                            // style={{ backgroundColor: "pink" }}
                                            renderItem={({ item }: any) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => this.flatclick(item)}
                                                        style={{ marginLeft: RFPercentage(2.5), marginTop: RFValue(3) }}>
                                                        <Text style={{ color: COLORS.lightwhite }}>{item}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>}

                                    <View
                                        style={styles.view4}
                                    >
                                        <Text style={styles.whitecolor}>Amount</Text>

                                    </View>
                                    <View
                                        style={styles.view5}
                                    >
                                        <TouchableOpacity
                                            testID="staticamount1ID"
                                            onPress={() => this.staticamount1()}
                                            style={{ height: "100%", width: "23%", backgroundColor: this.state.SAmountstatus == 1 ? COLORS.orangelight : COLORS.Viewback, alignItems: "center", justifyContent: "center", borderRadius: 25 }}
                                        >
                                            <Text style={{ color: this.state.SAmountstatus == 1 ? COLORS.black : COLORS.ultralightwhite }}>₹ 100</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        testID="staticamount2ID"
                                            onPress={() => this.staticamount2()}
                                            style={{ height: "100%", width: "23%", backgroundColor: this.state.SAmountstatus == 2 ? COLORS.orangelight : COLORS.Viewback, alignItems: "center", justifyContent: "center", borderRadius: 25 }}
                                        >
                                            <Text style={{ color: this.state.SAmountstatus == 2 ? COLORS.black : COLORS.ultralightwhite }}>₹ 500</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            testID="staticamount3ID"
                                            onPress={() => this.staticamount3()}
                                            style={{ height: "100%", width: "23%", backgroundColor: this.state.SAmountstatus == 3 ? COLORS.orangelight : COLORS.Viewback, alignItems: "center", justifyContent: "center", borderRadius: 25 }}
                                        >
                                            <Text style={{ color: this.state.SAmountstatus == 3 ? COLORS.black : COLORS.ultralightwhite }}>₹ 1000</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            testID="staticamount4ID"
                                            onPress={() => this.staticamount4()}
                                            style={{ height: "100%", width: "23%", backgroundColor: this.state.SAmountstatus == 4 ? COLORS.orangelight : COLORS.Viewback, alignItems: "center", justifyContent: "center", borderRadius: 25 }}
                                        >
                                            <Text style={{ color: this.state.SAmountstatus == 4 ? COLORS.black : COLORS.ultralightwhite }}>₹ 2000</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={styles.view6}
                                    >
                                        <TextInput
                                            value={this.state.Amount+""}
                                            testID="customAmountID"
                                            maxLength={10}
                                            keyboardType="number-pad"
                                            style={{ marginLeft: 20, color: COLORS.ultralightwhite }}
                                            placeholderTextColor={COLORS.ultralightwhite}
                                            placeholder="Enter custom amount"
                                            onChangeText={(TT) => this.coustomamount(TT)}

                                        />
                                    </View>
                                    </ScrollView>
                                </View>
                                <TouchableOpacity
                                testID="doneclickID"
                                    onPress={() => this.donatclick()}
                                    style={styles.view7}
                                >
                                    <Text style={{ color: COLORS.white,fontWeight:"700" }}>DONATE NOW</Text>
                                </TouchableOpacity>


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
    container1: { flex: 1, backgroundColor: "#f17234" },
    child: { width: windowWidth, },

    image: {
        height: windowHeight, width: windowWidth,
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
    view4: { height: 30, width: windowWidth - 20, alignSelf: "center", marginTop: 50, justifyContent: "center" },
    view5: {
        height: 50,
        width: windowWidth - 20,
        alignSelf: "center",
        marginTop: 20,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    view6: { height: 50, width: windowWidth - 20, alignSelf: "center", backgroundColor: COLORS.Viewback, borderRadius: 50, justifyContent: "center", marginTop: 50 },
    view7: { height: 50, width: windowWidth - 20, alignSelf: "center", backgroundColor: "rgba(255,138,73,1)", borderRadius: 50, marginBottom: 20, alignItems: "center", justifyContent: "center" },
});
// Customizable Area End
