//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { Alert } from "react-native";
import FirstResponderDashboard from "../../src/FirstResponderDashboard";
import * as getLocation  from "../../../../components/src/GettLocation";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
    openDrawer: jest.fn(),
  },
  //   route: {
  //     params: {
  //       from: "EmergencyContact",
  //     },
  //   },
  id: "FirstResponderDashboard",
};

const feature = loadFeature(
  "./__tests__/features/FirstResponderDashboard-scenario.feature"
);

let data={
    latitude:54.5252,
    longitude:54.2522
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    jest.spyOn(getLocation,"getCurrentLocation").mockImplementation((): any => Promise.resolve(data))
  });

  test("User navigates to DashBord Screen", ({ given, when, then }) => {
    let firstResponderDashboardWrapper: ShallowWrapper;
    let instance: FirstResponderDashboard;

    given("User loading DashBord", () => {
      firstResponderDashboardWrapper = shallow(
        <FirstResponderDashboard {...screenProps} />
      );
    });

    when("User navigate to the DashBord screeen", () => {
      instance = firstResponderDashboardWrapper.instance() as FirstResponderDashboard;
    });

    then("I can navigate to toggledrawer with out errror", () => {
      const togglebtnComponent = firstResponderDashboardWrapper.findWhere(
      (node) => node.prop("testID") === "btntoggleDrawer"
      );
      togglebtnComponent.simulate("press");
    });

    then("User can leave the screen with out errors", () => {});
  });
});
