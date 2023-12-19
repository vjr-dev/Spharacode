import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import ChangePhoneNumber from "../../src/ChangePhoneNumber";
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
  },
  id: "ChangePassword",
};
const feature = loadFeature(
  "./__tests__/features/changePhoneNumber-scenario.feature"
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("User navigates to Change Phone Number screen", ({
    given,
    when,
    then,
  }) => {
    let changePhoneNumberWrapper: ShallowWrapper;
    let instance: ChangePhoneNumber;

    given("I am a User loading Change Phone Number screen", () => {
      jest.runAllTimers();
      changePhoneNumberWrapper = shallow(
        <ChangePhoneNumber {...screenProps} />
      );
    });

    when("I navigate to the Change Phone Number screen", () => {
      instance = changePhoneNumberWrapper.instance() as ChangePhoneNumber;
    });

    then("I can go back if i clicked back button", async () => {
      const backButton = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "backButton"
      );
      await backButton.simulate("press");
      expect(screenProps.navigation.goBack).toBeCalled();
    });

    then("I can select the country code for old phone number", async () => {
      const countryCodeOldPhoneButton = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "countryCodeOldPhoneButton"
      );
      countryCodeOldPhoneButton.simulate("press");
      const wrapper: any = changePhoneNumberWrapper
        .find("CustomCountryCodePicker")
        .props();
      await wrapper.onSelect({ callingCode: "91" });
      const oldNumberCountryCodeText = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "oldNumberCountryCodeText"
      );
      expect(oldNumberCountryCodeText.props().children[1]).toBe("91");
      wrapper.onClose();
    });

    then("I can select the country code for new phone number", async () => {
      const countryCodeNewPhoneButton = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "countryCodeNewPhoneButton"
      );
      countryCodeNewPhoneButton.simulate("press");
      const wrapper: any = changePhoneNumberWrapper
        .find("CustomCountryCodePicker")
        .props();
      await wrapper.onSelect({ callingCode: "91" });
      const newNumberCountryCodeText = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "newNumberCountryCodeText"
      );
      expect(newNumberCountryCodeText.props().children[1]).toBe("91");
      wrapper.onClose();
    });

    then("I can not submit form if i added only old number", async () => {
      let oldPhoneNumberInput = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "oldPhoneNumberInput"
      );
      oldPhoneNumberInput.props().onChangeText("9999999999");
      let newPhoneNumberInput = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "newPhoneNumberInput"
      );
      newPhoneNumberInput.props().onChangeText("");
      const continueButton = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "continueButton"
      );
      await continueButton.simulate("press");
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Please enter all details");
    });

    then("I can not submit form if i added only new number", async () => {
      let oldPhoneNumberInput = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "oldPhoneNumberInput"
      );
      oldPhoneNumberInput.props().onChangeText("");
      let newPhoneNumberInput = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "newPhoneNumberInput"
      );
      newPhoneNumberInput.props().onChangeText("9999999999");
      const continueButton = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "continueButton"
      );
      await continueButton.simulate("press");
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Please enter all details");
    });

    then("I can not submit form if i did not add both number", async () => {
      let oldPhoneNumberInput = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "oldPhoneNumberInput"
      );
      oldPhoneNumberInput.props().onChangeText("");
      let newPhoneNumberInput = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "newPhoneNumberInput"
      );
      newPhoneNumberInput.props().onChangeText("");
      const continueButton = changePhoneNumberWrapper.findWhere(
        (node) => node.prop("testID") === "continueButton"
      );
      await continueButton.simulate("press");
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Please enter all details");
    });

    then(
      "I can see error message if update phone number api's return any error",
      async () => {
        let oldPhoneNumberInput = changePhoneNumberWrapper.findWhere(
          (node) => node.prop("testID") === "oldPhoneNumberInput"
        );
        oldPhoneNumberInput.props().onChangeText("9999999999");
        let newPhoneNumberInput = changePhoneNumberWrapper.findWhere(
          (node) => node.prop("testID") === "newPhoneNumberInput"
        );
        newPhoneNumberInput.props().onChangeText("9999999999");
        const continueButton = changePhoneNumberWrapper.findWhere(
          (node) => node.prop("testID") === "continueButton"
        );
        await continueButton.simulate("press");
        const responce = {
          errors: {
            message: "Error from API",
          },
        };
        const updatePhoneNumberAPI: Message = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        updatePhoneNumberAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          updatePhoneNumberAPI.messageId
        );
        updatePhoneNumberAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responce
        );
        instance.changePhoneNumberAPIId = updatePhoneNumberAPI.messageId;
        const { receive: mockReceive } = instance;
        mockReceive("Unit Test", updatePhoneNumberAPI)
        expect(custumAlerts.displayErrorMessage).toBeCalledWith(responce.errors.message);
      }
    );
    then(
      "I can navigate to New PhoneNumber Verification if i submit form with all currect details",
      async () => {
        let oldPhoneNumberInput = changePhoneNumberWrapper.findWhere(
          (node) => node.prop("testID") === "oldPhoneNumberInput"
        );
        oldPhoneNumberInput.props().onChangeText("8888888888");
        let newPhoneNumberInput = changePhoneNumberWrapper.findWhere(
          (node) => node.prop("testID") === "newPhoneNumberInput"
        );
        newPhoneNumberInput.props().onChangeText("9999999999");
        const continueButton = changePhoneNumberWrapper.findWhere(
          (node) => node.prop("testID") === "continueButton"
        );
        await continueButton.simulate("press");
        const responce = {
          new_phone_number: "9999999999",
          token: "otp_verification_token",
        };
        const updatePhoneNumberAPI: Message = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        updatePhoneNumberAPI.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          updatePhoneNumberAPI.messageId
        );
        updatePhoneNumberAPI.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          responce
        );
        instance.changePhoneNumberAPIId = updatePhoneNumberAPI.messageId;
        const { receive: mockReceive } = instance;
        mockReceive("Unit Test", updatePhoneNumberAPI)
        expect(screenProps.navigation.navigate).toBeCalledWith(
          "NewPhoneNumberVerification",
          {
            newPhoneNumber: responce.new_phone_number,
            otpToken: responce.token,
          }
        );
      }
    );
  });
});
