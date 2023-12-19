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
import Settings5 from "../../src/Settings5";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
        return cb();
      }),
  },
  id: "Settings5",
};

const feature = loadFeature("./__tests__/features/Settings5-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Settings5", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Settings5;

    given("I am a User loading Settings5", () => {
      exampleBlockA = shallow(<Settings5 {...screenProps} />);
    });

    when("I navigate to the Settings5", () => {
      instance = exampleBlockA.instance() as Settings5;
    });

    then("Settings5 will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click goBack button with out error", () => {
      const gobackBtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "gobackBtn"
      );
      gobackBtnComponent.simulate("press");
    });

    then("display Global flatlist data", () => {
      let globalData = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "globalData"
      );
      expect(globalData).toBeTruthy();
      globalData.props().keyExtractor("3");
      const flat = shallow(
        globalData.props().renderItem({
          item: { icon: "abc" },
        })
      );
      const clickScreenComponent = flat.findWhere(
        (node) => node.prop("testID") === "clickScreen"
      );
      clickScreenComponent.simulate("press");
    });

    then("display emergencyApp flatlist data", () => {
      let emergencyApp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "emergencyApp"
      );
      expect(emergencyApp).toBeTruthy();
      emergencyApp.props().keyExtractor("3");
      const flat = shallow(
        emergencyApp.props().renderItem({
          item: {},
        })
      );
      const emergencyClickComponent = flat.findWhere(
        (node) => node.prop("testID") === "emergencyClick"
      );
      emergencyClickComponent.simulate("press");
    });

    then("display globalApp flatlist data", () => {
      let globalApp = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "globalApp"
      );
      expect(globalApp).toBeTruthy();
      globalApp.props().keyExtractor("3");
      const flat = shallow(
        globalApp.props().renderItem({
          item: { icon: "abc" },
        })
      );
      const globalClickComponent = flat.findWhere(
        (node) => node.prop("testID") === "globalClick"
      );
      globalClickComponent.simulate("press");
    });

    then("getListId request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.getListId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
        errors: {},
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.getListId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("getListId request response error", () => {
      const mockResponse = null

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.getListId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });

    then("LogoutapiId request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.LogoutapiId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
    });


    then("LogoutapiId request response error", () => {
        const mockResponse = null
  
        const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
  
        apiMsg.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          apiMsg.messageId
        );
  
        apiMsg.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          mockResponse
        );
  
        instance.LogoutapiId = apiMsg.messageId;
        runEngine.sendMessage("Unit Test", apiMsg);
    });
   
  

    then("I can leave the screen with out errors", () => {
      instance.txtInputWebProps.onChangeText("test");
      instance.btnShowHideProps.onPress();
      instance.btnExampleProps.onPress();
      instance.componentWillUnmount();
      instance.SignoutAPI();
      instance.setInputValue();
      instance.setEnableField();
      instance.onclick("LoginScreen")
      instance.componentDidMount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
