//@ts-nocheck
//@ts-ignore
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
// Customizable Area Start
// Customizable Area End
} from "react-native";

import Settings5Controller, {
  Props,
} from "./Settings5Controller";
import { Styles } from "./SettingsStyle";
import * as IMAGE from './assets'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../framework/src/Globals";

export default class Settings5 extends Settings5Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Global_Data = [
    {
      id: 1,
      icon: <Image source={IMAGE.chat_setting} style={Styles.sectionMenuLogo1} />,
      header: "Chat Settings",
      Screen: "",
      content: "Change chat preferences to improve your chat experience.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 2,
      icon: <Image source={IMAGE.sphara_web} style={Styles.sectionMenuLogo2} />,
      header: "Sphara Web",
      Screen: "",
      content: "Connect and access your chats on other devices",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
  ]

  Emergency_App = [
    {
      id: 1,
      icon: <Image source={IMAGE.button_press} style={Styles.sectionMenuLogo1} />,
      header: "Button Press Setup",
      Screen: "TriggerScreen",
      content: "Make emergency calls by pressing or holding mobile side buttons.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 2,
      icon: <Image source={IMAGE.emergency_alert} style={[Styles.sectionMenuLogo1,{tintColor:"#b0b0b0"}]} />,
      header: "Emergency Alert Message",
      Screen: "AlertMessageSetting",
      content: "Edit or Configure the emergency alert message.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 3,
      icon: <Image source={IMAGE.App_integration} style={[Styles.sectionMenuLogo1,{tintColor:"#b0b0b0"}]} />,
      header: "App Integration",
      Screen: "SocialMediaIntegration",
      content: "Integrate with social media to alert family and friends at time of emergency.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 4,
      icon: <Image source={IMAGE.gesture_icon} style={[Styles.sectionMenuLogo1,{tintColor:"#b0b0b0"}]} />,
      header: "Gesture Triggers",
      Screen: "GestureTrigger",
      content: "Choose gesture to trigger emegency.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 5,
      icon: <Image source={IMAGE.voice_rec} style={{ height: RFValue(30), width: RFValue(20), alignSelf: 'flex-start', top: 13, marginLeft: RFValue(10) }} />,
      header: "Voice Recognition",
      Screen: "VoiceActivation",
      content: "Choose keyword to trigger emergency.",
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 6,
      icon: <Image source={IMAGE.security2} style={[Styles.sectionMenuLogo3,{tintColor:"#b0b0b0"}]} />,
      header: "Security",
      Screen: "SecuritySetting",
      content: "Control your account security with 2-step verification..",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 7,
      icon: <Image source={IMAGE.volunteer_setttings} style={Styles.sectionMenuLogo3} />,
      header: "Volunteer Settings",
      Screen: "VolunteerRegistration",
      content: "Ensure your availability to nearby victims.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 8,
      icon: <Image source={IMAGE.alarm_delay} style={[Styles.sectionMenuLogo3,{height:RFValue(30),width:RFValue(30)}]} />,
      header: "Alarm Delay",
      Screen: "AlarmDelay",
      content: "Set number of seconds from when the SOS button is pushed untill the alarm triggered..",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 9,
      icon: <Image source={IMAGE.dial_delay1} style={Styles.sectionMenuLogo3} />,
      header: "Dial Delay",
      Screen: "DialDelay",
      content: "This setiings will enable number of seconds delay need to connect with your local emergency number.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
  ]

  Global_App = [
    {
      id: 1,
      icon: <Image source={IMAGE.app_language} style={Styles.sectionMenuLogo1} />,
      header: "Change App Language",
      Screen: "",
      content: "Choose your preferred language",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 2,
      icon: <Image source={IMAGE.parental} style={[Styles.sectionMenuLogo1,{tintColor:"#b0b0b0"}]} />,
      header: "Parental Control",
      Screen: "",
      content: "Set restriction on content for child age.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 3,
      icon: <Image source={IMAGE.privacy_control} style={Styles.sectionMenuLogo3} />,
      header: "Privacy Control",
      Screen: "",
      content: "Set restriction on viewers.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 4,
      icon: <Image source={IMAGE.recommendation} style={Styles.sectionMenuLogo1} />,
      header: "Recommendation",
      Screen: "",
      content: "View suggested channels ,groups etc.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
    {
      id: 5,
      icon: <Image source={IMAGE.log_out} style={[Styles.sectionMenuLogo3,{tintColor:"#b0b0b0"}]} />,
      header: "Sign out",
      Screen: "LogOut",
      content: "You can sign out from everywhere.",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: <Image source={IMAGE.right_arrow} style={{height:RFValue(28),width:RFValue(28)}}/>
    },
  ]
 // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ImageBackground source={IMAGE.back1} style={Styles.container}>
        <ImageBackground source={IMAGE.back2} style={Styles.container}>
          <SafeAreaView>
            <View
              style={Styles.view1}
            >
              {/* <TouchableOpacity style={Styles.button1} onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={IMAGE.image_back}
                  style={Styles.backbutton}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                testID="gobackBtn" 
                style={Styles.button1} 
                onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={IMAGE.image_back}
                  style={Styles.backbutton}
                />
              </TouchableOpacity>
            </View>

            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ marginBottom: RFPercentage(1) }}>
              <Modal visible={this.state.Loader} transparent={true}>
                <View style={Styles.indicatorView}>
                  <View
                    style={Styles.indicator} >
                    <ActivityIndicator
                      animating={true}
                      size={"large"}
                      color="#f07233"
                    />
                  </View>
                </View>
              </Modal>
              <Text style={Styles.header_txt}>GLOBAL SOCIAL MEDIA SETTINGS</Text>
              <View>
                <FlatList
                  testID="globalData"
                  data={this.Global_Data}
                  keyExtractor={(item: any) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity testID="clickScreen" onPress={() => this.onclick(item.Screen)}>
                      <View style={Styles.flatlist_main}>
                            <View>
                              {/* icon */}
                              {item.icon}
                            </View>
                           <View style={Styles.txt_view}>
                            <Text style={Styles.header_txt1}>{item.header}</Text>
                             <Text style={Styles.content_txt}>{item.content}</Text>
                           </View>
                            <View style={{alignSelf:'center'}}>
                              {/* icon */}
                              {item.img}
                            </View>
                        </View>
                      </TouchableOpacity>

                    )
                  }}
                />
              </View>
              <Text style={Styles.header_txt2}>EMERGENCY APP SETTINGS</Text>
              <View>
                <FlatList
                  testID="emergencyApp"
                  data={this.Emergency_App}
                  keyExtractor={(item: any) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity testID="emergencyClick" onPress={() => this.onclick(item.Screen)}>
                        <View style={Styles.flatlist_main}>
                        <View>
                            {/* icon */}
                            {item.icon}
                          </View>
                         <View style={Styles.txt_view}>
                          <Text style={Styles.header_txt1}>{item.header}</Text>
                          <Text style={Styles.content_txt}>{item.content}</Text>
                         </View>
                          <View style={{alignSelf:'center'}}>
                            {/* icon */}
                            {item.img}
                          </View>
                      </View>
                    </TouchableOpacity>


                    )
                  }}
                />
              </View>
              <Text style={Styles.header_txt3}>GLOABAL APP SETTINGS</Text>
              <View>
                <FlatList 
                  testID="globalApp"
                  style={{ marginBottom: 75 }}
                  data={this.Global_App}
                  keyExtractor={(item: any) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity testID="globalClick" onPress={() => this.onclick(item.Screen)}>

                      <View style={Styles.flatlist_main}>
                      <View>
                            {/* icon */}
                            {item.icon}
                          </View>
                         <View style={Styles.txt_view}>
                          <Text style={Styles.header_txt1}>{item.header}</Text>
                          <Text style={Styles.content_txt}>{item.content}</Text>
                         </View>
                          <View style={{alignSelf:'center'}}>
                            {/* icon */}
                            {item.img}
                          </View>
                      </View>
                    </TouchableOpacity>



                    )
                  }}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground>
     // Customizable Area End
    );
  }
}
