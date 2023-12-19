import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AddEmergencyContact from "../../src/AddEmergencyContact";
import * as custumAlerts from "../../../../components/src/CustomAlert";
import * as Logout from "../../../../components/src/Navigation/logout";

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
  },
  route: {
    params: {
      from: "EmergencyContact",
      contactType: 1
    }
  },
  id: "AddEmergencyContact",
};

const feature = loadFeature(
  "./__tests__/features/add-emergency-contact-scenario.feature"
);

defineFeature(feature, (test) => {
  const runAllPromises = () => {
    return new Promise((resolve) => {
      setImmediate(() => {
        resolve()
      })
    })
  }
  beforeEach(() => {
    jest.resetModules();
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "android",
      select: () => null,
    }));
    jest.useFakeTimers();
    jest.spyOn(custumAlerts, 'displayErrorMessage')
    jest.spyOn(custumAlerts, 'displaySuccessMessage')
    jest.spyOn(custumAlerts, 'displayConfirmAlert').mockImplementation((title: string, msg: string, onAccept: Function) => onAccept())
    jest.spyOn(Logout, 'OnLogOut').mockImplementation((): any => Promise.resolve(true))
    jest.spyOn(custumAlerts, 'backToLoginConfirmationAlert').mockImplementation((onAccept: Function) => onAccept())
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("User navigates to Add Emergency Contact Screen from Emergency contact screen", ({
    given,
    when,
    then,
  }) => {
    let emergencyContactWrapper: ShallowWrapper;
    let instance: AddEmergencyContact;

    given("User attempting to Add Emergency Contact", () => {
      emergencyContactWrapper = shallow(
        <AddEmergencyContact {...screenProps} />
      );
    });

    when("User navigate to the Add Emergency Contact Screen", () => {
      instance = emergencyContactWrapper.instance() as AddEmergencyContact;
    });

    then("User can not use the back button functionality", () => {

      const addEmergencyContactBackButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "addEmergencyContactBackButton"
      );
      addEmergencyContactBackButton.simulate('press');
      expect(screenProps.navigation.pop).not.toBeCalled();
    }
    );

    then("User can use the add new contact functionality", () => {
      const addEmergencyContactOpenAddNewModalButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "addEmergencyContactOpenAddNewModalButton"
      );
      addEmergencyContactOpenAddNewModalButton.simulate("press");
      expect(screenProps.navigation.navigate).toHaveBeenCalledWith("EmergencyContact", { "contactType": 1, "from": "AddContact" });
    });

    then("User can not fetch contacts with error", () => {
      const responce = {
        errors: [
          "Some thing went wrong"
        ]
      }
      const getContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContactsAPI.messageId
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.getListId = getContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", getContactsAPI)
      expect(custumAlerts.displayErrorMessage).toHaveBeenCalledWith(responce.errors[0])
    });
    then("User can not use the delete contact functionality if only 1 contact present", () => {
      const getContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContactsAPI.messageId
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              attributes: {
                id: 1,
                name: "Contact1",
                phone_number: "1111111111",
                contact_type: "emergency_contact"
              }
            },
          ]
        }
      );
      instance.getListId = getContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", getContactsAPI)
      const addEmergencyContactDeleteButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "addEmergencyContactDeleteButton"
      );
      expect(addEmergencyContactDeleteButton.isEmptyRender()).toBe(true);
    });
    then("User can fetch contacts with out error", async () => {
      const responce = {
        data: [
          {
            attributes: {
              id: 1,
              name: "Contact1",
              phone_number: "1111111111",
              contact_type: "emergency_contact"
            }
          },
          {
            attributes: {
              id: 2,
              name: "Contact2",
              phone_number: "22222222222",
              contact_type: "friends"
            }
          },
          {
            attributes: {
              id: 3,
              name: "Contact3",
              phone_number: "3333333333",
              contact_type: "family"
            }
          }
        ]
      }
      const getContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContactsAPI.messageId
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.getListId = getContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", getContactsAPI)
      await runAllPromises();
      const phoneNumberText = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "phoneNumberText"
      );
      expect(phoneNumberText.at(0).props().children).toBe(responce.data[0].attributes.phone_number)
    });

    then("User can use the delete contact functionality if more than 1 contact present", () => {
      const addEmergencyContactDeleteButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "addEmergencyContactDeleteButton"
      );
      addEmergencyContactDeleteButton.at(0).simulate("press");
      const deleteContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteContactsAPI.messageId
      );
      deleteContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            message: "Contact delete successfully"
          }
        }
      );
      instance.DeletecontactId = deleteContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", deleteContactsAPI)
      expect(custumAlerts.displaySuccessMessage).toHaveBeenCalledWith("Contact delete successfully.");
    });

    then("User can not delete contact with error", () => {
      const responce = {
        errors: [
          "Some thing went wrong"
        ]
      }
      const deleteContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteContactsAPI.messageId
      );
      deleteContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.DeletecontactId = deleteContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", deleteContactsAPI)
      expect(custumAlerts.displayErrorMessage).toHaveBeenCalledWith(responce.errors[0])
    });
    then("User can navigate to dashboard after press on done button", () => {
      const addEmergencyContactDoneButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "addEmergencyContactDoneButton"
      );
      addEmergencyContactDoneButton.simulate("press");
      expect(screenProps.navigation.replace).toHaveBeenCalledWith('AuthoriseStack', { screen: 'HomePage' });
      emergencyContactWrapper.unmount();
    });
  })

  test("User navigates to Add Emergency Contact Screen from Profile screen", ({
    given,
    when,
    then,
  }) => {
    let emergencyContactWrapper: ShallowWrapper;
    let instance: AddEmergencyContact;
    given("User attempting to Add Emergency Contact", () => {
      const profileScreenProps = { ...screenProps };
      profileScreenProps.route.params.from = "ProfileScreen";
      emergencyContactWrapper = shallow(
        <AddEmergencyContact {...profileScreenProps} />
      );
    });

    when("User navigate to the Add Emergency Contact Screen", () => {
      instance = emergencyContactWrapper.instance() as AddEmergencyContact;
    });

    then("User can use the back button functionality", () => {
      const addEmergencyContactBackButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "addEmergencyContactBackButton"
      );
      addEmergencyContactBackButton.simulate("press");
      expect(screenProps.navigation.pop).toBeCalled();
    });

    then("User can go back to profile screen after press on done button", () => {
      const addEmergencyContactDoneButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "addEmergencyContactDoneButton"
      );
      addEmergencyContactDoneButton.simulate("press");
      expect(screenProps.navigation.pop).toBeCalled
    });
  });
});
