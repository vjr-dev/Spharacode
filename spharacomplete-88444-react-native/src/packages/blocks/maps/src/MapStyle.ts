// Customizable Area Start
import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;


export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        height: sh, width: sw,
    },
    child: { width: sw, flex: 1 },
    header_view: {
        backgroundColor: COLORS.darkorange,
        height: hp("7%"),
        justifyContent: "space-around",
        flexDirection: "row", 
        alignItems: "center" 
    },
    header_txt: {
        color: COLORS.backgroundGray,
        fontSize: 16,
        fontWeight: "700"
    },
    mapView: {
        backgroundColor: "grey",
        flexGrow: 1
    },
    map: {
        width: sw,
        height: sh,
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex:0,
    },
    bottomView: {
        width: sw,
        backgroundColor: "#444445",
    },
    bottomContentView: {
        marginHorizontal: 15,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottomContentText: {
        color: "#d4d4d4",
        fontSize: RFValue(13),
        fontWeight: '500'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
    },
    modalView: {
        width: sw - 50,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        textAlign: "center",
        padding: 15,
        color: COLORS.black,
        fontSize: RFValue(17),
        fontWeight: 'bold'
    },
    desc: {
        padding: 10,
        fontSize: RFValue(15),
        textAlign: "center",
        color: "#908d8c",
    },
    viewPlan: {
        borderTopWidth: 0.5,
        borderTopColor: COLORS.darkGray,
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
    viewPlanText: {
        fontSize: RFValue(13),
        color: "#727170",
        fontWeight: "bold",
        paddingVertical: 18,
    },
    plansButton: {
        borderRadius: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    plansButtonText: {
        fontWeight: "bold",
        fontSize: RFValue(13),
    },
    payTypeButton: {
        borderRadius: 100,
        height: 50,
        marginTop: 10,
        backgroundColor: "#515151",
        flexDirection: "row",
    },
    payTypeSec1: {
        width: "80%",
        flexDirection: "row"
    },
    payTypeSec2: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    socialImage: {
        height: 40,
        alignSelf: "center",
        left: 5,
        backgroundColor: 'white',
        width: 40,
        borderRadius: 20
    },
    socialText: {
        alignSelf: "center",
        color: "#999899",
        paddingStart: 25
    },
    commonCenterView: {
        width: "100%",
        paddingHorizontal: 15
    },
    paymentTitle: {
        color: "#908d8c",
        fontSize: RFValue(13),
        paddingTop: 5,
        paddingBottom: 10,
        textAlign:"center"
    },
    buttonsOnMap:{
        zIndex:1,
        position:"absolute",
        bottom:0,
        right:15,
        alignSelf:"flex-end",
        flex:1
    },
    
    userLocationIcon:{
        backgroundColor:COLORS.white,
        borderRadius:25,
        width:50,
        height:50,
        justifyContent:"center",
        alignItems:"center"
    },
    switchSize:{
        transform: [{ scaleX: Platform.OS === "android"?1.2:0.9 }, { scaleY: Platform.OS === "android"?1.2:0.9}] 
    },
    closeIcon:{
        justifyContent: "center",
        alignSelf: "flex-end",
        alignItems: "center",
        marginRight: 15,
        marginTop: 13 
    }
})
// Customizable Area End
