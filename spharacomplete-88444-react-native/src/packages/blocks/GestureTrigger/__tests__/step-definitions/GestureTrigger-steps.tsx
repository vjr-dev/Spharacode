//@ts-ignore
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
import GestureTrigger from "../../src/GestureTrigger";
import { Platform } from "react-native";

const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  route: {
    params: { data: "rdttt" },
  },
  id: "GestureTrigger",
};


jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'ios',
    select: () => null
}));



const feature = loadFeature(
  "./__tests__/features/GestureTrigger-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to GestureTrigger", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: GestureTrigger;

    given("I am a User loading GestureTrigger", () => {
      exampleBlockA = shallow(<GestureTrigger {...screenProps} />);
    });

    when("I navigate to the GestureTrigger", () => {
      instance = exampleBlockA.instance() as GestureTrigger;
    });

    then("GestureTrigger will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click goback button with out error", () => {
        const gobackbtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "gobackbtn")
        gobackbtnComponent.simulate("press")
    })

    then("I can click switch button with out error", () => {
        const  switchbtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "switchbtn")
        switchbtnComponent.simulate("valueChange")
    })

    then("I can click m2close button with out error", () => {
        const m2closebtnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "m2closebtn")
        m2closebtnComponent.simulate("press")
    })


    then('request response SetsettingID successfully', () => {
        const mockResponse = {
          data: {},
        }
  
        const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))
  
        apiMsg.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          apiMsg.messageId
        )
  
        apiMsg.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          mockResponse
        )
  
        instance.SetsettingID = apiMsg.messageId
        runEngine.sendMessage("Unit Test", apiMsg)
      })
  
      then('request response SetsettingID error', () => {
        const mockResponse = { errors: "juybgfvvcdxserdftg" }
  
        const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))
  
  
        apiMsg.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          apiMsg.messageId
        )
  
        apiMsg.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          mockResponse
        )
  
        instance.SetsettingID = apiMsg.messageId
        runEngine.sendMessage("Unit Test", apiMsg)
      })

      then("I can mock sahck with out error" , () => {
          instance.setState({switch2 : true})
          instance.sahck();
      })

      then("I can mock switch22 with out error" , () => {
        instance.switch22(true);
    })

      


    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      Platform.OS = "ios";
      instance.goSignupScreen();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
