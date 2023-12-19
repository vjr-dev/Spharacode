import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import AlertLocationScreen from "../../src/AlertLocationScreen";
import GetLocation from "@react-native-community/geolocation";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  route: {
    params: {
      userName: "ABC",
      profileImageURL: "aaa",
      distance: "123",
      descrption: "xyz",
      latitude: 12.12345,
      longitude: 15.54621,
      group_information: {
        data: {
          guid: "1",
          conversationId: "1111",
          name: 'AAA'
        }
      },
      isAlertSender: false,
    },
  },
  id: "AlertLocationScreen",
};

const feature = loadFeature(
  "./__tests__/features/AlertLocationScreen.scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(JSON, "parse").mockReturnValue("aaa");
    jest.spyOn(GetLocation, 'getCurrentPosition').mockImplementation(() =>
      new Promise((resolve, reject) => {
        return resolve({
          coords: {
            latitude: 37.78825,
            longitude: -122.4324,
          }
        });
      }));
  });
  afterEach(()=>{
    jest.clearAllMocks()
  })
  test("User navigates to AlertLocationScreen", ({ given, when, then }) => {
    let alertLocationWrapper: ShallowWrapper;
    let instance: AlertLocationScreen;

    given("I am a User loading AlertLocationScreen", () => {
      alertLocationWrapper = shallow(<AlertLocationScreen {...screenProps} />);
    });

    when("I navigate to the AlertLocationScreen", () => {
      instance = alertLocationWrapper.instance() as AlertLocationScreen;
    });

    then("User can press the back button", async () => {
      let alert_back_button = alertLocationWrapper.findWhere(
        (node) => node.prop("testID") === "alert_back_button"
      );
      alert_back_button.simulate("press");
      expect(screenProps.navigation.goBack).toBeCalled();
    });

    then(
      "User can navigate to the chat screen if press chat icon",
      async () => {
        let alert_chat_button = alertLocationWrapper.findWhere(
          (node) => node.prop("testID") === "alert_chat_button"
        );
        alert_chat_button.simulate("press");
        const group_information = { ...screenProps.route.params.group_information };
        expect(screenProps.navigation.navigate).toBeCalledWith("ConversationScreen",
          {
            chatNumber: group_information.data.guid,
            mainConversationId: group_information.data?.conversationId,
            userName: group_information.data?.name,
            userAvtar: "",
            userType: 2,
            from: 'alertNotificationScreen'
          });
      }
    );
  });
});
