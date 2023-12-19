import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { channel, chat, meeting, more } from "./assets";
import { scaledSize } from "../../../framework/src/Utilities";
import Channels from "../../../blocks/ChannelsInSocial/src/Channels";
import Chats from "../../../blocks/ChatInSocial/src/ChatDashBoard";
import Meetings from "../../../blocks/MeetingsInSocial/src/Meetings";
import More from "../../../blocks/MoreInSocial/src/More";

const Tab = createBottomTabNavigator();

export default function SocialBottomTabNavigation() {
  const getIcon = (route: any, focused: boolean) => {
    let icon: any;
    if (route.name === "Channels") {
      icon = focused ? channel : channel;
    } else if (route.name === "Chat") {
      icon = focused ? chat : chat;
    } else if (route.name === "Meetings") {
      icon = focused ? meeting : meeting;
    } else if (route.name === "More") {
      icon = focused ? more : more;
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
      <Tab.Screen name="Channels" component={Channels} />
      <Tab.Screen name="Chat" component={Chats} />
      <Tab.Screen name="Meetings" component={Meetings} />
      <Tab.Screen name="More" component={More} />
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
