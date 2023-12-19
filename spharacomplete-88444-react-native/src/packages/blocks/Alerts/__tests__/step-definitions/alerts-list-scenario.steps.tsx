//@ts-ignore
//@ts-nocheck
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import * as helpers from "../../../../framework/src/Helpers";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";
import React from "react";
import { View } from "react-native";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import AlertsList from "../../src/AlertsList";
const alertData = {
  all_alerts: [
    {
      panic_incidents: [
        {
          id: 3877,
          date: "07-February-23",
          time: "10:48AM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3876,
          date: "07-February-23",
          time: "10:47AM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3875,
          date: "07-February-23",
          time: "10:44AM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3867,
          date: "30-January-23",
          time: "10:44AM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3862,
          date: "27-January-23",
          time: "01:41PM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3827,
          date: "25-January-23",
          time: "04:14PM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3826,
          date: "25-January-23",
          time: "04:13PM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3825,
          date: "25-January-23",
          time: "04:08PM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3803,
          date: "23-January-23",
          time: "11:34AM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3799,
          date: "20-January-23",
          time: "04:06PM",
          alert_type: "PanicIncident",
          address:
            "My (Ashwani Kumar Ojha) House, B38/55-40      , C/O :  Shrimati Amrawati Ojha, Raja Sir Motichand Road, Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
        {
          id: 3797,
          date: "20-January-23",
          time: "03:38PM",
          alert_type: "PanicIncident",
          address: "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
          status_report: "Pending",
        },
      ],
    },
  ],
  status: 200,
};

const screenProps = {
  navigation: {
    dispatch: jest.fn(),
    getParam: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop:jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
  },
  id: "Alerts",
};

const feature = loadFeature(
  "./__tests__/features/alerts-list-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
  });

  test("User navigates to Alerts List Screen", ({ given, when, then }) => {
    let alertsWrapper: ShallowWrapper;
    let instance: AlertsList;

    given("I am a User getting alerts list", () => {
      alertsWrapper = shallow(<AlertsList {...screenProps} />);
      expect(alertsWrapper).toBeTruthy();
      expect(alertsWrapper).toMatchSnapshot();
    });

    when("I navigate to the Alerts List Screen", () => {
      instance = alertsWrapper.instance() as AlertsList;
      instance.setState({
        Channels: alertData.all_alerts,
      });
      expect(alertsWrapper).toBeTruthy();
      expect(alertsWrapper).toMatchSnapshot();
    });

    then("I can press back button", () => {
      let alertsListBackButton = alertsWrapper.findWhere(
        (node) => node.prop("testID") === "alertsListBackButton"
      );
      alertsListBackButton.simulate("press");
      expect(alertsListBackButton).toBeTruthy();
    });

    then("Get alert history with out errors", () => {
      const getAlertHistoryAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getAlertHistoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAlertHistoryAPI.messageId
      );
      getAlertHistoryAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify({}))
      );
      instance.MessageId = getAlertHistoryAPI.messageId;
      runEngine.sendMessage("Unit Test", getAlertHistoryAPI);
      instance.receiveGetAlertHistory(alertData);
    });

    then("Get alert history with errors", () => {
      const getAlertHistoryAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getAlertHistoryAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAlertHistoryAPI.messageId
      );
      getAlertHistoryAPI.addData(
        getName(MessageEnum.RestAPIResponceErrorMessage),
        JSON.parse(JSON.stringify({}))
      );
      instance.MessageId = getAlertHistoryAPI.messageId;
      runEngine.sendMessage("Unit Test", getAlertHistoryAPI);
      instance.receiveGetAlertHistory(null);
    });

    then("I can press on alert", () => {
      let listWrapper = shallow(
        <View>
          {instance.renderAlerts(
            {
              id: 3877,
              date: "07-February-23",
              time: "10:48AM",
              alert_type: "PanicIncident",
              address:
                "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
              status_report: "Pending",
            },
            0
          )}
        </View>
      );
      let onPressAlert = listWrapper.findWhere(
        (node) => node.prop("testID") === "onPressAlert"
      );
      onPressAlert.simulate("press");
      expect(onPressAlert).toBeTruthy();
    });
  });
});
