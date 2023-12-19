// Customizable Area Start
//@ts-nocheck
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";

import Chatbot6Controller, { Props, configJSON } from "./Chatbot6Controller";
import * as IMAGE from "./assets";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const deviceHeight: number = Dimensions.get("window").height;
const devicewidth: number = Dimensions.get("window").width;

export default class Chatbot6 extends Chatbot6Controller {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback>
          {/* Merge Engine UI Engine Code */}
          <View style={styles.child}>
            <StatusBar
              animated={true}
              backgroundColor="#454545"
              barStyle={"light-content"}
              showHideTransition={"slide"}
            />
            <ImageBackground source={IMAGE.back1} style={styles.container}>
              <ImageBackground source={IMAGE.back2} style={styles.container}>
                <View
                  style={{
                    backgroundColor: "rgba(255,138,73,1)",
                    height: 63,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign name="left" color="white" size={20} />
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: 20,
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="face-agent"
                        color="white"
                        size={25}
                      />
                      <Text
                        style={{ color: "white", marginLeft: 5, fontSize: 15 }}
                      >
                        {configJSON.chatBotText}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity>
                    <Entypo
                      name="dots-three-vertical"
                      color="white"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>

                <GiftedChat
                  testID="gifted-chat"
                  lightboxProps={{ useNativeDriver: true }}
                  messages={this.state.messages}
                  onSend={(messages: TMessage[]) => this.onSend(messages)}
                  user={{
                    _id: 1,
                    avatar:
                      "https://images.rawpixel.com/image_png_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTM5LnBuZw.png",
                  }}
                  onPress={(context: object, message: TMessage) => {
                    this.onSelect(Object([message]));
                  }}
                  renderBubble={(props: Bubble<TMessage>["props"]) => {
                    return (
                      <Bubble
                        {...props}
                        textStyle={{
                          right: {
                            color: "#4b6bc8",
                            fontStyle: "normal",
                            fontWeight: "700",
                          },
                          left: {
                            color: "#000",
                            fontStyle: "normal",
                            fontWeight: "700",
                          },
                        }}
                        wrapperStyle={{
                          left: {
                            backgroundColor: "#f2f2f2",
                            flexDirection: "row",
                          },
                          right: {
                            borderWidth: 1,
                            borderColor: "#4b6bc8",
                            backgroundColor: "#FFF",
                          },
                        }}
                        timeTextStyle={{
                          left: { color: "black" },
                          right: { color: "black" },
                        }}
                      />
                    );
                  }}
                  showUserAvatar
                />
              </ImageBackground>
            </ImageBackground>
          </View>
          {/* Merge Engine UI Engine Code */}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: deviceHeight,
    width: devicewidth,
  },
  safeareaView: {
    flex: 1,
    backgroundColor: "#454545",
    height: deviceHeight,
    width: devicewidth,
  },
  child: {
    width: devicewidth,
    flex: 1,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  newInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    padding: 10,
    height: 50,
  },
  listView: {
    flex: 2,
    padding: 10,
  },
  contactText: {
    backgroundColor: "rgba(255,211,154,1)",
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Customizable Area End
