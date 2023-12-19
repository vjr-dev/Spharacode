import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;


export const Styles = StyleSheet.create({
    container: {
        height: sh, width: sw,
        flex: 1,
    },
    header_view: {
        height: hp("7%"),
        width: sw,
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: COLORS.darkorange,
        flexDirection: 'row',

    },
    map: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0,
        bottom: 0
    },
    header_txt: {
        alignSelf: 'center',
        color: COLORS.backgroundGray,
        fontWeight: '600',
        fontSize: RFValue(14)
    },
    save_txt: {
        marginRight: RFValue(16),
        fontSize: RFValue(13),
        fontWeight: '600',
        color: 'rgba(178,136,108,1)'
    },
    flatlist_main_view: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatlist_view: {
        backgroundColor: COLORS.backgroundGray,
        paddingLeft: RFValue(10),
        width: sw,
        height: sh * 0.16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    flatlist_img: {
        height: RFPercentage(8),
        width: RFPercentage(8),
        borderRadius: 50,
        borderColor: COLORS.white,
        borderWidth: 2,
    },
    flatlist_sub_view: {
        height: RFPercentage(8),
        width: RFPercentage(8),
        borderRadius: 50,
        borderColor: COLORS.white,
        borderWidth: 2,
        justifyContent:'center'
    },
    flatlist_test: {
        textAlign:'center',
        fontWeight:'bold',
        fontSize:RFValue(16),
        color:COLORS.darkorange,
    },
    add_main: {
        backgroundColor: COLORS.backgroundGray,
        height: sh * 0.16,
        justifyContent: 'center',
        marginLeft: 13,
        marginRight: 10 
    },
    add_touch: {
        borderColor: COLORS.infoGray,
        borderRadius: 50,
        borderWidth: 1,
        height: RFPercentage(8),
        width: RFPercentage(8),
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
    },
    keep_txt: {
        alignSelf: 'center',
        marginTop: RFPercentage(2),
        color: COLORS.white,
        fontSize: RFValue(14),
        fontWeight: '700'
    },
    para_view: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RFPercentage(1.5)
    },
    para_txt: {
        color: COLORS.borderColor,
        fontWeight: '400'
    },
    map_main: {
        marginVertical: RFPercentage(2.5),
        height: RFPercentage(65),
        width: sw * 0.89,
        alignSelf: 'center'
    },
    headerView:{ backgroundColor: COLORS.darkorange, height: hp("7%"), justifyContent: "space-around", flexDirection: "row", alignItems: "center" },
    leftIcon:{ paddingVertical: 10, paddingHorizontal: 18 },
    txt_alarmActive:{ color: COLORS.backgroundGray, fontSize: 16, fontWeight: "700" },
    loaderContainer:{ height: sh, width: sw, alignItems: "center", justifyContent: "center" },
    loaderView:{ height: 100, width: sw - 20, alignSelf: "center", justifyContent: "center", alignItems: "center", },
    nameView:{ backgroundColor: COLORS.darkorange, width: 40, height: 20, justifyContent: "center", alignItems: "center", borderRadius: 3 },
    itemView:{ width: 75, alignItems: "center", justifyContent: "center" },
    itemName:{ marginTop: RFValue(5), alignSelf: 'center', color: COLORS.darkGray },
    txt_MapName:{ color: COLORS.white, fontSize: 12, fontWeight: "700" },
    spaceView:{
        width: 24, height: 24, backgroundColor: COLORS.Viewback, borderWidth: 3, borderColor: COLORS.white, borderRadius: 12
    },
    txt_location:{ color: COLORS.white, fontSize: 12, fontWeight: "700" },
    mapViewSpace:{
        width: 24, height: 24, backgroundColor: COLORS.darkorange, borderWidth: 3, borderColor: COLORS.white, borderRadius: 12
    },
    txt_other:{ marginTop: RFValue(5), textAlign: "center", color: COLORS.darkGray },






    mainView: {
        height: sh, width: sw,
        flex: 1
    },
    top_tab: {
        flexDirection: 'row',
        backgroundColor: COLORS.backgroundGray,
        height: sh * 0.06,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    public_txt: {
        color: COLORS.skipGray,
        fontSize: 17,
        marginBottom: 7,
        alignSelf: 'center',
        fontWeight: '600'
    },
    private_txt: {
        color: COLORS.lightyellow,
        fontSize: 17,
        marginBottom: 7,
        alignSelf: 'center',
        fontWeight: '600'
    },
    private_view: {
        borderBottomColor: COLORS.lightyellow,
        borderBottomWidth: 2,
        width: sw * 0.18,
    },
    public_view: {
        borderBottomColor: COLORS.lightyellow,
        borderBottomWidth: 2,
        width: sw * 0.18,
    },
    txt_1_view: {
        backgroundColor: 'rgba(60,60,60,1)',
        height: sh * 0.09,
        alignItems: 'center',
        // width:sw*0.99
    },
    txt_1: {
        marginTop: 2,
        color: COLORS.borderColor,
        fontWeight: '500',
        paddingHorizontal:10
    },
    profile_view: {
        backgroundColor: COLORS.backgroundGray,
        height: RFPercentage(14),
        flexDirection: 'row',
        marginTop: RFValue(1),
        justifyContent: 'space-between'
    },
    profile_img: {
        borderWidth: 2,
        height: RFPercentage(6.5),
        width: RFPercentage(6.5),
        borderRadius: 50,
        marginLeft: RFPercentage(2.5),
        marginTop: RFPercentage(2),
        borderColor: COLORS.white
    },
    auth_id_txt: {
        // marginLeft: 5,
        marginLeft: RFPercentage(1.8),
        marginTop: RFPercentage(1),
        // marginLeft: RFPercentage(-23.5),
        color: COLORS.skipGray,
        fontSize: RFValue(11),
        alignSelf: 'flex-start',
    },
    address_view: {
        width: "50%",
        alignItems: 'center',
        // top: RFPercentage(1),
        // marginLeft: RFPercentage(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center'
    },
    add_new_txt: {
        alignSelf: 'flex-end',
        marginRight: RFValue(14),
        marginTop: RFValue(3),
        color: COLORS.skipGray
    },
    flatlist_txt: {
        marginTop: RFValue(5),
        alignSelf: 'center',
        color: COLORS.skipGray,
        width: RFValue(60),
        textAlign: "center"
    },
    Name_txt: {
        fontSize: RFValue(15),
        color: COLORS.white
    },
    add_txt: {
        fontSize: RFValue(12),
        color: COLORS.infoGray,
        textAlign:"center",
        paddingTop:3
    },
    add_txt2: {
        fontSize: RFValue(12.5),
        color: COLORS.infoGray,
    },
    add_txt3: {
        fontSize: RFValue(11.5),
        color: COLORS.infoGray,
        fontWeight: '300',
        paddingTop:3
    },
    edit_btn: {
        marginLeft: RFPercentage(8),
        top: RFValue(10),
        backgroundColor: 'white'
    },
    edit_txt: {
        fontSize: RFValue(12),
        letterSpacing: 0.8,
        color: COLORS.lightorange,
        fontWeight: '700',
        top: RFValue(10),
        marginRight: RFValue(13)
    },

    Flat_List_Main: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginTop: RFValue(10),
        justifyContent: 'center'
    },
    personal_info_view: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: sw * 0.89,
        borderBottomColor: 'rgba(61,63,62,1)',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        marginTop: RFValue(5)

    },
    personal_main_view: {
        marginTop: RFValue(15)
    },
    last_main_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.backgroundGray,
        height: RFValue(35),
        alignItems: 'center'
    },
    last_main_view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.backgroundGray,
        height: RFValue(35),
        alignItems: 'center',
        marginTop: RFValue(10)
    },
    last_main_view3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.backgroundGray,
        height: RFValue(35),
        alignItems: 'center',
        marginTop: RFValue(10)
    },

})