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
import NearbyDetails from "../../src/NearbyDetails";

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
  route: {
    params: {
      details: {
        location: {
          address: "",
          state: "",
        },
      },
    },
  },
  id: "NearbyDetails",
};

const feature = loadFeature(
  "./__tests__/features/NearbyDetails-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to NearbyDetails Screen", ({ given, when, then }) => {
    let nearbyDetailsWrapper: ShallowWrapper;
    let instance: NearbyDetails;

    given("User loading NearbyDetails", () => {
      nearbyDetailsWrapper = shallow(<NearbyDetails {...screenProps} />);
    });

    when("User navigate to the NearbyDetails screeen", () => {
      instance = nearbyDetailsWrapper.instance() as NearbyDetails;
    });

    then("User can navigate to contactDetailsTab tab", () => {
      const medicalTabBtn = nearbyDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "contactDetailsTab"
      );
      medicalTabBtn.simulate("press");
      expect(instance.state.contactDetailsTab).toEqual(true);
    });

    then("User can navigate to directionTab tab", () => {
      const medicalTabBtn = nearbyDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "directionTab"
      );
      medicalTabBtn.simulate("press");
      expect(instance.state.directionTab).toEqual(true);
    });

    then("User can leave the screen with out errors", () => {});
  });
});
