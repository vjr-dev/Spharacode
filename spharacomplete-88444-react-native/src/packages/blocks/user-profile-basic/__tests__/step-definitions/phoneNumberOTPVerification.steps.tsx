import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import NewPhoneNumberVerification from "../../src/NewPhoneNumberVerification";
import * as custumAlerts from "../../../../components/src/CustomAlert";


jest.useFakeTimers();
const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    replace: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn()
  },
  route: {
    params: {
      newPhoneNumber: "9999999999",
      token: "phone_number_verification_token",
    },
  },
  id: "NewPhoneNumberVerification",
};
const feature = loadFeature(
  "./__tests__/features/phoneNumberOTPVerification-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(JSON, "parse").mockReturnValue("aaa");
    jest.spyOn(custumAlerts, 'displayErrorMessage')
    jest.spyOn(custumAlerts, 'displaySuccessMessage')
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("User navigates to new phone number verification Screen", ({
    given,
    when,
    then,
  }) => {
    let verificationWrapper: ShallowWrapper;
    let instance: NewPhoneNumberVerification;

    given("I am a User attempting to verify new phone number with otp", () => {
      jest.runAllTimers();

      verificationWrapper = shallow(
        <NewPhoneNumberVerification {...screenProps} />
      );
    });

    when("I navigate to the new phone number verification Screen", () => {
      instance = verificationWrapper.instance() as NewPhoneNumberVerification;
    });

    then("I can go back if i clicked back button", async () => {
      const backButton = verificationWrapper.findWhere(
        (node) => node.prop("testID") === "backButton"
      );
      await backButton.simulate("press");
      expect(screenProps.navigation.goBack).toBeCalled();
    });

    then("I can add OTP without error", async () => {
      let verificationCodeInput = verificationWrapper.findWhere(
        (node) => node.prop("testID") === "verificationCodeInput"
      );
      verificationCodeInput.props().onChangeText("123456");
      verificationCodeInput = verificationWrapper.findWhere(
        (node) => node.prop("testID") === "verificationCodeInput"
      );
      expect(verificationCodeInput.props().value).toBe("123456");
    });

    then("I can not verify number without OTP entered", async () => {
      let verificationCodeInput = verificationWrapper.findWhere(
        (node) => node.prop("testID") === "verificationCodeInput"
      );
      verificationCodeInput.props().onChangeText("");
      const confirmButton = verificationWrapper.findWhere(
        (node) => node.prop("testID") === "confirmButton"
      );
      await confirmButton.simulate("press");
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Please enter OTP.");
    });

    then("I can verify number with correct OTP", async () => {
      let verificationCodeInput = verificationWrapper.findWhere(
        (node) => node.prop("testID") === "verificationCodeInput"
      );
      verificationCodeInput.props().onChangeText("123456");
      const confirmButton = verificationWrapper.findWhere(
        (node) => node.prop("testID") === "confirmButton"
      );
      await confirmButton.simulate("press");
      const responce = {
        messages: "verified",
      };
      const verifyOTPAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verifyOTPAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verifyOTPAPI.messageId
      );
      verifyOTPAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.verifyPhoneNumberAPIId = verifyOTPAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verifyOTPAPI)
      expect(custumAlerts.displaySuccessMessage).toBeCalledWith(
        "Your phone number has been updated."
      );
    });

    then("I can see the api error if any", async () => {
      const responce = {
        errors: {
          message: "OTP is invalid",
        },
      };
      const verifyOTPAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verifyOTPAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verifyOTPAPI.messageId
      );
      verifyOTPAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.verifyPhoneNumberAPIId = verifyOTPAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verifyOTPAPI)
      expect(custumAlerts.displayErrorMessage).toBeCalledWith(responce.errors.message);
    });
  });
});
