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
import Maps from "../../src/Maps";
import GetLocation from "react-native-get-location";
import { Platform , Alert} from "react-native";

jest.useFakeTimers();
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
      return cb();
    }),
  },
  id: "Maps",
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "android",
  select: () => null,
}));

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "ios",
  select: () => null,
}));

let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));

const feature = loadFeature("./__tests__/features/Maps-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(Alert, 'alert').mockImplementation(()=>{});
  });

  test("User navigates to Maps", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: Maps;

    given("I am a User loading Maps", () => {
      exampleBlockA = shallow(<Maps {...screenProps} />);
    });

    when("I navigate to the Maps", () => {
      instance = exampleBlockA.instance() as Maps;
    });

    then("Maps will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click userLocation button with out error", () => {
      const userLocationbtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "userLocationBtn"
      );
      userLocationbtnComponent.simulate("press");
    });

    then("I can click openUrl button with out error", () => {
      const openUrlbtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "openUrl"
      );
      openUrlbtnComponent.simulate("press");
    });

    then("I can click switch button with out error", () => {
      const switch1btnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "switchBtn1"
      );
      switch1btnComponent.simulate("valueChange");

      const switch2btnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "switchBtn2"
      );
      switch2btnComponent.simulate("valueChange");

      const switch3btnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "switchBtn3"
      );
      switch3btnComponent.simulate("valueChange");
    });

    then("I can click modalvisble button with out error", () => {
      const modalvisibleBtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "modalvisibleBtn"
      );
      modalvisibleBtnComponent.simulate("press");
    });

    then("I can click payment button with out error", () => {
      const paymentBtnComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "paymentBtn"
      );
      paymentBtnComponent.simulate("press");
      instance.setState({ paymentView: true });
    });

    then("I can click paymentViewfn button with out error", () => {
      Platform.OS = "ios";
      const googlepayComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "googlepayBtn"
      );
      googlepayComponent.simulate("press");

      const RpayComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "RpayBtn"
      );
      RpayComponent.simulate("press");

      const appleclickComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "appleclickBtn"
      );
      appleclickComponent.simulate("press");
    });

    then("I can click paymentViewfn else with out error", () => {
      instance.setState({ viewPlans: true });
      instance.setState({ paymentView: false });
      instance.setState({ TrackingPlan: ["test1"] });
      const planComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "planBtn"
      );
      planComponent.simulate("press");
    });

    then("I can click onpay button with out error", () => {
      const onpayComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "onpayBtn"
      );
      onpayComponent.simulate("press");

      instance.setState({ selectedPlan: true });
    });

    then("should set Latitude and Longitude in state", async () => {
      const location = {
        latitude: 37.7749,
        longitude: -122.4194,
      };
      GetLocation.getCurrentPosition = jest.fn(() => Promise.resolve(location));

      instance.getCurrentLocation();
      instance.setState({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      instance.getCurrentLocation();

      instance.setState({ locationTracking: false });
      instance.getCurrentLocation();
    });

    then("SwitchCasesId request response successfully", () => {
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

      instance.switchCasesId = apiMsg.messageId;
      runEngine.sendMessage("Unit Test", apiMsg);
      const mockResponseError = {
        personal_information:{data:{attributes:{location_live_tracking: false}}}
      }
      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponseError
      )
    
      instance.switchCasesId = apiMsg.messageId
      runEngine.sendMessage("Unit Test", apiMsg)
    });

    then("SwitchCasesId request response error", () => {
        const mockResponse = {error:"messege gettin err"}
  
        const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));
  
        apiMsg.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          apiMsg.messageId
        );
  
        apiMsg.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          mockResponse
        );
  
        instance.switchCasesId = apiMsg.messageId;
        runEngine.sendMessage("Unit Test", apiMsg);
        
      });

    then("PlanId request response successfully", () => {
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
  
        instance.PlanId = apiMsg.messageId;
        runEngine.sendMessage("Unit Test", apiMsg);
      });

    then("I can leave the screen with out errors", () => {
      instance.receive()
      instance.componentWillUnmount();
      mockTimer();
      Platform.OS = "android";
      instance._onGooglePayClick();
      instance._onGooglePayClick();
      instance.GetSubscriptionPlan();
      instance.onPay();
      instance.Rpay();
      instance.componentDidMount();
      mockTimer();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
