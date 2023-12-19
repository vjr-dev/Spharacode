import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import CfGoogleDriveIntegration2 from "../../src/CfGoogleDriveIntegration2"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "CfGoogleDriveIntegration2"
  }

const feature = loadFeature('./__tests__/features/CfGoogleDriveIntegration2-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to CfGoogleDriveIntegration2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:CfGoogleDriveIntegration2; 

        given('I am a User loading CfGoogleDriveIntegration2', () => {
            exampleBlockA = shallow(<CfGoogleDriveIntegration2 {...screenProps}/>)
        });

        when('I navigate to the CfGoogleDriveIntegration2', () => {
             instance = exampleBlockA.instance() as CfGoogleDriveIntegration2
        });

        then('CfGoogleDriveIntegration2 will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy()
            expect(exampleBlockA).toMatchSnapshot()
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            expect(exampleBlockA).toMatchSnapshot();
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press')
            expect(exampleBlockA).toMatchSnapshot();
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com")
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy()
            expect(exampleBlockA).toMatchSnapshot()
        });
    });


});
