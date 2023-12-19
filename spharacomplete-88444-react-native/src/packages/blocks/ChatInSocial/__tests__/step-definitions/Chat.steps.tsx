//@ts-nocheck
//@ts-ignore
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import * as helpers from "framework/src/Helpers";
import React from "react";
import { View } from "react-native";
import ChatScreen from "../../src/Chat";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),

    getParam: jest.fn(),
    state: {
      params: {
        dt: { name: "Test Name" },
        userName: "abc",
        chatNumber: "1234",
      },
    },
  },
  screenProps: {
    navigationProp: {
      navigate: jest.fn(),
    },
  },
  id: "Chat",
};

const feature = loadFeature("./__tests__/features/Chat-scenario.feature");

global.CometChat = require("@cometchat-pro/react-native-chat");
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
  });

  test("User navigates to Chat", ({ given, when, then }) => {
    let ChatWrapperBlock: ShallowWrapper;
    let instance: ChatScreen;

    given("I am a User loading Chat", () => {
      ChatWrapperBlock = shallow(<ChatScreen {...screenProps} />);
    });

    when("I navigate to the Chat", () => {
      instance = ChatWrapperBlock.instance() as ChatScreen;
    });

    then("Chat will load with out errors", () => {
      instance.getUserData({
        conversation: { lastMessage: { text: undefined } },
      });
      instance.setState({ Section: 1 });
      expect(ChatWrapperBlock).toBeTruthy();
    });

    then("Press back button to leave screen", () => {
      let buttonComponent = ChatWrapperBlock.findWhere(
        (node) => node.prop("testID") === "switchbtnID"
      );

      buttonComponent.simulate("press");
      instance.checkStateUpdate(1);
      expect(buttonComponent).toBeTruthy();
    });

    then("I can press group button", () => {
      let groupButton = ChatWrapperBlock.findWhere(
        (node) => node.prop("testID") === "groupButton"
      );

      groupButton.simulate("press");
      expect(groupButton).toBeTruthy();
    });

    then("I can go back to home screen", () => {
      let backHomeButton = ChatWrapperBlock.findWhere(
        (node) => node.prop("testID") === "backHomeButton"
      );

      backHomeButton.simulate("press");
      expect(backHomeButton).toBeTruthy();
    });

    then("I can enter search value in text input", async () => {
      const dummyChatData = [{ name: "aaa" }, { name: "bbb" }];
      instance.setState({ Chat_Data: dummyChatData });
      let searchTextInput = ChatWrapperBlock.findWhere(
        (node) => node.prop("testID") === "searchTextInput"
      );
      searchTextInput.props().onChangeText("aaa");
      searchTextInput.props().onChangeText("");
      expect(searchTextInput).toBeTruthy();
    });

    then("I can press on menu button", () => {
      let menuButton = ChatWrapperBlock.findWhere(
        (node) => node.prop("testID") === "menuButton"
      );

      menuButton.simulate("press");
      expect(menuButton).toBeTruthy();
    });

    then("I can press cancel button", () => {
      instance.setState({ modal1Visible: true });
      let cancelButton = ChatWrapperBlock.findWhere(
        (node) => node.prop("testID") === "cancelButton"
      );

      cancelButton.simulate("press");
      expect(cancelButton).toBeTruthy();
    });

    then("I can press second modal cancel button", () => {
      instance.setState({ modal2Visible: true });
      let secondModalCancelButton = ChatWrapperBlock.findWhere(
        (node) => node.prop("testID") === "secondModalCancelButton"
      );

      secondModalCancelButton.simulate("press");
      expect(secondModalCancelButton).toBeTruthy();
    });

    then("I can press swipeoutOne Pin Button with out error", () => {
      let componentWrapper = shallow(
        <View>{instance.component({}, "pin")}</View>
      );
      let componentButton = componentWrapper.findWhere(
        (node) => node.prop("testID") === "componentButton"
      );
      componentButton.simulate("press");
      expect(componentButton).toBeTruthy();

      let dummyItem = {
        uid: "aaa",
        conversationId: "bbb",
        name: "AA",
        avatar: "avatar",
      };
      instance.setState({ Section: 1 });
      let swipeoutOneWrapper = shallow(
        <View>{instance.swipeoutOne(dummyItem, 0)}</View>
      );
      let chatItemButton = swipeoutOneWrapper.findWhere(
        (node) => node.prop("testID") === "chatItemButton"
      );
      chatItemButton.simulate("press");
      expect(chatItemButton).toBeTruthy();

      let conversationButton = swipeoutOneWrapper.findWhere(
        (node) => node.prop("testID") === "conversationButton"
      );
      conversationButton.simulate("press");
      expect(conversationButton).toBeTruthy();

      instance.setState({ Section: 2 });
      let swipeoutTwoWrapper = shallow(
        <View>{instance.swipeoutTwo(dummyItem, 0)}</View>
      );
      chatItemButton = swipeoutTwoWrapper.findWhere(
        (node) => node.prop("testID") === "chatItemButton"
      );
      chatItemButton.simulate("press");
      expect(chatItemButton).toBeTruthy();

      conversationButton = swipeoutTwoWrapper.findWhere(
        (node) => node.prop("testID") === "conversationButton"
      );
      conversationButton.simulate("press");
      expect(conversationButton).toBeTruthy();
    });

    then("I can press swipeoutOne Delete Button with out error", () => {
      let componentWrapper = shallow(
        <View>{instance.component({}, "delete")}</View>
      );
      let componentButton = componentWrapper.findWhere(
        (node) => node.prop("testID") === "componentButton"
      );
      componentButton.simulate("press");
      expect(componentButton).toBeTruthy();
    });

    then("I can press swipeoutOne Archive Button with out error", () => {
      let componentWrapper = shallow(
        <View>{instance.component({}, "archive")}</View>
      );
      let componentButton = componentWrapper.findWhere(
        (node) => node.prop("testID") === "componentButton"
      );
      componentButton.simulate("press");
      expect(componentButton).toBeTruthy();
    });

    then("I can press swipeoutOne More Button with out error", () => {
      let componentWrapper = shallow(
        <View>{instance.component({}, "more")}</View>
      );
      let componentButton = componentWrapper.findWhere(
        (node) => node.prop("testID") === "componentButton"
      );
      componentButton.simulate("press");
      expect(componentButton).toBeTruthy();
    });

    then("Display the chat list and its functionality", () => {
      instance.addFlatList();
      instance.setState({ Loader: false });
      const dummyItem = {
        item: {
          uid: "aaaaa",
          conversationId: "bbbb",
          name: "AA",
          lastMessage: "last",
          Count: 0,
          Time: "10:30",
          unReadCounts: 1,
          avatar: "aaaaa",
        },
      };
      let conversationList = ChatWrapperBlock.findWhere(
        (node) => node.prop("testID") === "conversationList"
      );
      conversationList.props().keyExtractor(0);
      expect(conversationList).toBeTruthy();
      instance.setState({ Section: 1 });
      conversationList.props().renderItem(dummyItem, 0);
      const mediaMessage = {
        conversationId: "aaaa",
      };
      const textMessage = {
        conversationId: "aaaa",
        sender: {
          uid: "khvas",
          name: "has",
        },
      };
      const dummyChatData = [
        { name: "aaa", conversationId: "aaaa" },
        { name: "bbb", conversationId: "bbbb" },
      ];
      instance.setState({ Chat_Data: dummyChatData });
      instance.onMediaMessageReceived(mediaMessage);
      instance.onTextMessageReceived(textMessage);
      textMessage.text = "text";
      instance.onTextMessageReceived(textMessage);
    });
  });
});
