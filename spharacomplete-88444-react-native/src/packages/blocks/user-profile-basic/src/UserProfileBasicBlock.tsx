//@ts-nocheck
//@ts-ignore
import React from "react";
// Customizable Area Start
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet
} from "react-native";
import UserProfileBasicController, {
  Props
} from "./UserProfileBasicController";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as IMAGE from './assets'
import { styles } from './UserprofileStyle';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../framework/src/Globals";
// Customizable Area End


export default class UserProfileBasicBlock extends UserProfileBasicController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Data: any = [
    {
      id: 1,
      Name: 'SPR8764',
      img: IMAGE.user
    },
    {
      id: 2,
      Name: 'Hazel',
      img: IMAGE.user
    },
    {
      id: 3,
      Name: 'Anu',
      img: IMAGE.user
    },
  ]

  async componentDidMount() {
    let Token: any = await AsyncStorage.getItem("Token")
    console.log("TOKEN==========>", await AsyncStorage.getItem("Token"));
    this.setState({ token: Token })
    this.GetMainProfile()
    this.GetProfile()
    this.focusListener = await this.props.navigation.addListener('focus', async () => {
      console.log("CAAAA");
      this.GetProfile()
      this.GetMainProfile()
    })
  }

  commonFlatList = (data,clickType) => {

    return (

      <FlatList
      testID = "flatlistData"
      data={data}
      style={{ marginTop: RFValue(10) }}
      keyExtractor={(item: any) => item.id}
      horizontal
      scrollEnabled
      extraData={this.state.MainProfile[0]}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={() => (
        <View style={styles.add_main}>
          <TouchableOpacity
            testID="pluseClickBtn"
            onPress={() => this.handleButtonClick(clickType)}
            style={styles.add_touch}>
            <Text style={{ fontSize: RFValue(20), color: COLORS.infoGray }}>+</Text>
          </TouchableOpacity>
          <Text style={styles.add_new_txt}>Add new</Text>
        </View>
      )}
      renderItem={({ item }) => {
       
        if(item.attributes) {
          
          return (
            <View style={{ marginRight: RFValue(25) }}>
                   <Image
                resizeMode="cover"
                source={
                  item.attributes.profile_image
                    ?  { uri: `${item.attributes.profile_image}` }
                    : IMAGE.user
                }
                style={styles.flatlist_img}
              />
              <Text numberOfLines={1} style={styles.flatlist_txt}>{item.attributes.name}</Text>
            </View>
          )
        }
      }}
    />
    )
    
  }

  privatePublicFn = () => {
    if(this.state.private){
       return (
        <View>
        <View style={styles.txt_1_view}>
          <Text style={styles.txt_1}>A private profile shows all the information you have entered that is view-able to only first responder and emergency contacts.</Text>
        </View>
        <View style={styles.profile_view}>
          <View style={{ height: "100%", width: "25%" }}>
            {console.log("sgcfuydshbgfudhnr", this.state.ProfileImage)}
            <View>
              {
                this.state.ProfileImage ?
                  <Image source={{ uri: this.state.ProfileImage }}
                    style={styles.profile_img} />
                  :
                  <Image source={IMAGE.user} style={styles.profile_img} />
              }
  
            </View>
            <Text numberOfLines={1} style={styles.auth_id_txt}>({(this.state.MainProfile[0]?.unique_auth_id)})</Text>
          </View>
          <View style={styles.address_view}>
            <Text style={styles.Name_txt}>{this.state.UserProfile.first_name} {this.state.UserProfile?.last_name}</Text>
            <Text style={styles.add_txt} numberOfLines={2}>{this.state.UserProfile?.address}</Text>
            {/* <Text style={styles.add_txt2}></Text> */}
            <Text style={styles.add_txt3}>{this.state.UserProfile?.city} {this.state.UserProfile?.state} {this.state.UserProfile?.user_country?.name}</Text>
          </View>
          <TouchableOpacity 
          testID="editProfileBtn"
          style={{ height: "100%", width: "25%", alignItems: "flex-end" }} 
          onPress={() => this.props.navigation.navigate("EditProfile")} >
            <Text style={styles.edit_txt}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: RFPercentage(4), marginLeft: RFValue(13) }}>
          <Text style={{ fontSize: RFValue(14), color: COLORS.infoGray }}>Emergency Contacts</Text>
        </View>
        <View style={styles.Flat_List_Main}>
          <View style={styles.flatlist_view}>
           
            {this.commonFlatList(this.state.Arr_Emergancy,1)}
          
          </View>
        </View>
        <View style={{ marginTop: RFPercentage(4), marginLeft: RFValue(13) }}>
          <Text style={{ fontSize: RFValue(14), color: COLORS.infoGray }}>Friends</Text>
        </View>
        <View style={styles.Flat_List_Main}>
          <View style={styles.flatlist_view}>
            {console.log("friends DATA", this.state.Arr_Friend)}
            {this.commonFlatList(this.state.Arr_Friend,2)}
          
          </View>
        </View>
        <View style={{ marginTop: RFPercentage(4), marginLeft: RFValue(13) }}>
          <Text style={{ fontSize: RFValue(14), color: COLORS.infoGray }}>Family</Text>
        </View>
        <View style={styles.Flat_List_Main}>
          <View style={styles.flatlist_view}>
            {console.log("family DATA", this.state.Arr_Family)}
            {this.commonFlatList(this.state.Arr_Family,3)}
            
          </View>
        </View>
        <View style={{ marginTop: RFPercentage(4), marginLeft: RFValue(13) }}>
          <Text style={{ fontSize: RFValue(14), color: COLORS.infoGray }}>Personal Detail</Text>
        </View>
        <View style={styles.personal_main_view}>
          <View style={styles.personal_info_view}>
            <Text style={{ marginLeft: 15, color: COLORS.white }}>Name</Text>
            <Text style={{ color: COLORS.darkGray }}>{this.state.MainProfile[0]?.first_name}  {this.state.MainProfile[0]?.last_name}</Text>
          </View>
          <View style={styles.personal_info_view}>
            <Text style={{ marginLeft: 15, color: COLORS.white }}>E-mail</Text>
            <Text style={{ color: COLORS.darkGray }}>{this.state.MainProfile[0]?.email}</Text>
          </View>
          <View style={styles.personal_info_view}>
            <Text style={{ marginLeft: 15, color: COLORS.white }}>Phone Number</Text>
            <Text style={{ color: COLORS.darkGray }}>{this.state.MainProfile[0]?.phone_number}</Text>
          </View>
          <View style={styles.personal_info_view}>
            <Text style={{ marginLeft: 15, color: COLORS.white }}>City/State</Text>
            <Text style={{ color: COLORS.darkGray }}>{this.state.MainProfile[0]?.city}/{this.state.MainProfile[0]?.state}</Text>
          </View>
          <View style={styles.personal_info_view}>
            <Text style={{ marginLeft: 15, color: COLORS.white }}>Zipcode</Text>
            <Text style={{ color: COLORS.darkGray }}>{this.state.MainProfile[0]?.zip_code}</Text>
          </View>
        </View>
        <View style={{ marginTop: RFValue(10) }}>
          <View style={styles.last_main_view}>
            <Text style={{ marginLeft: RFValue(12), color: COLORS.lightwhite }}>Update health conditions</Text>
            <TouchableOpacity 
             testID="healthBtn"
             onPress={() => this.props.navigation.navigate("MedicalScreen", { from: "health", medicalConditionID:this.state.medicalConditionID })}>
              <Icon name="pencil" color={COLORS.lightyellow} size={15} style={{ marginRight: RFValue(12) }} />
            </TouchableOpacity>
          </View>
      
          <View style={styles.last_main_view3}>
            <Text style={{ marginLeft: RFValue(12), color: COLORS.lightwhite }}>Update identification</Text>
            <TouchableOpacity 
              testID="identificationBtn"
              onPress={() => this.props.navigation.navigate("IdentificationScreen", { from: 'EditProfile' })}>
              <Icon name="pencil" color={COLORS.lightyellow} size={15} style={{ marginRight: RFValue(12) }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
       )
    
    }else{
      return (
       <View>
         <Text style={{ alignSelf: 'center' }}>Public View</Text>
       </View>
      )
    }
  }


  // Customizable Area End

  render() {
    //Customizable Area Start 
    const { MainProfile } = this.state;
    console.log('MainProfileLOG',MainProfile)
    return (
      //Required for all blocks
      <>
        <StatusBar backgroundColor={"#f17234"} barStyle="default" />
        <ImageBackground source={IMAGE.back1} style={styles.mainView}>
          <ImageBackground source={IMAGE.back2} style={styles.mainView}>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.header_view}>
                <TouchableOpacity 
                 testID="gobackBtn"
                 style={{ marginLeft: 10 }} 
                 onPress={() => this.props.navigation.pop()}>

                  <Icon name="chevron-left" style={{ marginHorizontal: 20, marginVertical: 10 }} color={COLORS.backgroundGray} size={17} />
                </TouchableOpacity>
                <Text style={styles.header_txt}>Set Profile</Text>
               {/* <TouchableOpacity onPress={() => { }} style={{ marginRight: 10 }} >
                  <Icon name="search" color={COLORS.backgroundGray} size={17} style={{ marginHorizontal: 20, marginVertical: 10 }} />
                </TouchableOpacity> */}
              </View>
              {/* <View style={{ height: '100%' }} > */}
              <View style={styles.top_tab}>
                <TouchableOpacity 
                 testID="publicBtn"
                 onPress={() => this.setState({ public: true, private: false })} 
                 style={[styles.public_view, { borderBottomColor: this.state.public ? COLORS.lightyellow : COLORS.backgroundGray }]}>
                  <Text style={[styles.public_txt, { color: this.state.public ? COLORS.lightyellow : COLORS.skipGray }]}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  testID="privateBtn"
                  onPress={() => this.setState({ private: true, public: false })} 
                  style={[styles.private_view, { borderBottomColor: this.state.private ? COLORS.lightyellow : COLORS.backgroundGray }]}>
                  <Text style={[styles.private_txt, { color: this.state.private ? COLORS.lightyellow : COLORS.skipGray }]}>Private</Text>
                </TouchableOpacity>
              </View>
              <ScrollView bounces={false} style={{ height: '100%', marginBottom: RFValue(5) }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" >
                <View>
                  {this.privatePublicFn()}
                </View>
              </ScrollView>
              {/* </View> */}
            </SafeAreaView>
          </ImageBackground>
        </ImageBackground>
      </>
    );
  
 

  }
  // Customizable Area End
}
// Customizable Area Start
const Styles = StyleSheet.create({});
// Customizable Area End