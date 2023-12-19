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
import LoginScreen from "../../src/Login";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import GetLocation from "react-native-get-location";
import { Platform, Alert, AppState } from "react-native";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "LoginScreen",
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "ios",
  select: () => null,
}));

jest.spyOn(global, "setTimeout").mockImplementation((cb: any) => cb && cb());

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest
    .fn()
    .mockImplementationOnce((key) => {
      if (key === "Token") return "0";
      if (key === "User_Data") return "userData";
      return "Token";
    })
    .mockImplementation(() => null),

  setItem: jest.fn().mockImplementation((key) => {
    console.log("----key", key);
    if (key === "Login_Token")
      return JSON.stringify({ meta: { token: "sneha" } });
    if (key === "fcmToken") return "fcmToken";
    return "data";
  }),
}));

const feature = loadFeature(
  "./__tests__/features/LoginScreen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(AppState, "addEventListener").mockImplementation((ev, cb) => {
      return cb("active");
    });
  });

  test("User navigates to LoginScreen", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: LoginScreen;

    given("I am a User loading LoginScreen", () => {
      exampleBlockA = shallow(<LoginScreen {...screenProps} />);
    });

    when("I navigate to the LoginScreen", () => {
      instance = exampleBlockA.instance() as LoginScreen;
    });

    then("LoginScreen will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click Cmodal Button with out error", () => {
      const CmodalComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "Cmodal"
      );
      CmodalComponent.simulate("press");
    });

    then("I can enter text with out error", () => {
      let textinputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") == "inputBtn"
      );
      textinputComponent.simulate("changeText", "event");
    });

    then("I can click goSignup Button with out error", () => {
      const goSignupComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "goSignupBtn"
      );
      goSignupComponent.simulate("press");
    });

    then("I can click verificationgo Button with out error", () => {
      instance.getFcmToken();
      const verificationgoComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "varificationgoBtn"
      );
      instance.setState({ Number: 0 });
      jest
        .spyOn(instance, "getFcmToken")
        .mockImplementation(() => Promise.resolve(true));

      verificationgoComponent.simulate("press");
    });

    then("I can click countrypicker Button with out error", () => {
      const countryPickerComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "countrypickerBtn"
      );
      countryPickerComponent.simulate("select", { callingCode: "+1" });
      countryPickerComponent.simulate("close");
     
    });

    then("I can mock checkPermissions with out error", () => {
      jest.mock("react-native/Libraries/Utilities/Platform", () => ({
        OS: "android",
        select: () => null,
      }));
      Platform.OS = "android";
      jest.spyOn(Alert, "alert").mockImplementation(() => jest.fn());
      instance.CheckPermission();
      jest.spyOn(Alert, "alert").mockImplementationOnce((event, cb, arr) => {
        arr[0] && arr[0].onPress();
      });
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

    then("I can mock getPermission with out error", () => {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded = jest.fn(() =>
        Promise.resolve("already-enabled")
      );
      instance.getPermissions();
      expect(
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded
      ).toHaveBeenCalledWith({ interval: 10000, fastInterval: 5000 });
    });

    then("I can mock getPermission else part with out error", async () => {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded = jest.fn(() =>
        Promise.resolve("error")
      );

      instance.getPermissions();

    });

    then("should set Latitude and Longitude in state", async () => {
      const location = {
        latitude: 37.7749,
        longitude: -122.4194,
      };

      const error = {
        code: "CANCELLED",
        message: "User cancelled the request",
      };

      GetLocation.getCurrentPosition = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(location))
        .mockImplementation(() => Promise.reject(error));
      instance.componentDidMount();

      instance.setState({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      instance.componentDidMount();
      instance.componentDidMount();
    });

    then("get apiEmailLoginCallId response successfully", () => {
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

      instance.apiEmailLoginCallId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      runEngine.sendMessage("Unit Test", apiMsg);
      jest.spyOn(Alert, "alert").mockImplementationOnce((event, cb, arr) => {
        arr[0] && arr[0].onPress();
      });
     
      const mockResponseError = {
        errors: "bvnb",
      };
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      );

      instance.apiEmailLoginCallId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      
      
    });


    then("should handle varificationgo", () => {
      instance.setState({ Number: "1234" });
      jest
        .spyOn(instance, "getFcmToken")
        .mockImplementation(() => Promise.resolve(true));

      instance.varificationgo();
    });

    then("I can mock getFcmToken with error", () => {

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      Platform.OS = "ios";
      instance.goback();
      instance.modalclose();
      instance.getPermissions();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
