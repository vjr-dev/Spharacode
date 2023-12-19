//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import More from "../../src/More";
import { MenuComponent } from "../../src/More";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "MoreInSocial",
};

const feature = loadFeature(
  "./__tests__/features/more-in-social-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to More In Social", ({ given, when, then }) => {
    let moreWrapper: ShallowWrapper;
    let instance: More;

    given("I am a User attempting to navigate MoreInSocial Screen", () => {
      moreWrapper = shallow(<More {...screenProps} />);
      expect(moreWrapper).toBeTruthy();
      expect(moreWrapper).toMatchSnapshot();
    });

    when("I navigate to the MoreInSocial Screen", () => {
      instance = moreWrapper.instance() as More;
    });

    then("I can open the modal", async () => {
      let moreInSocialModalButton = moreWrapper.findWhere(
        (node) => node.prop("testID") === "moreInSocialModalButton"
      );
      moreInSocialModalButton.simulate("press");
      expect(moreInSocialModalButton).toBeTruthy();
    });

    then("I can press call menu", async () => {
      let callMenu = moreWrapper.findWhere(
        (node) => node.prop("testID") === "callMenu"
      );
      callMenu.props().onMenuPress();
      expect(callMenu).toBeTruthy();
    });

    then("I can press bot menu", async () => {
      let botMenu = moreWrapper.findWhere(
        (node) => node.prop("testID") === "botMenu"
      );
      botMenu.props().onMenuPress();
      expect(botMenu).toBeTruthy();
    });

    then("I can press file menu", async () => {
      let fileMenu = moreWrapper.findWhere(
        (node) => node.prop("testID") === "fileMenu"
      );
      fileMenu.props().onMenuPress();
      expect(fileMenu).toBeTruthy();
    });

    then("I can press saved menu", async () => {
      let savedMenu = moreWrapper.findWhere(
        (node) => node.prop("testID") === "savedMenu"
      );
      savedMenu.props().onMenuPress();
      expect(savedMenu).toBeTruthy();
    });

    then("I can press alerts menu", async () => {
      let alertsMenu = moreWrapper.findWhere(
        (node) => node.prop("testID") === "alertsMenu"
      );
      alertsMenu.props().onMenuPress();
      expect(alertsMenu).toBeTruthy();
    });

    then("I can press notification menu", async () => {
      let notificationMenu = moreWrapper.findWhere(
        (node) => node.prop("testID") === "notificationMenu"
      );
      notificationMenu.props().onMenuPress();
      expect(notificationMenu).toBeTruthy();
    });

    then("I can press setting menu", async () => {
      let settingslMenu = moreWrapper.findWhere(
        (node) => node.prop("testID") === "settingslMenu"
      );
      settingslMenu.props().onMenuPress();
      expect(settingslMenu).toBeTruthy();
    });
  });

  test("User navigates to MenuComponent", ({ given, when, then }) => {
    let moreWrapper: ShallowWrapper;
    let instance: MenuComponent;

    given("I am a User attempting to navigate MenuComponent", () => {
      moreWrapper = shallow(<MenuComponent {...screenProps} />);
      expect(moreWrapper).toBeTruthy();
      expect(moreWrapper).toMatchSnapshot();
    });

    when("I navigate to the MenuComponent", () => {
      instance = moreWrapper.instance() as MenuComponent;
    });

    then("I can press menu button", async () => {
      let onMenuPreeButton = moreWrapper.findWhere(
        (node) => node.prop("testID") === "onMenuPreeButton"
      );
      onMenuPreeButton.simulate("press");
      expect(onMenuPreeButton).toBeTruthy();
    });
  });
});
