// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  ActivityIndicator
} from "react-native";
import { COLORS } from "framework/src/Globals";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AddEmergencyContactController, {
  Props,
} from "./AddEmergencyContactController";
import { back1, back2, image_back, Profile } from "./assets";
import { scaledSize } from "../../../framework/src/Utilities";
import { deviceHeight, deviceWidth } from "framework/src/Utilities";
import { displayConfirmAlert } from "../../../components/src/CustomAlert";

export default class AddEmergencyContact extends AddEmergencyContactController {
  constructor(props: Props) {
    super(props);
  }

  getContactType = (type) => {
    if( type === 'emergency_contact'){
      return "Emergency Contact"
    }else if(type === 'friends'){
      return 'Friends'
    }else{
      return 'Family'
    }
  }
  renderItem = (item) => {
    return (
      <View style={styles.itemView}>
        <View style={ styles.itemInnerView}>
          <Image
            source={Profile}
            style={styles.profileImage}
          />
          <View style={styles.textView}>
            <View style={{flex:1}}>
              <Text style={styles.name} numberOfLines={1}>{item.attributes.name}</Text>
              <Text testID={"phoneNumberText"} style={styles.number} numberOfLines={1}>{item.attributes.phone_number}</Text>
              <Text style={styles.contactType} numberOfLines={1}>{this.getContactType(item.attributes.contact_type)} </Text>
            </View>
            {this.state.ListData.length == 1 ? null : (
            <TouchableOpacity
              testID="addEmergencyContactDeleteButton"
              onPress={() => this.deleteItemConfirmation(item)}
              style={styles.deleteButton}
            >
              <MaterialIcon name="close" color={COLORS.black} size={scaledSize(17)} />
            </TouchableOpacity>
          )}
          </View>
        </View>
      </View>
    );
  };
  deleteItemConfirmation(item: any) {
    displayConfirmAlert("Are you sure?","Do you want to Delete Emergency contact?", ()=> this.deleteContacts(item.id))
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={back1} style={styles.bgImage}>
          <ImageBackground source={back2} style={styles.bgImage}>
            <View style= {styles.body}>
              <View style={styles.headerView} >
                <TouchableOpacity
                  testID="addEmergencyContactBackButton"
                  style={styles.backButton}
                  onPress={() => this.handleBackButtonClick()}
                >
                  <Image
                    source={image_back}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
                
                <TouchableOpacity
                  testID="addEmergencyContactOpenAddNewModalButton"
                  onPress={() => this.onAddNewContacts()}
                  style={styles.addNewButton}
                >
                  <Text style={styles.addNewLabel}> ADD NEW </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.title}> Add Emergency Contacts.</Text>
              <Text style={styles.label}>
                Your emergency contacts will receive your message  when you trigger the panic button.
              </Text>
              <View style={styles.contactView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {
                    this.state.ListData.map((item: any)=>{
                      return (this.renderItem(item));
                    })
                  }
                </ScrollView>
              </View>
              <TouchableOpacity
                testID="addEmergencyContactDoneButton"
                onPress={() => {
                  this.onDoneClick();
                }}
                style={styles.doneButton}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>DONE</Text>
              </TouchableOpacity>
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
    flex: 1,
  },
  body:{
    flex:1,
    padding: scaledSize(10),
  },
  headerView:{
    height: scaledSize(30),
    width: "100%",
    marginVertical: scaledSize(10),
    justifyContent: "space-between",
    alignItems:'center',
    flexDirection: "row",
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
  addNewButton:{
    height: scaledSize(30), 
    paddingHorizontal: scaledSize(10),
    justifyContent:'center',
    alignItems:'center'
  },
  addNewLabel:{
    color: "#f07233", 
    fontSize: scaledSize(13), 
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
  contactView:{
    flex:1,
    paddingVertical: scaledSize(10)
  },
  doneButton:{
    height: scaledSize(40),
    width: "100%",
    marginBottom: scaledSize(15),
    backgroundColor: "#f07233",
    borderRadius: scaledSize(20),
    alignItems: "center",
    justifyContent: "center",
  },
  itemView:{
    alignSelf: "center",
    marginVertical: scaledSize(5),
    alignItems: "center",
  },
  itemInnerView:{
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'center'
  },
  profileImage:{
    height: scaledSize(40),
    width: scaledSize(40),
    marginRight: scaledSize(10),
    borderRadius: scaledSize(20),
  },
  textView:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingBottom: scaledSize(5),
    borderBottomWidth: 0.5,
    borderColor:"#adadad"
  },
  name:{
    color: "#adadad", 
    fontSize: scaledSize(12)
  },
  number:{
    color: "#adadad", 
    fontSize: scaledSize(11)
  },
  contactType:{
    color: "#adadad", 
    fontSize: scaledSize(10)
  },
  deleteButton:{
    height: scaledSize(20),
    width: scaledSize(20),
    marginRight: scaledSize(20),
    marginLeft: scaledSize(10),
    backgroundColor: "#adadad",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scaledSize(10),
  },
  loaderContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
// Customizable Area End
