import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import SignupOptions from "../../src/SignupOptions";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as custumAlerts from "../../../../components/src/CustomAlert";

jest.useFakeTimers();
const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
  },
  id: "SignUpScreen",
};

const feature = loadFeature(
  "./__tests__/features/sign-up-option-scenario.feature"
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
  let responce = [
    {
      attributes: {id: 1, name: 'First Responder'},
      id: "1",
      type: "roles"
    },
    {
      attributes: {id: 2, name: 'Civilian'},
      id: "2",
      type: "roles"
    }
  ];
  test("User navigates to Signup Option screen", ({ given, when, then }) => {
    let signUpOptionWrapper: ShallowWrapper;
    let instance: SignupOptions;

    given("I am a User attempting to navigate Signup Option Screen", () => {
      signUpOptionWrapper = shallow(<SignupOptions {...screenProps} />);
    });

    when("I navigate to the Signup Option Screen", () => {
      jest.runAllTimers();
      instance = signUpOptionWrapper.instance() as SignupOptions;
    });

    then("I can fetch role data with out error", async () => {
      const getRolesData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getRolesData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getRolesData.messageId
      );
      getRolesData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data:responce
        }
      );
      instance.apiGetRoleTypeId = getRolesData.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", getRolesData)
      let renderData = signUpOptionWrapper.find('FlatList').props().data;
      expect(renderData).toBe(responce);
    });
    then("I can navigate to sigup screen as a First Responder", async () => {
      const wrapper: any = signUpOptionWrapper.find('FlatList').props();
      const renderItemWrapper = wrapper.renderItem({
        item:responce[0],index:0
      });
      await renderItemWrapper.props.onPress();
      expect(screenProps.navigation.navigate).toBeCalledWith("SignUpScreen", {roleID: 1})
    });
    then("I can navigate to sigup screen as a Civilian", async () => {
      const wrapper: any = signUpOptionWrapper.find('FlatList').props();
      const renderItemWrapper = wrapper.renderItem({
        item:responce[1], index:1
      });
      await renderItemWrapper.props.onPress();
      expect(screenProps.navigation.navigate).toBeCalledWith("SignUpScreen", {roleID: 2})
    });
    then("I can show the pop up if fetch data with error", async () => {
      const getRolesData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getRolesData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getRolesData.messageId
      );
      getRolesData.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          error:{}
        }
      );
      instance.apiGetRoleTypeId = getRolesData.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", getRolesData)
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Somethings went wrong.");
    });
  });
});
