// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  Text,
  ImageBackground,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  StyleSheet,
  Platform
} from "react-native";
import * as IMAGE from "./assets";
import { COLORS } from "framework/src/Globals";
const windowWidth = Dimensions.get("window").width;
const sh = Dimensions.get("window").height;
const sw = Dimensions.get("window").width;
import { RFValue } from "react-native-responsive-fontsize";
import ChannelsController, { Props, configJSON } from "./ChannelsController";

export default class ChannelsInSocial extends ChannelsController {
  constructor(props: Props) {
    super(props);
  }

  renderItem = ({ item }: any) => (
    <View style={Styles.itemContainer}>
      <View style={Styles.itemRow}>
        <View style={{ width: "15%" }}>
          <View style={Styles.whiteContainer} />
        </View>
        <View style={Styles.nameContainer}>
          {/* <FontAwesome5Icon name="lock" color={COLORS.infoGray} size={17} /> */}
          <Text
            style={[
              Styles.txtName,
              { color: item.unreadmsg ? COLORS.white : COLORS.infoGray }
            ]}
          >
            {item.name}
          </Text>
        </View>
        <View style={Styles.unreadContainer}>
          {item.unreadmsg ? (
            <View style={Styles.txtUnreadContainer}>
              <Text style={Styles.txtUnread}>{item.unreadmsg}+</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <SafeAreaView style={Styles.safeareaView}>
        <ImageBackground source={IMAGE.back1} style={Styles.container}>
          <ImageBackground source={IMAGE.back2} style={Styles.container}>
            <View
              style={[
                Styles.headerContainer,
                { elevation: this.state.modal1Visible ? 0 : 10 }
              ]}
            >
              <View style={{ justifyContent: "center", marginLeft: 12 }}>
                <View style={Styles.txtsContainer}>
                  <Text style={Styles.txtS}>{configJSON.s}</Text>
                </View>
              </View>
              <View style={Styles.tabContainer}>
                <TouchableOpacity
                  testID="btn_Public_Tab"
                  onPress={() => this.onTabPress(0)}
                  style={[
                    Styles.tabTextContainer,
                    {
                      backgroundColor:
                        this.state.visibleTab == 0
                          ? COLORS.orangelight
                          : "transparent"
                    }
                  ]}
                >
                  <Text
                    style={[
                      Styles.txtTab,
                      {
                        color:
                          this.state.visibleTab === 0
                            ? COLORS.black
                            : COLORS.lightwhite
                      }
                    ]}
                  >
                    {configJSON.public}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="btn_Private_Tab"
                  onPress={() => this.onTabPress(1)}
                  style={[
                    Styles.tabPrivateContainer,
                    {
                      backgroundColor:
                        this.state.visibleTab == 1
                          ? COLORS.orangelight
                          : "transparent"
                    }
                  ]}
                >
                  <Text
                    style={[
                      Styles.txtTab,
                      {
                        color:
                          this.state.visibleTab === 0
                            ? COLORS.black
                            : COLORS.lightwhite
                      }
                    ]}
                  >
                    {configJSON.private}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                testID="btn_GoBack_To_Home"
                onPress={() => this.GoBackToHomeScreen()}
                style={{ justifyContent: "center", marginRight: 12 }}
              >
                <Image source={IMAGE.LOGO} style={Styles.appLogo} />
              </TouchableOpacity>
            </View>
            {this.state.visibleTab === 0 ? (
              <>
                <View style={Styles.tabView}>
                  <View style={Styles.searchContainer}>
                    <Image source={IMAGE.search} style={Styles.searchIcon} />
                    <TextInput
                      testID="txt_enter_search"
                      placeholder="Search"
                      onChangeText={(txt: string) => this.onSearch(txt)}
                      placeholderTextColor="white"
                      style={Styles.txtSearch}
                    />
                  </View>
                  <View style={Styles.menuContainer}>
                    <TouchableOpacity
                      testID="btn_menu_open"
                      onPress={() => this.showModal(true)}
                      style={Styles.menuBtnView}
                    >
                      <Image
                        resizeMode="contain"
                        source={IMAGE.menu}
                        style={Styles.menuIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={Styles.channelListView}>
                  <FlatList
                    data={this.state.Channels}
                    renderItem={this.renderItem}
                    keyExtractor={(item: any) => item.id + ""}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ bottom: 13 }}
                  />
                </View>
              </>
            ) : (
              <>
                <View>
                  <Text>{configJSON.contentPrivateTab}</Text>
                </View>
              </>
            )}
            {this.state.modal1Visible ? (
              <View style={Styles.shadowView} />
            ) : null}
            {this.state.modal1Visible ? (
              <View style={Styles.modalView}>
                <View style={Styles.menuView}>
                  <TouchableOpacity>
                    <Text style={Styles.menuText}>
                      {configJSON.createNewChannel}
                    </Text>
                  </TouchableOpacity>
                  <View style={Styles.seperator} />
                  <TouchableOpacity>
                    <Text style={Styles.menuText}>
                      {configJSON.editChannels}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => this.showModal(false)}
                  style={[Styles.cancelButton, { marginTop: 10 }]}
                >
                  <Text style={Styles.cancelText}>{configJSON.Cancel}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    height: sh,
    width: sw,
    flex: 1
  },
  safeareaView: {
    flex: 1,
    backgroundColor: "#454545"
  },
  modalView: {
    position: "absolute",
    bottom: 15,
    width: sw - 30,
    alignSelf: "center"
  },
  menuView: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: COLORS.Viewback,
    justifyContent: "center",
    alignItems: "center"
  },
  menuText: {
    padding: 15,
    fontSize: RFValue(15),
    color: COLORS.white
  },
  seperator: {
    height: 1,
    backgroundColor: COLORS.skipGray,
    width: "90%"
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fed99f",
    borderRadius: 25
  },
  cancelText: {
    paddingVertical: Platform.OS === "android" ? 15 : 18,
    fontSize: RFValue(13)
  },
  shadowView: {
    backgroundColor: "#3e3e3e",
    width: sw,
    height: sh,
    position: "absolute",
    opacity: 0.6,
    // zIndex:1,
    flex: 1
  },
  headerContainer: {
    height: 63,
    flexDirection: "row",
    backgroundColor: "#444444",
    justifyContent: "space-between",
    shadowColor: "#3b3d3d",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 1
  },
  tabTextContainer: {
    marginVertical: 6,
    justifyContent: "center",
    marginHorizontal: 6,
    borderRadius: 20
  },
  tabPrivateContainer: {
    marginVertical: 6,
    justifyContent: "center",
    marginRight: 6,
    borderRadius: 20
  },
  tabView: {
    height: 38,
    width: windowWidth - 25,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row"
  },
  txtTab: { paddingHorizontal: 25, fontWeight: "600" },

  appLogo: { height: 45, width: 45 },
  searchContainer: {
    width: "85%",
    backgroundColor: COLORS.Viewback,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
    marginRight: 5,
    tintColor: COLORS.lightwhite
  },
  txtSearch: { color: "white", width: "100%", paddingLeft: 5 },
  channelListView: {
    width: windowWidth - 25,
    marginTop: 15,
    alignSelf: "center",
    flex: 1
  },
  menuContainer: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center"
  },
  menuBtnView: {
    height: 40,
    width: 40,
    alignSelf: "flex-end",
    backgroundColor: "#363636",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  menuIcon: { height: 20, width: 20, tintColor: COLORS.white },
  txtsContainer: {
    height: 45,
    backgroundColor: "#F99546",
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    borderRadius: 22
  },
  txtS: { color: "white", fontWeight: "700", fontSize: 20 },
  tabContainer: {
    backgroundColor: "#363636",
    borderRadius: 22,
    height: 45,
    alignSelf: "center",
    flexDirection: "row"
  },
  itemContainer: {
    marginTop: 13,
    height: 80,
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: COLORS.Viewback
  },
  itemRow: { marginHorizontal: 12, flexDirection: "row" },
  whiteContainer: {
    height: 58,
    width: 58,
    alignSelf: "center",
    borderRadius: 29,
    backgroundColor: "white"
  },
  nameContainer: {
    width: "70%",
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  unreadContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  txtUnreadContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F99546",
    borderRadius: 10
  },
  txtName: { fontSize: 15, fontWeight: "600" },
  txtUnread: { fontSize: 12, color: "white" }
});
// Customizable Area End