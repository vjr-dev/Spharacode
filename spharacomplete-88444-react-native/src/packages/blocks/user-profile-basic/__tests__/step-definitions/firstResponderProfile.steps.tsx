import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import FirstResponderProfile from "../../src/FirstResponderProfile";
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
  id: "FirstResponderProfile"
};
const feature = loadFeature(
  "./__tests__/features/firstResponderProfile-scenario.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
    }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(JSON, "parse").mockReturnValue("aaa");
  });

  test("User navigates to First Responder Profile", ({
    given,
    when,
    then
  }) => {
    let profileWrapper: ShallowWrapper;
    let instance: FirstResponderProfile;

    given("I am a User loading First Responder Profile", () => {
      jest.runAllTimers();
      profileWrapper = shallow(<FirstResponderProfile {...screenProps} />);
    });

    when("I navigate to the First Responder Profile", () => {
      instance = profileWrapper.instance() as FirstResponderProfile;
    });

    then("I can fetch the profile details with out error", async () => {
      const responce = {
        data: {
          attributes: {
            id: 1,
            address: "profile address",
            city: "City",
            state: "State",
            email: "email@mail.com",
            first_name: "First Name",
            last_name: "Last Name",
            full_phone_number: "1111111111",
            profile_image_url: "profile_image_url"
          }
        },
      };
      const getProfileDetailsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getProfileDetailsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getProfileDetailsAPI.messageId
      );
      getProfileDetailsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.getProfileID = getProfileDetailsAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", getProfileDetailsAPI)
      expect(instance.state.profileDetails).toBe(responce.data.attributes)
    });

    then("I can navigate to edit Profile screen", () => {
      const editProfileButton = profileWrapper.findWhere(
        (node) => node.prop("testID") === "editProfileButton"
      );
      editProfileButton.simulate("press");
      expect(screenProps.navigation.navigate).toBeCalledWith("EditProfile")
    });

    then("I can navigate to change phone number screen", () => {
      const changePhoneNumberButton = profileWrapper.findWhere(
        (node) => node.prop("testID") === "changePhoneNumberButton"
      );
      changePhoneNumberButton.simulate("press");
      expect(screenProps.navigation.navigate).toBeCalledWith("ChangePhoneNumber")
    });

    then("I can navigate to update credential screen", () => {
      const updateCredentialButton = profileWrapper.findWhere(
        (node) => node.prop("testID") === "updateCredentialButton"
      );
      updateCredentialButton.simulate("press");
      expect(screenProps.navigation.navigate).toBeCalledWith("IdentificationScreen", { from: 'EditProfile' })
    });
  });
});
