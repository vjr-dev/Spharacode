// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React, {} from "react";
import {
  Text,
  View,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as IMAGE from './assets'
import UserProfileBasicController, {
  Props
} from "./UserProfileBasicController";
import { styles } from './editProfileStyle';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../framework/src/Globals";
import ModalDropdown from 'react-native-modal-dropdown';

const sw = Dimensions.get('window').width;


class FloatingLabelInput extends UserProfileBasicController {

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  topfn = () => {
    if(this.props.inputValue == "" ){
      if(this.state.isFocused){
        RFValue(9)
      }else{
        RFValue(18) 
      }
    }else{
      RFValue(9)
    }
  }

  colorfn = () => {
    if(this.props.inputValue == ""){
       if(this.state.isFocused){
        return COLORS.infoGray
       }else{
        return 'rgba(117,117,117,1)'
       }
    }else{
     return COLORS.infoGray
    }
  } 

  fontWeightfn = () => {
    if(this.props.inputValue == ""){
      if(this.state.isFocused){
        return '100'
      }else{
        return '600'
      }
    }else{
      return '100'
    }
  } 

  fontSizefn = () => {
    if(this.props.inputValue == ""){
      if(this.state.isFocused){
        RFValue(12)
      }else{
        RFValue(15)
      }
    }else{
      RFValue(12)
    }
  }

  render() {
    const { label, inputValue, ...props }: any = this.props;
    const labelStyle: any = {
      position: 'absolute',
      left: 0,
      top: this.topfn(),
      color: this.colorfn(),
      paddingLeft: RFValue(15),
      fontWeight: this.fontWeightfn(),
      fontSize: this.fontSizefn(),
    };
    return (
      <>
        <Text style={labelStyle}>
          {label}
        </Text>
        <TextInput
          {...props}
          style={{ height: 26, paddingLeft: RFValue(15), top: Platform.OS == 'ios' ? RFValue(26) : RFValue(24), color: COLORS.white, padding: 0, fontSize: RFValue(15), fontWeight: '600' }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </>
    );
  }
}


export default class EditProfile extends UserProfileBasicController {
  Statee: any;
  City: any;
  country: any;
  constructor(props: Props) {
    super(props);
  }


   ImageFn = () => {
     if(this.state.imgurl){
       return(
        <Image
        testID="imgurl1Btn"
        source={{ uri:  this.state.imgurl }}
        style={styles.img} onLoadEnd={()=>console.log('Loaded!! imgurl',this.state.imgurl)} />
       )
     }else if( this.state.UserProfile && this.state.UserProfile.profile_image_url){
        return(
          <Image
          testID="imgurl2Btn"
          source={{ uri:  this.state.UserProfile.profile_image_url }}
          style={styles.img} onLoadEnd={()=>console.log('Loaded!!')} />
        )
     }else{
       return(
        <Image
        source={IMAGE.user}
        style={styles.img} />
       )
     }
   }


  render() {
    console.log("GDGDGDGDG------>", this.state.States);
    return (
      //Required for all blocks
      <ImageBackground source={IMAGE.back1} style={styles.mainView}>
        <ImageBackground source={IMAGE.back2} style={styles.mainView}>
          <SafeAreaView>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View style={styles.header_view}>
                
                <TouchableOpacity 
                  testID="gobackBtn"
                  style={styles.backButton} 
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name="chevron-left" color={COLORS.white} style={{ marginHorizontal: 20, marginVertical: 10 }} size={16} />
                </TouchableOpacity>
               
                <Text style={styles.header_txt}>Edit  Profile</Text>
                <TouchableOpacity 
                  testID="editProfileBtn"
                  onPress={() => this.EditProfile()} style={{ marginLeft: 20 }} >
                  <Text style={styles.save_txt}>SAVE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.img_view}>
                {this.ImageFn()}
              </View>
              <Text
                testID="storageclickBtn"
                onPress={():void => this.takePhoto()}
                style={{ color: COLORS.lightyellow, alignSelf: 'center', marginTop: RFValue(10), fontWeight: '600', fontSize: RFValue(12) }}
              >
                Set New Photo
              </Text>
              <View style={{ width: sw * 0.90, alignSelf: 'center' }}>
                <View style={styles.txt_input_view_main}>
                  <View
                    style={styles.imageback_1}
                  >
                   
                    <FloatingLabelInput
                      testID = "floatinglabel1Btn"
                      label="First Name"
                      value={this.state.UserProfile.first_name}
                      inputValue={this.state.UserProfile.first_name}
                      onChangeText={(val12: any) => {
                        this.state.UserProfile.first_name = val12
                        this.setState({ UserProfile: this.state.UserProfile })

                      }}
                    />
                    
                  </View>
                  <View
                    style={styles.imageback_2}
                  >
                    
                    <FloatingLabelInput
                      testID = "floatinglabel2Btn"
                      label="Last Name"
                      value={this.state.UserProfile.last_name}
                      inputValue={this.state.UserProfile.last_name}
                      onChangeText={(val: any) => {
                        this.state.UserProfile.last_name = val
                        this.setState({ UserProfile: this.state.UserProfile })
                      }}
                    />
                   
                  </View>
                </View>
                <View
                  style={[styles.imageback_3, { marginVertical: RFPercentage(0), marginBottom: RFPercentage(3) }]}
                >
                  
                  <FloatingLabelInput
                    testID = "floatinglabel3Btn"
                    label="Nick Name"
                    value={this.state.UserProfile.nick_name}
                    inputValue={this.state.UserProfile.nick_name}
                    onChangeText={(val: any) => {
                      this.state.UserProfile.nick_name = val
                      this.setState({ UserProfile: this.state.UserProfile })
                    }}
                  />
                  
                </View>
                <View
                  style={styles.imageback_3}
                >
                 
                  <FloatingLabelInput
                    testID = "floatinglabel4Btn"
                    label="Headline"
                    value={this.state.UserProfile.headline}
                    inputValue={this.state.UserProfile.headline}
                    onChangeText={(val: any) => {
                      this.state.UserProfile.headline = val
                      this.setState({ UserProfile: this.state.UserProfile })
                    }}
                  />
                 
                </View>
                <View
                  style={styles.imageback_4}
                >
                  
                  <FloatingLabelInput
                    testID = "floatinglabel5Btn"
                    label="Current Position"
                    value={this.state.UserProfile.current_position}
                    inputValue={this.state.UserProfile.current_position}
                    onChangeText={(val: any) => {
                      this.state.UserProfile.current_position = val
                      this.setState({ UserProfile: this.state.UserProfile })
                    }}
                  />
                 
                </View>
                <View
                  style={styles.imageback_5}
                >
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                     
                      <View style={{ width: "60%" }}>
                        <Text style={styles.label_txt}>Country</Text>
                       <ModalDropdown
                          testID = "ModalDropdown1Btn"
                          ref={(ref: any) => { this.country = ref; }}
                          animated
                          onDropdownWillShow={() => this.GetCountrylist()}
                          dropdownStyle={styles.countryModal}
                          defaultValue={this.state.UserProfile?.user_country?.name ? this.state.UserProfile?.user_country?.name : "Please select..."}
                          onSelect={(val: any) => {
                            console.log(val,"ASDFGVBNMKDJOOE")
                            console.log("Onselect()()()()", Object.keys(this.state.Country)[val])
                            this.setState({ Country_name: Object.keys(this.state.Country)[val] })
                            let tempUserProfile: any = this.state.UserProfile;
                            tempUserProfile.user_country.name = this.state.Country && Object.values(this.state.Country) && Object.values(this.state.Country)[val]
                            tempUserProfile.user_country.country_code = Object.keys(this.state.Country)[val]
                            tempUserProfile.user_country.user_country_code = Object.keys(this.state.Country)[val]
                            this.state.UserProfile.state = ""
                            this.state.UserProfile.state_code = ""
                            this.state.UserProfile.city = ""
                            this.setState({ UserProfile: tempUserProfile });
                            console.log('UserProfile==', this.state.UserProfile.user_country)
                            if (this.state.UserCountry.length > 0) {
                              let countryId = this.state.UserCountry.find((option: any) => option.attributes?.country_code == Object.keys(this.state.Country)[val])
                              // this.state.UserCountry.find((option: any) =>console.log('CountryID------',Object.keys(this.state.Country)[val],'--------------======',option.attributes))
                              console.log('CountryOD', countryId?.id)
                              this.state.UserProfile.user_country.id = countryId && countryId?.id
                            }
                            this.GetStateslist()
                          }}
                          style={styles.countryButton}
                          textStyle={[styles.selectedText, { paddingLeft: 15 }]}
                          options={Object.values(this.state.Country)}

                        /> 
                        {/* ----------------------------------------------------- */}



                       {/* ----------------------------------------------------- */}






                        <TouchableOpacity 
                          testID="countryShowBtn"
                          style={{ height: 30, justifyContent: "center", left: 10 }}
                          onPress={() => {
                            console.log('jirennnXXXX', this.country);

                            this.country?.show()
                          }}
                        >
                          <Text
                            style={{ fontWeight: "600", color: "#fff", fontSize: 17 }}
                          >
                            {this.state.UserProfile?.user_country?.name ? this.state.UserProfile?.user_country?.name : "Please select..."}
                          </Text>

                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        testID="clocationBtn"
                        onPress={():void => this.Clocation()}
                        style={{ width: "40%" }}>
                        <View style={styles.locationIcon}>
                          <Icon name="location-arrow" style={{}} color={"#ceb28c"} />
                        </View>
                         <Text style={styles.locationText}>current location</Text> 
                        {/* <Icon name="location-arrow" style={{ alignSelf: 'flex-end', marginTop: RFPercentage(-25), marginRight: RFValue(25), }} color={"#ceb28c"} />
                                                <Text style={{ alignSelf: 'flex-end', marginRight: RFValue(13), color: '#ceb28c', fontWeight: '600' }}>current location</Text> */}
                      </TouchableOpacity>
                     
                    </View>
                  </View>
                </View>
                <View style={styles.txt_input_view_main2}>
                  
                  <View
                    style={styles.imageback_2}
                  >
                   
                    <Text style={styles.label_txt}>State/Province</Text>
                    {/* <Icon name="chevron-down" style={{ color: COLORS.ultralightwhite, alignSelf: 'flex-end', marginRight: RFValue(10) }} /> */}
                    <View>
                    


                      <TouchableOpacity 
                        testID="stateeShowBtn"
                        style={{ height: 30, justifyContent: "center", left: 10 }}
                        onPress={() => this.Statee?.show()}>
                        <Text style={{ fontWeight: "600", color: "#fff", fontSize: 17 }} >
                          {this.state.UserProfile.state ? this.state.UserProfile.state : "Please select..."} </Text>
                      </TouchableOpacity>



                       <ModalDropdown
                         testID = "ModalDropdown2Btn"
                        animated={true}
                        ref={(ref: any) => { this.Statee = ref; }}
                        dropdownStyle={{ width: RFValue(200) }}
                        onDropdownWillShow={() => this.GetStateslist()}
                        defaultValue={this.state.UserProfile.state ? this.state.UserProfile.state : "Please select..."}
                        onSelect={(val: any) => {
                          console.log("VAL State", Object.values(this.state.States)[val]);
                          this.setState({ state_val: Object.values(this.state.States)[val] })
                          this.state.UserProfile.state = Object.values(this.state.States)[val]
                          this.state.UserProfile.state_code = Object.keys(this.state.States)[val]
                          this.state.UserProfile.city = ""
                          this.setState({ UserProfile: this.state.UserProfile })
                          this.GetCitylist()
                        }}
                        style={styles.dropDownButton}
                        
                        textStyle={styles.selectedText}
                        options={Object.values(this.state.States)}
                      /> 
                      
                      <View style={styles.dropDownIcon}>
                        <Icon name="chevron-down" style={{ color: COLORS.ultralightwhite }} />
                      </View>
                      
                    </View>
                  </View>
                  <View style={styles.imageback_1}>
                    <Text style={styles.label_txt}>City/District</Text>
                    <View>
                      


                      <TouchableOpacity
                        testID="cityShowBtn"
                        style={{ height: 30, justifyContent: "center", left: 10 }}
                        onPress={() => this.City?.show()}>
                        <Text style={{ fontWeight: "600", color: "#fff", fontSize: 17 }}>
                          {this.state.UserProfile.city ? this.state.UserProfile.city : "Please select..."}
                        </Text>

                      </TouchableOpacity>
                      <ModalDropdown
                         testID = "ModalDropdown3Btn"
                        animated
                        ref={(ref: any) => { this.City = ref; }}
                        dropdownStyle={{ width: RFValue(200) }}
                        onDropdownWillShow={() => this.GetCitylist()}
                        defaultValue={this.state.UserProfile.city ? this.state.UserProfile.city : "Please select..."}
                        onSelect={(val: any) => {
      
                          this.state.UserProfile.city = this.state.City[val]
                          console.log("CITY GOT ONE", this.state.City[val]);
                          if(this.state.UserProfile) {

                            this.setState({ UserProfile: this.state.UserProfile })
                          }

                        }}
                        style={styles.dropDownButton2}
                        textStyle={styles.selectedText}
                        options={Object.values(this.state.City)}
                      />
                      
                      <View style={styles.dropDownIcon}>
                        <Icon name="chevron-down" style={{ color: COLORS.ultralightwhite }} />
                      </View>
                    </View>
                   
                  </View>

                </View>
              </View>
              <View style={styles.mainView1}>
                <View style={styles.PlaceholderView}>
                  <Text style={styles.textcolor}>Summary</Text>
                </View>
                <TextInput 
                  testID="textInputBtn"
                  style={styles.textField}
                  placeholderTextColor={'black'}
                  autoCapitalize='none'
                  numberOfLines={2}
                  value={this.state.UserProfile.summary}
                  multiline={true}
                  //  onChangeText={(text) => this.setState({Summary:text})}
                  onChangeText={(val) => {
                    this.state.UserProfile.summary = val
                    this.setState({ UserProfile: this.state.UserProfile })
                  }}
                ></TextInput>
              </View>
             
              <View style={styles.bottomView}>
                {/* <Text onPress={() => this.setVisibility()} style={styles.settings_txt}><Text style={{ textTransform: "capitalize" }}>{this.state.UserProfile.visibility}</Text> Profile visibility Settings</Text>
                                <View style={{}}>
                                    <Text style={{ color: 'rgba(117,117,117,1)', paddingTop: RFValue(5), paddingBottom: RFValue(15) }}>
                                        Click to set Profile visibility according to your {"\n"}preference. By default, above information will {"\n"}visible to all.
                                    </Text>
                                </View> */}
                <View style={styles.bottomContent}>
                  <Text 
                  testID="setVisibilityBtn"
                  onPress={() => this.setVisibility()} 
                  style={styles.settings_txt}><Text style={{ textTransform: "capitalize" }}>{this.state.UserProfile.visibility}</Text> Profile visibility Settings</Text>
                  <Text style={styles.bottom_text1}>
                    Click to set Profile visibility according to your preference. By default, above information will visible to all.
                  </Text>
                </View>
              </View>

            </KeyboardAwareScrollView>
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground>
    );
  }

  async componentDidMount() {
    let Token: any = await AsyncStorage.getItem("Token")
    console.log("TOKEN==========>", await AsyncStorage.getItem("Token"));
    this.setState({ token: Token })
    this.GetProfile()
    this.GetCountrylist()
    this.GetUserCountry()

    setTimeout(() => {
      this.GetStateslist()
      
    }, 1000);

    setTimeout(() => {
      
      this.GetCitylist()
    }, 1500);
  }
}
// Customizable Area End