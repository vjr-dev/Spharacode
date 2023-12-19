//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import EditSecuritySetting from "../../src/EditSecuritySetting";
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
  id: "EditSecuritySetting",
};

const feature = loadFeature(
  "./__tests__/features/edit-security-setting-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "ios",
      select: () => null,
    }));
  });

  test("User navigates to EditSecuritySetting screen", ({
    given,
    when,
    then,
  }) => {
    let securitySettingWrapper: ShallowWrapper;
    let instance: EditSecuritySetting;

    given("I am a User attempting to EditSecuritySetting Screen", () => {
      securitySettingWrapper = shallow(
        <EditSecuritySetting {...screenProps} />
      );
      expect(securitySettingWrapper).toBeTruthy();
      expect(securitySettingWrapper).toMatchSnapshot();
    });

    when("I navigate to the EditSecuritySetting Screen", () => {
      instance = securitySettingWrapper.instance() as EditSecuritySetting;
      expect(instance).toBeTruthy();
    });

    then("I can dismiss the keyboard", async () => {
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

    then("I can enter the email", async () => {
      let emailInput = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "emailInput"
      );
      emailInput.props().onChangeText("abc@mail.com");
      emailInput.props().onFocus();
      jest.runAllTimers();
      expect(emailInput).toBeTruthy();
    });

    then("I can enter the confirm email", async () => {
      let confirmEmailInput = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "confirmEmailInput"
      );
      confirmEmailInput.props().onChangeText("abc@email.com");
      confirmEmailInput.props().onFocus();
      jest.runAllTimers();
      expect(confirmEmailInput).toBeTruthy();
    });

    then(
      "I can press next button with same email and confirm email",
      async () => {
        instance.setState({ Email: "abc@mail.com", CEmail: "abc@mail.com" });
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );

    then(
      "I can not press next button with email and with out confirm email",
      async () => {
        instance.setState({ Email: "abc@mail.com", CEmail: "" });
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );

    then(
      "I can not press next button with out email and with confirm email",
      async () => {
        instance.setState({ Email: "", CEmail: "abc@mail.com" });
        let nextButton = securitySettingWrapper.findWhere(
          (node) => node.prop("testID") === "nextButton"
        );
        nextButton.simulate("press");
        expect(nextButton).toBeTruthy();
      }
    );

    then("I can not press next button with out validate email", async () => {
      instance.setState({ Email: "aa", CEmail: "aa" });
      let nextButton = securitySettingWrapper.findWhere(
        (node) => node.prop("testID") === "nextButton"
      );
      nextButton.simulate("press");
      expect(nextButton).toBeTruthy();
    });

    then(
      "I can not press next button with out same email and confirm email",
      async () => {
        instance.setState({ Email: "aa@mail.com", CEmail: "abc@mail.com" });
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
