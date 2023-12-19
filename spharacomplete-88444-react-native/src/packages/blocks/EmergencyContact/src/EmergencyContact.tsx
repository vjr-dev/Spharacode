// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform
} from "react-native";
import EmergencyContactController, {
  Props
} from "./EmergencyContactController";
import { back1, back2, Profile, image_back } from "./assets";
import CheckBox from "../../../components/src/CheckBox";
import { scaledSize } from "../../../framework/src/Utilities";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "framework/src/Globals";
import { deviceHeight, deviceWidth } from "framework/src/Utilities";
export default class EmergencyContact extends EmergencyContactController {
  constructor(props: Props) {
    super(props);
  }

  renderSaveButton = () => {
    if(this.state.selectedEmergencyContacts.length > 0 || this.state.selectedFamilyContacts.length > 0 || this.state.selectedFriendContacts.length > 0){
      return(
        <TouchableOpacity
          testID="saveDeviceContact"
          style={styles.saveButton}
          onPress={():void => this.onSave()}
        >
        <Text style={styles.saveText}> SAVE </Text>
      </TouchableOpacity>
      );
    }else{
      return null
    }
  }

  contactTypeButton = (label:string, contact_type: number) => {
    return(
      <TouchableOpacity 
        testID= "contactTypeButton"
        style={{...styles.contactTypeButton, borderColor:this.state.contactType === contact_type ? "#eccb9f": "#ffffff"}}
        onPress={()=> this.setState({contactType:contact_type, deviceContacts: this.state.deviceContacts})}
      >
        <Text style={[styles.contactTypeButtonLabel,{color:this.state.contactType === contact_type ? "#eccb9f": "#ffffff"}]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  renderContact = (item: any) => {
    let profileImageUrl;
    if(item.profileImageURL){
      profileImageUrl = {uri: item.profileImageURL}
    }else{
      profileImageUrl = Profile;
    }
    return (
      <View style={styles.renderContactView}>
        <View style={styles.profileNameView}>
          <Image
            source={profileImageUrl}
            style={styles.profileImage}
          />
          <View style={styles.textView}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.number} numberOfLines={1}>{item.number}</Text>
          </View>
        </View>
        <View>
          <CheckBox
            testID = "contactCheckBox"
            isCheck ={this.isContactSelected(item,this.state.contactType)}
            onChange = {(res)=>this.onContactCheck(item,this.state.contactType,res.isCheck)}
          />
        </View>
      </View>
    );
  }
  renderManualContactPopUp = () => {
    return (
      <Modal 
      testID="manualContactModal"
      visible={this.state.isManualContactAdd} 
      transparent={true}>
        <KeyboardAvoidingView style={styles.modalStyle} behavior={Platform.OS === "ios"?"padding":""}>
        <View style = {styles.modalBody}>
          <View style={styles.modalHeader}>
            <Text style={styles.selectContactLabel}>Add Contact as</Text>
            <TouchableOpacity
              testID="manualContactPopUpCloseButton"
              onPress={() => this.closeManualContactAdd()}
              style={styles.closeButton}
            >
              <MaterialIcon name="close" color={COLORS.lightGray} size={scaledSize(18)} />
            </TouchableOpacity>
          </View>
          {this.renderContactTypeButtonView()}
          <TextInput
            testID="emergencyContactNameTextInput"
            value={this.state.manualName}
            onChangeText={(text) => this.onNameChange(text)}
            style={styles.textInputStyle}
            placeholderTextColor="#cdcdcd"
            placeholder="Name"
            maxLength={15}
          />
          <TextInput
            testID="emergencyContactNumberTextInput"
            value={this.state.manualNumber}
            onChangeText={(text) => this.onNumberChange(text)}
            style={styles.textInputStyle}
            placeholderTextColor="#cdcdcd"
            placeholder="Contact Number"
            maxLength={12}
            keyboardType="number-pad"
          />
          <View style={styles.manualSaveButtonView}>
            <TouchableOpacity
              testID="saveManualContactButton"
              onPress={() => this.onManualContactSave()}
              style={[styles.saveButton,{width: scaledSize(80)}]}
            >
              <Text style={styles.saveText}> SAVE </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
    )
  }
  renderContactTypeButtonView = () => {
    return <View style={styles.contactTypeButtonsView}>
    {this.contactTypeButton("Emergency Contact", 1)}
    {this.contactTypeButton("Friends", 2)}
    {this.contactTypeButton("Family", 3)}
  </View>
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={back1} style={styles.bgImage}>
          <ImageBackground source={back2} style={styles.bgImage}>
            <View style={styles.body}>
              <View style={styles.header}>
                <TouchableOpacity
                  testID="emergencyContactBackButton"
                  style={styles.backButton}
                  onPress={() => this.handleBackButtonClick()}
                >
                  <Image
                    source={image_back}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
                {this.renderSaveButton()}
              </View>
              <View style={styles.labelView}>
                <Text style={styles.title}>
                  Set Up Emergency Contacts.
                </Text>
                <Text style={styles.label}>
                  Your emergency contact will receive the alert when you trigger
                  the emergency alert. you are limit to add only 5 emergency
                  contact members.
                </Text>
                <TouchableOpacity
                  testID="manualContactPopUp"
                  onPress={() => this.onManualContactAdd()}
                  style={styles.manualAddContactButton}
                >
                  <Text style={styles.manualAddContactButtonLabel}>
                    MANUALLY ADD CONTACT
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.selectContactLabel}>
                Select Contacts as
              </Text>
              {this.renderContactTypeButtonView()}
              <View style={styles.contactRenderView}>
                {
                  this.state.isPhoneContactLoding ?
                  <View style={styles.phoneContactLoader}>
                <ActivityIndicator
                  animating={true}
                  color="#f07233"
                  hidesWhenStopped={true}
                  size="large"
                />
              </View>
              :
              <ScrollView 
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom:scaledSize(10)}}
                >
                {
                  this.state.deviceContacts.length > 0 ?
                  this.state.deviceContacts.map((item: any) => {
                    return this.renderContact(item);
                  })
                  :
                  <View style={styles.errorMessageView}>
                    {
                      <Text style={styles.label}>{this.state.fetchContactStatus}</Text>
                    }
                  </View>
                }
               </ScrollView>
                }
              </View>
              {this.renderManualContactPopUp()}
            </View>
            <Modal visible={this.state.isLoading} transparent={true}>
              <View style={styles.loaderContainer}>
                <ActivityIndicator
                  animating={true}
                  color="#f07233"
                  hidesWhenStopped={true}
                  size="large"
                />
              </View>
            </Modal>
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#454545" 
  },
  bgImage: {
    height: deviceHeight,
    width: deviceWidth,
  },
  header:{
    flexDirection:'row',
    height: scaledSize(30),
    width: "100%",
    justifyContent:'space-between',
    alignItems:'center',
  },
  backButton:{
    height: scaledSize(30), 
    width: scaledSize(30), 
    justifyContent:'center',
    alignItems:'center'
  },
  backIcon:{
    height: scaledSize(15), 
    width: scaledSize(15), 
    tintColor: "#f07233"
  },
  saveButton:{
    height: scaledSize(30),
    paddingHorizontal: scaledSize(10),
    justifyContent:'center',
    alignItems:'center',
  },
  saveText:{
    color: "#f07233",
    fontSize: scaledSize(14),
    fontWeight:'400'
  },
  body:{
    flex:1,
    padding: scaledSize(10)
  },
  labelView:{
   paddingVertical: scaledSize(10)
  },
  title:{
    fontSize: scaledSize(20),
    color: "#fff",
  },
  label:{
    fontSize: scaledSize(12),
    color: "#cdcdcd",
    marginTop: scaledSize(10),
  },
  manualAddContactButton:{
    height:scaledSize(40),
    width: "100%",
    backgroundColor: "#3c3c3c",
    marginTop: scaledSize(20),
    marginBottom: scaledSize(10),
    borderRadius: scaledSize(25),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  manualAddContactButtonLabel:{
    color: "#f07233", 
    fontSize: scaledSize(14)
  },
  selectContactLabel:{
    fontSize: scaledSize(15),
    color: "#fff",
  },
  contactTypeButton:{
    height: scaledSize(25),
    borderRadius: scaledSize(15),
    borderWidth: scaledSize(1),
    paddingVertical:scaledSize(3),
    paddingHorizontal:scaledSize(10),
    marginRight: scaledSize(10),
    alignItems:'center',
    justifyContent:'center',
  },
  contactTypeButtonLabel:{
    fontSize: scaledSize(10)
  },
  contactTypeButtonsView:{
    flexDirection:'row',
    marginTop: scaledSize(10),
  },
  contactRenderView:{
    flex:1,
    paddingVertical: scaledSize(5)
  },
  errorMessageView:{
    width:'100%',
    marginTop: scaledSize(40),
    alignItems:'center',
    justifyContent:'center'
  },
  renderContactView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    marginVertical: scaledSize(5),
  },
  profileNameView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  textView:{
    width:"70%"
  },
  profileImage: { 
    height: scaledSize(35),
    width: scaledSize(35),
    borderRadius: scaledSize(20),
    marginRight: scaledSize(10)
  },
  name:{
    fontSize: scaledSize(13),
    color: "#ffffff",
  },
  number:{
    fontSize: scaledSize(10),
    color: "#ffffff",
  },
  modalStyle:{
    flex: 1, 
    width:'100%',
    alignItems: "center", 
    justifyContent: "flex-end",
    backgroundColor:'rgba(0,0,0,0.5)',
  },
  modalBody:{
    width:'100%', 
    padding: scaledSize(10), 
    backgroundColor: "#494849"
  },
  modalHeader:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
  },
  closeButton:{
    height: scaledSize(30), 
    width: scaledSize(30), 
    justifyContent:'center',
    alignItems:'center'
  },
  textInputStyle:{ 
    color: "#cdcdcd", 
    fontSize: scaledSize(13),
    height: scaledSize(40),
    marginTop: scaledSize(15),
    borderRadius: scaledSize(25),
    backgroundColor:'#535353',
    paddingHorizontal: scaledSize(15),
  },
  manualSaveButtonView:{
    width: '100%',
    marginVertical: scaledSize(15),
    alignItems:'center',
    justifyContent:'center'
  },
  loaderContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  phoneContactLoader:{
    flex:1,
    alignItems:'center',
    marginTop: scaledSize(100),
  }
});
// Customizable Area End
