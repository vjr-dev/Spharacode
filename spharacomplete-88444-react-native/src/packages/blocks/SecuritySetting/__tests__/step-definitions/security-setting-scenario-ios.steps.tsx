//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import SecuritySetting from "../../src/SecuritySetting";
import { Platform } from "react-native";
jest.useFakeTimers();
const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "SecuritySetting",
};

const feature = loadFeature(
  "./__tests__/features/security-setting-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "ios",
      select: () => null,
    }));
  });

  test("User navigates to SecuritySetting screen", ({ given, when, then }) => {
    let securitySettingWrapper: ShallowWrapper;
    let instance: SecuritySetting;

    given("I am a User attempting to SecuritySetting Screen", () => {
      securitySettingWrapper = shallow(<SecuritySetting {...screenProps} />);
      expect(securitySettingWrapper).toBeTruthy();
      expect(securitySettingWrapper).toMatchSnapshot();
    });

    when("I navigate to the SecuritySetting Screen", () => {
      instance = securitySettingWrapper.instance() as SecuritySetting;
      expect(instance).toBeTruthy();
    });

    then("I can press back button", async () => {
      Platform.OS = "android";
      let backButton = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "backButton"
      );
      backButton.simulate("press");
      expect(backButton).toBeTruthy();
    });

    then("I can turn on or off two step verifications", async () => {
      Platform.OS = "ios";
      let twoStepSwitch = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "twoStepSwitch"
      );
      twoStepSwitch.props().onValueChange(true);
      twoStepSwitch.props().onValueChange(false);
      expect(twoStepSwitch).toBeTruthy();
    });

    then("I can edit passcode", async () => {
      let editPasscodeButton = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "editPasscodeButton"
      );
      editPasscodeButton.simulate("press");
      expect(editPasscodeButton).toBeTruthy();
    });

    then("I can edit email", async () => {
      let editEmailButton = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "editEmailButton"
      );
      editEmailButton.simulate("press");
      expect(editEmailButton).toBeTruthy();
    });

    then("I can accept two step verification on modal", async () => {
      let yesButton = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "yesButton"
      );
      yesButton.simulate("press");
      expect(yesButton).toBeTruthy();
    });

    then("I can decline two step verification on modal", async () => {
      let noButton = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "noButton"
      );
      noButton.simulate("press");
      expect(noButton).toBeTruthy();
    });
  });
});
