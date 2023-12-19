import AsyncStorage from "@react-native-async-storage/async-storage";
import { logOutFromChat } from "../CometChatCommonFunctions";
import messaging from "@react-native-firebase/messaging";
import RNShake from "react-native-shake";

export const OnLogOut = async (props: any) => {
  await AsyncStorage.clear();
  await logOutFromChat()
  await messaging().deleteToken();
  RNShake.removeAllListeners()
  props.navigation.replace('UnAuthoriseStack', { screen: 'LoginScreen' });
}