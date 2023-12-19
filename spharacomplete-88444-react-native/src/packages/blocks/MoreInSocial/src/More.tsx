// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import { Component } from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as IMAGE from "./assets";
import MoreController, { Props } from "./MoreController";
import { Styles } from "./MoreStyle";

export default class More extends MoreController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={Styles.safeareaView}>
        <ImageBackground source={IMAGE.back1} style={Styles.container}>
          <ImageBackground source={IMAGE.back2} style={Styles.container}>
            <Text style={{ color: "white", paddingTop: 20 }}>More Tab</Text>
            <TouchableOpacity
              testID="moreInSocialModalButton"
              style={{ marginTop: 20 }}
              onPress={() => this.setState({ modalVisible: true })}
            >
              <Text style={{ color: "white" }}>Open Modal</Text>
            </TouchableOpacity>
            {this.state.modalVisible ? (
              <View style={Styles.shadowView} />
            ) : null}
            {this.state.modalVisible ? (
              <View style={{ flex: 1 }}>
                <View style={Styles.modalView}>
                  <View style={Styles.menuContainer}>
                    <MenuComponent
                      testID="callMenu"
                      onMenuPress={() => {}}
                      path={IMAGE.call}
                      text="Calls"
                    />
                    <MenuComponent
                      testID="botMenu"
                      onMenuPress={() => {}}
                      path={IMAGE.chatboat}
                      text="Bot"
                    />
                    <MenuComponent
                      testID="fileMenu"
                      onMenuPress={() => {}}
                      path={IMAGE.files}
                      text="Files"
                    />
                    <MenuComponent
                      testID="savedMenu"
                      onMenuPress={() => {}}
                      path={IMAGE.saved}
                      text="Saved"
                    />
                    <MenuComponent
                      testID="alertsMenu"
                      onMenuPress={() => {}}
                      path={IMAGE.alerts}
                      text="My Alerts"
                    />
                    <MenuComponent
                      testID="notificationMenu"
                      onMenuPress={() => {}}
                      path={IMAGE.notifications}
                      text="Notifications"
                    />
                    <MenuComponent
                      testID="settingslMenu"
                      onMenuPress={() => {}}
                      path={IMAGE.settings}
                      text="Settings"
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export interface MenuPropTypes {
  path: ImageSourcePropType;
  text: string;
  onMenuPress: () => void;
}
export class MenuComponent extends Component<MenuPropTypes> {
  constructor(props: MenuPropTypes) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        testID="onMenuPreeButton"
        onPress={this.props.onMenuPress}
        style={Styles.menuButton}
      >
        <Image
          source={this.props.path}
          resizeMode="contain"
          style={Styles.menuImage}
        />
        <Text style={Styles.menuText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
// Customizable Area End
