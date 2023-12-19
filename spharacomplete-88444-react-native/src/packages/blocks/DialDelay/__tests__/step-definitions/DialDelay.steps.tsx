//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import DialDelay from "../../src/DialDelay"
const navigation = require("react-navigation")


const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
            callback();
          }),
    },
    route: {
        params: {
          data: { name: 'Test Name' },
          userName: 'abc'
        }
    },
    id: "DialDelay"
  }

const feature = loadFeature('./__tests__/features/DialDelay-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });
    test('User navigates to DialDelay', ({ given, when, then }) => {
        let DialDelayBlockWrapper:ShallowWrapper;
        let instance:DialDelay ; 

        given('I am a User loading DialDelay', () => {
            //@ts-ignore
            DialDelayBlockWrapper = shallow(<DialDelay {...screenProps}/>)
            expect(DialDelayBlockWrapper).toBeTruthy()
            expect(DialDelayBlockWrapper).toMatchSnapshot()     
        });

        when('I navigate to the DialDelay', () => {
             instance = DialDelayBlockWrapper.instance() as DialDelay
      
        });

        then('DialDelay will load with out errors', () => {
            //@ts-ignore
            expect(DialDelayBlockWrapper).toBeTruthy()
          
        });

        then('Handle back button press',() => {
            let buttonComponent = DialDelayBlockWrapper.findWhere((node) => node.prop('testID') === 'bckbtnID');
            buttonComponent.simulate('press', instance.goback());
            //@ts-ignore
            expect(buttonComponent).toBeTruthy();
        })
        then('Handle the set button press', () => {
            instance.setState({value1: 300})
            let buttonComponent = DialDelayBlockWrapper.findWhere((node) => node.prop('testID') === 'btnSetID');
            buttonComponent.simulate('press');
            instance.setState({value1: 100})
            
            //@ts-ignore
            expect(buttonComponent).toBeTruthy();
            expect(DialDelayBlockWrapper).toMatchSnapshot()     
        })
    })
}
)
