import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { home, location, timer, social } from "./assets";
import { scaledSize } from "../../../framework/src/Utilities";

import Dashboard from "../../../blocks/DashBord/src/Dashbord";
import Maps from "../../../blocks/maps/src/Maps";
import TimeToAlert from "../../../blocks/TimeToAlert/src/TimeToAlert";
import SocialBottomTabNavigation from "./SocialBottomTabNavigation";
import AmbulanceScreen from "../../../blocks/AmbulanceScreen/src/Ambulance";
import Panic from "../../../blocks/PanicScreen/src/Panic";
import FireScreen from "../../../blocks/FireScreen/src/Fire";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomepageStack =()=>{
  return <Stack.Navigator
  // initialRouteName={initialScreen}
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="Home" component={Dashboard} />
<Stack.Screen name="AmbulanceScreen" component={AmbulanceScreen} />
<Stack.Screen name="PanicScreen" component={Panic} />
<Stack.Screen name="FireScreen" component={FireScreen}/>
  </Stack.Navigator>
}
export default function BottomTabNavigation() {

  const getIcon = (route: any, focused: boolean) => {
    let icon: any;
    if (route.name === "Home") {
      icon = home;
    } else if (route.name === "I'm Here") {
      icon = location;
    } else if (route.name === "Timer") {
      icon = timer;
    } else if (route.name === "Social") {
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
       {/*  */}
      <Tab.Screen name="Home" component={HomepageStack} />
      <Tab.Screen name="I'm Here" component={Maps} />
      <Tab.Screen name="Timer" component={TimeToAlert} />
      <Tab.Screen
        name="Social"
        component={SocialBottomTabNavigation}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("SocialBottomTabNavigation");
          },
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#474740",
    height: scaledSize(60),
    justifyContent: "center",
    borderTopWidth:0
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
