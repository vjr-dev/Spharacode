import * as React from "react";
import { View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from "react-native-splash-screen";
import RNShake from "react-native-shake";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import ThankyouScreen from "../../../blocks/ThankyouScreen/src/Thankyou";
import PermissionScreen from "../../../blocks/PermissionScreen/src/Permission";
import MedicalScreen from "../../../blocks/MedicalScreen/src/Medical";
import PersonalInformation from "../../../blocks/PersonalInformation/src/PersonalInformation";
import IdentificationScreen from "../../../blocks/IdentificationScreen/src/Identification";
import EmergencyContact from "../../../blocks/EmergencyContact/src/EmergencyContact";
import AddEmergencyContact from "../../../blocks/AddEmergencyContact/src/AddEmergencyContact";
import DrawerNavigation from "./DrawerNavigation";
import UserProfileBasicBlock from "../../../blocks/user-profile-basic/src/UserProfileBasicBlock";
import EditProfile from "../../../blocks/user-profile-basic/src/editProfile";
import AlertsList from "../../../blocks/Alerts/src/AlertsList";
import Alerts from "../../../blocks/Alerts/src/Alerts";
import DonationScreen from "../../../blocks/DonationScreen/src/Donation";
import MakeDonation from "../../../blocks/MakeDonationScreen/src/MakeDonation";
import PaymentDonation from "../../../blocks/PaymentDonationScreen/src/PaymentDonation";
import StripeWebView from "../../../blocks/PaymentDonationScreen/src/StripeWebView";
import SettingScreen from "../../../blocks/Settings5/src/Settings5";
import TriggerScreen from "../../../blocks/TriggerScreen/src/Trigger";
import AlertMessageSetting from "../../../blocks/AlertMessageSetting/src/AlertMessageSetting";
import SocialMediaIntegration from "../../../blocks/SocialMediaIntegration/src/SocialMediaIntegration";
import GestureTrigger from "../../../blocks/GestureTrigger/src/GestureTrigger";
import VoiceActivation from "../../../blocks/VoiceActivation/src/VoiceActivation";
import SecuritySetting from "../../../blocks/SecuritySetting/src/SecuritySetting";
import EditSecuritySetting from "../../../blocks/SecuritySetting/src/EditSecuritySetting";
import UpdateSecuritySetting from "../../../blocks/SecuritySetting/src/UpdateSecuritySetting";
import VolunteerRegistration from "../../../blocks/VolunteerRegistration/src/VolunteerRegistration";
import VolunteerRegistrationStep1 from "../../../blocks/VolunteerRegistration/src/Step1";
import VolunteerRegistrationStep2 from "../../../blocks/VolunteerRegistration/src/Step2";
import AlarmDelay from "../../../blocks/AlarmDelay/src/AlarmDelay";
import DialDelay from "../../../blocks/DialDelay/src/DialDelay";
import AmbulanceScreen from "../../../blocks/AmbulanceScreen/src/Ambulance";
import AmbulanceNotification from "../../../blocks/AmbulanceNotification/src/AmbulanceNotification";
import FireScreen from "../../../blocks/FireScreen/src/Fire";
import FireNotification from "../../../blocks/FireNotification/src/FireNotification";
import CfCustomAlerts2 from "../../../blocks/CfCustomAlerts2/src/CfCustomAlerts2";
import Panic from "../../../blocks/PanicScreen/src/Panic";
import Costomform from "../../../blocks/costomform/src/costomform";
import Maps from "../../../blocks/maps/src/Maps";
import TimeToAlert from "../../../blocks/TimeToAlert/src/TimeToAlert";
import AlarmActive from "../../../blocks/CfCustomAlerts2/src/AlarmActive";

import SocialBottomTabNavigation from "./SocialBottomTabNavigation";
import More from "../../../blocks/MoreInSocial/src/More";
import Meetings from "../../../blocks/MeetingsInSocial/src/Meetings";
import Channels from "../../../blocks/ChannelsInSocial/src/Channels";
import Chat from "../../../blocks/ChatInSocial/src/ChatDashBoard";
import ConversationScreen from "../../../blocks/ChatInSocial/src/ConversationScreen";
import CreateNewGroup from "../../../blocks/ChatInSocial/src/CreateNewGroup";
import UsersSelection from "../../../blocks/ChatInSocial/src/UsersSelection";

import AlertRecipient from '../../../blocks/CfCustomAlerts2/src/AlarmRecipientRequest';
import AlertLocatioScreen from "../../../blocks/CfCustomAlerts2/src/AlertLocationScreen"

export default function AuthoriseStack(props:any) {
  const [initialScreen, setInitialScreen] = React.useState("HomePage");
  const [isLoad, setIsLoad] = React.useState(true);
    const getInitialData = async () => {
    const isUserActivated = await AsyncStorage.getItem("isActivated");
    const isUserEmergencyContactAdded = await AsyncStorage.getItem("isEmergencyContactNumberAdded");
    console.log("isUserEmergencyContactAdded--> ", isUserEmergencyContactAdded);
    if(isUserActivated === 'true'){
      if(isUserEmergencyContactAdded !== 'true'){
        setInitialScreen("EmergencyContact")
      }
    }else{
      setInitialScreen("PersonalInformation")
    }
    setIsLoad(false);
    SplashScreen.hide(); 
  }
  const activeGestureTrigger = async () => {
    props.navigation.navigate('AuthoriseStack', { screen: 'CfCustomAlerts2'} );
  }
  React.useEffect(() => {
    getInitialData();
    RNShake.addListener(():any => activeGestureTrigger())
   
  },[])
  if(isLoad){
    return (<View/>);
  }
  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomePage" component={DrawerNavigation} />
      <Stack.Screen name="ThankyouScreen" component={ThankyouScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      <Stack.Screen name="MedicalScreen" component={MedicalScreen} />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <Stack.Screen
        name="IdentificationScreen"
        component={IdentificationScreen}
      />
      <Stack.Screen name="EmergencyContact" component={EmergencyContact} />
      <Stack.Screen
        name="AddEmergencyContact"
        component={AddEmergencyContact}
      />
      <Stack.Screen
        name="UserProfileBasicBlock"
        component={UserProfileBasicBlock}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AlertsList" component={AlertsList} />
      <Stack.Screen name="Alerts" component={Alerts} />
      <Stack.Screen name="DonationScreen" component={DonationScreen} />
      <Stack.Screen name="MakeDonation" component={MakeDonation} />
      <Stack.Screen name="PaymentDonation" component={PaymentDonation} />
      <Stack.Screen name="StripeWebView" component={StripeWebView} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="TriggerScreen" component={TriggerScreen} />
      <Stack.Screen
        name="AlertMessageSetting"
        component={AlertMessageSetting}
      />
      <Stack.Screen
        name="SocialMediaIntegration"
        component={SocialMediaIntegration}
      />
      <Stack.Screen name="GestureTrigger" component={GestureTrigger} />
      <Stack.Screen
        name="VolunteerRegistration"
        component={VolunteerRegistration}
      />
      <Stack.Screen
        name="VolunteerRegistrationStep1"
        component={VolunteerRegistrationStep1}
      />
      <Stack.Screen
        name="VolunteerRegistrationStep2"
        component={VolunteerRegistrationStep2}
      />
      <Stack.Screen name="VoiceActivation" component={VoiceActivation} />
      <Stack.Screen name="SecuritySetting" component={SecuritySetting} />
      <Stack.Screen
        name="EditSecuritySetting"
        component={EditSecuritySetting}
      />
      <Stack.Screen
        name="UpdateSecuritySetting"
        component={UpdateSecuritySetting}
      />
      <Stack.Screen name="AlarmDelay" component={AlarmDelay} />
      <Stack.Screen name="DialDelay" component={DialDelay} />
      <Stack.Screen name="AmbulanceScreen" component={AmbulanceScreen} />
      <Stack.Screen
        name="AmbulanceNotification"
        component={AmbulanceNotification}
      />
      <Stack.Screen name="FireScreen" component={FireScreen} />
      <Stack.Screen name="FireNotification" component={FireNotification} />
      <Stack.Screen name="CfCustomAlerts2" component={CfCustomAlerts2} />
      <Stack.Screen name="PanicScreen" component={Panic} />
      <Stack.Screen name="Costomform" component={Costomform} />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen name="TimeToAlert" component={TimeToAlert} />
      <Stack.Screen name="AlarmActive" component={AlarmActive} />
      <Stack.Screen
        name="SocialBottomTabNavigation"
        component={SocialBottomTabNavigation}
      />
      <Stack.Screen name="Channels" component={Channels} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ConversationScreen" component={ConversationScreen} />
      <Stack.Screen name="UsersSelection" component={UsersSelection} />
      <Stack.Screen name="CreateNewGroup" component={CreateNewGroup} />
      <Stack.Screen name="Meetings" component={Meetings} />
      <Stack.Screen name="More" component={More} />

      <Stack.Screen name="AlertRecipient" component={AlertRecipient} />
      <Stack.Screen name="AlertLocatioScreen" component={AlertLocatioScreen} />
    </Stack.Navigator>
  );
}
