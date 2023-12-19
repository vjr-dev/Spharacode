import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;


export const Styles = StyleSheet.create({
    container: {
        height: sh, width: sw,
        flex: 1,
    },
    main_txt: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RFPercentage(7)
    },
    txt_1: {
        color: COLORS.darkGray,
        fontSize: RFValue(15),
    },
    txt_cancel: {
        color: COLORS.orange,
        fontSize: RFValue(14),
        fontWeight: '600',
        letterSpacing: 2,
        alignSelf: 'center',
        marginTop: RFPercentage(10),
    },
    countdown_main: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: RFPercentage(15),
        flex: 1,
        // backgroundColor: COLORS.darkorange,
        height: "100%",
        width: "100%",
        borderRadius: 100,
        alignSelf: 'center'
    },
    txt_timer: {
        color: COLORS.white,
        fontSize: RFPercentage(6)
    }
})