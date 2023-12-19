// Customizable Area Start
//@ts-ignore
//@ts-nocheck
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import ConversationController, { Props } from "./ConversationController";
import { Styles } from "./ConversationStyle";
import * as IMAGE from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import { GiftedChat } from "react-native-gifted-chat";
import { renderInputToolbar, renderComposer, renderActions, renderSend, renderBubble,renderLoading,rendermessageImage } from "../../../components/src/ChatViewFunctionality";

export default class ConversationScreen extends ConversationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const isMessageViewOnly = this.props.route.params?.isMessageViewOnly
    return (
      <SafeAreaView style={Styles.safeareaView}>
        {/* <View style={Styles.child}> */}
          <StatusBar
            animated={true}
            backgroundColor={isMessageViewOnly?"#f07135":"#454545"}
            barStyle={"light-content"}
            showHideTransition={"slide"}
            // hidden={true}
          />
          <ImageBackground source={IMAGE.back1} style={Styles.container}>
            <ImageBackground source={IMAGE.back2} style={Styles.container}>
             {
              isMessageViewOnly ? null :
              <View
              style={{
                backgroundColor: COLORS.darkorange,
                height: 63,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                testID="upperBackButton"
                style={{
                  width: 60,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => this.upperBackPress()}
              >
                <Image
                  source={IMAGE.image_back}
                  style={{ height: 18, width: 18, tintColor: COLORS.white }}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  justifyContent: "center",
                }}
              >
                {this.props.route.params?.userAvtar ? (
                  <Image
                    resizeMode="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 25,
                    }}
                    source={{
                      uri: this.props.route.params.userAvtar,
                    }}
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
                      {this.props.route.params?.userName?.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={{ color: COLORS.white, fontSize: 15, paddingLeft: 10 }}
              >
                {this.props.route.params?.userName}
              </Text>
            </View>
             }            
              <GiftedChat
                inverted={isMessageViewOnly ? false : true}
                testID="giftChat"
                scrollToBottom
                isCustomViewBottom
                bottomOffset={18}
                lightboxProps={{ useNativeDriver: true }}
                messages={this.state.messages}
                onInputTextChanged={(e) => this.setState({ onSendMessage: e })}
                text={this.state.onSendMessage}
                renderSend={(props) => renderSend(props)}
                showUserAvatar={false}
                minInputToolbarHeight={Platform.OS === "ios" ? 40 : 70}
                renderActions={(props) => renderActions(props)}
                renderInputToolbar={(props) => isMessageViewOnly ? <View></View> : renderInputToolbar(props, this.sendMessageCometChat, this.state.onSendMessage )}
                renderComposer={(props) => renderComposer(props, this.handleSelectFile,this.onPressCamera,this.state.imageLoading)}
               // renderCustomView = {(props) => renderCustomView(props, this.handleSelectFile)}
                renderBubble={(props) => renderBubble(props,this.state.imageLoading)}
                renderLoading={(props) =>renderLoading(props)}
                renderMessageImage={(props) => rendermessageImage(props, this.state.imageLoading)}
                user={{
                  _id: this.state.myUserId,
                }}
              />
            </ImageBackground>
          </ImageBackground>
        {/* </View> */}
      </SafeAreaView>
    );
  }
}
// Customizable Area End
