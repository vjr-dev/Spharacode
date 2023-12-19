// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from "framework/src/Globals";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;

export const Styles = StyleSheet.create({
    container: {
        height: sh,
        width: sw,
        flex: 1,
    },
    safeareaView: {
        flex: 1,
        backgroundColor: "#454545"
    },
    modalView: {
        position: "absolute",
        bottom: Platform.OS === 'ios' ? RFValue(125) : RFValue(155),
        width: sw - 50,
        alignSelf: "center"
    },
    menuView: {
        width: "100%",
        borderRadius: 15,
        backgroundColor: "#4a4a4a",
        justifyContent: "center",
        alignItems: "center"
    },
    menuText: {
        padding: 15,
        fontSize: RFValue(15),
        color: "#bebebe"
    },
    seperator: {
        height: 1,
        backgroundColor: COLORS.skipGray,
        width: "90%"
    },
    cancelButton: {
        justifyContent: "center",
        alignItems: "center",
        width: sw - 50,
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
    headerView:{
        height: 63,
        flexDirection: "row",
        backgroundColor: "#444444",
        justifyContent: "space-between",
        shadowColor: '#3b3d3d',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 1,
    },
    headerCenterView:{
        backgroundColor: "#363636",
        borderRadius: 22,
        height: 45,
        alignSelf: "center",
        flexDirection: "row" 
    },
    switchbutton:{
        margin: 6, 
        justifyContent: "center",
        borderRadius: 20
    },
    switchButtonText:{
        paddingHorizontal: 25, 
        fontWeight:"600"
    },
    headerEndView:{
        justifyContent: "center",
        alignItems:"flex-end",
        width:"16%"
    },
    headerLogo:{
        height: 45,
        width: 45,
        marginRight:12 
    },
    searchContainer:{
        height: 38,
        width: sw - 25,
        marginTop: 10,
        alignSelf: "center",
        flexDirection: "row"
    },
    searchView:{
        width: "85%",
        backgroundColor: COLORS.Viewback,
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center"
    },
    searchImage:{
        height: 20,
        width: 20,
        marginLeft: 10,
        marginRight: 5,
        tintColor: COLORS.lightwhite 
    },
    searchInput:{
        color: "white",
        width: "100%", 
        paddingLeft: 5
    },
    searchMenuView:{
        width: "15%", 
        alignItems: "center", 
        justifyContent: "center"
    },
    searchMenuButton:{
        height: 40,
        width: 40,
        alignSelf: "flex-end",
        backgroundColor: "#363636",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    serachMenuImage:{
        height: 20, 
        width: 20, 
        tintColor: COLORS.white
    },
    unreadMessage:{
        color: COLORS.ultralightwhite, 
        fontSize: 12,
        paddingTop:15,
        paddingStart:15
    },
    swipMenuButton:{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    swipeMenuImage:{
        height: 20,
        width: 20,
        tintColor: COLORS.ultralightwhite,
        marginBottom: 5
    },
    swipeMenuText:{
        color: COLORS.ultralightwhite,
        fontSize: 16
    },
    chatPersonList:{
        height: 80, 
        width: sw - 20, 
        alignSelf: "center", 
        flexDirection: "row", 
        alignItems: "center", 
        backgroundColor: COLORS.Viewback, 
        borderRadius: 8, 
        alignContent: "center" 
    },
    chatPersonImageView:{
        justifyContent:"center",
        alignItems:"center",
        height:"100%"
    },
    chatPerson:{
        justifyContent:"center",
        borderWidth:0.5,
        borderColor:COLORS.Viewback,
        alignItems:"center",
        height:50,
        width:50,
        borderRadius:25
    },
    chatPersonImage:{
        width: '100%',
        height: '100%',
        borderRadius: 30,
        overflow: "hidden",
    },
    chatPersonNameView:{
        height: "100%", 
        width: "65%", 
        justifyContent: "center" 
    },
    chatPersonName:{
        color: COLORS.white,
        fontSize: 17
    },
    chatUnreadMessage:{
        backgroundColor: COLORS.orangelight, 
        borderRadius: 50, 
        height: 20, 
        width: 20, 
        alignItems: "center", 
        justifyContent: "center", 
        marginTop: 5
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