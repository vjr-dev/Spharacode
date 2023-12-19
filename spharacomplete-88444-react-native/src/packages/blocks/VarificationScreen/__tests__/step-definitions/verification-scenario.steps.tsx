import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import Verification from "../../src/Verification";
import * as customNavigation from "../../../../components/src/Navigation/NavigationFunctions";
import * as custumAlerts from "../../../../components/src/CustomAlert";
import * as Logout from "../../../../components/src/Navigation/logout";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
  },
  route: {
    params: {
      Screen: "SIGNIN"
    }
  },
  id: "Verification"
};
const screenProps2 = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
  },
  route: {
    params: {
      Screen: "LOGIN"
    }
  },
  id: "Verification"
};
const feature = loadFeature(
  "./__tests__/features/verification-scenario.feature"
);
const runAllPromises = () => {
  return new Promise((resolve) => {
    setImmediate(() => {
      resolve()
    })
  })
}
defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(JSON, "parse").mockReturnValue("aaa");
    jest.spyOn(custumAlerts, 'displayErrorMessage')
    jest.spyOn(customNavigation, 'GotoEmergencyContactPage')
    jest.spyOn(customNavigation, 'GotoFirstResponderAuthenticationPage')
    jest.spyOn(customNavigation, 'GotoFirstResponderHomePage')
    jest.spyOn(customNavigation, 'GotoFirstResponderIdentificationPage')
    jest.spyOn(customNavigation, 'GotoFirstResponderPersonalInformationPage')
    jest.spyOn(customNavigation, 'GotoHomePage')
    jest.spyOn(customNavigation, 'GotoPersonalInformationPage')
    jest.spyOn(customNavigation, 'NavigateAfterSignUp')
    jest.spyOn(customNavigation, 'NavigateAfterSignUpFirstResponder')
    jest.spyOn(Logout, 'OnLogOut').mockImplementation((): any => Promise.resolve(true))
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("User navigates to Verification Screen From SIGIN", ({
    given,
    when,
    then
  }) => {
    let verificationWrapper: ShallowWrapper;
    let instance: Verification;

    given("I am a User attempting to verification with otp", () => {
      verificationWrapper = shallow(<Verification {...screenProps} />);
    });

    when("I navigate to the Verification", () => {
      verificationWrapper = shallow(<Verification {...screenProps} />);
      instance = verificationWrapper.instance() as Verification;
    });

    then("I can go back if I press back button", async () => {
      let verificationBackButton = verificationWrapper.findWhere(
        node => node.prop("testID") === "verificationBackButton"
      );
      verificationBackButton.simulate("press");
      expect(screenProps.navigation.goBack).toBeCalled();
    });

    then("I can not submit form without OTP enter", async () => {
      let verificationCodeInput = verificationWrapper.findWhere(
        node => node.prop("testID") === "verificationCodeInput"
      );
      await verificationCodeInput.props().onChangeText("");
      let verificationContinueButton = verificationWrapper.findWhere(
        node => node.prop("testID") === "verificationContinueButton"
      );
      verificationContinueButton.simulate("press");
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Please enter otp");
    });

    then("I can see the error message if getting from api", async () => {
      const response = {
        errors: [
          {
            otp: "Enter valid OTP"
          }
        ]
      }
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        response
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      expect(custumAlerts.displayErrorMessage).toBeCalledWith(response.errors[0].otp)
    });

    then("I'm first responder I can navigate to thank you screen if I entered correct OTP", async () => {
      let verificationCodeInput = verificationWrapper.findWhere(
        node => node.prop("testID") === "verificationCodeInput"
      );
      await verificationCodeInput.props().onChangeText("123456");
      let verificationContinueButton = verificationWrapper.findWhere(
        node => node.prop("testID") === "verificationContinueButton"
      );
      verificationContinueButton.simulate("press");
      const res = {
        user: {
          data: {
            attributes: {
              activated: false,
              has_emergency_contact: false,
              has_user_credential: false,
              is_user_authorized: false,
              role_id: 1,
              account_type: "first_responder",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.NavigateAfterSignUpFirstResponder).toHaveBeenCalled()
    });
    then("I'm civilian I can navigate to thank you screen if I entered correct OTP", async () => {
      let verificationCodeInput = verificationWrapper.findWhere(
        node => node.prop("testID") === "verificationCodeInput"
      );
      await verificationCodeInput.props().onChangeText("123456");
      let verificationContinueButton = verificationWrapper.findWhere(
        node => node.prop("testID") === "verificationContinueButton"
      );
      verificationContinueButton.simulate("press");
      const res = {
        user: {
          data: {
            attributes: {
              activated: false,
              has_emergency_contact: false,
              has_user_credential: false,
              is_user_authorized: false,
              role_id: 2,
              account_type: "civilian",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.NavigateAfterSignUp).toHaveBeenCalled()
    });
  });
  test("User navigates to Verification Screen From Login as First Responder", ({
    given,
    when,
    then
  }) => {
    let verificationWrapper: ShallowWrapper;
    let instance: Verification;

    given("I am a User attempting to verification with otp", () => {
      verificationWrapper = shallow(<Verification {...screenProps2} />);
    });

    when("I navigate to the Verification as first responder", () => {
      verificationWrapper = shallow(<Verification {...screenProps2} />);
      instance = verificationWrapper.instance() as Verification;
    });

    then("I should be navigate to authentication screen if my authentication pending", async () => {
      const res = {
        user: {
          data: {
            attributes: {
              activated: false,
              has_emergency_contact: false,
              has_user_credential: false,
              is_user_authorized: false,
              role_id: 1,
              account_type: "first_responder",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.GotoFirstResponderAuthenticationPage).toHaveBeenCalled()
    });
    then("I should be navigate to personal information screen if my personal information pending", async () => {
      const res = {
        user: {
          data: {
            attributes: {
              activated: false,
              has_emergency_contact: false,
              has_user_credential: false,
              is_user_authorized: true,
              role_id: 1,
              account_type: "first_responder",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.GotoFirstResponderPersonalInformationPage).toHaveBeenCalled()
    });
    then("I should be navigate to credential screen if I didn't uploade credential", async () => {
      const res = {
        user: {
          data: {
            attributes: {
              activated: true,
              has_emergency_contact: false,
              has_user_credential: false,
              is_user_authorized: true,
              role_id: 1,
              account_type: "first_responder",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.GotoFirstResponderIdentificationPage).toHaveBeenCalled()
    });

    then("I should be navigate to first responder home page if I completed account", async () => {
      const res = {
        user: {
          data: {
            attributes: {
              activated: true,
              has_emergency_contact: false,
              has_user_credential: true,
              is_user_authorized: true,
              role_id: 1,
              account_type: "first_responder",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.GotoFirstResponderHomePage).toHaveBeenCalled()
    });
  });
  test("User navigates to Verification Screen From Login as civilian", ({
    given,
    when,
    then
  }) => {
    let verificationWrapper: ShallowWrapper;
    let instance: Verification;

    given("I am a User attempting to verification with otp", () => {
      verificationWrapper = shallow(<Verification {...screenProps2} />);
    });

    when("I navigate to the Verification as civilian", () => {
      verificationWrapper = shallow(<Verification {...screenProps2} />);
      instance = verificationWrapper.instance() as Verification;
    });

    then("I should be navigate to personal information screen if my personal information pending", async () => {
      const res = {
        user: {
          data: {
            attributes: {
              activated: false,
              has_emergency_contact: false,
              has_user_credential: false,
              is_user_authorized: false,
              role_id: 2,
              account_type: "civilian",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.GotoPersonalInformationPage).toHaveBeenCalled()
    });
    then("I should be navigate to add emergency contact screen if I didn't add any emergency contact number", async () => {
      const res = {
        user: {
          data: {
            attributes: {
              activated: true,
              has_emergency_contact: false,
              has_user_credential: false,
              is_user_authorized: false,
              role_id: 2,
              account_type: "civilian",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.GotoEmergencyContactPage).toHaveBeenCalled()
    });

    then("I should be navigate to civilian home page if I completed account", async () => {
      const res = {
        user: {
          data: {
            attributes: {
              activated: true,
              has_emergency_contact: true,
              has_user_credential: false,
              is_user_authorized: false,
              role_id: 2,
              account_type: "civilian",
            }
          }
        }
      };
      const verificationAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        verificationAPI.messageId
      );
      verificationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        res
      );
      instance.OtpvarificationId = verificationAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", verificationAPI)
      await runAllPromises();
      expect(customNavigation.GotoHomePage).toHaveBeenCalled()
    });
  });
});
