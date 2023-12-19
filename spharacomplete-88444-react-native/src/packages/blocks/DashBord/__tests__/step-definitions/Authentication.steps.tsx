//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "framework/src/Helpers";
import React from "react";
import Authentication from "../../src/Authentication";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { Alert } from "react-native";
import music from "../../../../mobile/sample.mp3"
import { Platform } from "react-native";
import { globalAgent } from "http";
const navigation = require("react-navigation");


const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn()
  },
  id: "Authentication"
};
const feature = loadFeature("./__tests__/features/Authentication-scenario.feature");



jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "android",
  select: () => null,
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest
    .fn()
    .mockImplementation((key: string) => {
      console.log("_----key", key);
      if (key === "Token") return 0;
      return "Token";
    })
    .mockImplementation((key: string) => {
      if (key === "IsVolenteer") return 0;
      return "IsVolenteer"
    }),

  setItem: jest
    .fn()

}));



global.fetch = jest
  .fn()
  .mockImplementationOnce(() => Promise.reject("API is down")) // error msg 
  .mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          meetingId: "1234", // data goes here
        }),
    })
  );



let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));






//global.alert = () => jest.spyOn('Alert')


defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.doMock("../../../../mobile/sample.mp3", () => ({}));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Authentication", ({ given, when, then }) => {
    let AuthenticationWrapper: ShallowWrapper;
    let instance: Authentication;
    given("I am a User loading Authentication", () => {
      AuthenticationWrapper = shallow(<Authentication {...screenProps} />);
      expect(AuthenticationWrapper).toBeTruthy();

    });

    when("I navigate to the Authentication", () => {
      instance = AuthenticationWrapper.instance() as Authentication;
      expect(AuthenticationWrapper).toBeTruthy();

    });

    then("Authentication will load with out errors", () => {
      expect(AuthenticationWrapper).toBeTruthy();

    });

    then("I can click goback button with out error", () => {
      const gobackComponent = AuthenticationWrapper.findWhere((node) => node.prop("testID") === "gobackbtn")
      gobackComponent.simulate("press")
    })

    then("I can enter text with out error", () => {
      let textinputComponent = AuthenticationWrapper.findWhere((node) => node.prop("testID") == "textInput")
      textinputComponent.simulate("changeText", "event")
    })

    then("I can click otpCheckbtn with out error", () => {
      let otpcheckComponent = AuthenticationWrapper.findWhere((node) => node.prop("testID") === "otpCheckbtn")
      otpcheckComponent.simulate("press")
    })

    then('request response successfully', () => {
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

      instance.OtpId = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)
    })


    then('request response error', () => {
      const mockResponse = undefined

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      )

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      )

      instance.OtpId = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)
    })

    then("I can ckeck  optcheck with out error", () =>{
      jest.spyOn(Alert, 'alert').mockImplementation(()=>{});
      instance.otpcheck("")
      instance.otpcheck(1234)
      instance.onSetvolenteer()
      instance.otpcheck("1234")

    })

    then("I can mock checkPermissions with out error", () => {
      // jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      //   OS: "android",
      //   select: () => null,
      // }));
      // Platform.OS = "android";
      jest.spyOn(Alert, "alert").mockImplementation(() => jest.fn());
      jest.spyOn(instance, "isPlatformAndroid").mockImplementation(() => true);
      instance.CheckPermission();
      jest.spyOn(Alert, "alert").mockImplementationOnce((event, cb, arr) => {
        arr[0] && arr[0].onPress();
      });
      instance.CheckPermission();
      instance.CheckPermission();
      instance.CheckPermission();
      instance.componentDidMount();
    });

    then("I can mock checkPermissions else with out error", () => {
      jest.mock("react-native-permissions", () => {
        const Permissions = jest.requireActual("react-native-permissions/mock");

        return {
          ...Permissions,
          check: jest.fn(() => Promise.resolve(true)),
          request: jest
            .fn()
            .mockImplementationOnce(
              (key) =>
                new Promise((resolve, reject) => {
                  return resolve("unavailable");
                })
            )
            .mockImplementationOnce(
              (key) =>
                new Promise((resolve, reject) => {
                  return resolve("denied");
                })
            )
            .mockImplementation(
              (key) =>
                new Promise((resolve, reject) => {
                  return resolve("blocked");
                })
            )
            .mockImplementationOnce(
              (key) =>
                new Promise((resolve, reject) => {
                  return resolve("granted");
                })
            ),
        };
      });
      jest.mock("react-native/Libraries/Utilities/Platform", () => ({
        OS: "ios",
        select: () => null,
      }));
      Platform.OS = "ios";
      instance.CheckPermission();
      jest.spyOn(Alert, "alert").mockImplementationOnce((event, cb, arr) => {
        arr[0] && arr[0].onPress();
      });
      instance.CheckPermission();
      instance.CheckPermission();
      instance.componentDidMount();
    });


   
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      Platform.OS = "android"
      instance.componentDidMount();
      instance.onSetvolenteer()
      instance.onSetvolenteer()
      mockTimer() 
      instance.CheckPermission()
      expect(AuthenticationWrapper).toBeTruthy();
    });
  });
});
