





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
  FlatList
// Customizable Area Start
// Customizable Area End
} from "react-native";

import FirstResponderAppSettingController, {
  Props,
} from "./FirstResponderAppSettingController";
import { Styles } from "./SettingsStyle";
import * as IMAGE from "./assets";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Feather from "react-native-vector-icons/Feather";
import { scaledSize } from "framework/src/Utilities";



export default class FirstResponderAppSetting extends FirstResponderAppSettingController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  FirstResponderData = [
    {
      id: 1,
      icon: (
        <Feather
          name="lock"
          color={"#b0b0b0"}
          size={scaledSize(28)}
          style={Styles.sectionMenuLogo1}
        />
      ),
      header: "Security",
      Screen: "SecuritySetting",
      content: "Control your account security with 2-step verification..",
      img: (
        <Image
          source={IMAGE.right_arrow}
          style={{ height: RFValue(28), width: RFValue(28) }}
        />
      ),
    },
    {
      id: 2,
      icon: (
        <Feather
          name="clock"
          color={"#b0b0b0"}
          size={scaledSize(28)}
          style={Styles.sectionMenuLogo1}
        />
      ),
      header: "Set Working Hours",
      Screen: "FirstResponderSetWorkingHours",
      content: "Let other know when you are available",
      // img: <Icon name="chevron-right" color={COLORS.skipGray} />
      img: (
        <Image
          source={IMAGE.right_arrow}
          style={{ height: RFValue(28), width: RFValue(28) }}
        />
      ),
    },
  ];
 // Customizable Area End

 render() {
    return (
      // Customizable Area Start
      <ImageBackground source={IMAGE.back1} style={Styles.container}>
        <ImageBackground source={IMAGE.back2} style={Styles.container}>
          <SafeAreaView>
            <View style={Styles.view1}>
              {/* <TouchableOpacity style={Styles.button1} onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={IMAGE.image_back}
                  style={Styles.backbutton}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                testID="gobackBtn"
                style={Styles.button1}
                onPress={() => this.goBack()}
              >
                <Image source={IMAGE.image_back} style={Styles.backbutton} />
              </TouchableOpacity>
            </View>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: RFPercentage(1) }}
            >
            
                <View>
                  <Text style={Styles.headerText}>App Settings.</Text>

                  <FlatList
                    testID="globalData"
                    data={this.FirstResponderData}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity testID="clickScreen" onPress={() => this.navigateTo(item.Screen)}>

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

                      );
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
