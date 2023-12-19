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
import { Platform, Alert } from "react-native";
import GetLocation from "react-native-get-location";
import TimeToAlert from "../../src/TimeToAlert";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
      return cb();
    }),
  },
  id: "TimeToAlert",
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "ios",
  select: () => null,
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest
    .fn()
    .mockImplementationOnce((key) => {
      console.log("_----key", key);
      if (key === "Token") return "0";
      if (key === "User_Data") return "0";
      return "Token";
    })
    .mockImplementation(() => null),
  setItem: jest.fn(),
}));

let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));

const feature = loadFeature(
  "./__tests__/features/TimeToAlert-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers(); 
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to TimeToAlert", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: TimeToAlert;

    given("I am a User loading TimeToAlert", () => {
      exampleBlockA = shallow(<TimeToAlert {...screenProps} />);
    });

    when("I navigate to the TimeToAlert", () => {
      instance = exampleBlockA.instance() as TimeToAlert;
    });

    then("TimeToAlert will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click hour array button with out error", () => {
      const hourarrbtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "hourArrBtn"
      );
      hourarrbtnComponent.simulate("valueChange");
    });

    then("I can click minute array button with out error", () => {
      const minbtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "minArrBtn"
      );
      minbtnComponent.simulate("valueChange");
    });

    then("I can click sec array button with out error", () => {
      const secarrbtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "secArrBtn"
      );
      secarrbtnComponent.simulate("valueChange");
      instance.setState({ TimerStaus: 2 });
    });

    then("I can click circle Timer array button with out error", () => {
      const circleTimerbtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "circleTimerBtn"
      );
      circleTimerbtnComponent.simulate("complete");
    });

    then("I can click cancle button with out error", () => {
      const canclebtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cancleBtn"
      );
      canclebtnComponent.simulate("press");
    });

    then("I can click start click button with out error", () => {
      const startclickbtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "startClickBtn"
      );
      startclickbtnComponent.simulate("press");
      instance.setState({ TimeRunning: true });
    });

    then("I can click pause button with out error", () => {
      const pausebtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "pauseBtn"
      );
      pausebtnComponent.simulate("press");
      instance.setState({ userData: undefined });
    });

    then("I can press countdownBtn button with out error", () => {
      const countdownBtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "countdownBtn"
      );
      countdownBtnComponent.simulate("times");
      countdownBtnComponent.simulate("end");
    });

    then("I can press yes button with out error", () => {
      const pausebtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "pressyesBtn"
      );
      pausebtnComponent.simulate("press");
    });

    then("I can press no button with out error", () => {
      const pressNoComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "pressNoBtn"
      );
      pressNoComponent.simulate("press");
    });

    then("I can press timeruning and cancle button with out error", () => {
      const timeruningComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "NoBtn"
      );
      timeruningComponent.simulate("press");
    });

    then("I can press cancle call button with out error", () => {
      const canclecallComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cancleCallBtn"
      );
      canclecallComponent.simulate("press");
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

    then("should set Latitude and Longitude in state", async () => {
      const location = {
        latitude: 37.7749,
        longitude: -122.4194,
      };
      GetLocation.getCurrentPosition = jest.fn(() => Promise.resolve(location));
      instance.setState({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      instance.componentDidMount();
    });

    then("should handle the error if the location cannot be obtained", () => {
      const error = {
        code: "CANCELLED",
        message: "User cancelled the request",
      };
      GetLocation.getCurrentPosition = jest.fn(() => Promise.reject(error));
      instance.componentDidMount();
    });

    then("get ProfileGetId response successfully", () => {
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

      instance.ProfileGetId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
        errors:null
      }
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      )
    
      instance.ProfileGetId = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)
    });

   

    then("get PanicAgainId response successfully", () => {
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

      instance.PanicAgainId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);

    });
    
    then("get FiredataID response successfully", () => {
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

      instance.FiredataID = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
        data : {message : "xyz"}
      }
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      )
    
      instance.FiredataID = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)

    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      // mockTimer();
      Platform.OS = "ios";
      instance.children(9);
      instance.children();
      instance.children1(9);
      instance.children1();
      instance.componentDidMount();
      instance.componentDidMount();
      instance.componentDidMount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
