import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import History from "../../src/History";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";

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
  id: "History",
};

const feature = loadFeature(
  "./__tests__/features/History-scenario.feature"
);

const responce = {
  alert_history:{
    data:[
      {
        date_category: {
          date_category: "Today"
        },
        data: [
          {
            id: 2,
            incident_no: 6678,
            responded_at: "1:00pm",
            arrival_at: "1:12pm",
            on_scene_timing: "20 min",
            location: "Phase 2, opp: Oracle, plot No: 25, 16A, Hitech City, Hyderabad",
            status_report: null,
            injured: false,
            incident_description: "panic incident",
            injured_description: "",
            treatment_provided: "yes",
            time: "12:00 AM",
            incident_id:6678,
            incident_type:'panic'
          }
        ]
      },
    ]
  }
}

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to History Screen", ({ given, when, then }) => {
    let HistoryWrapper: ShallowWrapper;
    let instance: History;

    given("User loading History", () => {
      HistoryWrapper = shallow(
        <History {...screenProps} />
      );
    });

    when("User navigate to the History screeen", () => {
      instance = HistoryWrapper.instance() as History;
    });

    then("User can able to click go back btn without error", () => {
        let goBackBtn = HistoryWrapper.findWhere((node) => node.prop('testID') === 'goBackBtn');
        goBackBtn.simulate('press')
        expect(screenProps.navigation.goBack).toBeCalled();
    });

    then("User can fetch alerts history without error", async() => {
      const getAlertHistoryAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getAlertHistoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAlertHistoryAPI.messageId
      );
      getAlertHistoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.getAlertHistoryID = getAlertHistoryAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", getAlertHistoryAPI)
      const incidentNoText = HistoryWrapper.findWhere((node) => node.prop('testID') === 'incidentNoText');
      expect(incidentNoText.at(0).props().children[1]).toBe(responce.alert_history.data[0].data[0].incident_id)
    });
    
    then("User can navigate to history details screen if prees history item", () => {
      let historyItem = HistoryWrapper.findWhere((node) => node.prop('testID') === 'historyItem');
      historyItem.at(0).simulate('press')
      const tempItem:any = {...responce.alert_history.data[0].data[0]};
      tempItem.date_category = responce.alert_history.data[0].date_category.date_category;
      expect(screenProps.navigation.navigate).toBeCalledWith("HistoryDetails", {
        details: tempItem,
      });
    });

    then("User can see the no data found text if history not available", async() => {
      const getAlertHistoryAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getAlertHistoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAlertHistoryAPI.messageId
      );
      getAlertHistoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          alert_history:{
            data:[]
          }
        }
      );
      instance.getAlertHistoryID = getAlertHistoryAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", getAlertHistoryAPI)
      const noDataFoundText = HistoryWrapper.findWhere((node) => node.prop('testID') === 'noDataFoundText');
      expect(noDataFoundText.props().children).toBe("Alerts History Not Found")
    });
  });
});
