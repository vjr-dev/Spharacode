import React, { Component } from "react";
import { View, Dimensions, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PropTypes from "prop-types";
import { ThankyouScreen, EmergencyContact, DashBord, DonationScreen } from ".";

import TabComponent from "../BottomTabNavigation/Tab";
import { COLORS } from "../../../../framework/src/Globals";
import { RFPercentage } from "react-native-responsive-fontsize";
const { width } = Dimensions.get("window");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export function CustomDrawerContent(props: any) {
  return <SafeAreaView />;
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      navigationOptions={() => ({
        headerShown: false,
      })}
      options={{ headerShown: false }}
      drawerPosition="left"
      drawerContentOptions={{
        activeBackgroundColor: "#efefef",
        activeTintColor: "#000000",
      }}
      initialRouteName="Home"
      drawerStyle={{ backgroundColor: COLORS.black, width: "55%" }}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        screenOptions={{ drawerLabel: () => null }}
        name="BottomTab"
        component={BottomTab}
      />
    </Drawer.Navigator>
  );
};

function AppNavigator() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="DashBord" component={DashBord} />
      </Stack.Navigator>
    </View>
  );
}

function BottomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          alignSelf: "center",
          paddingBottom: 0,
          justifyContent: "space-between",
          width: width,
          paddingTop: RFPercentage(1.2),
        },
      }}
    >
      <Tab.Screen
        name="DashBord"
        component={DashBord}
        options={{
          tabBarButton: (props) => (
            <TabComponent label={"DashBord"} {...props} />
          ),
        }}
      />

      <Tab.Screen
        name="DonationScreen"
        component={DonationScreen}
        options={{
          tabBarButton: (props) => (
            <TabComponent label={"DonationScreen"} {...props} />
          ),
        }}
      />

      <Tab.Screen
        name="ThankyouScreen"
        component={ThankyouScreen}
        options={{
          tabBarButton: (props) => (
            <TabComponent label={"ThankyouScreen"} {...props} />
          ),
        }}
      />

      <Tab.Screen
        name="EmergencyContact"
        component={EmergencyContact}
        options={{
          tabBarButton: (props) => (
            <TabComponent label={"EmergencyContact"} {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;

Component.propTypes = {
  text: PropTypes.string.isRequired,
};
