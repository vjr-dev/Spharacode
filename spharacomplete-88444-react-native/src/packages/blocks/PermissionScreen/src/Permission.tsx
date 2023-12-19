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
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
  
} from "react-native";
import PermissionController, { Props} from "./PermissionController";
import { back1, back2, call, camera, contact, location, mic, save, setting, check, image_back } from "./assets";
import { deviceHeight, deviceWidth, scaledSize } from "framework/src/Utilities";
export default class Thankyou extends PermissionController {
    constructor(props: Props) {
        super(props);
    }
    renderCheckBox = (isSelect: boolean) => {
      return (
        <View style={[styles.checkBoxStyle,{backgroundColor: isSelect?  "#f07233" : "#7b7773"}]}>
            {
               <Image source={check} style={[styles.checkIcon,{ tintColor:"#424742"}]} />
                   
            }
        </View>
      );
    }
    renderPermissions = (name: string, description: string, icon:any, isSelect:boolean) => {
        return (
            <TouchableOpacity
                testID="permissionButton"
                onPress={():void => this.oNPermissionCheck(name,!isSelect)}
                style={styles.permissionView}>
                <Image
                    source={icon}
                    style={styles.icon}
                />
                <View style={styles.textView}>
                    <Text style={styles.permissionName}>{name}</Text>
                    <Text style={styles.permissionDescription}>{description}</Text>
                </View>
                {this.renderCheckBox(isSelect)}
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={back1} style={styles.bgImage}>
                    <ImageBackground source={back2} style={styles.bgImage}>
                        <View style={styles.body}>
                            <View style={{flex:1}}>
                                <ScrollView>
                                    <TouchableOpacity
                                        testID="btn_goBack"
                                        style={styles.backButton}
                                        onPress={() => this.handleBackButtonClick()}
                                    >
                                        <Image source={image_back} style={styles.backIcon} />
                                    </TouchableOpacity>
                                    <Text style={styles.title}>Access Permission</Text>
                                    <Text style={styles.description}>SPHARA need these permission to give you better user experience.</Text>
                                    {this.renderPermissions("Location","For finding emergency service around you.",location,this.state.loaction)}
                                    {this.renderPermissions("Phone","Allow account security verification.",call,this.state.phone)}
                                    {this.renderPermissions("Contacts","Allow send messages to friend and family.",contact,this.state.contect)}
                                    {this.renderPermissions("Storage","Allow store data offline.",save,this.state.storage)}
                                    {this.renderPermissions("Camera","Allow capture images.",camera,this.state.camera)}
                                    {this.renderPermissions("Microphone","Allow record voice from app.",mic,this.state.microphone)}
                                    {this.renderPermissions("App setting","Allow Sphara app run in the background.",setting,this.state.appsetting)}
                                </ScrollView>
                            </View>
                            <TouchableOpacity 
                                    testID="allowButton"
                                    onPress={():void => this.onAllow()}
                                    style={styles.allowButton}
                                >
                                <Text style={styles.allowButtonLabel}> ALLOW</Text>
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
        backgroundColor: '#454545' 
    },
    bgImage: {
        height: deviceHeight, 
        width: deviceWidth,
    },
    body:{
        flex:1,
        padding: scaledSize(10),
    },
    backButton:{
        height: scaledSize(15), 
        width: scaledSize(15), 
        marginTop: scaledSize(10),
        justifyContent:'center',
        alignItems:'center'
    },
    backIcon:{
        height: scaledSize(15), 
        width: scaledSize(15), 
        tintColor: "#f07233"
    },
    title: { 
        fontSize: scaledSize(20), 
        color: "#fff", 
        marginTop: scaledSize(30),
    },
    description: { 
        fontSize: scaledSize(12), 
        color: "#cdcdcd", 
        marginVertical: scaledSize(10),  
    },
    allowButton:{
        height: scaledSize(40),
        backgroundColor: "#f07233",
        marginTop: scaledSize(10),
        marginBottom: deviceHeight *0.1,
        borderRadius: scaledSize(20),
        alignItems: "center",
        justifyContent: "center",
    },
    allowButtonLabel: { 
        fontSize: scaledSize(13), 
        color: "#fff", 
    },
    permissionView: { 
        flexDirection: "row", 
        marginVertical: scaledSize(12),
        justifyContent:'center',
        alignItems:'center' 
    },
    icon:{
        height: scaledSize(20), 
        width: scaledSize(20), 
        tintColor: "#cdcdcd" 
    },
    textView:{
        flex:1, 
        paddingHorizontal: scaledSize(10)
    },
    permissionName:{
        fontSize: scaledSize(13), 
        color: "#fff", 
    },
    permissionDescription:{
        fontSize: scaledSize(12), 
        opacity:0.6,
        color: "#fff", 
    },
	checkBoxStyle: {
		height: scaledSize(17),
		width: scaledSize(17),
		alignItems: 'center',
		justifyContent: 'center'
	},
	checkIcon: {
		height: scaledSize(10),
		width: scaledSize(10),
	},
    loaderContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      }
});
// Customizable Area End