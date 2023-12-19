// Customizable Area Start
//@ts-ignore
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

} from "react-native";

import MakeDonationController, { Props} from "./AmbulanceController";
import { back1, back2, image_call, image_ambulance } from "./assets";
import { RFValue } from "react-native-responsive-fontsize";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { COLORS } from "../../../framework/src/Globals";
import { scaledSize } from "framework/src/Utilities";




export default class Donation extends MakeDonationController {
    constructor(props: Props) {
        super(props);
    }

   

    render() {
        let tt = this.state.Time
        return (

            <SafeAreaView style={styles.container1}>
                <View style={styles.child}>
                    <ImageBackground
                        source={back1}
                        style={styles.image}>
                        <ImageBackground
                            source={back2}
                            style={styles.image2}>
                      
                            <View style={{ height: "55%", width: windowWidth, backgroundColor: COLORS.darkorange, alignItems: "center", justifyContent: "center" }}>

                                <Image
                                    source={image_ambulance}
                                    style={{ height: RFValue(75), width: RFValue(75), tintColor: COLORS.white }}
                                />
                                <Text style={{ marginTop: scaledSize(10), color: COLORS.white, fontWeight: "700", fontSize: 20 }}>Ambulance dispatch is confirmed.</Text>
                                <Text style={{ marginTop: 0, color: COLORS.white, fontWeight: "700", fontSize: 20 }}>Help is on the way.</Text>

                                <Text style={{ marginTop: scaledSize(10), color: COLORS.white,textAlign:"center", fontWeight: "400" }}>Sent to {this.state.Addres}.</Text>
                                <Text style={{ marginTop: 0, color: COLORS.white,textAlign:"center", fontWeight: "400" }}>Sent time:
                                    {tt}
                                </Text>

                                <TouchableOpacity 
                                  testID="btnclick"
                                  onPress={()=>this.onAmbulanceCall()} style={{
                                    height: scaledSize(50), width: scaledSize(50), backgroundColor: COLORS.headerbackground, borderRadius: 50, marginTop: scaledSize(50), alignItems: "center", justifyContent: "center"

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
                                        style={{ height: scaledSize(20), width: scaledSize(20), tintColor: COLORS.white }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ marginTop: scaledSize(25), fontWeight: "700", color: COLORS.headerbackground }}>Call to add info or to cancel fire alert.</Text>

                            </View>
                            <View style={{ marginTop:scaledSize(30),  height: "38%", width: windowWidth, alignItems: "center", justifyContent: "center" }}>

                                <Text style={{  color: COLORS.lightwhite, fontWeight: "400", fontSize: 20 }}>We have alerted these contacts.</Text>
                                {/* <FlatList
                                    data={this.state.tempdata}
                                    renderItem={({ item, name }: any) => {
                                        return (
                                            <Text style={{ marginTop: 10, color: COLORS.ultralightwhite, fontWeight: "400", fontSize: 20, backgroundColor: "pink" }}>{item}</Text>
                                        )
                                    }}
                                /> */}
                                <View
                                    style={{ flex:1,width: windowWidth,alignItems:'center' }}
                                >

                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {this.state.Contactdata?.map((item: { item: any, name: any }) => (



                                            <Text key={this.props} style={{ color: COLORS.ultralightwhite, padding: scaledSize(5) }}>{item.attributes.name}</Text>


                                        ))}
                                    </ScrollView>





                            </View>
                                <TouchableOpacity
                                    testID="doneClickBtn"
                                    style={{height:'20%',width: windowWidth,alignItems:'center' ,zIndex:999,marginBottom: Platform.OS === 'android' ? 0 : scaledSize(40)}}
                                    onPress={() => this.doneclick()}
                                >
                                    <Text style={{ marginTop: scaledSize(15), color: COLORS.darkorange, fontWeight: "400", fontSize: 18 }}>Done</Text>
                                </TouchableOpacity>
                                </View>

                         

                        </ImageBackground>
                    </ImageBackground>
                </View>
            </SafeAreaView>

            
        );
    }
}


const styles = StyleSheet.create({

    container1: { flex: 1, backgroundColor: COLORS.ultradarkorange },
    child: { width: windowWidth, },

    image: {
        height: windowHeight, width: windowWidth,
    },
    image2: {
        height: windowHeight, width: windowWidth, alignItems: "center",
    },

});
// Customizable Area End
