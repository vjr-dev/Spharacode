//@ts-ignore
//@ts-nocheck
// Customizable Area Start
import React from "react";

import {
    Text,
    Image,
    TouchableOpacity,
    View,
    ScrollView,
    ImageBackground,
    SafeAreaView,
    FlatList,
    Modal,
    ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AlarmActiveController, {
    Props,
    configJSON
} from "./AlarmActiveController";
import { Styles } from "./AlarmActiveStyle";
import * as IMAGE from './assets'
import { COLORS } from "../../../framework/src/Globals";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MapView, { PROVIDER_GOOGLE, MarkerAnimated, Callout, Circle } from 'react-native-maps';


export const mapRef: any = React.createRef();
export const flatListRef: any = React.createRef();
// Customizable Area End

export default class AlarmActive extends AlarmActiveController {
    camera: any;
    tempAllContacts: any;
    constructor(props: Props) {
        super(props);
        // Customizable Area Starts
        // Customizable Area End
    }
    async componentDidMount() {
        let Token: any = await AsyncStorage.getItem("Token")
        this.setState({ Token: Token })
        this.FirstApi()
        this.GetProfile()
        this.focusListener = this.props.navigation.addListener('focus', async () => {
            this.GetProfile()
            this.setState({
                showAllEmergencyContact: false,
            })
            this.getCurrentLocation();
            flatListRef.current.scrollToOffset({ animated: false, x: 0 })
        })
        this.getCurrentLocation();
    }
    // Customizable Area Start
    DATA: any = [
        {
            id: 1,
            Name: 'P.Ravikiran',
            img: IMAGE.user
        },
        {
            id: 2,
            Name: 'Vijay kumar',
            img: IMAGE.user
        },
        {
            id: 3,
            Name: 'Anu',
            img: IMAGE.user
        },
    ];

    renderListFooterComponent = () => (
        this.state.showAllEmergencyContact || (this.tempAllContacts.length <= 3) ? null :
            <View style={Styles.add_main}>
                <TouchableOpacity testID="to_Show_emergency_contact" onPress={() => this.setState({ showAllEmergencyContact: true })} style={Styles.add_touch}>
                    <Text style={{ fontSize: RFValue(20), color: COLORS.darkorange }}>+{this.tempAllContacts.length - 3}</Text>
                </TouchableOpacity>
                <Text style={Styles.txt_other}>{configJSON.others}</Text>
            </View>
    )

    renderItem = ({ item }: any) => {
       
        return (
            <View style={Styles.itemView}>
                {
                    item?.attributes?.profile_image ?
                        <Image source={{uri: `${item.attributes.profile_image}`}} style={Styles.flatlist_img} />
                        :
                        <View style={Styles.flatlist_sub_view}>
                            <Text style={Styles.flatlist_test}>{item.attributes.name.charAt(0)}</Text> 
                        </View>
                }
                <Text numberOfLines={1} style={Styles.itemName}>{item.name}</Text>
            </View>
        )
    }


    // Customizable Area End


    render() {
        // Customizable Area Start
        let emergencyContactsToShow = [];
        this.tempAllContacts = [];
        if(this.state.UserProfile?.emergency_contacts?.length > 0){
            this.tempAllContacts = [...this.state.UserProfile.emergency_contacts];
        }
        if(this.state.UserProfile?.family?.length > 0){
            this.tempAllContacts = [...this.tempAllContacts, ...this.state.UserProfile.family];
        }
        if(this.state.UserProfile?.friends?.length > 0){
            this.tempAllContacts = [...this.tempAllContacts, ...this.state.UserProfile.friends];
        }
        if (this.state.showAllEmergencyContact) {
            emergencyContactsToShow = this.tempAllContacts;
        } else {
            if(this.tempAllContacts?.length > 3){
                emergencyContactsToShow = this.tempAllContacts?.slice(0, 3);
            }else{
                emergencyContactsToShow = this.tempAllContacts;
            }
            
        }
        // Customizable Area End
        return (
            // Customizable Area Start
            <ImageBackground source={IMAGE.back1} style={Styles.container}>
                <ImageBackground source={IMAGE.back2} style={Styles.container}>
                    <SafeAreaView>
                        <ScrollView keyboardShouldPersistTaps="always">
                            <View style={Styles.headerView}>
                                <TouchableOpacity testID="btn_back" onPress={() => this.props.navigation.pop()}>
                                    <MaterialIcon name="chevron-left" style={Styles.leftIcon} color={COLORS.backgroundGray} size={30} />
                                </TouchableOpacity>
                                <View style={{ paddingHorizontal: 60 }}>
                                    <Text style={Styles.txt_alarmActive}>{configJSON.alarmActivated}</Text>
                                </View>
                                <TouchableOpacity testID="empty" style={{ marginRight: 20 }}>
                                    <MaterialIcon name="more-vert" color={COLORS.backgroundGray} size={25} />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.flatlist_main_view}>
                                <View style={Styles.flatlist_view}>
                                    {
                                        this.state.UserProfile.emergency_contacts != undefined && this.state.UserProfile.emergency_contacts.length > 0 ?
                                            (

                                                <FlatList
                                                    testID="show_emergency_contact"
                                                    data={emergencyContactsToShow}
                                                    ref={flatListRef}
                                                    horizontal
                                                    ItemSeparatorComponent={
                                                        () => <View style={{ width: 15 }} />
                                                    }
                                                    showsHorizontalScrollIndicator={false}
                                                    ListFooterComponent={() => this.renderListFooterComponent()}
                                                    renderItem={(item) => this.renderItem(item)}
                                                />) : null}
                                </View>

                            </View>


                            <Text style={Styles.keep_txt}>{configJSON.keepCalm}</Text>
                            <View style={Styles.para_view}>
                                <Text style={Styles.para_txt}>{configJSON.yourLocationDes}</Text>
                            </View>

                            <View style={Styles.map_main}>

                                <MapView
                                    style={Styles.map}
                                    ref={mapRef}
                                    followsUserLocation={true}
                                    showsMyLocationButton={false}
                                    provider={PROVIDER_GOOGLE}
                                    toolbarEnabled={false}
                                    region={this.getMapRegion()}
                                >
                                    <MarkerAnimated anchor={{ x: 0.5, y: 0.5 }} ref={marker => this.marker = marker} coordinate={this.state.coordinatesvalues}>

                                        <View style={Styles.mapViewSpace} />

                                        <Callout tooltip>
                                            <View style={{ backgroundColor: COLORS.darkorange, width: 90, height: 20, justifyContent: "center", alignItems: "center", borderRadius: 3 }}>
                                                <Text style={Styles.txt_location}>{configJSON.yourLocation}</Text>
                                            </View>
                                        </Callout>

                                    </MarkerAnimated>
                                    {this.state.Responderdata.length > 0 && this.state.Responderdata.map((item: any, index: number) => (
                                        <MarkerAnimated key={item?.name?.toString() + index.toString()} anchor={{ x: 0.5, y: 0.5 }} ref={marker => this.marker = marker} coordinate={{ latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude) }}>
                                            <View style={Styles.spaceView} />
                                            <View style={Styles.nameView}>
                                                <Text style={Styles.txt_MapName}>{item?.name}</Text>
                                            </View>
                                        </MarkerAnimated>
                                    ))}
                                    <Circle
                                        center={{
                                            latitude: this.state.latitude,
                                            longitude: this.state.longitude
                                        }}
                                        radius={800}
                                        strokeColor={'transparent'}
                                        fillColor={'rgba(216,225,235,0.68)'}
                                    />
                                </MapView>
                            </View>
                            <Modal visible={this.state.loader} transparent={true}>
                                <View style={Styles.loaderContainer}>
                                    <View
                                        style={Styles.loaderView} >
                                        <ActivityIndicator
                                            animating={true}
                                            size={"large"}
                                            color="#f07233"
                                        />
                                    </View>
                                </View>
                            </Modal>
                        </ScrollView>
                    </SafeAreaView>
                </ImageBackground>
            </ImageBackground >
            // Customizable Area End
        );
    }
}
