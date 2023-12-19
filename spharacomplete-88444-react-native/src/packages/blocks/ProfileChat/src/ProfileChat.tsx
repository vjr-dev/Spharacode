// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  Text,
  ImageBackground,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Switch,
  ScrollView,
} from "react-native";
import ChatController, { configJSON } from "./ProfileChatController";
import { Styles } from "./ProfileChatStyle";
import { COLORS } from "framework/src/Globals";
import { RFValue } from "react-native-responsive-fontsize";
import {
  back1,
  back2,
  image_back,
  User,
  video,
  call,
  share,
  option,
  Next,
} from "./assets";
import { styles } from "react-native-element-timer/src/Timer/styles";
import * as IMAGE from "./assets";

const windowWidth = Dimensions.get("window").width;

export default class Chat extends ChatController {
  renderItem = (item: any) => (
    <View style={{ marginRight: RFValue(25) }}>
      <Image
        source={item.img ? item.img : IMAGE.User}
        style={Styles.userImages}
      />
      <Text numberOfLines={1} style={Styles.userNameText}>
        {item.name}
      </Text>
    </View>
  );

  render() {
    return (
      <ImageBackground source={back1} style={Styles.container}>
        <ImageBackground source={back2} style={Styles.container}>
          <SafeAreaView style={{ alignItems: "center" }}>
            <ScrollView>
              <View style={{ width: windowWidth, flexDirection: "row" }}>
                <TouchableOpacity
                  testID="btn_back"
                  onPress={() => this.redirectToChat()}
                  style={Styles.iconImageBackView}
                >
                  <Image source={image_back} style={Styles.iconImageBack} />
                </TouchableOpacity>
                <View style={{ width: "70%" }}>
                  <Text style={{ color: COLORS.white }}>
                    {configJSON.userName}
                  </Text>
                  <Text style={{ color: COLORS.lightwhite }}>
                    {configJSON.userActive}
                  </Text>
                </View>
                <TouchableOpacity style={{ width: "15%" }} />
              </View>
              <View>
                <Image source={User} style={Styles.userImage} />
              </View>
              <View style={[Styles.videoView, { width: windowWidth / 1.5 }]}>
                <TouchableOpacity style={Styles.videoImageView}>
                  <Image source={video} style={styles.videoImage} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.callView}>
                  <Image source={call} style={Styles.callImage} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.shareView}>
                  <Image source={share} style={Styles.shareImage} />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btn_showModal"
                  onPress={() => this.showModal(true)}
                  style={Styles.optionView}
                >
                  <Image source={option} style={Styles.optionImage} />
                </TouchableOpacity>
              </View>
              <Text style={Styles.settingText}>Settings</Text>
              <View style={{ backgroundColor: "#363636", width: "100%" }}>
                <View style={[Styles.muteChatView, { width: windowWidth }]}>
                  <Text style={Styles.muteChatText}>{configJSON.muteChat}</Text>
                  <Switch
                    testID="btn_switch"
                    style={{ right: 10 }}
                    trackColor={{
                      false: COLORS.black,
                      true: COLORS.darkorange,
                    }}
                    thumbColor={COLORS.white}
                    ios_backgroundColor="#000"
                    onValueChange={(Vala) => this.onSwitch(Vala)}
                    value={this.state.switch1}
                  />
                </View>
                <View style={[Styles.favoriteChatView, { width: windowWidth }]}>
                  <Text style={Styles.favoriteText}>
                    {configJSON.favoriteChat}
                  </Text>
                  <Switch
                    testID="btn_favSwitch"
                    style={{ right: 10 }}
                    trackColor={{
                      false: COLORS.black,
                      true: COLORS.darkorange,
                    }}
                    thumbColor={COLORS.white}
                    ios_backgroundColor="#000"
                    onValueChange={(Vala) => this.onFavSwitch(Vala)}
                    value={this.state.switch2}
                  />
                </View>
                <View style={[Styles.notificationView, { width: windowWidth }]}>
                  <Text style={Styles.notificationText}>
                    {configJSON.notifiaction}
                  </Text>
                  <Switch
                    style={{ right: 10 }}
                    testID="btn_notficationSwitch"
                    trackColor={{
                      false: COLORS.black,
                      true: COLORS.darkorange,
                    }}
                    thumbColor={COLORS.white}
                    ios_backgroundColor="#000"
                    onValueChange={(Vala) => this.onNotificationSwitch(Vala)}
                    value={this.state.switch3}
                  />
                </View>
                <View
                  style={[styles.setBackGroundView, { width: windowWidth }]}
                >
                  <Text style={styles.setBackGroundText}>
                    {configJSON.setBackground}
                  </Text>
                  <TouchableOpacity style={Styles.defaultView}>
                    <Text style={Styles.defaultText}>{configJSON.default}</Text>
                    <Image source={Next} style={Styles.nextImage} />
                  </TouchableOpacity>
                </View>
                <View style={[Styles.mediaView, { width: windowWidth }]}>
                  <Text style={Styles.mediaText}>{configJSON.media}</Text>
                  <TouchableOpacity style={Styles.itemView}>
                    <Text style={Styles.itemText}>{configJSON.items} </Text>
                    <Image source={Next} style={Styles.nextImage} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={Styles.groupCommonText}>
                {configJSON.groupCommon}
              </Text>
              <View style={{ backgroundColor: "#363636", width: "100%" }}>
                <FlatList
                  data={this.state.Arr_Emergancy}
                  style={{ marginTop: RFValue(10) }}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}
                  ListFooterComponent={() => (
                    <View style={Styles.flatListView}>
                      <TouchableOpacity
                        testID="btn_plus"
                        onPress={() => this.PluseClick1()}
                        style={Styles.plusButtonView}
                      >
                        <Text style={Styles.plusButtonText}>+</Text>
                      </TouchableOpacity>
                      <Text style={Styles.addNewText}>{configJSON.addNew}</Text>
                    </View>
                  )}
                  renderItem={(item) => this.renderItem(item)}
                />
              </View>
              <TouchableOpacity style={Styles.blockUserView}>
                <Text style={Styles.blockUserText}>{configJSON.blockUser}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.reportChatView}>
                <Text style={Styles.reportChatText}>
                  {configJSON.reportChat}
                </Text>
              </TouchableOpacity>
            </ScrollView>
            {this.state.modal2Visible && (
              <View style={{ flex: 1 }}>
                <View style={Styles.modalView}>
                  <View style={Styles.menuView}>
                    <TouchableOpacity>
                      <Text style={Styles.menuText}>
                        {configJSON.addToHomeScreen}
                      </Text>
                    </TouchableOpacity>
                    <View style={Styles.seperator} />
                    <TouchableOpacity>
                      <Text style={Styles.menuText}>
                        {configJSON.editContact}
                      </Text>
                    </TouchableOpacity>
                    <View style={Styles.seperator} />
                    <TouchableOpacity>
                      <Text style={Styles.menuText}>
                        {configJSON.openSecretChat}
                      </Text>
                    </TouchableOpacity>
                    <View style={Styles.seperator} />
                    <TouchableOpacity>
                      <Text style={[Styles.menuText, { color: COLORS.red }]}>
                        {configJSON.deleteChat}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    testID="btn_closeModal"
                    onPress={() => this.showModal(false)}
                    style={[Styles.cancelButton, { marginTop: 15 }]}
                  >
                    <Text style={Styles.cancelText}>{configJSON.cancel}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground>
    );
  }
}
// Customizable Area End
