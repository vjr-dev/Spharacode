import React, { useEffect, useState } from 'react';
console.disableYellowBox = true;
import { View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import { cometChatInitialization } from '../components/src/CometChatCommonFunctions';

import HomeScreen from "../components/src/HomeScreen";
import UnAuthoriseStack from '../components/src/Navigation/UnAuthoriseStack';
import AuthoriseStack from '../components/src/Navigation/AuthoriseStack';
import AuthoriseStackFirstResponder from '../components/src/Navigation/AuthorisedStackFirstResponder'
export const rootNavigationRef = React.createRef();


export function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [roleID, setRoleID] = useState('');
  const [isLoad, setIsLoad] = useState(true);
  async function handleForeGroundNotification(remoteMessage: any){
    const tempRoleID = await AsyncStorage.getItem("roleID");
    await AsyncStorage.setItem('user_latitude', remoteMessage.data.user_latitude);
    await AsyncStorage.setItem('user_longitude', remoteMessage.data.user_longitude);
    await AsyncStorage.setItem('user_address', remoteMessage.data.address);
    await AsyncStorage.setItem('user_name', remoteMessage.data.name ?? '');
    await AsyncStorage.setItem('user_message', remoteMessage.data.message);
    await AsyncStorage.setItem('panic_situation_id', JSON.stringify(remoteMessage.data.push_notificable_id));
    await AsyncStorage.setItem('Distance', remoteMessage.data.distance);
    await AsyncStorage.setItem('IncidentType', remoteMessage.data.notify_type)

    if (remoteMessage.data.message === 'Panic Incident has been created' ||
      remoteMessage.data.message === 'Ambulance Report has been created' ||
      remoteMessage.data.message === 'Fire Incident has been created' ||
      remoteMessage.data.message === 'Emergency Assistance has been created') {
        let tempStack;
        if(tempRoleID === '1'){
          tempStack = "AuthoriseStackFirstResponder";
        }else{
          tempStack = "AuthoriseStack";
        }
        rootNavigationRef?.current?.navigate(tempStack, { screen: 'AlertRecipient', params:{alertDetails:remoteMessage.data}})

    }

    if (remoteMessage.data.notify_type === 'PanicIncident Accepted' ||
      remoteMessage.data.notify_type === 'FireIncident Accepted' ||
      remoteMessage.data.notify_type === 'AmbulanceReport Accepted' ||
      remoteMessage.data.notify_type === 'EmergencyAssistance Accepted') {
      await AsyncStorage.setItem("IsNotify", "true")
      await AsyncStorage.setItem("NotifyName", remoteMessage.data.name)
      alert(remoteMessage.data.message)
      await AsyncStorage.setItem("MyGrpData", remoteMessage?.data?.group_information)
      await AsyncStorage.setItem("MyAcceptedUserData", JSON.stringify(remoteMessage?.data))  
      const group_information= JSON.parse(remoteMessage?.data?.group_information);
      const user_profile_info = JSON.parse(remoteMessage?.data?.user_profile_info)
      const params = {
        userName: remoteMessage?.data?.name,
        profileImageURL:user_profile_info.sender?.profile_image,
        distance: remoteMessage?.data?.distance,
        description : user_profile_info.receiver?.summery,
        latitude: remoteMessage?.data?.user_latitude,
        longitude: remoteMessage?.data?.user_longitude,
        group_information: group_information,
        isAlertSender: true
      }
      rootNavigationRef?.current?.navigate('AuthoriseStack', { screen: 'AlertLocatioScreen', params})
    }
  }
  const getIsUserLogIn = async () => {
    const roleID = await AsyncStorage.getItem("roleID");
    if(roleID){
      setRoleID(roleID);
    }
    const isUserLoggedIn = await AsyncStorage.getItem("isLogin");
    if(isUserLoggedIn === 'true'){
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
    setIsLoad(false)
  }
  useEffect(() => {
    (async()=>{
      await getIsUserLogIn();
      cometChatInitialization().then((response: any)=>{
        console.log(response?.message);
      })
      .catch((error: any)=>{
        console.log(error?.message)
      })
      await getFcmToken();
      await PushNotification.configure({
        onRegister: function (token: string) {
          console.log("TOKEN:", token);
        },
        onNotification: async function (notification: any) {
          await handleForeGroundNotification(notification);
        },
        onAction: function (notification: any) {
          console.log("NOTIFICATION:", notification);
        },
        onRegistrationError: function (err: any) {
          console.error(err.message, err);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
    })();
  }, [])

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log("onNotificationOpenedApp---> ", remoteMessage)
  });


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log("onMessage---> ", remoteMessage)
    });
    return unsubscribe;
  }, []);

  const getFcmToken = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    if (enabled) {
      messaging()
        .getToken()
        .then(async(fcmtoken) => {
          console.log('FCMTOKEN',fcmtoken)
          await AsyncStorage.setItem('fcmToken', fcmtoken);

        }).catch(err => {
          console.log('err', err)

        })
    } else {
      console.log('enabled', enabled)
    }
  }

  if(isLoad){
    return (<View/>);
  }
  return (
    <>
      <NavigationContainer ref={rootNavigationRef} >
        <Stack.Navigator initialRouteName={isLogin? roleID==="1"? "AuthoriseStackFirstResponder" : "AuthoriseStack" : "UnAuthoriseStack"} screenOptions={{headerShown: false}}>
          <Stack.Screen name="UnAuthoriseStack" component={UnAuthoriseStack} />
          <Stack.Screen name="AuthoriseStack" component={AuthoriseStack} />
          <Stack.Screen name="AuthoriseStackFirstResponder" component={AuthoriseStackFirstResponder} />
          <Stack.Screen name="Adoptors" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};