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
import IncidentReport from "../../src/IncidentReport";
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
  id: "IncidentReport",
};

const mockAsyncStorage = jest.spyOn(AsyncStorage, 'getItem');

const feature = loadFeature(
  "./__tests__/features/IncidentReport-scenario.feature"
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

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  test("User navigates to DashBord Screen", ({ given, when, then }) => {
    let incidentReportWrapper: ShallowWrapper;
    let instance: IncidentReport;

    given("User loading DashBord", () => {
      const mockAsyncStorage = jest.spyOn(AsyncStorage, "getItem");
      mockAsyncStorage.mockClear();

      mockAsyncStorage.mockImplementation((key) => {
        if (key == "CurrentAlertData") {
          return Promise.resolve(JSON.stringify(data));
        }

        return Promise.resolve(null);
      });
      incidentReportWrapper = shallow(<IncidentReport {...screenProps} />);
    });

    when("User navigate to the DashBord screeen", () => {
      instance = incidentReportWrapper.instance() as IncidentReport;
    });

    then("User can not details with error", () => {
      const responce = {
        errors: [
          "Some thing went wrong"
        ]
      }
      const getContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContactsAPI.messageId
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.getReportDetailsId = getContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", getContactsAPI)
      // expect(custumAlerts.displayErrorMessage).toHaveBeenCalledWith(responce.errors[0])
    });

    then("User can fetch details with out error", async () => {
      const responce = {
        data: {
          attributes: {
            incident_description: "Ff",
            injured: "Yes",
            injured_description: "Ggg",
            treatment_provided: "refused treatment",
            type: "fire",
          },
        },
      };
      const getContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContactsAPI.messageId
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.getReportDetailsId = getContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", getContactsAPI);
      // instance.getReportDetail()
      // await runAllPromises();
      // const phoneNumberText = emergencyContactWrapper.findWhere(
      //   (node) => node.prop("testID") === "phoneNumberText"
      // );
      // expect(phoneNumberText.at(0).props().children).toBe(responce.data[0].attributes.phone_number)
    });

    then("User can not submit report with out incidentDescription", async () => {
      const goToHomeBtn = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "submitBtn"
      );
      goToHomeBtn.simulate("press");
    });

    then("User can submit report with out AmbulanceReport incident", async () => {
      let abc={
        notify_type: "AmbulanceReport"
      }
      mockAsyncStorage.mockClear();
      mockAsyncStorage.mockImplementation((key) => {
          if (key == "CurrentAlertData") {
              return Promise.resolve(abc);
          }
          return Promise.resolve(null);
      })
    });

    then("I can enter description with out errors", () => {
      const textInputComponent = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "descriptionInput"
      );
      textInputComponent.simulate("changeText", "test1");
    });

    then("User can not submit report with error", () => {
      const responce = {
        errors: [
          "Some thing went wrong"
        ]
      }
      const getContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContactsAPI.messageId
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.uploadReportDetailsId = getContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", getContactsAPI)
      // expect(custumAlerts.displayErrorMessage).toHaveBeenCalledWith(responce.errors[0])
    });

    then("User can submit report with out error", async () => {
      const goToHomeBtn = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "submitBtn"
      );
      goToHomeBtn.simulate("press");
      const responce = {
        data: {
          attributes: {
            incident_description: "Ff",
            injured: "Yes",
            injured_description: "Ggg",
            treatment_provided: "refused treatment",
            type: "AmbulanceReport",
          },
        },
      };
      const getContactsAPI: Message = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContactsAPI.messageId
      );
      getContactsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responce
      );
      instance.uploadReportDetailsId = getContactsAPI.messageId;
      const { receive: mockReceive } = instance;
      await mockReceive("Unit Test", getContactsAPI);
    });

    then("User can able to tick injerd option", () => {
      const injerdOption = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "injerdOption"
      );
      injerdOption.props().onPress();
      console.log("statfyafgs", instance.state.injured);
    });

    then("User can not submit report with out injured", async () => {
      const goToHomeBtn = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "submitBtn"
      );
      goToHomeBtn.simulate("press");
    });

    then("User can able to tick not Injerd option", () => {
      const injerdOption = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "notInjerdOption"
      );
      injerdOption.props().onPress();
    });

    then("User can not submit report if is injured and no details about treatmentProvided", async () => {
      const goToHomeBtn = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "submitBtn"
      );
      goToHomeBtn.simulate("press");
    });

    then("User can able to tick Treatment Provided option", () => {
      console.log("treatmentProvidedtreatmentProvided===",instance.state.treatmentProvided);

      const injerdOption = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "treatmentProvided"
      );
      injerdOption.props().onPress();
      console.log("treatmentProvidedtreatmentProvided",instance.state.treatmentProvided,instance.state.injured);
      
    });

    then("User can able to tick Treatment not provided option", () => {
      const injerdOption = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "treatmentNotProvided"
      );
      injerdOption.props().onPress();
    });

    then("User can able to tick Refused Treatment option", () => {
      const injerdOption = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "refusedTreatment"
      );
      injerdOption.props().onPress();
    });

    then("User can able to navigate to the Home screeen", () => {
      const goToHomeBtn = incidentReportWrapper.findWhere(
        (node) => node.prop("testID") === "goToHomeBtn"
      );
      goToHomeBtn.simulate("press");
    });

    then("User can leave the screen with out errors", () => {});
  });
});
