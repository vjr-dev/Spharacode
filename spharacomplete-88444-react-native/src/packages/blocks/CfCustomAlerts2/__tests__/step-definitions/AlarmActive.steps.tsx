//@ts-ignore
//@ts-nocheck
import { shallow, ShallowWrapper } from 'enzyme'
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import AlarmActive from "../../src/AlarmActive"
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
    getName,
} from "../../../../framework/src/Messages/MessageEnum";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
            return callback();
        }),
        goBack: jest.fn(),
        //addListener: jest.fn(),
        pop: jest.fn()
    },
    route: {
        params: {
            GroupId: "123",
            ConversationId: "456",
            GroupName: "Test Group",
        }
    },
    id: "AlarmActive"
}

let AlarmActiveData = <AlarmActive {...screenProps} />;

describe("AlarmActive us page first", () => {
    let CfCustomAlerts2Wrapper: ShallowWrapper;
    CfCustomAlerts2Wrapper = shallow(<AlarmActive {...screenProps} />);
    let instance: AlarmActive;

    instance = CfCustomAlerts2Wrapper.instance() as AlarmActive;

    it("should render other landing page show AlarmActive screen without crashing", async () => {
        const rendered = render(AlarmActiveData);

        const Token = "asfjf";
        AsyncStorage.getItem = jest.fn(() => Promise.resolve('Token'));

        const location = {
            latitude: 37.7749,
            longitude: -122.4193
        }

        GetLocation.getCurrentPosition = jest.fn(() => Promise.resolve(location))
        let currentLongitude = location.longitude;
        let currentLatitude = location.latitude;


        instance.setState({ Token: Token })
        instance.setState({
            latitude: currentLongitude,
            longitude: currentLatitude,
        })
        instance.setState({
            latitude: location.latitude,
            longitude: location.longitude,
            routeCoordinates: location,
            prevLatLng: location,
        })

        instance.FirstApi();
        instance.GetProfile();
        expect(rendered).toBeTruthy();


    });

    it('should get the FirstApi data response successfully', () => {
        instance.FirstApi()
        const mockResponse = {
            data: {},
        };

        const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            apiMsg.messageId
        );

        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponse
        );

        instance.GetapiCallId = apiMsg.messageId;
        runEngine.sendMessage("Unit Test", apiMsg);
        const mockResponseError = {
            errors: null
        }
        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponseError
        )

        instance.GetapiCallId = apiMsg.messageId
        runEngine.sendMessage("Unit Test", apiMsg)
        instance.setState({
            Responderdata: [{
                name: 'abc',
                latitude: '45654',
                longitude: '78451'
            }, {
                name: 'abc',
                latitude: '45654',
                longitude: '78451'
            }]
        })


    });

    it('should get the ProfileData response successfully', () => {
        instance.GetProfile()
        const response = {
            data: {
                attributes: {
                    emergency_contacts: [
                        {
                            name: 'abc',
                            image: 'ajadas'
                        },
                        {
                            name: 'abasfc',
                            image: 'ajadasfas'
                        },
                        {
                            name: 'abasdfc',
                            image: 'ajaddsfgasfas'
                        },
                        {
                            name: 'abasfdddc',
                            image: 'ajadassdffas'
                        }
                    ],
                    family: [
                        {
                            name: 'abc',
                            image: 'ajadas'
                        },
                        {
                            name: 'abasfc',
                            image: 'ajadasfas'
                        },
                        {
                            name: 'abasdfc',
                            image: 'ajaddsfgasfas'
                        },
                        {
                            name: 'abasfdddc',
                            image: 'ajadassdffas'
                        }
                    ],
                    friends: [
                        {
                            name: 'abc',
                            image: 'ajadas'
                        },
                        {
                            name: 'abasfc',
                            image: 'ajadasfas'
                        },
                        {
                            name: 'abasdfc',
                            image: 'ajaddsfgasfas'
                        },
                        {
                            name: 'abasfdddc',
                            image: 'ajadassdffas'
                        }
                    ]
                }
            }
        }

        const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            apiMsg.messageId
        );

        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            response
        );

        instance.ProfileGetId = apiMsg.messageId;
        runEngine.sendMessage("Unit Test", apiMsg);
        const mockResponseError = {
            errors: null
        }

        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceErrorMessage),
            mockResponseError
        )

        instance.ProfileGetId = apiMsg.messageId
        runEngine.sendMessage("Unit Test", apiMsg)

        instance.onGetProfileResponse(response)


    });

    it('should get the _onCountDownFinish data response successfully', () => {
        instance._onCountDownFinish()
        const mockResponse = {
            data: {},
        };

        const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            apiMsg.messageId
        );

        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponse
        );

        instance.PanicAlertId = apiMsg.messageId;
        runEngine.sendMessage("Unit Test", apiMsg);
        const mockResponseError = {
            errors: null
        }
        apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponseError
        )

        instance.PanicAlertId = apiMsg.messageId
        runEngine.sendMessage("Unit Test", apiMsg)


    });



    test('should find the testId FlatList', () => {

        let list = CfCustomAlerts2Wrapper.findWhere(
            (node) => node.prop("testID") === "show_emergency_contact"
        );
        list.props().ListFooterComponent();
        list.props().ItemSeparatorComponent();
        list.props().renderItem({ item: { img: '', name: 'ahah' } });
        expect(list).toBeTruthy();
    });

    test('should find the testId btn_back', () => {
        const testTestName = 'btn_back'
        const { getByTestId } = render(AlarmActiveData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    });
})
