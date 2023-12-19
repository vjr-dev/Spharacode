//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Trigger from "../../src/Trigger";
import { View } from "react-native";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "TriggerScreen",
};

const feature = loadFeature(
  "./__tests__/features/trigger-screen-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("../../../../mobile/sample.mp3", () => ({}));
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Trigger Screen", ({ given, when, then }) => {
    let triggerWrapper: ShallowWrapper;
    let instance: Trigger;

    given("I am a User attempting to Trigger Screen", () => {
      triggerWrapper = shallow(<Trigger {...screenProps} />);
      expect(triggerWrapper).toBeTruthy();
      expect(triggerWrapper).toMatchSnapshot();
    });

    when("I navigate to the Trigger Screen", () => {
      instance = triggerWrapper.instance() as Trigger;
    });

    then("I can press the back button", async () => {
      let backButton = triggerWrapper.findWhere(
        (node) => node.prop("testID") === "backButton"
      );
      backButton.simulate("press");
      expect(backButton).toBeTruthy();
    });

    then("I can press the power button", async () => {
      instance.setState({ buttonlist: true, Selectedname: "power_button" });
      let actionButton = triggerWrapper.findWhere(
        (node) => node.prop("testID") === "actionButton"
      );
      actionButton.simulate("press");
      expect(actionButton).toBeTruthy();
    });

    then("I can press the volume up button button", async () => {
      instance.setState({ buttonlist: true, Selectedname: "volume_up_button" });
      let actionButton = triggerWrapper.findWhere(
        (node) => node.prop("testID") === "actionButton"
      );
      actionButton.simulate("press");
      expect(actionButton).toBeTruthy();
    });

    then("I can press the volume down button button", async () => {
      instance.setState({
        buttonlist: true,
        Selectedname: "volume_down_button",
      });
      let actionButton = triggerWrapper.findWhere(
        (node) => node.prop("testID") === "actionButton"
      );
      actionButton.simulate("press");
      expect(actionButton).toBeTruthy();
    });

    then("Display the button option and i can select item", async () => {
      instance.setState({ buttonlist: false, Selectedname: "power_button" });
      let listItem = triggerWrapper.findWhere(
        (node) => node.prop("testID") === "listItem"
      );
      expect(listItem).toBeTruthy();

      let item = listItem.renderProp("renderItem")({
        item: { aa: "power_button", name: "aa", id: 1 },
      });
      expect(item).toMatchSnapshot();
      let renderItemWrapper = shallow(
        <View>
          {instance.renderItem({ aa: "power_button", name: "aa", id: 1 })}
        </View>
      );
      let itemButton = renderItemWrapper.findWhere(
        (node) => node.prop("testID") === "itemButton"
      );
      itemButton.simulate("press");
      expect(itemButton).toBeTruthy();

      item = listItem.renderProp("renderItem")({
        item: { aa: "volume_up_button", name: "aa", id: 1 },
      });
      expect(item).toMatchSnapshot();
      renderItemWrapper = shallow(
        <View>
          {instance.renderItem({ aa: "volume_up_button", name: "aa", id: 1 })}
        </View>
      );
      itemButton = renderItemWrapper.findWhere(
        (node) => node.prop("testID") === "itemButton"
      );
      itemButton.simulate("press");
      expect(itemButton).toBeTruthy();

      let labelFlatList = triggerWrapper.findWhere(
        (node) => node.prop("testID") === "labelFlatList"
      );
      expect(labelFlatList).toBeTruthy();

      instance.setState({ Tempdaa: "power_button", LableID: "power_button" });
      let item2 = labelFlatList.renderProp("renderItem")({
        item: { aa: "power_button", name: "aa", id: 1, type: "power_button" },
      });
      expect(item2).toMatchSnapshot();
      let renderLabelWrapper = shallow(
        <View>
          {instance.renderLabel({
            aa: "power_button",
            name: "aa",
            id: 1,
            type: "power_button",
          })}
        </View>
      );
      let labelButton = renderLabelWrapper.findWhere(
        (node) => node.prop("testID") === "labelButton"
      );
      labelButton.simulate("press");
      expect(labelButton).toBeTruthy();

      item2 = labelFlatList.renderProp("renderItem")({
        item: {
          aa: "volume_up_button",
          name: "aa",
          id: 1,
          type: "volume_up_button",
        },
      });
      expect(item2).toMatchSnapshot();
      renderLabelWrapper = shallow(
        <View>
          {instance.renderLabel({
            aa: "volume_up_button",
            name: "aa",
            id: 1,
            type: "volume_up_button",
          })}
        </View>
      );
      labelButton = renderLabelWrapper.findWhere(
        (node) => node.prop("testID") === "labelButton"
      );
      labelButton.simulate("press");
      expect(labelButton).toBeTruthy();
    });

    then("Update setting api work with out error", () => {
      const httpBody = {
        data: {
          attributes: {
            trigger_button: "volume_up_button",
            trigger_type: "volume_up_button",
          },
        },
      };
      const updateSettingAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateSettingAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateSettingAPI.messageId
      );
      updateSettingAPI.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      updateSettingAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(
          JSON.stringify({
            data: { attributes: { trigger_type: "volume_up_button" } },
          })
        )
      );
      instance.SetsettingID = updateSettingAPI.messageId;
      runEngine.sendMessage("Unit Test", updateSettingAPI);
    });

    then("Update setting api work with error", () => {
      const httpBody = {
        data: {
          attributes: {
            trigger_button: "volume_up_button",
            trigger_type: "volume_up_button",
          },
        },
      };
      const updateSettingAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateSettingAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateSettingAPI.messageId
      );
      updateSettingAPI.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(httpBody)
      );
      updateSettingAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({ errors: "error" }))
      );
      instance.SetsettingID = updateSettingAPI.messageId;
      runEngine.sendMessage("Unit Test", updateSettingAPI);
    });
  });
});
