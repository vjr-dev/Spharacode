//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import StripeView from "../../src/StripeWebView";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn()
  },
  route:{
    params:{
      url:{
        url:"https://www.google.com/"
      }
    }
  },
  id: "StripeWebView"
};

const feature = loadFeature(
  "./__tests__/features/stripe-web-view-screen-scenario.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Stripe Web View", ({ given, when, then }) => {
    let stripeWrapper: ShallowWrapper;
    let instance :StripeView;
    
    given("I am a User attempting to navigate Stripe Web View", () => {
      stripeWrapper = shallow(<StripeView {...screenProps} />);
      expect(stripeWrapper).toBeTruthy();
      expect(stripeWrapper).toMatchSnapshot();
    });

   

  });
});
