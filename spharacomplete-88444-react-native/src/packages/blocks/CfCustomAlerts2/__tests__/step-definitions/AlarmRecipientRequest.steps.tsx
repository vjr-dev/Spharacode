import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
    getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AlarmRecipientRequest from "../../src/AlarmRecipientRequest";
import * as permissions from "../../../../components/src/Permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";

const acceptAPIResponce = {
    incident: {
        data: {
            attributes: {
                description: "Description",
                account: {
                    data: {
                        attributes: {
                            first_name: "FirstName",
                            profile_image_url: "url",
                            summary: "Summary",
                            latitude: 37.78825,
                            longitude: -122.4324
                        }
                    }
                },
                group_information: {

                }
            }
        }
    },
};
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
            alertDetails: {
                address: "Address",
                distance: "100",
                message: "Fire Incident has been created",
                name: "Name",
                notify_type: "FireIncident",
                user_latitude: "21.65212",
                user_longitude: "69.97029",
                push_notificable_id:'111'
            }
        }
    },
    id: "AlarmRecipientRequest",
};
const mockAsyncStorage = jest.spyOn(AsyncStorage, 'getItem');
const feature = loadFeature(
    "./__tests__/features/AlarmRecipientRequest-scenario.feature"
);

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.mock("react-native/Libraries/Utilities/Platform", () => ({
            OS: "android",
            select: () => null,
        }));
        jest.spyOn(permissions,'getLocationPermission').mockImplementation(() =>
            new Promise((resolve, reject) => {
                return resolve("granted");
            }));
        jest.spyOn(GetLocation,'getCurrentPosition').mockImplementation(() =>
        new Promise((resolve, reject) => {
            return resolve({
                latitude: 37.78825,
                longitude: -122.4324,
                altitude:0,
                accuracy:1,
                speed:0,
                time:0
            });
        }));
    });
    const params = {
        userName: acceptAPIResponce.incident.data.attributes.account.data.attributes.first_name,
        profileImageURL: acceptAPIResponce.incident.data.attributes.account.data.attributes.profile_image_url,
        distance: screenProps.route.params.alertDetails.distance,
        description: acceptAPIResponce.incident.data.attributes.account.data.attributes.summary,
        latitude: acceptAPIResponce.incident.data.attributes.account.data.attributes.latitude,
        longitude: acceptAPIResponce.incident.data.attributes.account.data.attributes.longitude,
        group_information: acceptAPIResponce.incident.data.attributes.group_information,
        isAlertSender: false
    }
    test("User navigates to Alarm Recipient Request screen as a first responder", ({
        given,
        when,
        then,
    }) => {
        let alarmRecipientRequestWrapper: ShallowWrapper;
        let instance: AlarmRecipientRequest;

        given("I am a User loadingAlarm Recipient Request screen", () => {
            mockAsyncStorage.mockClear();
            mockAsyncStorage.mockImplementation((key) => {
                if (key == "roleID") {
                    return Promise.resolve("1");
                }
                return Promise.resolve(null);
            })
            alarmRecipientRequestWrapper = shallow(<AlarmRecipientRequest {...screenProps} />);
        });

        when("I navigate to the Alarm Recipient Request screen", () => {
            instance = alarmRecipientRequestWrapper.instance() as AlarmRecipientRequest;
        });

        then("I can check the distance preview if I prees distance preview text", () => {
            const previewButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewButton"
            );
            previewButton.simulate("press");
            const distancePreviewModal = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "distancePreviewModal"
            );
            expect(distancePreviewModal.props().visible).toBe(true)
        });
        then("I can go to reject alert screen if reject the alert", async () => {
            const btn_reject = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "btn_reject"
            );
            btn_reject.simulate("press");
            const previewRejectButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewRejectButton"
            );
            previewRejectButton.simulate("press");
            expect(screenProps.navigation.navigate).toBeCalledWith("RejectAlert",{notify_type: screenProps.route.params.alertDetails.notify_type, incidentID: screenProps.route.params.alertDetails.push_notificable_id})
        });
        then("I can go to map screen if accept the fire alert", async () => {
            let btn_accept = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "btn_accept"
            );
            btn_accept.simulate("press");
            const previewAcceptButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewAcceptButton"
            );
            previewAcceptButton.simulate("press");

            const acceptAlertAPI: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                acceptAlertAPI.messageId
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                acceptAPIResponce
            );
            instance.AcceptId = acceptAlertAPI.messageId;
            const {receive:mockResponse} = instance
            mockResponse("test", acceptAlertAPI)
            let acknowledgeButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "acknowledgeButton"
            );
            acknowledgeButton.simulate("press");
            expect(screenProps.navigation.replace).toBeCalledWith('AuthoriseStackFirstResponder', { screen: 'FirstResponderHomePage', params: { screen: 'Home', params: { screen: 'Home', params: { screen: 'FirstResponderYourLocation', params: { locationStatus: 'start' } } } } })
        });

        then("I can go to map screen if accept the ambulance alert", async () => {
            let tempProps = { ...screenProps };
            tempProps.route.params.alertDetails.notify_type = "AmbulanceReport";
            await alarmRecipientRequestWrapper.setProps(tempProps);
            let btn_accept = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "btn_accept"
            );
            btn_accept.simulate("press");
            const previewAcceptButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewAcceptButton"
            );
            previewAcceptButton.simulate("press");

            const acceptAlertAPI: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                acceptAlertAPI.messageId
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                acceptAPIResponce
            );
            instance.AcceptId = acceptAlertAPI.messageId;
            const {receive:mockResponse} = instance
            mockResponse("test", acceptAlertAPI)
            let acknowledgeButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "acknowledgeButton"
            );
            acknowledgeButton.simulate("press");
            expect(screenProps.navigation.replace).toBeCalledWith('AuthoriseStackFirstResponder', { screen: 'FirstResponderHomePage', params: { screen: 'Home', params: { screen: 'Home', params: { screen: 'FirstResponderYourLocation', params: { locationStatus: 'start' } } } } })
        });
        then("I can go to map screen if accept the emergency assistance alert", async () => {
            let tempProps = { ...screenProps };
            tempProps.route.params.alertDetails.notify_type = "EmergencyAssistance";
            await alarmRecipientRequestWrapper.setProps(tempProps);
            let btn_accept = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "btn_accept"
            );
            btn_accept.simulate("press");
            const previewAcceptButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewAcceptButton"
            );
            previewAcceptButton.simulate("press");

            const acceptAlertAPI: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                acceptAlertAPI.messageId
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                acceptAPIResponce
            );
            instance.AcceptId = acceptAlertAPI.messageId;
            const {receive:mockResponse} = instance
            mockResponse("test", acceptAlertAPI)
            let acknowledgeButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "acknowledgeButton"
            );
            acknowledgeButton.simulate("press");
            expect(screenProps.navigation.replace).toBeCalledWith('AuthoriseStackFirstResponder', { screen: 'FirstResponderHomePage', params: { screen: 'Home', params: { screen: 'Home', params: { screen: 'FirstResponderYourLocation', params: { locationStatus: 'start' } } } } })
        });
        then("I can go to map screen if accept the panic alert", async () => {
            let tempProps = { ...screenProps };
            tempProps.route.params.alertDetails.notify_type = "Panic";
            await alarmRecipientRequestWrapper.setProps(tempProps);
            let btn_accept = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "btn_accept"
            );
            btn_accept.simulate("press");
            const previewAcceptButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewAcceptButton"
            );
            previewAcceptButton.simulate("press");

            const acceptAlertAPI: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                acceptAlertAPI.messageId
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                acceptAPIResponce
            );
            instance.AcceptId = acceptAlertAPI.messageId;
            const {receive:mockResponse} = instance
            mockResponse("test", acceptAlertAPI)
            let acknowledgeButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "acknowledgeButton"
            );
            acknowledgeButton.simulate("press");
            expect(screenProps.navigation.replace).toBeCalledWith('AuthoriseStackFirstResponder', { screen: 'FirstResponderHomePage', params: { screen: 'Home', params: { screen: 'Home', params: { screen: 'FirstResponderYourLocation', params: { locationStatus: 'start' } } } } })
        });
        then("I can close the distance preview if I press close icon on preview", async () => {
            const previewCloseButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewCloseButton"
            );
            previewCloseButton.simulate("press");
            const distancePreviewModal = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "distancePreviewModal"
            );
            expect(distancePreviewModal.props().visible).toBe(false)
        });
    });

    test("User navigates to Alarm Recipient Request screen as a civilian", ({
        given,
        when,
        then,
    }) => {
        let alarmRecipientRequestWrapper: ShallowWrapper;
        let instance: AlarmRecipientRequest;

        given("I am a User loadingAlarm Recipient Request screen", () => {
            mockAsyncStorage.mockClear();
            mockAsyncStorage.mockImplementation((key) => {
                if (key == "roleID") {
                    return Promise.resolve("2");
                }
                return Promise.resolve(null);
            })
            alarmRecipientRequestWrapper = shallow(<AlarmRecipientRequest {...screenProps} />);
        });

        when("I navigate to the Alarm Recipient Request screen", () => {
            instance = alarmRecipientRequestWrapper.instance() as AlarmRecipientRequest;
        });

        then("I can go back if reject the alert", async () => {
            const btn_reject = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "btn_reject"
            );
            btn_reject.simulate("press");
            const previewRejectButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewRejectButton"
            );
            previewRejectButton.simulate("press");
            expect(screenProps.navigation.pop).toBeCalled();
        });
        then("I can see the distance text", async () => {
            const distanceText = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "distanceText"
            );
            expect(distanceText.props().children).toBe(`You are just ${screenProps.route.params.alertDetails.distance} km away from the incident`)
        });
        then("I can go to location map screen if accept the fire alert", async () => {
            let btn_accept = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "btn_accept"
            );
            btn_accept.simulate("press");
            const previewAcceptButton = alarmRecipientRequestWrapper.findWhere(
                (node) => node.prop("testID") === "previewAcceptButton"
            );
            previewAcceptButton.simulate("press");

            const acceptAlertAPI: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                acceptAlertAPI.messageId
            );
            acceptAlertAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                acceptAPIResponce
            );
            instance.AcceptId = acceptAlertAPI.messageId;
            const {receive:mockResponse} = instance
            mockResponse("test", acceptAlertAPI)

            expect(screenProps.navigation.replace).toBeCalledWith("AlertLocatioScreen", params)
        });
    });
});
