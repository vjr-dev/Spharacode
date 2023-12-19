//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TrackedHours from "../../src/TrackedHours";

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

  id: "FirstResponderDashboard",
};

const feature = loadFeature(
  "./__tests__/features/TrackedHours-scenario.feature"
);

let responce = {
  Current_Time: "Thursday 11:18",
  Daily_hours: 0,
  Monthly_hours: 0,
  Status: "Standby",
  Weekly_hours: 0,
  message: "Working hours summary",
  success: true,
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "android",
      select: () => null,
    }));
    jest.useFakeTimers();
  });
  test("User navigates to Tracked Hours screen", ({ given, when, then }) => {
    let trackedHoursWrapper: ShallowWrapper;
    let instance: TrackedHours;

    given("I am a User loading Tracked Hours screen", () => {
      trackedHoursWrapper = shallow(<TrackedHours {...screenProps} />);
    });

    when("I navigate to the Tracked Hours screen", () => {
      instance = trackedHoursWrapper.instance() as TrackedHours;
    });

    then("I can fetch data with out error", () => {
      const getRolesData: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getRolesData.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getRolesData.messageId
      );
      getRolesData.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        data: responce,
      });
      instance.getHoursId = getRolesData.messageId;

      const { receive: mockReceive } = instance;
      mockReceive("test", getRolesData);
    });

    then("I can not fetch data with out error", () => {
      const getContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContactsAPI.messageId
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              message: "Some thing went wrong",
            },
          ],
        }
      );
      instance.getHoursId = getContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("test", getContactsAPI);
    });
  });
});
