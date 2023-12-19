// index.js - MOBILE
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { AppRegistry, Platform } from "react-native";
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import {App} from './App';

async function showNotification(remoteMessage) {
  const notification  = JSON.parse(remoteMessage?.data?.notification);
  const body = notification?.body;
  const sound = notification?.sound ;
  if(Platform.OS == 'ios'){
    PushNotification.localNotification({
      message: body ,
      userInfo: remoteMessage?.data,
      priority: "high",
      vibrate: true,
      playSound: true,
      soundName: `${sound}.wav`
    });
  }else{
   PushNotification.createChannel(
    {
      channelId: sound,
      channelName: 'SpharaComplete',
      channelDescription: 'Sphara Messages',
      playSound: true,
      soundName: sound ,
      vibrate: true,
    },
    (created) => {
      PushNotification.localNotification({
        channelId:  sound ,
        message: body ,
        userInfo:remoteMessage?.data,
        priority: "high",
        vibrate: true,
        playSound: true,
        soundName: sound
      });
    },
  );
  }
  
}

messaging().setBackgroundMessageHandler(async (remotebackground) => {
  console.log("Your message in background!", remotebackground)
  showNotification(remotebackground);
})

const snapshots = false;
if(snapshots){
  require('./indexSnapshot');
}
else {
  AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
}
