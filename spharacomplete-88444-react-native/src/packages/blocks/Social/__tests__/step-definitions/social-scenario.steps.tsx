//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import SocialCommunication, { TabBarComponent } from "../../src/SocialCommunication";

let navigationStateIndex;

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    props: jest.fn(),
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),

    state: {
      params: {},
      index: navigationStateIndex,
    },
  },
  id: "Social",
};

const screenProps1 = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    props: jest.fn(),
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),

    state: {
      params: {},
      index: navigationStateIndex,
    },
  },
  id: "TabBar",
};

const feature = loadFeature("./__tests__/features/social-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to SocialCommunication", ({ given, when, then }) => {
    let socialWrapper: ShallowWrapper;
  
    given("I am a User attempting to navigate SocialCommunication", () => {
      socialWrapper = shallow(<SocialCommunication {...screenProps} />);
      expect(socialWrapper).toBeTruthy();
      expect(socialWrapper).toMatchSnapshot();
    });

    when("I navigate to the SocialCommunication", () => {
      expect(socialWrapper).toBeTruthy();
    });
  });

  test("User navigates to TabBarComponent", ({ given, when, then }) => {
    let tabBarWrapper: ShallowWrapper;

    given("I am a User attempting to navigate TabBarComponent", () => {
      tabBarWrapper = shallow(<TabBarComponent {...screenProps1} />);
      expect(tabBarWrapper).toBeTruthy();
      expect(tabBarWrapper).toMatchSnapshot();
      let buttonComponent1 = tabBarWrapper.findWhere(
        (node) => node.prop("testID") === "TabID"
      );
      buttonComponent1.simulate("press");
    });

    when("I navigate to the TabBarComponent", (index) => {
      navigationStateIndex = index;
    });
  });
});
