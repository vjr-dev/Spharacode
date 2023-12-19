
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import SignUp from "../../src/SignUp";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as custumAlerts from "../../../../components/src/CustomAlert";

jest.useFakeTimers();
const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
  },
  route: {
    params: {
      roleID: 1
    }
  },
  id: "SignUpScreen",
};

const feature = loadFeature(
  "./__tests__/features/sign-up-screen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(custumAlerts, 'displayErrorMessage')
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("User navigates to SignUp screen", ({ given, when, then }) => {
    let signUpWrapper: ShallowWrapper;
    let instance: SignUp;

    given("I am a User attempting to navigate SignUp Screen", () => {
      signUpWrapper = shallow(<SignUp {...screenProps} />);
    });

    when("I navigate to the SignUp Screen", () => {
      instance = signUpWrapper.instance() as SignUp;
    });

    then("I can navigate back if I press back button", async () => {
      let backButton = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "backButton"
      );
      backButton.simulate("press");
      expect(screenProps.navigation.pop).toBeCalled();
    });

    then("'Welcome to Sphara' text display as title if I'm first responder", async () => {
      let firstResponderTitle = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "firstResponderTitle"
      );
      expect(firstResponderTitle.props().children).toBe("Welcome to Sphara");
    });

    then("'Sign Up' text display as title if I'm civilian", async () => {
      const tempProps = { ...screenProps };
      tempProps.route.params.roleID = 2;
      const civilianWrapper = shallow(<SignUp {...tempProps} />);
      let civilianTitle = civilianWrapper.findWhere(
        (node) => node.prop("testID") === "civilianTitle"
      );
      expect(civilianTitle.props().children).toBe("Sign Up");
    });

    then("'Provide your work phone number which you were enrolled at your work. So we can be able to send you confirmation as authentication code' text display as label if I'm first responder", async () => {
      let firstResponderLabel = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "firstResponderLabel"
      );
      expect(firstResponderLabel.props().children).toBe("Provide your work phone number which you were enrolled at your work. So we can be able to send you confirmation as authentication code");
    });

    then("'Provide your phone number so we can be able to send you confirmation code' text display as label if I'm civilian", async () => {
      const tempProps = { ...screenProps };
      tempProps.route.params.roleID = 2;
      const civilianWrapper = shallow(<SignUp {...tempProps} />);
      let civilianLabel = civilianWrapper.findWhere(
        (node) => node.prop("testID") === "civilianLabel"
      );
      expect(civilianLabel.props().children).toBe("Provide your phone number so we can be able to send you confirmation code");
    });

    then("I can pick the Country Code", async () => {
      const CountryCodeButton = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "CountryCodeButton"
      );
      CountryCodeButton.simulate("press");
      const countryPicker = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "countryPicker"
      );
      countryPicker.props().onSelect({ callingCode: "91" });
      countryPicker.props().onClose();
      const stateCodeText = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "stateCodeText"
      );
      expect(stateCodeText.props().children[1]).toBe("91");
    });

    then("I can enter the phone number", async () => {
      let phoneNumberInput = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "phoneNumberInput"
      );
      await phoneNumberInput.props().onChangeText("9999999999");
      phoneNumberInput = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "phoneNumberInput"
      );
      expect(phoneNumberInput.props().value).toBe("9999999999")
    });

    then("I can navigate to log in screen", async () => {
      let logInLink = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "logInLink"
      );
      logInLink.simulate("press");
      expect(screenProps.navigation.pop).toBeCalled();
    });

    then("I can not continue without phone number", async () => {
      const phoneNumberInput = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "phoneNumberInput"
      );
      await phoneNumberInput.props().onChangeText("");
      let continueButton = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "continueButton"
      );
      continueButton.simulate("press");
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Please Enter Valid Number.");
    });

    then("I can signup and navigate to verification screen if I add correct details", async () => {
      const phoneNumberInput = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "phoneNumberInput"
      );
      await phoneNumberInput.props().onChangeText("9999999999");
      let continueButton = signUpWrapper.findWhere(
        (node) => node.prop("testID") === "continueButton"
      );
      continueButton.simulate("press");
      const signUpAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      signUpAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        signUpAPI.messageId
      );
      signUpAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            attributes: {
              unique_auth_id: 123,
            },
          },
          meta: {
            token: "123456789",
          },
        }
      );
      instance.apiEmailLoginCallId = signUpAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", signUpAPI)
      expect(screenProps.navigation.navigate).toBeCalledWith("VerificationScreen", { Screen: "SIGNIN" })
    });

    then("I can see error message if getting from signup API", async () => {
      const responce = {
        errors: [
          {
            message: "error",
          },
        ],
      }
      const signUpAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      signUpAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        signUpAPI.messageId
      );
      signUpAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.apiEmailLoginCallId = signUpAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", signUpAPI)
      expect(custumAlerts.displayErrorMessage).toBeCalledWith(responce.errors[0].message)
    });
  });
});
