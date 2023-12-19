import * as React from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import FirstResponderDrawerNavigation from "../../../components/src/Navigation/FirstResponderDrawerNavigation"
import ThankyouScreen from "../../../blocks/ThankyouScreen/src/Thankyou";
import Authentication from "../../../blocks/VarificationScreen/src/Authentication";
import RegistrationSuccessScreen from "../../../blocks/ThankyouScreen/src/RegistrationSuccessScreen"
import PermissionScreen from "../../../blocks/PermissionScreen/src/Permission";
import IdentificationScreen from "../../../blocks/IdentificationScreen/src/Identification";
import PersonalInformation from "../../../blocks/PersonalInformation/src/PersonalInformation";
import FirstResponderProfile from "../../../blocks/user-profile-basic/src/FirstResponderProfile";
import ChangePhoneNumber from "../../../blocks/user-profile-basic/src/ChangePhoneNumber";
import NewPhoneNumberVerification from "../../../blocks/user-profile-basic/src/NewPhoneNumberVerification"
import EditProfile from "../../../blocks/user-profile-basic/src/editProfile";
import AlertRecipient from '../../../blocks/CfCustomAlerts2/src/AlarmRecipientRequest';
import RejectAlert from "../../../blocks/CfCustomAlerts2/src/RejectAlert";
import History from "../../../blocks/Settings5/src/History";
import HistoryDetails from "../../../blocks/Settings5/src/HistoryDetails";

import TrackedHours from "../../../blocks/DashBord/src/TrackedHours";

import FirstResponderAppSetting from "../../../blocks/Settings5/src/FirstResponderAppSetting";
import FirstResponderSetWorkingHours from "../../../blocks/Settings5/src/FirstResponderSetWorkingHours";
import SecuritySetting from "../../../blocks/SecuritySetting/src/SecuritySetting";
import ConversationScreen from "../../../blocks/ChatInSocial/src/ConversationScreen";
export default function AuthoriseStackFirstResponder(props: any) {
  const [initialScreen, setInitialScreen] = React.useState("FirstResponderHomePage");
  const [isLoad, setIsLoad] = React.useState(true);
    const getInitialData = async () => {
    const isUserActivated = await AsyncStorage.getItem("isActivated");
    const is_user_authorized = await AsyncStorage.getItem("is_user_authorized");
    const has_user_credential = await AsyncStorage.getItem("has_user_credential");

    if(is_user_authorized == "true"){
      if(isUserActivated == "true"){
        if(has_user_credential != "true"){
          setInitialScreen("IdentificationScreen")
        }
      }else{
        setInitialScreen("PersonalInformation")
      }
    }else{
      setInitialScreen("Authentication")
    }

    setIsLoad(false);
    SplashScreen.hide(); 
  }

  React.useEffect(() => {
    getInitialData();
  },[])
  if(isLoad){
    return (<View/>);
  }

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{ headerShown: false }}
    > 
      <Stack.Screen name="FirstResponderHomePage" component={FirstResponderDrawerNavigation} />
      <Stack.Screen name="ThankyouScreen" component={ThankyouScreen} />
      <Stack.Screen name="Authentication" component={Authentication} />
      <Stack.Screen name="RegistrationSuccessScreen" component={RegistrationSuccessScreen} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
       <Stack.Screen
        name="IdentificationScreen"
        component={IdentificationScreen}
      />
      <Stack.Screen name="FirstResponderProfile" component={FirstResponderProfile} />
      <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} />
      <Stack.Screen name="NewPhoneNumberVerification" component={NewPhoneNumberVerification} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AlertRecipient" component={AlertRecipient} />
      <Stack.Screen name="RejectAlert" component={RejectAlert} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
      <Stack.Screen name="TrackedHours" component={TrackedHours} />
      <Stack.Screen name="FirstResponderAppSetting" component={FirstResponderAppSetting} />
      <Stack.Screen name="FirstResponderSetWorkingHours" component={FirstResponderSetWorkingHours} />
      <Stack.Screen name="SecuritySetting" component={SecuritySetting} />
      <Stack.Screen name="ConversationScreen" component={ConversationScreen} />
    </Stack.Navigator>
  );
}
