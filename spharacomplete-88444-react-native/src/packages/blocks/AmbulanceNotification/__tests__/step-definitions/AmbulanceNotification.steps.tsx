//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import AmbulanceNotification from "../../src/AmbulanceNotification";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Platform } from "react-native";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
  },
  route: {
    params: { DDD: ["jumjnhbghjn"], Address: "kmgbhnj", Time: ".lk,mjnhj" }
  },
  id: "AmbulanceNotification",
};


const feature = loadFeature("./__tests__/features/AmbulanceNotification-scenario.feature");

let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));


  jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest
      .fn()
      .mockImplementation((key: string) => {
        console.log("_----key", key);
        if (key === "User_Data") return JSON.stringify({attributes:{ambulance:"jbjkn"}});
        return "User_Data";
      }),
   
    setItem: jest.fn(),
  }));
  
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to AmbulanceNotification", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: AmbulanceNotification;

    given("I am a User loading AmbulanceNotification", () => {
      exampleBlockA = shallow(<AmbulanceNotification {...screenProps} />);
    });

    when("I navigate to the AmbulanceNotification", () => {
      instance = exampleBlockA.instance() as AmbulanceNotification;
    });

    then("AmbulanceNotification will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();

    });

    then('I can click button with out errors', () => {
      const btnClick = exampleBlockA.findWhere((node) => node.prop("testID") === "btnclick")
      btnClick.simulate("press")
    })

    then('I can add array with out error', () => {
      instance.setState({ Contactdata: ['test1', 'test2', 'test3'] })
      instance.componentDidMount()
    })

    then('I can add array with null and undefined value', () => {
      instance.setState({ Contactdata: undefined })
    })

    then('I can click done button with out errors', () => {
      const doneClick = exampleBlockA.findWhere((node) => node.prop("testID") === "doneClickBtn")
      doneClick.simulate("press")
    })

    then('request response FirstapiID successfully', () => {
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

      instance.FirstapiID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)
    })

    then('request response FirstapiID error', () => {
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

      instance.FirstapiID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)
    })


    then('request response AmbulaceID successfully', () => {
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

      instance.AmbulaceID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)
    })

    then('request response AmbulaceID error', () => {
      const mockResponse = { errors: ["ffdfdfcfg", 'jhhhhhn'] }

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))


      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      )

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      )

      instance.AmbulaceID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)
    })


    then('I can navigate to goback  with out errors', () => {
      instance.goback()
    })


    then("I can leave the screen with out errors", () => {
      Platform.OS = "android"
      instance.onAmbulanceCall()
      mockTimer()
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });


});
