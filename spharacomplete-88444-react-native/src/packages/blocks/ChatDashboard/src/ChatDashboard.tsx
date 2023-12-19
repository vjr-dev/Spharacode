// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React, { createRef } from "react";
import
{
    Text,
    ImageBackground,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Dimensions
} from "react-native";

import ChatController, {
    Props,
    configJSON
} from "./ChatDashboardController";
import { Styles } from "./ChatDashboardStyle";
import * as IMAGE from './assets'
import { COLORS } from "framework/src/Globals";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default class Chat extends ChatController
{
    constructor(props: Props)
    {
        super(props);
    }


    render()
    {
        return (
            <ImageBackground source={IMAGE.back1} style={Styles.container}>
                <ImageBackground source={IMAGE.back2} style={Styles.container}>
                    <SafeAreaView>
                        <View style={{ height: RFValue(40), width: "100%", alignItems: "center", justifyContent: "center" }}>

                            <View style={{ height: 40, width: RFValue(200), backgroundColor: "#363636", borderRadius: 50, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                <TouchableOpacity
                                   testID="btnPress"
                                    onPress={() => this.setState({ Section: 1 })}
                                    style={{ height: "90%", width: "46%", backgroundColor: this.state.Section == 1 ? COLORS.orangelight : null, alignItems: "center", justifyContent: "center", borderRadius: 100 }}
                                >
                                    <Text style={{ color: this.state.Section != 1 ? COLORS.lightwhite : null }} >Chats</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                   testID="btnPresstwo"
                                    onPress={() => this.setState({ Section: 2 })}
                                    style={{ height: "90%", width: "52%", backgroundColor: this.state.Section == 2 ? COLORS.orangelight : null, alignItems: "center", justifyContent: "center", borderRadius: 100 }}
                                >
                                    <Text style={{ color: this.state.Section != 2 ? COLORS.lightwhite : null }} >Groups</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* ADD SPACE  */}
                        {/* <View style={{ height: 50, width: "100%", backgroundColor: "red" }}></View> */}

                    </SafeAreaView>
                </ImageBackground>
            </ImageBackground >
        );
    }
}
// Customizable Area End