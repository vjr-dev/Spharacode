//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Donation from "../../src/Donation";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    state: {
      params: {
        Screen: "SIGNIN",
      },
    },
  },
  id: "DonationScreen",
};

const feature = loadFeature(
  "./__tests__/features/donation-screen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Donation Screen", ({ given, when, then }) => {
    let donationWrapper: ShallowWrapper;

    given("I am a User attempting to Donation", () => {
      donationWrapper = shallow(<Donation {...screenProps} />);
      expect(donationWrapper).toBeTruthy();
      expect(donationWrapper).toMatchSnapshot();
    });

    when("I navigate to the Donation Screen", () => {
      expect(donationWrapper).toBeTruthy();
      expect(donationWrapper).toMatchSnapshot();
    });

    then("I can press Social Welfare Acttivity button", () => {
      let socialWelfareActtivity = donationWrapper.findWhere(
        (node) => node.prop("testID") === "socialWelfareActtivityButton"
      );
      socialWelfareActtivity.simulate("press");
      expect(socialWelfareActtivity).toBeTruthy();
    });

    then("I can press Sphara button", () => {
      let socialWelfareActtivity = donationWrapper.findWhere(
        (node) => node.prop("testID") === "spharaButton"
      );
      socialWelfareActtivity.simulate("press");
      expect(socialWelfareActtivity).toBeTruthy();
    });
  });
});
