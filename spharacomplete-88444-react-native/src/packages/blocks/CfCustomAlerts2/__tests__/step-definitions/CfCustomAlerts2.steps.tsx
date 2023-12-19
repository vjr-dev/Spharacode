//@ts-ignore
//@ts-nocheck
import { shallow, ShallowWrapper } from 'enzyme'
import React from "react";
import CfCustomAlerts2 from "../../src/CfCustomAlerts2"

import GetLocation from "react-native-get-location";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Alert } from 'react-native';
import { AnimatedRegion } from 'react-native-maps';

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
    pop:jest.fn()
  },
  route: {
    params: {
      GroupId: "123",
      ConversationId: "456",
      GroupName: "Test Group",
      initialSeconds: '03'
    }
  },
  id: "CfCustomAlerts2"
}

describe("CfCustomAlerts2 us page first", () => {
  let CfCustomAlerts2Wrapper: ShallowWrapper;
  CfCustomAlerts2Wrapper = shallow(<CfCustomAlerts2 {...screenProps} />);
  let instance: CfCustomAlerts2;

  instance = CfCustomAlerts2Wrapper.instance() as CfCustomAlerts2;

  it("should render other landing page show CfCustomAlerts2 screen without crashing", async () => {


    instance.componentDidMount()
    instance.setState({ Token: 'abccb' })
    instance.GetProfile();
    const location = {
      latitude: 37.7749,
      longitude: -122.4193
    }
    let currentLongitude = location.longitude;
    let currentLatitude = location.latitude;

    GetLocation.getCurrentPosition = jest.fn(() => Promise.resolve(location))
    instance.setState({
      latitude: currentLongitude,
      longitude: currentLatitude,
    })
    const Token = "jkhkhkuinnkn";
    instance.setState({ Token: Token })
    instance.setState({
      latitude: location.latitude,
      longitude: location.longitude,
      routeCoordinates: location,
      prevLatLng: location,
      coordinatesvalues: new AnimatedRegion({
        latitude: 55555,
        longitude: 555,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }),
    })

  });
  it('should get the ProfileData response successfully', () => {
    instance.GetProfile()
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

    instance.ProfileGetId = apiMsg.messageId;
    runEngine.sendMessage("Unit Test", apiMsg);
    const mockResponseError = {}
    apiMsg.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      mockResponseError
    )

    instance.ProfileGetId = apiMsg.messageId
    runEngine.sendMessage("Unit Test", apiMsg)


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


  });

  it('should get the _onCountDownFinish data response successfully', () => {
    instance._onCountDownFinish()
    const mockResponse = {
      message:"Incident has been created!"
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

    instance.PanicAlertId = apiMsg.messageId
    runEngine.sendMessage("Unit Test", apiMsg)
  });

  it('should get the _onCountDownFinish data response with error', () => {
    instance._onCountDownFinish()

    const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

    apiMsg.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      apiMsg.messageId
    );

    apiMsg.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      {errors:[{error:"not successs"}]}
    );

    instance.PanicAlertId = apiMsg.messageId
    runEngine.sendMessage("Unit Test", apiMsg)

    apiMsg.addData(
      getName(MessageEnum.RestAPIResponceErrorMessage),
      {errors:[{error:"not successs"}]}
    );

    instance.PanicAlertId = apiMsg.messageId
    runEngine.sendMessage("Unit Test", apiMsg)
  });

  test('should find the testId text_cancel', () => {
    let list = CfCustomAlerts2Wrapper.findWhere(
      (node) => node.prop("testID") === "text_cancel"
    );
    list.simulate('press',instance.cancelPress())
    instance.pressYes()
    Alert.alert = jest.fn((buttons) => {
      buttons[0].onPress();
    });

    Alert.alert = jest.fn((buttons) => {
      buttons[1].onPress();
    });
    expect(Alert.alert).toBeTruthy();
  });

  test('should find the testId Countdown', () => {

    let list = CfCustomAlerts2Wrapper.findWhere(
      (node) => node.prop("testID") === "countdown"
    );
    list.props().onEnd();
    expect(list).toBeTruthy();
  });




})
