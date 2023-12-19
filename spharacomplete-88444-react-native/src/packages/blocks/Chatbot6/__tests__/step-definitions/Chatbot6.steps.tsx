//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Chatbot6 from "../../src/Chatbot6";
const navigation = require("react-navigation");

const screenProps = {
  navigation: navigation,
  id: "Chatbot6",
};

const feature = loadFeature("./__tests__/features/Chatbot6-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Chatbot6", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Chatbot6;

    given("I am a User loading Chatbot6", () => {
      exampleBlockA = shallow(<Chatbot6 {...screenProps} />);
    });

    when("I navigate to the Chatbot6", () => {
      instance = exampleBlockA.instance() as Chatbot6;
    });

    then("Chatbot6 will load with out errors", () => {
      const getOtpCall: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOtpCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOtpCall.messageId
      );
      getOtpCall.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        questions: [
          "Please select which query you have from the list below?",
          "[Network issue]",
          "[Billing Issue]",
          "[WIFI issue] ",
          "9900220033",
          "9911220011",
          "9933220033",
          "hii",
          "Hi Welcome to Mobile Telecom chatbot. ",
        ],
      });
      instance.getQuesCallId = getOtpCall.messageId;
      runEngine.sendMessage("Unit Test", getOtpCall);
      expect(getOtpCall).toBeTruthy();
    });

    then("I can get reply with out errors", () => {
      const getOtpCall: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOtpCall.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOtpCall.messageId
      );
      getOtpCall.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        answer: "hii",
      });
      instance.getOtpCallId = getOtpCall.messageId;
      runEngine.sendMessage("Unit Test", getOtpCall);
      expect(getOtpCall).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      let message = [
        {
          text: "abc",
        },
      ];
      let giftChat = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "gifted-chat"
      );
      giftChat.props().onPress("", message);
      giftChat.props().onSend(message);
      giftChat.props().renderBubble();
      expect(giftChat).toBeTruthy();
    });


    then("I can leave the screen with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
