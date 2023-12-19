import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import RejectAlert from "../../src/RejectAlert";
import * as custumAlerts from "../../../../components/src/CustomAlert";


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
  route:{
    params:{
      notify_type:"AmbulanceReport",
      incidentID:1
    }
  },
  id: "RejectAlert",
};
const cancellationOptionsResponce = {
  reject_options: {
    data: [
      {
        attributes: {
          id: 1,
          title: "I am already on different emergency case."
        },
        id: "1",
        type: "reject_option"
      },
      {
        attributes: {
          id: 2,
          title: "I am off duty now"
        },
        id: "2",
        type: "reject_option"
      },
      {
        attributes: {
          id: 3,
          title: "Somebody attended the case."
        },
        id: "3",
        type: "reject_option"
      },
      {
        attributes: {
          id: 4,
          title: "I am too far from the incident location."
        },
        id: "4",
        type: "reject_option"
      },
      {
        attributes: {
          id: 5,
          title: "Other"
        },
        id: "5",
        type: "reject_option"
      },
    ]
  }
}
const rejectAPIResponce = {
  status:200,
  message:"Fire Incident Rejected!"
}
const cancellationOptionsAPI = async (instance: any) => {
  const fetchRejectOptionAPI: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  fetchRejectOptionAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    fetchRejectOptionAPI.messageId
  );
  fetchRejectOptionAPI.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    cancellationOptionsResponce
  );
  instance.getRejectOptionAPIID = fetchRejectOptionAPI.messageId;
  const {receive:mockResponse} = instance
  mockResponse("test", fetchRejectOptionAPI)
}
const rejectAlertAPI = async (instance: any) => {
  const rejectAPI: Message = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  rejectAPI.addData(
    getName(MessageEnum.RestAPIResponceDataMessage),
    rejectAPI.messageId
  );
  rejectAPI.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    rejectAPIResponce
  );
  instance.rejectAPIID = rejectAPI.messageId;
  const {receive:mockResponse} = instance
  mockResponse("test", rejectAPI)
}
const feature = loadFeature(
  "./__tests__/features/RejectAlert-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.mock("react-native/Libraries/Utilities/Platform", () => ({
      OS: "android",
      select: () => null,
    }));

    jest.spyOn(custumAlerts, 'displayErrorMessage')
    jest.spyOn(custumAlerts, 'displaySuccessMessage')
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("User navigates to Reject Alert screen", ({
    given,
    when,
    then,
  }) => {
    let rejectAlertWrapper: ShallowWrapper;
    let instance: RejectAlert;

    given("I am a User loading Reject Alert screen", () => {
      rejectAlertWrapper = shallow(<RejectAlert {...screenProps} />);
    });

    when("I navigate to the Reject Alert screen", () => {
      instance = rejectAlertWrapper.instance() as RejectAlert;
    });
    then("I can fetch option of cancellation", async () => {
      await cancellationOptionsAPI(instance);
      const cancellationOptionsButton = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "cancellationOptionsButton"
      );
      cancellationOptionsButton.simulate("press");
      const wrapperProps: any = rejectAlertWrapper.find('FlatList').props();
      expect(wrapperProps.data).toBe(cancellationOptionsResponce.reject_options.data)
      const renderItem: any = wrapperProps.renderItem({
        item: wrapperProps.data[0]
      });
      renderItem.props.onPress();
    });
    then("I can select the reason of cancellation", () => {
      const cancellationOptionsButton = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "cancellationOptionsButton"
      );
      cancellationOptionsButton.simulate("press");
      const wrapperProps: any = rejectAlertWrapper.find('FlatList').props();
      wrapperProps.keyExtractor({}, 0)
      const renderItem = wrapperProps.renderItem({
        item: wrapperProps.data[0]
      });
      renderItem.props.onPress();
      const reasonText = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "reasonText"
      );
      expect(reasonText.props().children).toBe(wrapperProps.data[0].attributes.title)
    });
    then("I can enter my customise reason if I select other option from dropdown", async () => {
      const cancellationOptionsButton = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "cancellationOptionsButton"
      );
      cancellationOptionsButton.simulate("press");
      const wrapperProps: any = rejectAlertWrapper.find('FlatList').props();
      wrapperProps.keyExtractor({},wrapperProps.data?.length - 1)
      const renderItem = wrapperProps.renderItem({
        item:wrapperProps.data[wrapperProps.data?.length - 1]
      });
      renderItem.props.onPress();
      let otherReasonInput = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "otherReasonInput"
      );
      await otherReasonInput.props().onChangeText("My reason");
      otherReasonInput = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "otherReasonInput"
      );
      expect(otherReasonInput.props().value).toBe("My reason")
    });
    then("I can see error message if I select other option but do not add reason and press send button", async() => {
      const cancellationOptionsButton = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "cancellationOptionsButton"
      );
      cancellationOptionsButton.simulate("press");
      const wrapperProps:any = rejectAlertWrapper.find('FlatList').props();
      const renderItem = wrapperProps.renderItem({
        item: wrapperProps.data[wrapperProps.data?.length - 1]
      });
      renderItem.props.onPress();
      let otherReasonInput = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "otherReasonInput"
      );
      await otherReasonInput.props().onChangeText("");
      const sendButton = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "sendButton"
      );
      sendButton.simulate("press");
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Please enter your reason")
    });
    then("I can reject ambulance alert if I enter proper details", async() => {
      const cancellationOptionsButton = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "cancellationOptionsButton"
      );
      cancellationOptionsButton.simulate("press");
      const wrapperProps: any = rejectAlertWrapper.find('FlatList').props();
      const renderItem = wrapperProps.renderItem({
        item: wrapperProps.data[wrapperProps.data?.length - 1]
      });
      renderItem.props.onPress();
      let otherReasonInput = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "otherReasonInput"
      );
      await otherReasonInput.props().onChangeText("My reason");
      const sendButton = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "sendButton"
      );
      sendButton.simulate("press");
      await rejectAlertAPI(instance);
       expect(custumAlerts.displaySuccessMessage).toBeCalledWith(rejectAPIResponce.message)
    });
    then("I can reject fire alert if I enter proper details", async() => {
      const tempProps = {...screenProps};
      tempProps.route.params.notify_type = "FireIncident";
      let tempWrapper = shallow(<RejectAlert {...tempProps} />);
      let tempinstance = tempWrapper.instance() as RejectAlert;
      await cancellationOptionsAPI(tempinstance);

      const cancellationOptionsButton = tempWrapper.findWhere(
        (node) => node.prop("testID") === "cancellationOptionsButton"
      );
      cancellationOptionsButton.simulate("press");
      const wrapperProps: any = tempWrapper.find('FlatList').props();
      const renderItem = wrapperProps.renderItem({
        item: wrapperProps.data[0]
      });
      await renderItem.props.onPress();
      const sendButton = tempWrapper.findWhere(
        (node) => node.prop("testID") === "sendButton"
      );
      sendButton.simulate("press");
      await rejectAlertAPI(tempinstance);
       expect(custumAlerts.displaySuccessMessage).toBeCalledWith(rejectAPIResponce.message)
    });
    then("I can reject emergency incident alert if I enter proper details", async() => {
      const tempProps = {...screenProps};
      tempProps.route.params.notify_type = "EmergencyAssistance";
      let tempWrapper = shallow(<RejectAlert {...tempProps} />);
      let tempinstance = tempWrapper.instance() as RejectAlert;
      await cancellationOptionsAPI(tempinstance);
      const cancellationOptionsButton = tempWrapper.findWhere(
        (node) => node.prop("testID") === "cancellationOptionsButton"
      );
      cancellationOptionsButton.simulate("press");
      const wrapperProps: any = tempWrapper.find('FlatList').props();
      const renderItem = wrapperProps.renderItem({
        item: wrapperProps.data[0]
      });
      await renderItem.props.onPress();
      const sendButton = tempWrapper.findWhere(
        (node) => node.prop("testID") === "sendButton"
      );
      sendButton.simulate("press");
      await rejectAlertAPI(tempinstance);
       expect(custumAlerts.displaySuccessMessage).toBeCalledWith(rejectAPIResponce.message)
    });
    then("I can reject panic alert if I enter proper details", async() => {
      const tempProps = {...screenProps};
      tempProps.route.params.notify_type = "Panic";
      let tempWrapper = shallow(<RejectAlert {...tempProps} />);
      let tempinstance = tempWrapper.instance() as RejectAlert;
      await cancellationOptionsAPI(tempinstance);
      const cancellationOptionsButton = tempWrapper.findWhere(
        (node) => node.prop("testID") === "cancellationOptionsButton"
      );
      cancellationOptionsButton.simulate("press");
      const wrapperProps: any = tempWrapper.find('FlatList').props();
      const renderItem = wrapperProps.renderItem({
        item: wrapperProps.data[0]
      });
      await renderItem.props.onPress();
      const sendButton = tempWrapper.findWhere(
        (node) => node.prop("testID") === "sendButton"
      );
      sendButton.simulate("press");
      await rejectAlertAPI(tempinstance);
       expect(custumAlerts.displaySuccessMessage).toBeCalledWith(rejectAPIResponce.message)
    });
    then("I can see error message if I send the report without adding reason", () => {
      rejectAlertWrapper = shallow(<RejectAlert {...screenProps} />);
      const sendButton = rejectAlertWrapper.findWhere(
        (node) => node.prop("testID") === "sendButton"
      );
      sendButton.simulate("press");
      expect(custumAlerts.displayErrorMessage).toBeCalledWith("Please select reject option")
    });
  });
});
