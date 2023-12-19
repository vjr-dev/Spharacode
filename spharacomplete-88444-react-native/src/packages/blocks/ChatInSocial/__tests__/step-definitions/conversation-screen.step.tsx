//@ts-nocheck
//@ts-ignore
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import { View } from "react-native";
import ConversationScreen from "../../src/ConversationScreen";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    getParam: jest.fn(),
    state: {
      params: {
        userAvtar: "xyz",
        chatNumber: 1,
        userType: 1,
        mainConversationId: "1234",
      },
    },
  },
  route: {
    params: {
      isMessageViewOnly: "",
      userAvtar: ""
    },
  },
  id: "Chat",
};

const screenProps2 = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    getParam: jest.fn(),
        state: {
      params: {
        userAvtar: "xyz",
        chatNumber: 1,
        userType: 2,
        mainConversationId: "1234",
        isMessageViewOnly: "",
      },
    },
  },
  id: "Chat",
};
const feature = loadFeature(
  "./__tests__/features/conversation-screen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to ConversationScreen", ({ given, when, then }) => {
    let conversationWrapper: ShallowWrapper;
    let instance: ConversationScreen;

    given("I am a User loading ConversationScreen", () => {
      conversationWrapper = shallow(<ConversationScreen {...screenProps} />);
      expect(conversationWrapper).toBeTruthy();
      expect(conversationWrapper).toMatchSnapshot();
    });

    when("I navigate to the ConversationScreen", () => {
      instance = conversationWrapper.instance() as ConversationScreen;
    });

    then("I can press upper back button", () => {
      let upperBackButton = conversationWrapper.findWhere(
        (node) => node.prop("testID") === "upperBackButton"
      );
      upperBackButton.simulate("press");
      expect(upperBackButton).toBeTruthy();
    });

    then("Display conversation without error", () => {
      let giftChat = conversationWrapper.findWhere(
        (node) => node.prop("testID") === "giftChat"
      );
      giftChat.props().onInputTextChanged("aaa");
      giftChat.props().renderActions();
      giftChat.props().renderInputToolbar({ text: "bb" });
      giftChat.props().renderComposer({ text: "bb" });
      expect(giftChat).toBeTruthy();
    });

    then("I can send the message", () => {
      instance.componentWillUnmount();
      instance.onPageLeave();
      instance.receive();
      instance.listenForMessages();
      instance.transformSingleMessageForListen();
      instance.isValidMessage({ message: "1234" });
      instance.transformMessages([{ messages: 2 }]);
      instance.componentDidMount();
      instance.transformedSingleMessageObject();
      instance.CallMultiplefunctionToReduceComplexityTwo();
      instance.CallMultiplefunctionToReduceComplexityOne();
      instance.getFileName("abc.png", "photo");
      instance.getFileName("abc.png", "video");
      instance.getFileName("abc.png", "other");
      instance.handleSelectFile();
      instance.sendMediaMessageCometChat();
      // conversationWrapper = shallow(<ConversationScreen {...screenProps2} />);
      // instance = conversationWrapper.instance() as ConversationScreen;
      instance.loadMessages(2);
      instance.sendMessageCometChat(2);
    });
  });
});
