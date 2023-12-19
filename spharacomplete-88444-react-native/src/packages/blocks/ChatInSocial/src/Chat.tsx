// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Swipeout from "react-native-swipeout";
import { COLORS } from "../../../framework/src/Globals";
import * as IMAGE from "./assets";
import ChatController from "./ChatController";
import { Styles } from "./ChatStyle";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class Chat extends ChatController {
  label = (label: string) => {
    if (label === "pin") {
      return "Pin";
    } else if (label === "delete") {
      return "Delete";
    } else if (label === "archive") {
      return "Archive";
    } else {
      return "More";
    }
  };
  imageSource = (label: string) => {
    if (label === "pin") {
      return IMAGE.Pin;
    } else if (label === "delete") {
      return IMAGE.Delete;
    } else if (label === "archive") {
      return IMAGE.Archive;
    } else {
      return IMAGE.menu;
    }
  };
  component(item: any, label: string) {
    return (
      <TouchableOpacity
        testID="componentButton"
        onPress={() => {
          if (label === "pin") {
            this.pinClick(item);
          } else if (label === "delete") {
            this.DeleteClick(item);
          } else if (label === "archive") {
            this.ArchiveClick(item);
          } else {
            this.MoreClick(item);
          }
        }}
        style={Styles.swipMenuButton}
      >
        <Image
          resizeMode="contain"
          source={this.imageSource(label)}
          style={Styles.swipeMenuImage}
        />
        <Text style={Styles.swipeMenuText}>{this.label(label)}</Text>
      </TouchableOpacity>
    );
  }
  swipeoutOne(item, index) {
    return (
      <Swipeout
        close={this.state.close}
        autoClose={true}
        style={{ marginTop: index == 0 ? 10 : 13 }}
        backgroundColor="trancperant"
        left={[
          {
            component: this.component(item, "pin"),
            backgroundColor: "#363636",
          },
          {
            component: this.component(item, "delete"),
            backgroundColor: "#363636",
          },
          {
            component: this.component(item, "archive"),
            backgroundColor: "#363636",
          },
          {
            component: this.component(item, "more"),
            backgroundColor: COLORS.orangelight,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => this.onclick()}
          style={Styles.chatPersonList}
        >
          <View style={[Styles.chatPersonImageView, { width: "20%" }]}>
            <TouchableOpacity
              testID="chatItemButton"
              onPress={() => this.onclick()}
              style={Styles.chatPerson}
            >
              {item?.avatar ? (
                <Image
                  resizeMode="cover"
                  style={Styles.chatPersonImage}
                  source={{ uri: item.avatar }}
                />
              ) : (
                <View style={Styles.contactText}>
                  <Text
                    style={{
                      textTransform: "uppercase",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {item?.name.charAt(0)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            testID="conversationButton"
            onPress={() =>
              this.props.navigation.navigate("ConversationScreen", {
                chatNumber: item.uid,
                mainConversationId: item.conversationId,
                userName: item.name,
                userAvtar: item.avatar,
                userType: 1,
              })
            }
            style={Styles.chatPersonNameView}
          >
            <Text style={Styles.chatPersonName}>{item?.name}</Text>
            <Text style={{ color: COLORS.lightwhite }}>
              {item?.lastMessage}
            </Text>
          </TouchableOpacity>
          <View style={[Styles.chatPersonImageView, { width: "15%" }]}>
            <Text
              style={{
                color: item?.Count == 0 ? COLORS.lightwhite : COLORS.white,
              }}
            >
              {item?.Time}
            </Text>

            {item?.unReadCounts == 0 || isNaN(item?.unReadCounts) ? null : (
              <View style={Styles.chatUnreadMessage}>
                <Text>{item.unReadCounts}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }

  swipeoutTwo(item, index) {
    return (
      <Swipeout
        close={this.state.close}
        autoClose={true}
        style={{ marginTop: index == 0 ? 10 : 13 }}
        backgroundColor="trancperant"
        left={[
          {
            component: this.component(item, "pin"),
            backgroundColor: "#363636",
          },
          {
            component: this.component(item, "delete"),
            backgroundColor: "#363636",
          },
          {
            component: this.component(item, "archive"),
            backgroundColor: "#363636",
          },
          {
            component: this.component(item, "more"),
            backgroundColor: COLORS.orangelight,
          },
        ]}
      >
        <TouchableOpacity
          // onPress={() => this.onclick()}
          style={Styles.chatPersonList}
        >
          <View style={[Styles.chatPersonImageView, { width: "20%" }]}>
            <TouchableOpacity
              testID="chatItemButton"
              onPress={() => this.onclick()}
              style={Styles.chatPerson}
            >
              {item?.icon ? (
                <Image
                  resizeMode="contain"
                  style={Styles.chatPersonImage}
                  source={{ uri: item.icon }}
                />
              ) : (
                <View style={Styles.contactText}>
                  <Text
                    style={{
                      textTransform: "uppercase",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  ></Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            testID="conversationButton"
            onPress={() =>
              this.props.navigation.navigate("ConversationScreen", {
                chatNumber: item.guid,
                mainConversationId: item.conversationId,
                userName: item.name,
                userAvtar: item.icon,
                userType: 2,
              })
            }
            style={Styles.chatPersonNameView}
          >
            <Text style={Styles.chatPersonName}>{item?.name}</Text>
            <Text style={{ color: COLORS.lightwhite }}>
              {item?.lastMessage}
            </Text>
          </TouchableOpacity>
          <View style={[Styles.chatPersonImageView, { width: "15%" }]}>
            <Text
              style={{
                color: item?.Count == 0 ? COLORS.lightwhite : COLORS.white,
              }}
            >
              {item?.Time}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
  addFlatList() {
    return (
      <>
        <FlatList
          data={
            this.state.Section == 1
              ? this.state.Chat_Data
              : this.state.Group_Data
          }
          testID="conversationList"
          style={{ width: windowWidth, flexGrow: 1 }}
          contentContainerStyle={{ paddingBottom: 500 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(index): any => index}
          renderItem={({ item, index }: any) => {
            return this.state.Section == 1
              ? this.swipeoutOne(item, index)
              : this.swipeoutTwo(item, index);
          }}
        />
      </>
    );
  }

  ConditionOne() {
    return (
      <>
        {this.state.Loader ? (
          <View style={{ flex: 1 }}>
            <Modal visible={this.state.Loader} transparent={true}>
              <View
                style={{
                  height: windowHeight,
                  width: windowWidth,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    height: 100,
                    width: windowWidth - 20,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator
                    animating={true}
                    size={"large"}
                    color="#f07233"
                  />
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View style={{ flexGrow: 1 }}>
            {this.state.totalUnReadCount > 0 ? (
              <Text style={Styles.unreadMessage}>
                You have {this.state.totalUnReadCount} unread message
              </Text>
            ) : null}
            {this.addFlatList()}
          </View>
        )}

        {this.ConditionTwo()}
      </>
    );
  }

  ConditionTwo() {
    return (
      <>
        {this.state.modal1Visible || this.state.modal2Visible ? (
          <View style={Styles.shadowView} />
        ) : null}
        {this.state.modal1Visible ? (
          <View style={{ flex: 1 }}>
            <View style={Styles.modalView}>
              <View style={Styles.menuView}>
                <TouchableOpacity>
                  <Text style={Styles.menuText}>New Chat</Text>
                </TouchableOpacity>
                <View style={Styles.seperator} />
                <TouchableOpacity>
                  <Text style={Styles.menuText}>Edit Chats</Text>
                </TouchableOpacity>
                <View style={Styles.seperator} />
                <TouchableOpacity>
                  <Text style={Styles.menuText}>New Broadcast</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                testID="cancelButton"
                onPress={() => this.setState({ modal1Visible: false })}
                style={[Styles.cancelButton, { marginTop: 10 }]}
              >
                <Text style={Styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {this.state.modal2Visible ? (
          <View style={{ flex: 1 }}>
            <View style={Styles.modalView}>
              <View style={Styles.menuView}>
                <TouchableOpacity>
                  <Text style={Styles.menuText}>Mute</Text>
                </TouchableOpacity>
                <View style={Styles.seperator} />
                <TouchableOpacity>
                  <Text style={Styles.menuText}>Mark as unread</Text>
                </TouchableOpacity>
                <View style={Styles.seperator} />
                <TouchableOpacity>
                  <Text style={Styles.menuText}>Contact info</Text>
                </TouchableOpacity>
                <View style={Styles.seperator} />
                <TouchableOpacity>
                  <Text style={Styles.menuText}>Clear Chat</Text>
                </TouchableOpacity>
                <View style={Styles.seperator} />
                <TouchableOpacity>
                  <Text style={[Styles.menuText, { color: COLORS.red }]}>
                    Delete Chat
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                testID="secondModalCancelButton"
                onPress={() => this.setState({ modal2Visible: false })}
                style={[Styles.cancelButton, { marginTop: 15 }]}
              >
                <Text style={Styles.cancelText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </>
    );
  }
  render() {
    return (
      <ImageBackground source={IMAGE.back1} style={Styles.container}>
        <ImageBackground source={IMAGE.back2} style={Styles.container}>
          <SafeAreaView>
            <View
              style={[
                Styles.headerView,
                { elevation: this.state.modal1Visible ? 0 : 10 },
              ]}
            >
              <View style={{ width: "16%" }} />
              <View style={Styles.headerCenterView}>
                <TouchableOpacity
                  testID="switchbtnID"
                  onPress={() => this.checkStateUpdate(1)}
                  style={[
                    Styles.switchbutton,
                    {
                      backgroundColor:
                        this.state.Section == 1
                          ? COLORS.orangelight
                          : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={[
                      Styles.switchButtonText,
                      {
                        color:
                          this.state.Section == 1
                            ? COLORS.black
                            : COLORS.lightwhite,
                      },
                    ]}
                  >
                    Chats
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="groupButton"
                  onPress={() => this.checkStateUpdate(2)}
                  style={[
                    Styles.switchbutton,
                    {
                      backgroundColor:
                        this.state.Section == 2
                          ? COLORS.orangelight
                          : "transparent",
                      marginRight: 6,
                    },
                  ]}
                >
                  <Text
                    style={[
                      Styles.switchButtonText,
                      {
                        color:
                          this.state.Section == 2
                            ? COLORS.black
                            : COLORS.lightwhite,
                      },
                    ]}
                  >
                    Groups
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                testID="backHomeButton"
                onPress={() => this.GoBackToHomeScreen()}
                style={Styles.headerEndView}
              >
                <Image source={IMAGE.LOGO} style={Styles.headerLogo} />
              </TouchableOpacity>
            </View>

            <View style={Styles.searchContainer}>
              <View style={Styles.searchView}>
                <Image source={IMAGE.search} style={Styles.searchImage} />
                <TextInput
                  testID="searchTextInput"
                  placeholder="Search"
                  onChangeText={(e) => this.onSearch(e)}
                  placeholderTextColor="white"
                  style={Styles.searchInput}
                />
              </View>
              <View style={Styles.searchMenuView}>
                <TouchableOpacity
                  testID="menuButton"
                  onPress={() => this.props.navigation.navigate("NewChat")}
                  style={Styles.searchMenuButton}
                >
                  <Image
                    resizeMode="contain"
                    source={IMAGE.menu}
                    style={Styles.serachMenuImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {this.ConditionOne()}
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground>
    );
  }
}
// Customizable Area End
