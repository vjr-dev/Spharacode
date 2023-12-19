//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import Meetings from "../../src/Meetings"
const navigation = require("react-navigation")


const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
            callback();
          }),
    state: {
        params: {
          data: { name: 'Test Name' },
          userName: 'abc'
        }
      }
    },
    id: "Meetings"
  }

const feature = loadFeature('./__tests__/features/MeetingInSocial-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });
    test('User navigates to MeetingInSocial', ({ given, when, then }) => {
        let MeetingInSocialBlockWrapper:ShallowWrapper;
        let instance:MeetingInSocial ; 

        given('I am a User loading MeetingInSocial', () => {
            //@ts-ignore
            MeetingInSocialBlockWrapper = shallow(<Meetings {...screenProps}/>)
            expect(MeetingInSocialBlockWrapper).toBeTruthy()
            expect(MeetingInSocialBlockWrapper).toMatchSnapshot()     
        });

       
        then('MeetingInSocial will load with out errors', () => {
            //@ts-ignore
            expect(MeetingInSocialBlockWrapper).toBeTruthy()
          
        });

  
    })
}
)
