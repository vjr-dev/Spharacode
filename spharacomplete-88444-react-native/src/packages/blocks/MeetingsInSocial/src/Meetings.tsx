// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";

import {
    Text,
    ImageBackground,
    SafeAreaView,
} from "react-native";

import MeetingsController, {
    Props,
} from "./MeetingsController";
import { Styles } from "./MeetingsStyle";
import * as IMAGE from './assets'

export default class Meetings extends MeetingsController {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={Styles.safeareaView}>
                <ImageBackground source={IMAGE.back1} style={Styles.container}>
                    <ImageBackground source={IMAGE.back2} style={Styles.container}>
                        <Text>Meetings Tab</Text>
                    </ImageBackground>
                </ImageBackground >
            </SafeAreaView>
        );
    }
}
// Customizable Area End
