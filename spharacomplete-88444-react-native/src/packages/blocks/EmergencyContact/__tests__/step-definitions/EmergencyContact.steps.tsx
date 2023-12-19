import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { Message } from "framework/src/Message";

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import { BackHandler, Alert } from "react-native";
import EmergencyContact from "../../src/EmergencyContact";
import * as custumAlerts from "../../../../components/src/CustomAlert";
import * as Logout from "../../../../components/src/Navigation/logout";


const screenProps = {
  navigation: {
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
      return cb();
    }),
  },
  route: {
    params: {
      from: "AddContact",
      contactType: 1
    },
  },
  id: "EmergencyContact",
};

jest.mock("react-native/Libraries/Utilities/BackHandler", () => {
  return jest.requireActual(
    "react-native/Libraries/Utilities/__mocks__/BackHandler.js"
  );
});
const feature = loadFeature(
  "./__tests__/features/EmergencyContact-scenario.feature"
);

const saveContactSuccessAPI = async (instance: any) => {
  const saveContactsAPI: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  saveContactsAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    saveContactsAPI.messageId
  );
  saveContactsAPI.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
      contacts: {
        isSuccess: true,
      },
    }
  );
  instance.UploadcontactId = saveContactsAPI.messageId;
  const { receive: mockReceive } = instance;
  await mockReceive("Unit Test", saveContactsAPI)
}
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      BackHandler: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
    }));
    jest.spyOn(Alert, 'alert');
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
    jest.spyOn(custumAlerts, 'displayErrorMessage')
    jest.spyOn(custumAlerts, 'displaySuccessMessage')
    jest.spyOn(Logout, 'OnLogOut').mockImplementation(():any => Promise.resolve(true))  
    jest.spyOn(custumAlerts, 'backToLoginConfirmationAlert').mockImplementation((onAccept: Function) => onAccept())
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("User navigates to Emergency Contact screen from Add Emergency Contact screen", ({
    given,
    when,
    then,
  }) => {
    let emergencyContactWrapper: ShallowWrapper;
    let instance: EmergencyContact;

    given("I am a User loading EmergencyContact", () => {
      emergencyContactWrapper = shallow(<EmergencyContact {...screenProps} />);
    });

    when("I navigate to the EmergencyContact", () => {
      instance = emergencyContactWrapper.instance() as EmergencyContact;
    });

    then(
      "If user come from Add Emergency contacts screen then back button should work",
      () => {
        const backButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactBackButton"
        );
        backButton.simulate("press");
        expect(screenProps.navigation.pop).toBeCalled();
      }
    );

    then("User can open the add manual contact pop up", () => {
      const manualContactPopUp = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "manualContactPopUp"
      );
      manualContactPopUp.simulate("press");
      const manualContactModal = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "manualContactModal"
      );
      expect(manualContactModal.props().visible).toBe(true);
    });

    then("User can enter the name", async () => {
      let emergencyContactNameTextInput = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "emergencyContactNameTextInput"
      );
      emergencyContactNameTextInput.props().onChangeText("User Name");
      emergencyContactNameTextInput = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "emergencyContactNameTextInput"
      );
      expect(emergencyContactNameTextInput.props().value).toBe("User Name");
    });

    then("User can enter the number", async () => {
      let emergencyContactNumberTextInput = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "emergencyContactNumberTextInput"
      );
      emergencyContactNumberTextInput.props().onChangeText("9999999999");
      emergencyContactNumberTextInput = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "emergencyContactNumberTextInput"
      );
      expect(emergencyContactNumberTextInput.props().value).toBe("9999999999");
    });

    then(
      "User can change the contact type(like emergency, family and friends)",
      () => {
        let contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(3).simulate("press");
        contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        expect(contactTypeButton.at(3).props().style.borderColor).toBe('#eccb9f')
      }
    );

    then(
      "User can save the emergency number manualy without error if user give name, number and contact type",
      async () => {
        let emergencyContactNameTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNameTextInput"
        );
        emergencyContactNameTextInput.props().onChangeText("User Name");

        let emergencyContactNumberTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNumberTextInput"
        );
        emergencyContactNumberTextInput.props().onChangeText("9999999999");

        const contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(3).simulate("press");

        const saveManualContactButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "saveManualContactButton"
        );
        saveManualContactButton.simulate("press");
        await saveContactSuccessAPI(instance);
        expect(custumAlerts.displaySuccessMessage).toBeCalledWith('Contacts save successfully.')
      }
    );

    then(
      "User can save the friend number manualy without error if user give name, number and contact type",
      async () => {
        let emergencyContactNameTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNameTextInput"
        );
        emergencyContactNameTextInput.props().onChangeText("User Name");

        let emergencyContactNumberTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNumberTextInput"
        );
        emergencyContactNumberTextInput.props().onChangeText("9999999999");

        const contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(4).simulate("press");

        const saveManualContactButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "saveManualContactButton"
        );
        saveManualContactButton.simulate("press");
        await saveContactSuccessAPI(instance);
        expect(custumAlerts.displaySuccessMessage).toBeCalledWith('Contacts save successfully.')
      }
    );

    then(
      "User can save the family number manualy without error if user give name, number and contact type",
      async () => {
        let emergencyContactNameTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNameTextInput"
        );
        emergencyContactNameTextInput.props().onChangeText("User Name");

        let emergencyContactNumberTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNumberTextInput"
        );
        emergencyContactNumberTextInput.props().onChangeText("9999999999");

        const contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(5).simulate("press");

        const saveManualContactButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "saveManualContactButton"
        );
        saveManualContactButton.simulate("press");
        await saveContactSuccessAPI(instance);
        expect(custumAlerts.displaySuccessMessage).toBeCalledWith('Contacts save successfully.')
      }
    );

    then(
      "User can not save any type of number if user do not give name",
      () => {
        let emergencyContactNameTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNameTextInput"
        );
        emergencyContactNameTextInput.props().onChangeText("");

        let emergencyContactNumberTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNumberTextInput"
        );
        emergencyContactNumberTextInput.props().onChangeText("9999999999");

        const contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(5).simulate("press");

        const saveManualContactButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "saveManualContactButton"
        );
        saveManualContactButton.simulate("press");
        expect(custumAlerts.displayErrorMessage).toBeCalledWith('Please add name and number both before save contact.')
      }
    );

    then(
      "User can not save any type of number if user do not give number",
      () => {
        let emergencyContactNameTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNameTextInput"
        );
        emergencyContactNameTextInput.props().onChangeText("User Name");

        let emergencyContactNumberTextInput = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactNumberTextInput"
        );
        emergencyContactNumberTextInput.props().onChangeText("");

        const contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(5).simulate("press");

        const saveManualContactButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "saveManualContactButton"
        );
        saveManualContactButton.simulate("press");
        expect(custumAlerts.displayErrorMessage).toBeCalledWith('Please add name and number both before save contact.')
      }
    );

    then("User can close the add manual contact pop up", () => {
      const manualContactPopUpCloseButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "manualContactPopUpCloseButton"
      );
      expect(manualContactPopUpCloseButton).toBeTruthy();
      manualContactPopUpCloseButton.simulate("press");
      const manualContactModal = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "manualContactModal"
      );
      expect(manualContactModal.props().visible).toBe(false);
    });

    then(
      "User can select the emergency contacts from device's contacts",
      () => {
        const contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(1).simulate("press");

        let contactCheckBox = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactCheckBox"
        );
        contactCheckBox
          .at(0)
          .props()
          .onChange({ isCheck: !contactCheckBox.at(0).props().isCheck });
        contactCheckBox = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactCheckBox"
        );
        expect(contactCheckBox.at(0).props().isCheck).toBe(true)
      }
    );

    then("User can select the friends contacts from device's contacts", () => {
      const contactTypeButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactTypeButton"
      );
      contactTypeButton.at(2).simulate("press");

      let contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      contactCheckBox
        .at(1)
        .props()
        .onChange({ isCheck: !contactCheckBox.at(1).props().isCheck });
      contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      expect(contactCheckBox.at(1).props().isCheck).toBe(true)
    });

    then("User can select the family contacts from device's contacts", () => {
      const contactTypeButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactTypeButton"
      );
      contactTypeButton.at(2).simulate("press");

      let contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      contactCheckBox
        .at(0)
        .props()
        .onChange({ isCheck: !contactCheckBox.at(0).props().isCheck });
      contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      expect(contactCheckBox.at(0).props().isCheck).toBe(true)
    });

    then(
      "User can deselect the emergency contacts from device's contacts",
      () => {
        const contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(1).simulate("press");

        let contactCheckBox = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactCheckBox"
        );
        contactCheckBox
          .at(0)
          .props()
          .onChange({ isCheck: !contactCheckBox.at(0).props().isCheck });
        contactCheckBox = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactCheckBox"
        );
        expect(contactCheckBox.at(0).props().isCheck).toBe(false)
      }
    );

    then(
      "User can deselect the friends contacts from device's contacts",
      () => {
        const contactTypeButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactTypeButton"
        );
        contactTypeButton.at(2).simulate("press");

        let contactCheckBox = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactCheckBox"
        );
        contactCheckBox
          .at(1)
          .props()
          .onChange({ isCheck: !contactCheckBox.at(1).props().isCheck });
        contactCheckBox = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "contactCheckBox"
        );
        expect(contactCheckBox.at(1).props().isCheck).toBe(false)
      }
    );

    then("User can deselect the family contacts from device's contacts", () => {
      const contactTypeButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactTypeButton"
      );
      contactTypeButton.at(2).simulate("press");

      let contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      contactCheckBox
        .at(0)
        .props()
        .onChange({ isCheck: !contactCheckBox.at(0).props().isCheck });
      contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      expect(contactCheckBox.at(0).props().isCheck).toBe(false)
    });

    then("User can save the device contact if selected", async () => {
      let contactTypeButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactTypeButton"
      );
      contactTypeButton.at(0).simulate("press");
      let contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      contactCheckBox
        .at(0)
        .props()
        .onChange({ isCheck: !contactCheckBox.at(0).props().isCheck });

      contactTypeButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactTypeButton"
      );
      contactTypeButton.at(1).simulate("press");
      contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      contactCheckBox
        .at(0)
        .props()
        .onChange({ isCheck: !contactCheckBox.at(0).props().isCheck });

      contactTypeButton = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactTypeButton"
      );
      contactTypeButton.at(0).simulate("press");
      contactCheckBox = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "contactCheckBox"
      );
      contactCheckBox
        .at(0)
        .props()
        .onChange({ isCheck: !contactCheckBox.at(0).props().isCheck });

      const saveDeviceContact = emergencyContactWrapper.findWhere(
        (node) => node.prop("testID") === "saveDeviceContact"
      );
      saveDeviceContact.simulate("press");
      await saveContactSuccessAPI(instance);
      expect(custumAlerts.displaySuccessMessage).toBeCalledWith('Contacts save successfully.')
    });

    then("Save contact API call with errors", async () => {
      const responce = {
        errors: "Phone number not valid.",
      }
      const saveContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      saveContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        saveContactsAPI.messageId
      );
      saveContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.UploadcontactId = saveContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", saveContactsAPI)
      expect(custumAlerts.displayErrorMessage).toBeCalledWith(responce.errors)
    });

    then("User can unmount screen without error", () => {
      //@ts-ignore
      BackHandler.mockPressBack();
      expect(screenProps.navigation.pop).toBeCalled
      emergencyContactWrapper.unmount();
    });
  });

  test("User navigates to Emergency Contact screen from Permission screen", ({
    given,
    when,
    then,
  }) => {
    let emergencyContactWrapper: ShallowWrapper;
    let instance: EmergencyContact;
    given("I am a User loading EmergencyContact", () => {
      const sreenPropsPermissionScreen = { ...screenProps };
      delete sreenPropsPermissionScreen.route.params.from;
      emergencyContactWrapper = shallow(
        <EmergencyContact {...sreenPropsPermissionScreen} />
      );
    });

    when("I navigate to the EmergencyContact", () => {
      instance = emergencyContactWrapper.instance() as EmergencyContact;
    });
    then("Save contact API call with out errors", async () => {
      await saveContactSuccessAPI(instance);
      expect(custumAlerts.displaySuccessMessage).toBeCalledWith('Contacts save successfully.')
    });
    then(
      "If user come from Permission screen then back button should not work",
      () => {
        const backButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactBackButton"
        );
        backButton.simulate('press')
        expect(screenProps.navigation.goBack).not.toBeCalled();
      }
    );
    then(
      "User can logout if user press logout button",
      () => {
        const backButton = emergencyContactWrapper.findWhere(
          (node) => node.prop("testID") === "emergencyContactBackButton"
        );
        backButton.simulate('press')
        expect(Logout.OnLogOut).toBeCalled();
      }
    );
  });
});
