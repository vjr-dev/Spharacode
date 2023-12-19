//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import GroupProfileChat from "../../src/GroupProfileChat";
import { Platform, View } from "react-native";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
  },
  instance: { renderItem: jest.fn() },
  id: "GroupProfileChat",
};

const feature = loadFeature(
  "./__tests__/features/GroupProfileChat-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to GroupProfileChat", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: GroupProfileChat;

    given("I am a User loading GroupProfileChat", () => {
      exampleBlockA = shallow(<GroupProfileChat {...screenProps} />);
    });

    when("I navigate to the GroupProfileChat", () => {
      instance = exampleBlockA.instance() as GroupProfileChat;
    });

    then("GroupProfileChat will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
      expect(exampleBlockA).toMatchSnapshot();
      const userListApi: Message = new Message(
        getName(MessageEnum.AccoutLoginSuccess)
      );
      instance.apiUserList = userListApi.messageId;
      runEngine.sendMessage("Unit Test", userListApi);
    });

    then("I can select the back button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "backBtn"
      );
      buttonComponent.simulate("press");
      expect(buttonComponent).toBeTruthy();
    });

    then("I can select the option button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "optionBtn"
      );
      instance.setState({ modal2Visible: true });
      buttonComponent.simulate("press");
      expect(buttonComponent).toBeTruthy();
    });

    then("I can select the cancle button with out errors", () => {
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cancleModalBtn"
      );
      instance.setState({ modal2Visible: false });
      buttonComponent.simulate("press");
      expect(buttonComponent).toBeTruthy();
    });

    then("I can toggle the switch with out errors", () => {
      let switchComponent1 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "switch1"
      );
      instance.setState({ switch1: true });
      switchComponent1.props().onValueChange(true);
      instance.setState({ switch1: false });
      switchComponent1.props().onValueChange(false);

      Platform.OS = "android";

      switchComponent1.simulate("press");
      expect(switchComponent1).toBeTruthy();

      let switchComponent2 = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "switch2"
      );
      instance.setState({ switch2: true });
      switchComponent2.props().onValueChange(true);

      instance.setState({ switch2: false });
      switchComponent2.props().onValueChange(false);

      Platform.OS = "android";

      switchComponent2.simulate("press");
      expect(switchComponent2).toBeTruthy();
    });

    then("I can see the Group Admins with out errors", () => {
      let gropuAdmins = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "gropuAdmins"
      );
      expect(gropuAdmins).toBeTruthy();

      const item = gropuAdmins.renderProp("renderItem")({
        item: {
          id: 1,
          img: "https://randomuser.me/api/portraits/men/84.jpg",
          name: "James",
        },
      });
      expect(item).toMatchSnapshot();
      let renderItemWrapper = shallow(
        <View>
          {instance.renderItem({
            id: 1,
            img: "https://randomuser.me/api/portraits/men/84.jpg",
            name: "James",
          })}
        </View>
      );
      expect(renderItemWrapper).toBeTruthy();
      let renderItemFooterWrapper = shallow(
        <View>{instance.ListFooterComponent()}</View>
      );
      let addNewGroupAdminsBtn = renderItemFooterWrapper.findWhere(
        (node) => node.prop("testID") === "addNewGroupAdminsBtn"
      );
      addNewGroupAdminsBtn.simulate("press");
      expect(addNewGroupAdminsBtn).toBeTruthy();
    });

    then("I can see the Group Participants with out errors", () => {
      let groupParticipants = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "groupParticipants"
      );
      expect(groupParticipants).toBeTruthy();

      const item = groupParticipants.renderProp("renderItem")({
        item: {
          id: 1,
          img: "https://randomuser.me/api/portraits/men/84.jpg",
          name: "James",
        },
      });
      expect(item).toMatchSnapshot();
      let renderItemWrapper = shallow(
        <View>
          {instance.renderItem({
            id: 1,
            img: "https://randomuser.me/api/portraits/men/84.jpg",
            name: "James",
          })}
        </View>
      );
      expect(renderItemWrapper).toBeTruthy();
      let renderItemFooterWrapper = shallow(
        <View>{instance.ListFooterComponent()}</View>
      );
      let addNewGroupAdminsBtn = renderItemFooterWrapper.findWhere(
        (node) => node.prop("testID") === "addNewGroupAdminsBtn"
      );
      addNewGroupAdminsBtn.simulate("press");
      expect(addNewGroupAdminsBtn).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
