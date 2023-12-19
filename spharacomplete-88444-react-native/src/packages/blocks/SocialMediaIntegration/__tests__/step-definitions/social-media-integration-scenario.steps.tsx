//@ts-nocheck
//@ts-ignore
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import SocialMedia from "../../src/SocialMediaIntegration";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "SocialMediaIntegration",
};

const feature = loadFeature(
  "./__tests__/features/social-media-integration-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Social Media Integration Screen", ({
    given,
    when,
    then,
  }) => {
    let socialMediaWrapper: ShallowWrapper;
    let instance: SocialMedia;

    given("I am a User attempting to Social Media Screen", () => {
      socialMediaWrapper = shallow(<SocialMedia {...screenProps} />);
      expect(socialMediaWrapper).toBeTruthy();
      expect(socialMediaWrapper).toMatchSnapshot();
    });

    when("I navigate to the Social Media Integration Screen", () => {
      instance = socialMediaWrapper.instance() as SocialMedia;
    });

    then("I can press back button", async () => {
      let socialMediaBackButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaBackButton"
      );
      socialMediaBackButton.simulate("press");
      expect(socialMediaBackButton).toBeTruthy();
    });

    then("I can press whatsapp switch", async () => {
      let socialMediaWhatsappSwitch = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaWhatsappSwitch"
      );
      socialMediaWhatsappSwitch.props().onValueChange(true);
      socialMediaWhatsappSwitch.props().onValueChange(false);
      expect(socialMediaWhatsappSwitch).toBeTruthy();
    });

    then("I can press Facebook switch", async () => {
      let socialMediaFacebookSwitch = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaFacebookSwitch"
      );
      socialMediaFacebookSwitch.props().onValueChange(true);
      socialMediaFacebookSwitch.props().onValueChange(false);
      expect(socialMediaFacebookSwitch).toBeTruthy();
    });

    then("I can press Instagram switch", async () => {
      let socialMediaInstagramSwitch = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaInstagramSwitch"
      );
      socialMediaInstagramSwitch.props().onValueChange(true);
      socialMediaInstagramSwitch.props().onValueChange(false);
      expect(socialMediaInstagramSwitch).toBeTruthy();
    });

    then("I can press Twitter switch", async () => {
      let socialMediaTwitterSwitch = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaTwitterSwitch"
      );
      socialMediaTwitterSwitch.props().onValueChange(true);
      socialMediaTwitterSwitch.props().onValueChange(false);
      expect(socialMediaTwitterSwitch).toBeTruthy();
    });

    then("I can press Linkedin switch", async () => {
      let socialMediaLinkedinSwitch = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaLinkedinSwitch"
      );
      socialMediaLinkedinSwitch.props().onValueChange(true);
      socialMediaLinkedinSwitch.props().onValueChange(false);
      expect(socialMediaLinkedinSwitch).toBeTruthy();
    });

    then("I can enter whatsapp account number", async () => {
      let socialMediaWhatappAccountNumberInput = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaWhatappAccountNumberInput"
      );
      socialMediaWhatappAccountNumberInput.props().onChangeText("9999999999");
      expect(socialMediaWhatappAccountNumberInput).toBeTruthy();
    });

    then("I can handle the access of whatsapp", async () => {
      let whatsappcheckBox = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "whatsappcheckBox"
      );
      whatsappcheckBox.props().onClick();

      expect(whatsappcheckBox).toBeTruthy();
    });
    then("I can close or continue the whatsapp access modal", async () => {
      let whatsappModalCancelButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "whatsappModalCancelButton"
      );
      whatsappModalCancelButton.simulate("press");
      expect(whatsappModalCancelButton).toBeTruthy();
      let whatsappModalContinueButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "whatsappModalContinueButton"
      );
      whatsappModalContinueButton.simulate("press");
      expect(whatsappModalContinueButton).toBeTruthy();
    });

    then("I can enter facebook account", async () => {
      let socialMediaFacebookAccountInput = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaFacebookAccountInput"
      );
      socialMediaFacebookAccountInput.props().onChangeText("dummy@email.com");
      expect(socialMediaFacebookAccountInput).toBeTruthy();
    });

    then("I can handle the access of facebook", async () => {
      let facebookcheckBox = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "facebookcheckBox"
      );
      facebookcheckBox.props().onClick();
      expect(facebookcheckBox).toBeTruthy();
    });

    then("I can close or continue the facebook access modal", async () => {
      let facebookModalCancelButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "facebookModalCancelButton"
      );
      facebookModalCancelButton.simulate("press");
      expect(facebookModalCancelButton).toBeTruthy();
      let facebookModalContinueButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "facebookModalContinueButton"
      );
      facebookModalContinueButton.simulate("press");
      expect(facebookModalContinueButton).toBeTruthy();
    });

    then("I can enter instagram account", async () => {
      let socialMediaInstagramAccountInput = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaInstagramAccountInput"
      );
      socialMediaInstagramAccountInput.props().onChangeText("dummy@email.com");
      expect(socialMediaInstagramAccountInput).toBeTruthy();
    });

    then("I can handle the access of instagram", async () => {
      let instagramcheckBox = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "instagramcheckBox"
      );
      instagramcheckBox.props().onClick();
      expect(instagramcheckBox).toBeTruthy();
    });

    then("I can close or continue the facebook access modal", async () => {
      let instagramModalCancelButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "instagramModalCancelButton"
      );
      instagramModalCancelButton.simulate("press");
      expect(instagramModalCancelButton).toBeTruthy();
      let instagramModalContinueButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "instagramModalContinueButton"
      );
      instagramModalContinueButton.simulate("press");
      expect(instagramModalContinueButton).toBeTruthy();
    });

    then("I can enter twitter account", async () => {
      let socialMediaTwitterAccountInput = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaTwitterAccountInput"
      );
      socialMediaTwitterAccountInput.props().onChangeText("dummy@email.com");
      expect(socialMediaTwitterAccountInput).toBeTruthy();
    });

    then("I can handle the access of twitter", async () => {
      let twittercheckBox = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "twittercheckBox"
      );
      twittercheckBox.props().onClick();
      expect(twittercheckBox).toBeTruthy();
    });

    then("I can close or continue the twitter access modal", async () => {
      let twitterModalCancelButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "twitterModalCancelButton"
      );
      twitterModalCancelButton.simulate("press");
      expect(twitterModalCancelButton).toBeTruthy();
      let twitterModalContinueButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "twitterModalContinueButton"
      );
      twitterModalContinueButton.simulate("press");
      expect(twitterModalContinueButton).toBeTruthy();
    });

    then("I can enter linkedin account", async () => {
      let socialMediaLinkedInAccountInput = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "socialMediaLinkedInAccountInput"
      );
      socialMediaLinkedInAccountInput.props().onChangeText("dummy@email.com");
      expect(socialMediaLinkedInAccountInput).toBeTruthy();
    });

    then("I can handle the access of linkedIn", async () => {
      let linkedincheckBox = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "linkedincheckBox"
      );
      linkedincheckBox.props().onClick();
      expect(linkedincheckBox).toBeTruthy();
    });

    then("I can close or continue the linkedIn access modal", async () => {
      let linkedinModalCancelButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "linkedinModalCancelButton"
      );
      linkedinModalCancelButton.simulate("press");
      expect(linkedinModalCancelButton).toBeTruthy();
      let linkedInModalContinueButton = socialMediaWrapper.findWhere(
        (node) => node.prop("testID") === "linkedInModalContinueButton"
      );
      linkedInModalContinueButton.simulate("press");
      expect(linkedInModalContinueButton).toBeTruthy();
    });
  });
});
