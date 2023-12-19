//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import { runEngine } from 'framework/src/RunEngine'
import { Message } from "framework/src/Message"

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import AlertMessageSetting from "../../src/AlertMessageSetting"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn()
    },
    id: "AlertMessageSetting"
}

const feature = loadFeature('./__tests__/features/AlertMessageSetting-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AlertMessageSetting', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: AlertMessageSetting;

        given('I am a User loading AlertMessageSetting', () => {
            exampleBlockA = shallow(<AlertMessageSetting {...screenProps} />)
        });

        when('I navigate to the AlertMessageSetting', () => {
            instance = exampleBlockA.instance() as AlertMessageSetting
        });

        then('AlertMessageSetting will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
        });

        then('Go back to the previous screen with out errors', () => {
            const btnComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "btnGoback")
            console.log("----test id", btnComponent);

            btnComponent.simulate("press")
        });

        then('I can edit button with out errors' , () =>{
            const btnEdit = exampleBlockA.findWhere((node) => node.prop("testID") === "btnEditClick")
            btnEdit.simulate("press")
        })
        
        then('I can enter text with out errors', () =>{
            const textInputComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "textInput")
            textInputComponent.simulate("changeText", "test1")
        })

        then('I can click checkboxone with out errors', () =>{
            const checkboxOneComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "checkBoxOne")
            checkboxOneComponent.simulate("click")
        })

        then('I can click checkboxtwo with out errors', () =>{
            const checkboxTwoComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "checkBoxTwo")
            checkboxTwoComponent.simulate("click")
        })

        then('I can click checkboxthree with out errors', () =>{
            const checkboxThreeComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "checkBoxThree")
            checkboxThreeComponent.simulate("click")
        })

        then('I can click checkboxfour with out errors', () =>{
            const checkboxFourComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "checkBoxFour")
            checkboxFourComponent.simulate("click")
        })

        then('I can click checkboxfive with out errors', () =>{
            const checkboxFiveComponent = exampleBlockA.findWhere((node) => node.prop("testID") === "checkBoxFive")
            checkboxFiveComponent.simulate("click")
        })

        then('I can send click button with out errors' , () =>{
            const btnsendClick = exampleBlockA.findWhere((node) => node.prop("testID") === "sendclickBtn")
            btnsendClick.simulate("press")
        })

        then('get response successfully', () =>{
            const mockResponse = {
                data: {},
              }
        
          const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))
        
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            apiMsg.messageId
          )
        
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponse
          )
        
          instance.GetapiCallId = apiMsg.messageId
          runEngine.sendMessage("Unit Test", apiMsg)
        })

        then('get response error', () =>{
            const mockResponse = {data:null}
        
          const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))
        
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            apiMsg.messageId
          )
        
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponse
          )
        
          instance.GetapiCallId = apiMsg.messageId
          runEngine.sendMessage("Unit Test", apiMsg)
        })



        then('request response successfully', () =>{
            const mockResponse = {
                data: {},
              }
        
          const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))
        
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            apiMsg.messageId
          )
        
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponse
          )
        
          instance.SetapiCallId = apiMsg.messageId
          runEngine.sendMessage("Unit Test", apiMsg)
        })

        then('request response error', () =>{
            const mockResponse = {data : null}
        
          const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage))
        
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            apiMsg.messageId
          )
        
          apiMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            mockResponse
          )
        
          instance.SetapiCallId = apiMsg.messageId
          runEngine.sendMessage("Unit Test", apiMsg)
        })
       
        then('I can navigate to goSignUp screen with out errors', () => {
            instance.goSignupScreen()
        })


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()

        });
    });


});

