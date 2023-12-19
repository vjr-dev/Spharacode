//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import { Alert, BackHandler } from "react-native";
import PermissionScreen from "../../src/Permission";
import { getCameraPermission, getLocationPermission, getMicroPhonePermission, getPhonePermission, getReadContactsPermission, getStoragePermission } from "../../../../components/src/Permissions";
import { backToLoginConfirmationAlert, displayErrorMessage } from "../../../../components/src/CustomAlert";
import { OnLogOut } from "../../../../components/src/Navigation/logout";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
      return cb();
    }),
  },
  id: "PermissionScreen",
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "android",
  select: () => null,
}));
jest.mock("react-native/Libraries/Utilities/BackHandler", () => {
  return jest.requireActual(
    "react-native/Libraries/Utilities/__mocks__/BackHandler.js"
  );
});

let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));

const feature = loadFeature(
  "./__tests__/features/PermissionScreen-scenario.feature"
);

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
  });

  test("User navigates to PermissionScreen", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: PermissionScreen;
    let permissionButtonWrapper: ShallowWrapper

    given("I am a User loading PermissionScreen", () => {
      exampleBlockA = shallow(<PermissionScreen {...screenProps} />);
    });

    when("I navigate to the PermissionScreen", () => {
      instance = exampleBlockA.instance() as PermissionScreen;
      permissionButtonWrapper = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "permissionButton"
      );
    });

    then("I can give the location permission", async () => {
      getLocationPermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(0).simulate("press");
      expect(instance.state.loaction).toBe(true);
    });

    then("I can give the phone permission", async () => {
      getPhonePermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(1).simulate("press");
      expect(instance.state.phone).toBe(true);
    });

    then("I can give the contacts permission", async () => {
      getReadContactsPermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(2).simulate("press");
      expect(instance.state.phone).toBe(true);
    });

    then("I can give the storage permission", async () => {
      getStoragePermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(3).simulate("press");
      expect(instance.state.phone).toBe(true);
    });

    then("I can give the camera permission", async () => {
      getCameraPermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(4).simulate("press");
      expect(instance.state.phone).toBe(true);
    });

    then("I can give the microphone permission", async () => {
      getMicroPhonePermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(5).simulate("press");
      expect(instance.state.phone).toBe(true);
    });

    then("I can give the app setting permission", async () => {
      getMicroPhonePermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(6).simulate("press");
      expect(instance.state.phone).toBe(true);
    });

    then("If user press allow button with all permission then user can navigate to MedicalScreen", async () => {
      const allowButtonWrapper = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "allowButton"
      );
      yield allowButtonWrapper.simulate("press");
      expect(screenProps.navigation.replace).toBeCalledWith("MedicalScreen", { from: "PermissionScreen" });
    });

    then("I can remove the location permission", async () => {
      permissionButtonWrapper = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "permissionButton"
      );
      getLocationPermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(0).simulate("press");
      expect(instance.state.loaction).toBe(false);
    });

    then("I can remove the phone permission", async () => {
      getPhonePermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(1).simulate("press");
      expect(instance.state.phone).toBe(false);
    });

    then("I can remove the contacts permission", async () => {
      getReadContactsPermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(2).simulate("press");
      expect(instance.state.phone).toBe(false);
    });

    then("I can remove the storage permission", async () => {
      getStoragePermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(3).simulate("press");
      expect(instance.state.phone).toBe(false);
    });

    then("I can remove the camera permission", async () => {
      getCameraPermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(4).simulate("press");
      expect(instance.state.phone).toBe(false);
    });

    then("I can remove the microphone permission", async () => {
      getMicroPhonePermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(5).simulate("press");
      expect(instance.state.phone).toBe(false);
    });

    then("I can remove the app setting permission", async () => {
      getMicroPhonePermission = jest.fn().mockImplementation(() => Promise.resolve(true))
      yield permissionButtonWrapper.at(6).simulate("press");
      expect(instance.state.phone).toBe(false);
    });

    then("If user press allow button without give permission then error pop up will show", async () => {
      const allowButtonWrapper = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "allowButton"
      );
      displayErrorMessage = jest.fn();
      yield allowButtonWrapper.simulate("press");
      expect(displayErrorMessage).toBeCalledWith("Please give all permission");
    });
    then("I can not go back, on back press logout pop up will show", async () => {
      const backButtonWrapper = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btn_goBack"
      );
      backToLoginConfirmationAlert = jest.fn().mockImplementation((onAccept: Function) => onAccept())
      OnLogOut = jest.fn().mockImplementation(() => Promise.resolve(true))
      backButtonWrapper.simulate("press");
      expect(screenProps.navigation.goBack).not.toBeCalled();
      BackHandler.mockPressBack();
      exampleBlockA.unmount();
    });
  });
});
