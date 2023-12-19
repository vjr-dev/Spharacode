//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import React from "react";
import AlarmDelay from "../../src/AlarmDelay";
import MessageEnum, { getName } from 'framework/src/Messages/MessageEnum';
import { Message } from 'framework/src/Message';
import { runEngine } from 'framework/src/RunEngine';

const CreateEventRes = {}
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    addListener: jest.fn().mockImplementation((event: any, callback: any) => {
      callback();
    }),
   
    
  },
  id: "AlarmDelay",
};

const feature = loadFeature(
  "./__tests__/features/AlarmDelay-scenario.feature"
);

jest.mock("react-native-shake", () => ({
  RNShake: jest.fn()
  // addListener: jest.fn().mockImplementation((cb) => cb()),
}));
jest.mock("react-native-sound", () =>({
  setCategory : jest.fn(),
}));

jest.mock("react-native-system-setting", () => ({
  removeVolumeListener: jest.fn(),
  getVolume: jest.fn(() => Promise.resolve("test")),
  addVolumeListener: jest
    .fn()
    .mockImplementation((callback: any) => callback({ value: 2 })),
}));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  
    jest.doMock("../../../../mobile/sample.mp3", () => ({}));
  
  });

  test("User navigates to AlarmDelay", ({ given, when, then }) => {
    let AlarmDelayWrapper: ShallowWrapper;
    let instance: AlarmDelay;

    given("I am a User attempting to navigate AlarmDelay Screen", () => {
      AlarmDelayWrapper = shallow(<AlarmDelay {...screenProps} />);
      expect(AlarmDelayWrapper).toBeTruthy();
      expect(AlarmDelayWrapper).toMatchSnapshot();
    });

    when("I navigate to the AlarmDelay Screen",async () => {
      instance = AlarmDelayWrapper.instance() as AlarmDelay;

      instance.state = {
            
        Loader: false,
        value1: 10,
        value2: 5,
        Userdata: "",
        Token: "",
        
    };
   

    });

    then("I can open the modal", async () => {
      await instance.setclick()


      instance.setState({ Loader: true })

      const SetsettingID = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      SetsettingID.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        SetsettingID.messageId
      );
      SetsettingID.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(CreateEventRes))
      );
      instance.SetsettingID = SetsettingID.messageId;
      runEngine.sendMessage("Unit Test", SetsettingID);


    let buttonComponent = AlarmDelayWrapper.findWhere((node) => node.prop('testID') === 'setClickId');
    buttonComponent.simulate('press', instance.setclick());
     
    });

    then("I can press call menu", async () => {
      instance.goSignupScreen()
    });

    then("I can press bot menu", async () => {
      const switchbtnComponent = AlarmDelayWrapper.findWhere(
        (node) => node.prop("testID") === "silderValue"
      );
      switchbtnComponent.simulate("valueChange");

      const switchbtnComponent3 = AlarmDelayWrapper.findWhere(
        (node) => node.prop("testID") === "sildervalue2"
      );
      switchbtnComponent3.simulate("valueChange");

      
      const switchbtnComponent1 = AlarmDelayWrapper.findWhere(
        (node) => node.prop("testID") === "SetClickId"
      );
      switchbtnComponent1.simulate("press");

     await instance.setState({ Userdata: "" })
     await instance.setState({ 
        Token: "" })
      instance.setState({
         value1: "", 
         value2: "" 
        })

    },300000);

    then("I can press file menu", async () => {
      instance.setState({Token:""})
      instance.setState({value1:10,value2:5})
     
    });

    then("I can press saved menu", async () => {
     
     
    });

    then("I can press alerts menu", async () => {
     
    
    });

    then("I can press notification menu", async () => {
     
    });

    then("I can press setting menu", async () => {
      
    });
    then('I can leave the screen with out errors', () => {
      instance.componentWillUnmount()
     
      
  });
  then('Handle back button press',() => {
   

    let buttonComponent1 = AlarmDelayWrapper.findWhere((node) => node.prop('testID') === 'backBtnId');
    buttonComponent1.simulate('press');
    instance.goback()

})
  });


});
