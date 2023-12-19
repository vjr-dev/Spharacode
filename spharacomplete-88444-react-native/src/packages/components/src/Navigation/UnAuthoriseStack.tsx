import * as React from "react";
import SplashScreen from "react-native-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Tutorials from "../../../blocks/Tutorials/src/Tutorials";
import LoginScreen from "../../../blocks/LoginScreen/src/Login";
import SignUpScreen from "../../../blocks/SignUpScreen/src/SignUp";
import VerificationScreen from "../../../blocks/VarificationScreen/src/Verification";
import SignupOptions from "../../../blocks/SignUpScreen/src/SignupOptions";
export default function UnAuthoriseStack() {
  React.useEffect(() => {
    SplashScreen.hide(); 
  },[])
  return (
    <Stack.Navigator
      initialRouteName="Tutorials"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tutorials" component={Tutorials} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen name="SignupOptions" component={SignupOptions} />
    </Stack.Navigator>
  );
}
