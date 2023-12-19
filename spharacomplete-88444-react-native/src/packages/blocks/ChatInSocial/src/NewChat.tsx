// Customizable Area Start
//@ts-nocheck
//@ts-ignore
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../framework/src/Globals";
import * as IMAGE from "./assets";
import NewChatController, { Props } from "./NewChatController";
import { Styles } from "./NewChatStyle";

const windowWidth = Dimensions.get("window").width;

export default class NewChat extends NewChatController {
  constructor(props: Props) {
    super(props);
  }

  renderItem = ({ item, index }: any) => (
    <View style={{ marginTop: 18, justifyContent: "center" }}>
      <View style={{ marginHorizontal: 12, flexDirection: "row" }}>
        <View style={{ width: "18%" }}>
          <TouchableOpacity>
            {item.avatar ? (
              <Image
                resizeMode="contain"
                style={Styles.chatPersonImage}
                source={{ uri: item.avatar }}
              ></Image>
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
                  {item.name.charAt(0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ width: "82%" }}
          testID="listItemButton"
          onPress={() =>
            this.props.navigation.navigate("ConversationScreen", {
              chatNumber: item.uid,
              mainConversationId: item.conversationId,
              userName: item.name,
              userAvtar: item.avatar,
              userType: 1,
            })
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: COLORS.orangelight,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  fontWeight: "600",
                  color: COLORS.white,
                }}
              >
                Hey there! I am Using Sphara...
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <SafeAreaView style={Styles.safeareaView}>
        <View style={Styles.child}>
          <ImageBackground source={IMAGE.back1} style={Styles.container}>
            <ImageBackground source={IMAGE.back2} style={Styles.container}>
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  testID="newChatButton"
                  style={{
                    width: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => this.props.navigation.navigate("Chat")}
                >
                  <Image
                    source={IMAGE.image_back}
                    style={{ height: 18, width: 18, tintColor: COLORS.white }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "white",
                    width: "90%",
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  New Chat
                </Text>
              </View>

              {this.state.visibleTab == 0 ? (
                <>
                  <View
                    style={{
                      height: 38,
                      width: windowWidth - 25,
                      marginTop: 10,
                      alignSelf: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: COLORS.Viewback,
                        borderRadius: 100,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={IMAGE.search}
                        style={{
                          height: 20,
                          width: 20,
                          marginLeft: 10,
                          marginRight: 5,
                          tintColor: COLORS.lightwhite,
                        }}
                      />
                      <TextInput
                        testID="searchInput"
                        placeholder="Search"
                        onChangeText={(e) => this.onSearch(e)}
                        placeholderTextColor="white"
                        style={{
                          color: "white",
                          width: "100%",
                          paddingLeft: 5,
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: windowWidth - 25,
                      marginTop: 15,
                      alignSelf: "center",
                      flex: 1,
                    }}
                  >
                    <FlatList
                      testID="contactList"
                      data={this.state.contactData}
                      renderItem={(item, index) => this.renderItem(item, index)}
                      keyExtractor={(item: any) => item.id}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ bottom: 13 }}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View>
                    <Text>Content of Private Tab</Text>
                  </View>
                </>
              )}
            </ImageBackground>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}
// Customizable Area End
