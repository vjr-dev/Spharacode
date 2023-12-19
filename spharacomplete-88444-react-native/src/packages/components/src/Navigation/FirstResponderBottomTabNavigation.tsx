import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { home, location, timer, social } from "./assets";
import { scaledSize } from "../../../framework/src/Utilities";
import { createStackNavigator } from "@react-navigation/stack";
import FirstResponderDashboard from "../../../blocks/DashBord/src/FirstResponderDashboard";
import IncidentReport from "../../../blocks/DashBord/src/IncidentReport";
import FirstResponderLocationDirection from "../../../blocks/DashBord/src/FirstResponderLocationDirection";
import FirstResponderYourLocation from "../../../blocks/DashBord/src/FirstResponderYourLocation";
import NearBy from "../../../blocks/location/src/NearBy";
import NearbyDetails from "../../../blocks/location/src/NearbyDetails";
import FirstResponderArrivalCloseIncident from "../../../blocks/DashBord/src/FirstResponderArrivalCloseIncident";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const firstResponderHomePageStack =()=>{
  return <Stack.Navigator
  // initialRouteName={"IncidentReport"}
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="FirstResponderDashboard" component={FirstResponderDashboard} />
  <Stack.Screen name="FirstResponderLocationDirection" component={FirstResponderLocationDirection} />
  <Stack.Screen name="FirstResponderYourLocation" component={FirstResponderYourLocation} />
  <Stack.Screen name="FirstResponderArrivalCloseIncident" component={FirstResponderArrivalCloseIncident} />
  <Stack.Screen name="IncidentReport" component={IncidentReport} />
  </Stack.Navigator>
}

const firstResponderNearByPageStack =()=>{
  return <Stack.Navigator
  // initialRouteName={initialScreen}
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="NearBy" component={NearBy} />
  <Stack.Screen name="NearbyDetails" component={NearbyDetails} />
  </Stack.Navigator>
}

export default function FirstResponderBottomTabNavigation() {
  const getIcon = (route: any, focused: boolean) => {
    let icon: any;
    if (route.name === "Home") {
      icon = home;
    } else if (route.name === "Nearby") {
      icon = location;
    } else if (route.name === "Call backup") {
      icon = timer;
    } else if (route.name === "Peer Chat") {
      icon = social;
    }
    return (
      <View style={styles.tabView}>
        <View style={styles.imageView}>
          <Image
            height={scaledSize(25)}
            width={scaledSize(25)}
            source={icon}
            resizeMode="contain"
            tintColor={focused ? "#F99546" : "#707071"}
          />
        </View>

        <Text
          style={[{ color: focused ? "#F99546" : "#707071" }, styles.label]}
        >
          {route.name}
        </Text>
      </View>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return getIcon(route, focused);
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: styles.tabBarStyle,
      }}
    >
      <Tab.Screen name="Home" component={firstResponderHomePageStack} />
      <Tab.Screen name="Nearby" component={firstResponderNearByPageStack} />
      <Tab.Screen name="Call backup" component={dummyScreen} />
      <Tab.Screen name="Peer Chat" component={dummyScreen} />
      {/* <Tab.Screen
        name="Peer Chat"
        component={Chats}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("SocialBottomTabNavigation");
          },
        })}
      /> */}
    </Tab.Navigator>
  );
}
function dummyScreen(){
  return(
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text style={{color:'black'}}> Under Devlopment</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#474740",
    height: scaledSize(60),
    justifyContent: "center",
    borderTopWidth: 0,
  },
  tabView: {
    height: scaledSize(50),
    alignItems: "center",
    justifyContent: "center",
  },
  imageView: {
    height: scaledSize(25),
    width: scaledSize(25),
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: scaledSize(10),
    fontWeight: "400",
  },
});
