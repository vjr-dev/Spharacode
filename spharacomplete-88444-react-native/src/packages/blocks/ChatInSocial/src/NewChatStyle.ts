// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

export const Styles = StyleSheet.create({
    container: {
        height: sh, width: sw,
        flex: 1,
    },
    safeareaView: {
        flex: 1,
        backgroundColor: "#454545"
    },
    child: {
        width: sw,
        flex: 1,
    },
    modalView: {
        position: "absolute",
        bottom: 15,
        width: sw - 30,
        alignSelf: "center"
    },
    menuView: {
        width: "100%",
        borderRadius: 15,
        backgroundColor: COLORS.Viewback,
        justifyContent: "center",
        alignItems: "center",
    },
    menuText: {
        padding: 15,
        fontSize: RFValue(15),
        color: COLORS.white
    },
    seperator: {
        height: 1,
        backgroundColor: COLORS.skipGray,
        width: "90%"
    },
    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#fed99f",
        borderRadius: 25
    },
    cancelText: {
        paddingVertical: Platform.OS === "android" ? 15 : 18,
        fontSize: RFValue(13)
    },
    shadowView: {
        backgroundColor: "#3e3e3e",
        width: sw,
        height: sh,
        position: "absolute",
        opacity: 0.6,
        flex: 1
    },
    chatPersonImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    },
    contactText:{
        backgroundColor: COLORS.orangelight, 
        borderRadius: 25, 
        height: 50, 
        width: 50, 
        alignItems: "center", 
        justifyContent: "center", 
    }
})
// Customizable Area End