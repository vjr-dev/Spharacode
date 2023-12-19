// Customizable Area Start
import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;
import { scaledSize } from "framework/src/Utilities";


export const Styles = StyleSheet.create({
    container: {
        height: sh, width: sw,
        flex: 1
    },
    header_view: {
        height: 60,
        width: sw,
        justifyContent: "space-between",
        alignItems: 'center',
        // borderColor: 'white', 
        // borderWidth: 1,
        flexDirection: 'row'
    },
    header_txt: {
        marginLeft: RFValue(12),
        color: COLORS.infoGray,
        fontWeight: '600'
    },
    header_txt2: {
        marginLeft: RFValue(12),
        color: COLORS.infoGray,
        fontWeight: '600',
        marginTop: RFValue(10)
    },
    header_txt3: {
        marginLeft: RFValue(12),
        color: COLORS.infoGray,
        fontWeight: '600',
        marginTop: RFValue(15),
    },
    flatlist_main: {
        flexDirection: 'row',
        marginTop: RFPercentage(3),
        // borderWidth:1,
        // borderColor:'black',
        // height: RFPercentage(9.5),
         alignContent:'center',
        justifyContent: 'space-evenly'
    },
    icon: {
        marginLeft: RFValue(15),
        marginTop: RFValue(20),
        alignSelf: 'flex-start'
    },
    txt_view: {
        marginLeft: RFPercentage(4.5),
        marginTop: RFPercentage(1),
        flexDirection: 'column',
        alignSelf: 'center',
        // borderColor:'white',
        // borderWidth:1,
        // height:RFPercentage(10)
        width: RFPercentage(37),
        lineHeight: 2,
    },
    header_txt1: {
        color: COLORS.white,
        fontWeight: '500',
        fontSize: RFValue(14)
    },
    content_txt: {
        color: COLORS.inputIcon,
        fontSize: RFValue(11),
        marginTop: RFValue(2)
    },
    content_txt1: {
        color: COLORS.inputIcon,
        fontSize: RFValue(11),
        marginTop: RFValue(2),
        // backgroundColor: "red",

        // height: RFPercentage(5)
        paddingVertical: 4,
    },
    backbutton: {
        height: 15,
        width: 15,
        tintColor: "#f07233",
    },
    view1: {
        height: 60,
        // width: sw,
        justifyContent: "center",
    },
    button1: {
        width: 15,
        height: 15,
        padding: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    sectionImageView: {
        alignSelf: 'flex-end',
        marginBottom: 20
    },
    indicatorView: {
        height: sh,
        width: sw,
        alignItems: "center",
        justifyContent: "center"
    },
    indicator: {
        height: 100,
        width: sw - 20,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    sectionMenuLogo1: {
        height: RFValue(28),
        width: RFValue(28),
        alignSelf: 'flex-start',
        top: 13,
        marginLeft: RFValue(10)
    },
    sectionMenuLogo2: {
        height: RFValue(28),
        width: RFValue(28),
        marginTop: RFValue(10),
        marginLeft: RFValue(10),
        alignSelf: 'flex-start'
    },
    sectionMenuLogo3: {
        alignSelf: 'flex-start',
        top: 13,
        marginLeft: RFValue(10),
        height: RFValue(28),
        width: RFValue(28),
    },
    headerText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: RFValue(18),
        // marginBottom: 15,
        marginLeft:scaledSize(20)
    },
   
})
// Customizable Area End