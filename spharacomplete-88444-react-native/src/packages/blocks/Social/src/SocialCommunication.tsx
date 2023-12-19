// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React, { Component } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createBottomTabNavigator, createStackNavigator
 } from "react-navigation";
import Channels from "../../ChannelsInSocial/src/Channels";
import Chat from "../../ChatInSocial/src/Chat";
import ConversationScreen from "../../ChatInSocial/src/ConversationScreen";
import NewChat from "../../ChatInSocial/src/NewChat";
import GroupProfileChatScreen from "../../GroupProfileChat/src/GroupProfileChat";
import Meetings from "../../MeetingsInSocial/src/Meetings";
import More from "../../MoreInSocial/src/More";
import ProfileChat from "../../ProfileChat/src/ProfileChat";
import * as IMAGE from "./assets";
import ChatDashBoard from "../../ChatInSocial/src/ChatDashBoard";
import UsersSelection from "../../ChatInSocial/src/UsersSelection";
import CreateNewGroup from "../../ChatInSocial/src/CreateNewGroup";

const HomeStack = createBottomTabNavigator(
  {
    Channels: {
      screen: Channels,
      navigationOptions: { header: null, title: "Channels" },
    },
    Chat: { screen: ChatDashBoard, navigationOptions: { header: null, title: "Chat" } },
    Meetings: {
      screen: Meetings,
      navigationOptions: { header: null, title: "Meetings" },
    },
    More: { screen: More, navigationOptions: { title: "More", header: null } },
    ProfileChat: {
      screen: ProfileChat,
      navigationOptions: {
        title: "ProfileChat",
        tabBarVisible: false,
        header: null,
      },
    },
    GroupProfileChatScreen: {
      screen: GroupProfileChatScreen,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        title: "GroupProfileChatScreen",
      },
    },
    ConversationScreen: {
      screen: ConversationScreen,
      navigationOptions: {
        title: "ConversationScreen",
        tabBarVisible: false,
        header: null,
      },
    },
    UsersSelection: {
      screen: UsersSelection,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        title: "UsersSelection",
      },
    },
    CreateNewGroup: {
      screen: CreateNewGroup,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
        title: "CreateNewGroup",
      },
    },
  },
  {
    tabBarComponent: (props: any) => {
      const activeTabIndex: number = props.navigation.state.index;
      return (
        <View
          style={{
            height: 80,
            paddingVertical: 25,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#474740",
          }}
        >
          <TabBarComponent
            path={IMAGE.hash}
            text="Channels"
            activeTab={activeTabIndex}
            tabId={0}
            onTabPress={() => props.navigation.navigate("Channels")}
          />
          <TabBarComponent
            testID="TabChatID"
            path={IMAGE.chat}
            text="Chat"
            activeTab={activeTabIndex}
            tabId={1}
            onTabPress={() => props.navigation.navigate("Chat")}
          />
          <TabBarComponent
            path={IMAGE.meeting}
            text="Meetings"
            activeTab={activeTabIndex}
            tabId={2}
            onTabPress={() => props.navigation.navigate("Meetings")}
          />
          <TabBarComponent
            path={IMAGE.more}
            text="More"
            activeTab={activeTabIndex}
            tabId={3}
            onTabPress={() => props.navigation.navigate("More")}
          />
        </View>
      );
    },
  }
);

export default class SocialCommunication extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const screenProps: any = {
      navigationProp: this.props.navigation.state.params.navigationProp,
    };

    return <HomeStack screenProps={screenProps} />;
  }
}
export interface TabBarTypes {
  path: ImageSourcePropType;
  text: string;
  activeTab: number;
  tabId: number;
  onTabPress: () => any;
}
export class TabBarComponent extends Component<TabBarTypes> {
  constructor(props: TabBarTypes) {
    super(props);
  }

  colorTint = () => {
    if (this.props.activeTab == this.props.tabId) {
      return "rgb(255, 255, 255)";
    } else {
      return "rgb(255, 255, 256)";
    }
  };
  render() {
    return (
      <TouchableOpacity
        testID="TabID"
        onPress={this.props.onTabPress}
        style={Styles.tabBarButton}
      >
        <Image
          source={this.props.path}
          resizeMode="contain"
          style={[Styles.tabBarImage, { tintColor: this.colorTint() }]}
        />
        <Text
          style={[
            Styles.tabBarText,
            {
              color: this.colorTint(),
            },
          ]}
        >
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
const Styles = StyleSheet.create({
  tabBarButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarImage: {
    width: 23,
    height: 23,
  },
  tabBarText: {
    fontWeight: "500",
  },
});
// Customizable Area End
