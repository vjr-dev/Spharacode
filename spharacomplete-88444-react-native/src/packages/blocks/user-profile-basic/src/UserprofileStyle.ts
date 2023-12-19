import { Dimensions, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from "../../../framework/src/Globals";
const sh = Dimensions.get('window').height;
const sw = Dimensions.get('window').width;
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    mainView: {
        height: sh, width: sw,
        flex: 1
    },
    header_view: {
        width: sw,
        height: hp("7%"),
        justifyContent: "space-between",
        alignItems: 'center',
        // borderColor: 'white', 
        // borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.darkorange
    },
    header_txt: {
        marginRight: RFPercentage(15),
        color: COLORS.backgroundGray,
        fontWeight: '700',
        fontSize: RFValue(16)
    },
    save_txt: {
        marginRight: RFValue(16),
        fontSize: RFValue(13),
        fontWeight: '600',
        color: 'rgba(178,136,108,1)'
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
    flatlist_view: {
        // alignContent: 'space-between',
        backgroundColor: COLORS.backgroundGray,
        paddingLeft: RFValue(10),
        // top: RFValue(10),
        width: sw,
        height: RFPercentage(14),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        //flexDirection:'row'
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
    flatlist_img: {
        height: RFPercentage(8),
        width: RFPercentage(8),
        borderRadius: 50,
        borderColor: COLORS.white,
        borderWidth: 2,
        //  marginRight:RFValue(18)
    },
    add_main: {
        backgroundColor: COLORS.backgroundGray,
        height: RFPercentage(14),
        justifyContent: 'center',
        marginLeft: 9,
        marginTop: -1
    },
    add_touch: {
        borderColor: COLORS.infoGray,
        borderRadius: 50,
        borderWidth: 1,
        height: RFPercentage(8),
        width: RFPercentage(8),
        marginRight: RFValue(9),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: RFPercentage(-1.9)
    }
})