import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import ConversationThreading from "../../src/ConversationThreading"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "ConversationThreading"
  }

const feature = loadFeature('./__tests__/features/ConversationThreading-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to ConversationThreading', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:ConversationThreading; 

        given('I am a User loading ConversationThreading', () => {
            exampleBlockA = shallow(<ConversationThreading {...screenProps}/>)
        });

        when('I navigate to the ConversationThreading', () => {
             instance = exampleBlockA.instance() as ConversationThreading
        });

        then('ConversationThreading will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
            expect(exampleBlockA).toMatchSnapshot()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
            expect(exampleBlockA).toMatchSnapshot()
        });
    });


});
