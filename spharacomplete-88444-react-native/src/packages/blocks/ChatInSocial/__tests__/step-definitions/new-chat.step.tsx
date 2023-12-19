//@ts-nocheck
//@ts-ignore
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import { View } from "react-native";
import NewChat from "../../src/NewChat";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),

    getParam: jest.fn(),
  },
  id: "Chat",
};

const feature = loadFeature("./__tests__/features/new-chat-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to New Chat", ({ given, when, then }) => {
    let newChatWrapper: ShallowWrapper;
    let instance: NewChat;
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
    given("I am a User loading New Chat", () => {
      newChatWrapper = shallow(<NewChat {...screenProps} />);
      expect(newChatWrapper).toBeTruthy();
      expect(newChatWrapper).toMatchSnapshot();
    });

    when("I navigate to the New Chat", () => {
      instance = newChatWrapper.instance() as NewChat;
    });

    then("I can press new chat button", () => {
      let newChatButton = newChatWrapper.findWhere(
        (node) => node.prop("testID") === "newChatButton"
      );
      newChatButton.simulate("press");
      expect(newChatButton).toBeTruthy();
    });

    then("I can enter search value in text input", async () => {
      instance.setState({ contactData: [{ name: "abcde" }] });
      let searchInput = newChatWrapper.findWhere(
        (node) => node.prop("testID") === "searchInput"
      );
      searchInput.props().onChangeText("");
      expect(searchInput).toBeTruthy();
      searchInput.props().onChangeText("abcd");
    });

    then("Display the contact list without error", () => {
      let contactList = newChatWrapper.findWhere(
        (node) => node.prop("testID") === "contactList"
      );
      contactList.props().keyExtractor({ id: 1 });
      contactList.props().renderItem(dummyItem, 0);
      expect(contactList).toBeTruthy();
    });

    then("I can press contact item", async () => {
      let newChatWrapper = shallow(
        <View>{instance.renderItem(dummyItem, 0)}</View>
      );
      let listItemButton = newChatWrapper.findWhere(
        (node) => node.prop("testID") === "listItemButton"
      );
      listItemButton.simulate("press");
      expect(listItemButton).toBeTruthy();
    });
  });
});
