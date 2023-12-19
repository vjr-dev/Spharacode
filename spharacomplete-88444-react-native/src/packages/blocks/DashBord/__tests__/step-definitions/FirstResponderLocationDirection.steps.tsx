//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { Alert } from "react-native";
import FirstResponderLocationDirection from "../../src/FirstResponderLocationDirection";
import * as getLocation from "../../../../components/src/GettLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
  },
  //   route: {
  //     params: {
  //       from: "EmergencyContact",
  //     },
  //   },
  id: "FirstResponderLocationDirection",
};

const feature = loadFeature(
  "./__tests__/features/FirstResponderLocationDirection-scenario.feature"
);

let data = {
  address:
    "Mahobat Para, Kutiyana Taluka, Porbandar District, Gujarat, 362650, India",
  distance: "13325.36",
  group_information: {
    data:{
      guid: 123,
      conversationId: 456,
      name: "abc",
      userAvtar: "",
      userType: 2,
    }
  
  },
  message: "Fire Incident has been created",
  name: "Deep1",
  notification: '{"sound":"default","body":"Fire Incident has been created"}',
  notify_type: "FireIncident",
  push_notificable_id: "506",
  push_notificable_type: "BxBlockDashboard::FireIncident",
  send_by: "973",
  send_to: "1752",
  latitude: "21.65955",
  longitude: "69.96862",
  user_profile_info:
    '{"receiver":{"profile_image":null,"summery":"This is device2 summary "},"sender":{"profile_image":"https://spharacomplete-88444-ruby.b88444.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c5e7130372c0422afcada32c5a68aa154ee8ab1f/1695972960","summery":"This is device2 summary "}}',
};

let locationData={
  latitude:54.5252,
  longitude:54.2522
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    jest.spyOn(getLocation,"getCurrentLocation").mockImplementation((): any => Promise.resolve(locationData))
  });
  test("User navigates to FirstResponderLocationDirection Screen", ({
    given,
    when,
    then,
  }) => {
    let firstResponderLocationDirectionWrapper: ShallowWrapper;
    let instance: FirstResponderLocationDirection;

    given("User loading FirstResponderLocationDirection Screen", () => {
      const mockAsyncStorage = jest.spyOn(AsyncStorage, "getItem");
      mockAsyncStorage.mockClear();

      mockAsyncStorage.mockImplementation((key) => {
        if (key == "CurrentAlertData") {
          return Promise.resolve(JSON.stringify(data));
        }

        return Promise.resolve(null);
      });

      firstResponderLocationDirectionWrapper = shallow(
        <FirstResponderLocationDirection {...screenProps} />
      );
    });

    when("User navigate to the FirstResponderLocationDirection screeen", () => {
      instance = firstResponderLocationDirectionWrapper.instance() as FirstResponderLocationDirection;
    });

    then("User can able to view chat functionality", () => {
      const addEmergencyContactBackButton = firstResponderLocationDirectionWrapper.findWhere(
        (node) => node.prop("testID") === "chatBtn"
      );
      addEmergencyContactBackButton.simulate("press");
      // expect(screenProps.navigation.pop).not.toBeCalled();
    });

    then("User can leave the screen with out errors", () => {});
  });
});
