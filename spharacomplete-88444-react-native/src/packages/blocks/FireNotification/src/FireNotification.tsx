// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    
    Image,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    
} from "react-native";

import MakeDonationController, { Props } from "./FireController";
import { back1, back2, image_call, image_fire } from "./assets";
import { RFValue } from "react-native-responsive-fontsize";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { COLORS } from "../../../framework/src/Globals";




export default class Donation extends MakeDonationController {
    constructor(props: Props) {
        super(props);
    }

    
    

    render() {
        let Firetime = this.state.Time
        return (

            <SafeAreaView style={styles.container1}>
                <View style={styles.child}>
                    <ImageBackground
                        source={back1}
                        style={styles.image}>
                        <ImageBackground
                            source={back2}
                            style={styles.image2}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ width: windowWidth, backgroundColor: COLORS.darkorange, alignItems: "center", justifyContent: "center" }}>

                                    <Image
                                        source={image_fire}
                                        style={{ height: RFValue(75), marginTop: 50, width: RFValue(75), tintColor: COLORS.white }}
                                    />
                                    <Text style={{ paddingTop: 12, color: COLORS.white, fontWeight: "700", fontSize: 20 }}>Fire dispatch is confirmed.</Text>
                                    <Text style={{ color: COLORS.white, fontWeight: "700", fontSize: 20 }}>Help is on the way.</Text>

                                    <Text style={{ paddingTop: 15, color: COLORS.white, fontWeight: "400", textAlign: "center" }}>Sent to {this.state.Address}.</Text>
                                    <Text style={{ color: COLORS.white, fontWeight: "400", textAlign: "center" }}>Sent time: {Firetime}</Text>
                                    <TouchableOpacity testID="onFirecallID" onPress={()=>this.onFireCall()} style={{
                                        height: 50, width: 50, backgroundColor: COLORS.headerbackground, borderRadius: 50, marginTop: 50, alignItems: "center", justifyContent: "center"

                                        , shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 10,
                                        },
                                        shadowOpacity: 0.53,
                                        shadowRadius: 13.97,

                                        elevation: 21,

                                    }}>

                                        <Image
                                            source={image_call}
                                            style={{ height: 20, width: 20, tintColor: COLORS.white }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ paddingTop: 18, paddingBottom: 25, fontWeight: "700", color: COLORS.headerbackground }}>Call to add info or to cancel fire alert.</Text>

                                </View>
                                <View style={{ width: windowWidth, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ paddingTop: 18, color: COLORS.lightwhite, fontWeight: "400", fontSize: 20 }}>We have alerted these contacts.</Text>
                                    <View
                                        style={{ marginTop: 5 }}


                                    >
                                        {this.state.contacttdata.map((item: { item: any, name: any }) => (
                                            <Text style={{ color: COLORS.ultralightwhite, padding: 5 }} key={item.name}>{item.attributes.name}</Text>
                                        ))}
                                    </View>

                                    <TouchableOpacity
                                        onPress={() =>
                                            this.doneclick()
                                        }
                                        testID="doneClickID"
                                        style={{ marginVertical: 25 }}
                                    >
                                        <Text testID="contactName" style={{ color: COLORS.darkorange, fontWeight: "400", fontSize: 18 }}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </ImageBackground>
                    </ImageBackground>
                </View>
            </SafeAreaView>

            
        );
    }
}


const styles = StyleSheet.create({

    container1: { flex: 1, backgroundColor: COLORS.ultradarkorange },
    child: { width: windowWidth, height: windowHeight, flex: 1 },

    image: {
        height: windowHeight, width: windowWidth, flex: 1
    },
    image2: {
        height: windowHeight, width: windowWidth, alignItems: "center", flex: 1
    },

});

//// Customizable Area End