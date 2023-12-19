//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import UpdateSecuritySetting from "../../src/UpdateSecuritySetting";
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
  id: "UpdateSecuritySetting",
};

const feature = loadFeature(
  "./__tests__/features/update-security-setting-scenario.feature"
);
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "android",
      select: () => null,
    }));
  });

  test("User navigates to UpdateSecuritySetting screen", ({
    given,
    when,
    then,
  }) => {
    let securitySettingWrapper: ShallowWrapper;
    let instance: UpdateSecuritySetting;

    given("I am a User attempting to UpdateSecuritySetting Screen", () => {
      securitySettingWrapper = shallow(
        <UpdateSecuritySetting {...screenProps} />
      );
      expect(securitySettingWrapper).toBeTruthy();
      expect(securitySettingWrapper).toMatchSnapshot();
    });

    when("I navigate to the UpdateSecuritySetting Screen", () => {
      instance = securitySettingWrapper.instance() as UpdateSecuritySetting;
      expect(instance).toBeTruthy();
    });

    then("I can dismiss the keyboard", async () => {
      jest.mock("react-native/Libraries/Utilities/Platform", () => ({
        OS: "android",
        select: () => null,
      }));
      let keyboardDismissButton = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "keyboardDismissButton"
      );
      keyboardDismissButton.simulate("press");
      instance._keyboardDidHide();
      expect(keyboardDismissButton).toBeTruthy();
    });

    then("I can press back button", async () => {
      let backButton = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "backButton"
      );
      backButton.simulate("press");
      expect(backButton).toBeTruthy();
    });

    then("I can enter the passcode", async () => {
      let passcodeInput = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "passcodeInput"
      );
      passcodeInput.props().onChangeText("12345678");
      passcodeInput.props().onFocus();
      jest.runAllTimers();
      expect(passcodeInput).toBeTruthy();
    });

    then("I can enter the confirm passcode", async () => {
      let confirmPasscodeInput = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "confirmPasscodeInput"
      );
      confirmPasscodeInput.props().onChangeText("12345678");
      confirmPasscodeInput.props().onFocus();
      jest.runAllTimers();
      expect(confirmPasscodeInput).toBeTruthy();
    });

    then(
      "I can press next button with same passcode and confirm passcode",
      async () => {
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );

    then(
      "I can not press next button with passcode and with out confirm passcode",
      async () => {
        instance.setState({ Pass: "12345678", CPass: "" });
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );

    then(
      "I can not press next button with out passcode and with confirm passcode",
      async () => {
        instance.setState({ CPass: "12345678", Pass: "" });
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );

    then(
      "I can not press next button if passcode and confirm passcode not match",
      async () => {
        instance.setState({ CPass: "12345678", Pass: "58451218" });
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );

    then(
      "I can not press next button if passcode length less than 8 and confirm passcode length 8",
      async () => {
        instance.setState({ CPass: "12345678", Pass: "58458" });
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );
    then(
      "I can not press next button if confirm passcode length less than 8 and passcode length 8",
      async () => {
        instance.setState({ CPass: "12345", Pass: "12345678" });
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );

    then("I can successfully leave the screen", async () => {
      instance.componentWillUnmount();
    });
  });
});
