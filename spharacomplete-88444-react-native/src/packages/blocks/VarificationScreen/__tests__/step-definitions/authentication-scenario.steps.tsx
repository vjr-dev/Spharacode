import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import Authentication from "../../src/Authentication";
import { BackHandler } from "react-native";
import * as custumAlerts from "../../../../components/src/CustomAlert";
import * as logout from "../../../../components/src/Navigation/logout";
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
  id: "Authentication"
};
const feature = loadFeature(
  "./__tests__/features/authentication-scenario.feature"
);
jest.mock("react-native/Libraries/Utilities/BackHandler", () => {
  return jest.requireActual(
    "react-native/Libraries/Utilities/__mocks__/BackHandler.js"
  );
});
defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      BackHandler: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(JSON, "parse").mockReturnValue("aaa");
    jest.spyOn(custumAlerts, 'backToLoginConfirmationAlert').mockImplementation((onAccept: Function) => onAccept())
    jest.spyOn(logout, 'OnLogOut').mockImplementation((): any => Promise.resolve(true))
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("User navigates to Authentication Screen", ({
    given,
    when,
    then
  }) => {
    let authenticationWrapper: ShallowWrapper;
    let instance: Authentication;

    given("I am a User attempting to Authentication with otp", () => {
      jest.runAllTimers();

      authenticationWrapper = shallow(<Authentication {...screenProps} />);
    });

    when("I navigate to the Authentication", () => {
      authenticationWrapper = shallow(<Authentication {...screenProps} />);
      instance = authenticationWrapper.instance() as Authentication;
    });

    then("I can add OTP without error", async () => {
      let authenticationCodeInput = authenticationWrapper.findWhere(
        node => node.prop("testID") === "authenticationCodeInput"
      );
      authenticationCodeInput.props().onChangeText("123456");
      expect(instance.state.code).toBe("123456");
    });
    then("I can navigate to register success screen if i press confirm", async () => {
      let confirmButton = authenticationWrapper.findWhere(
        node => node.prop("testID") === "confirmButton"
      );
      await confirmButton.simulate('press');
      expect(screenProps.navigation.replace).toBeCalledWith("RegistrationSuccessScreen");
    });
    then("I can logout if I press back button and confirm", () => {
      //@ts-ignore
      BackHandler.mockPressBack();
      expect(logout.OnLogOut).toBeCalled()
      authenticationWrapper.unmount()
    });
  });
});
