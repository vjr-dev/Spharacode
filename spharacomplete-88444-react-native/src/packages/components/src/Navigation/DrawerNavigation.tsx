import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  TouchableOpacity
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView,} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Progress from 'react-native-progress';
import { COLORS } from "../../../framework/src/Globals"
import BottomTabNavigation from './BottomTabNavigation';
import { scaledSize } from '../../../framework/src/Utilities';
import { home, profile, donation, alert, setting, help } from './assets';
import { GotoHomePage } from './NavigationFunctions';
const baseURL = require("../../../framework/src/config")

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
			drawerContentOptions={{
				activeTintColor: '#e91e63',
				itemStyle: {marginVertical: 5},
			}}
			drawerContent={(props) => <CustomSidebarMenu {...props} />}
		>
			<Drawer.Screen name="Home" component={BottomTabNavigation} />
    </Drawer.Navigator>
  );
}

const CustomSidebarMenu = (props: any) => {
  const [accountType, setAccountType] = useState(0);
	const [userData, setUserData] = useState<any>('');
	const [percentage, setPercentage] = useState<number>(0);
  useEffect(() => {
    getUserData();
  },[props]);
	const getUserData = async () => {
		const tempUserData = await AsyncStorage.getItem("User_Data");
		const tempPercent = await AsyncStorage.getItem("Percentage")
		if(tempUserData){
			const tempData = JSON.parse(tempUserData);
			setUserData(tempData);
			if(tempData?.data?.attributes?.account_type === "first_responder"){
				setAccountType(1);
			}else{
				setAccountType(0);
			}
		}
		if(tempPercent){
			setPercentage(Number(JSON.parse(tempPercent)?.split('%')[0]));
		}
	}

	const onChangeAccountType = async(type: number) => {
		setAccountType(type);
		const token = await AsyncStorage.getItem("Token")
		const header = {
			"Content-Type": "application/json",
			token: token,
			redirect: 'follow'
		}
		const body = {
			data:{
				attributes:{
					account_type:type
				}
			}
		}
		fetch(`${baseURL.baseURL}/account_block/accounts/set_volunteer`, {
			method: 'PUT',
			headers: header,
			body: JSON.stringify(body)
		}).then(async (res) => {
			let response = await res.json()
			await AsyncStorage.setItem("User_Data", JSON.stringify(response.account))
			await getUserData();    
		}).catch((e) => {
			Alert.alert("","Something went wrong")
		})
	}
	
	const screenButton = (fn:Function,image: any, label:string ) => {
		return(
			<TouchableOpacity
				onPress={() => {
					props.navigation.closeDrawer();
					fn();
				}}
				style={styles.screenButton}>
				<Image
					source={image}
					resizeMode="contain"
					style={{ tintColor: label === 'Home' ? "#F99546" : "#7A7776" }} />
				<Text style={[styles.screenButtonLabel,{color:label === 'Home' ? "#F99546":"#7A7776"}]}>{label}</Text>
			</TouchableOpacity>
		);
	}
	const onHomePress = () => {
		GotoHomePage(props);
	}
	const onProfilePress = () => {
		props.navigation.navigate("UserProfileBasicBlock");
	}
	const onAlertsPress = () => {
		props.navigation.navigate("AlertsList");
	}
	const onDonationPress = () => {
		props.navigation.navigate("DonationScreen");
	}
	const onSettingPress = () => {
		props.navigation.navigate("SettingScreen");
	}
	const onHelpPress = () => {

	}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#494949'}}>
       
			<View style={styles.profileMainView}>
				<Image
					source={{
						uri: userData?.data?.attributes?.profile_image_url ? userData?.data?.attributes?.profile_image_url : "https://cdn.landesa.org/wp-content/uploads/default-user-image.png",
					}}
					style={styles.profileImage} 
				/>
				<Text style={styles.userId}>{userData?.data?.attributes?.unique_auth_id}</Text>           
				<Text style={styles.userName}>{userData?.data?.attributes?.first_name} {userData?.data?.attributes?.last_name}</Text>
        <Text style={styles.userPhone}>{userData?.data?.attributes?.full_phone_number}</Text>
				<Progress.Bar 
					style={styles.progressBarStyle}
					progress={percentage/100}
					width={null}
					color="#F99546"
					unfilledColor="#525252"
					borderWidth={0}
				/>
				<View style={styles.progressBarLabelView}>
          <Text style={styles.progressBarLabel}>{`${percentage}% completed`}</Text>
        </View>
			</View>
      
      <DrawerContentScrollView {...props}>
				<View style={styles.screenListView}>
					{screenButton(onHomePress, home, "Home")}
					{screenButton(onProfilePress, profile, "Profile")}
					{screenButton(onAlertsPress, alert, "Alerts")}
					{screenButton(onDonationPress, donation, "Donation")}
					{screenButton(onSettingPress, setting, "Settings")}
					{screenButton(onHelpPress, help, "Help")}
				</View>
      </DrawerContentScrollView>
			<View style={styles.bottomView}>
				<View style={styles.switchBackGround}>
					<TouchableOpacity
							onPress={() => {
								if(accountType === 1){
									onChangeAccountType(0);
								}
							}}
							style={[styles.switchView, { backgroundColor: accountType == 0 ? COLORS.darkorange : COLORS.darkGray }]}>
						<Text style={[styles.switchLabel, { color: accountType == 0 ? COLORS.white: COLORS.infoGray }]}>Civilians</Text>
					</TouchableOpacity>             
					<TouchableOpacity
						onPress={() => {
							if(accountType === 0){
								onChangeAccountType(1);
							}
						}}
						style={[styles.switchView, { backgroundColor: accountType == 1 ? COLORS.darkorange : COLORS.darkGray }]}>
						<Text style={[styles.switchLabel, { color: accountType == 1 ? COLORS.white: COLORS.infoGray }]}>First Responder</Text>
					</TouchableOpacity>
				</View>
			</View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	profileMainView:{
		width:'100%',
		padding:scaledSize(10),
		alignItems:'center',
		justifyContent:'center',
		borderBottomWidth:1,
		borderColor:COLORS.darkGray,
	},
	profileImage:{
		height:scaledSize(70),
		width:scaledSize(70),
		borderRadius:scaledSize(35),
	},
	userId: {
    color: "#D5D3D3",
    fontSize: scaledSize(13),
    marginTop: scaledSize(10)
  },
  userPhone: {
    color: "#D5D3D3",
    fontSize: scaledSize(10),
    marginTop: scaledSize(2)
  },
  userName: {
    color: "#A9A8A3",
    fontSize: scaledSize(17),
  },
	progressBarStyle:{
		height: scaledSize(3),
		width: "75%",
		marginTop: scaledSize(10)
	},
	progressBarLabelView:{
		width:"100%", 
		alignItems:'flex-end', 
		marginTop: scaledSize(5) 
	},
	progressBarLabel:{
		color: "#757575", 
		fontSize: scaledSize(10),
	},
	screenListView:{
		paddingVertical:scaledSize(10),
	},
	screenButton: {
    flexDirection: "row",
    width: "100%",
    height: scaledSize(40),
		paddingLeft:scaledSize(30),
		paddingRight:scaledSize(10),
    alignItems: "center"
  },
  screenButtonLabel: {
    color: "#7A7776",
    fontSize: scaledSize(15),
    marginLeft: scaledSize(25),
  },
	bottomView:{
		width:"100%",
		height:scaledSize(30),
		marginBottom:scaledSize(10),
		alignItems:'center',
		justifyContent:'center'
	},
	switchBackGround:{
		flexDirection:'row',
		borderRadius:scaledSize(15),
		backgroundColor: COLORS.darkGray,
	},
  switchView: {
    borderRadius: scaledSize(15),
		height:scaledSize(30),
		paddingHorizontal:scaledSize(10),
    alignItems: "center",
    justifyContent: "center"
  },
  switchLabel: {
    fontSize:scaledSize(13),
		fontWeight:'400'
  }
});