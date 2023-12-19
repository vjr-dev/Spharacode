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
import NearBy from "../../src/NearBy";

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
  id: "NearBy",
};

const feature = loadFeature(
  "./__tests__/features/NearBy-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to NearBy Screen", ({ given, when, then }) => {
    let nearByWrapper: ShallowWrapper;
    let instance: NearBy;

    given("User loading NearBy", () => {
      nearByWrapper = shallow(
        <NearBy {...screenProps} />
      );
    });

    when("User navigate to the NearBy screeen", () => {
      instance = nearByWrapper.instance() as NearBy;
    });

    then("User can navigate to back screen without error", () => {
        const goBackBn = nearByWrapper.findWhere(
            (node) => node.prop("testID") === "goBackBn"
          );
          goBackBn.simulate("press");
        //   expect(instance.state.policeTab).toEqual(true)
      });
      
    then("User can navigate to Police tab", () => {
        const policeTabBtn = nearByWrapper.findWhere(
            (node) => node.prop("testID") === "policeTabBtn"
          );
          policeTabBtn.simulate("press");
          expect(instance.state.policeTab).toEqual(true)
      });

      then("User can able to see details without error", async() => {
        const dummyItem = {
          item:   {
            stationName: "Madhapur Polic Staion",
            location: {
              address:
                "Traffic Junction, Near Kavuri Hills, Hitech City Rd,Madhapur, Hyderabad",
              state: "Telangana",
            },
            contact: {
              policeStationNumber: "",
              controlRoomNumber: "",
              spOfficerNumber: "",
            },
          },
        };

        const wrapper = nearByWrapper.find('FlatList').props().renderItem({
          item:dummyItem
        });
      });

    then("User can navigate to Medical tab", () => {
        const medicalTabBtn = nearByWrapper.findWhere(
            (node) => node.prop("testID") === "medicalTabBtn"
          );
          medicalTabBtn.simulate("press");
          expect(instance.state.medialTab).toEqual(true)
      });

      then("User can navigate to Fire Station tab", () => {
        const fireStationTabBtn = nearByWrapper.findWhere(
            (node) => node.prop("testID") === "fireStationTabBtn"
          );
          fireStationTabBtn.simulate("press");
          expect(instance.state.fireStationTab).toEqual(true)
      });

    then("User can leave the screen with out errors", () => {});
  });
});
