//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import {runEngine} from 'framework/src/RunEngine'
import {Message} from "framework/src/Message"

import MessageEnum, {getName} from "framework/src/Messages/MessageEnum"; 
import React from "react";
import ChatDashboard from "../../src/ChatDashboard"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ChatDashboard"
  }

const feature = loadFeature('./__tests__/features/ChatDashboard-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ChatDashboard', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ChatDashboard; 

        given('I am a User loading ChatDashboard', () => {
            exampleBlockA = shallow(<ChatDashboard {...screenProps}/>)
        });

        when('I navigate to the ChatDashboard', () => {
             instance = exampleBlockA.instance() as ChatDashboard
        });

        then('ChatDashboard will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
        });

        then('I can  click button with out errors' , () =>{
            const btnclick = exampleBlockA.findWhere((node) => node.prop("testID") === "btnPress")
            btnclick.simulate("press")
        })

        then('I can  click second button with out errors' , () =>{
            const btnclicktwo = exampleBlockA.findWhere((node) => node.prop("testID") === "btnPresstwo")
            btnclicktwo.simulate("press")
        })

        


        then('I can leave the screen with out errors', () => {
            instance.receive()
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
        });
    });


});

