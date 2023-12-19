//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import React from "react";
import Thankyou from "../../src/Thankyou";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
  },
  route: {
    params: {
      data: { name: "Test Name" },
      userName: "abc",
    },
  },
  id: "ThankyouScreen",
};

const feature = loadFeature(
  "./__tests__/features/ThankyouScreen-scenario.feature"
);
jest.mock("react-native/Libraries/Utilities/BackHandler", () => {
  return jest.requireActual(
    "react-native/Libraries/Utilities/__mocks__/BackHandler.js"
  );
});
defineFeature(feature, (test) => {
  const mockAsyncStorage = jest.spyOn(AsyncStorage, "getItem");
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      BackHandler: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });
  test("User navigates to ThankyouScreen", ({ given, when, then }) => {
    let ThankyouScreenBlockWrapper: ShallowWrapper;
    let instance: Thankyou;

    given("I am a User loading ThankyouScreen", () => {
      //@ts-ignore
      ThankyouScreenBlockWrapper = shallow(<Thankyou {...screenProps} />);
      expect(ThankyouScreenBlockWrapper).toBeTruthy();
      expect(ThankyouScreenBlockWrapper).toMatchSnapshot();
    });

    when("I navigate to the ThankyouScreen", () => {
      instance = ThankyouScreenBlockWrapper.instance() as Thankyou;
    });

    then("ThankyouScreen will load with out errors", () => {
      //@ts-ignore
      expect(ThankyouScreenBlockWrapper).toBeTruthy();
    });

    then("Handle onClick button press", () => {
      let buttonComponent = ThankyouScreenBlockWrapper.findWhere(
        (node) => node.prop("testID") === "continueButton"
      );
      buttonComponent.simulate("press", instance.onclick());
      instance.goback();
      //@ts-ignore
      expect(buttonComponent).toBeTruthy();
    });
    then(
      "User can check authentication code popup if user is first responder",
      async () => {
        mockAsyncStorage.mockClear();
        mockAsyncStorage.mockImplementation((key) => {
          if (key == "roleID") {
            return "1";
          }
        });
        const wrapper = await shallow(<Thankyou {...screenProps} />);
        let authCodeLink = wrapper.findWhere(
          (node) => node.prop("testID") === "authCodeLink"
        );
        authCodeLink.simulate("press");
        let popupText = wrapper.findWhere(
          (node) => node.prop("testID") === "popupText"
        );
        expect(popupText.props().children).toBe(
          "Authentication code is a 6 digit code sent by us to your company which confirm your identity as first respoder."
        );
      }
    );
    then(
      "User can close authentication code popup if user click outside",
      async () => {
        mockAsyncStorage.mockClear();
        mockAsyncStorage.mockImplementation((key) => {
          if (key == "roleID") {
            return "1";
          }
        });
        const wrapper = await shallow(<Thankyou {...screenProps} />);
        let authCodeLink = wrapper.findWhere(
          (node) => node.prop("testID") === "authCodeLink"
        );
        authCodeLink.simulate("press");
        let outsideClick = wrapper.findWhere(
          (node) => node.prop("testID") === "outsideClick"
        );
        outsideClick.simulate("press");
        let popupText = wrapper.findWhere(
          (node) => node.prop("testID") === "popupText"
        );
        expect(popupText.isEmptyRender()).toBe(true);
      }
    );
    then("I can unmount screen without error", () => {
      BackHandler.mockPressBack();
      ThankyouScreenBlockWrapper.unmount();
    });
  });
});
