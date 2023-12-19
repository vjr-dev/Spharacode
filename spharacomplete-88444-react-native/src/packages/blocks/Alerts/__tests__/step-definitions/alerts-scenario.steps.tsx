//@ts-ignore
//@ts-nocheck
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import Alerts from "../../src/Alerts";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    getParam: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
  },
  route:{
    params:{
      date:"date"
    }
  }
};

const feature = loadFeature("./__tests__/features/alerts-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Alerts Screen", ({ given, when, then }) => {
    let alertsWrapper: ShallowWrapper;
    let instance: Alerts;

    given("I am a User getting alerts", () => {
      alertsWrapper = shallow(<Alerts {...screenProps} />);
      expect(alertsWrapper).toBeTruthy();
      expect(alertsWrapper).toMatchSnapshot();
    });

    when("I navigate to the Alerts Screen", () => {
      instance = alertsWrapper.instance() as Alerts;
      instance.setState({
        txtInputValue: "",
        txtSavedValue: "A",
        enableField: false,
        Detail: true,
        Chat: false,
      });
      expect(alertsWrapper).toBeTruthy();
      expect(alertsWrapper).toMatchSnapshot();
    });

    then("I can press back button", () => {
      let alertsBackButton = alertsWrapper.findWhere(
        (node) => node.prop("testID") === "alertsBackButton"
      );
      alertsBackButton.simulate("press");
      expect(alertsBackButton).toBeTruthy();
    });

    then("I can press details button", () => {
      instance.setState({ Detail: false, Chat: true });
      let alertsDetailsButton = alertsWrapper.findWhere(
        (node) => node.prop("testID") === "alertsDetailsButton"
      );
      alertsDetailsButton.simulate("press");
      expect(alertsDetailsButton).toBeTruthy();
    });
  });
});
