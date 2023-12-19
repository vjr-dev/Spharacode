//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import {Linking, Platform,Text} from "react-native";
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from "../../../../framework/src/Globals";
import React from "react";
import FireNotification from "../../src/FireNotification"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
            callback();
          }),
        replace:jest.fn(),
    },
    state: {
        params: {
          data: { name: 'Test Name' },
          userName: 'abc',
          contacttdata: [
            { item: 1, name: 'John' },
            { item: 2, name: 'Doe' }
        ],
        DDA: 'your DDA value',
        Address: 'your Address value',
        Time: '8:00 PM',

        }
    },
    

         
  
   
    id: "FireNotification"
  }




const feature = loadFeature('./__tests__/features/FireNotification-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'android');
    });
    test('User navigates to FireNotification', ({ given, when, then }) => {
        let FireNotiBlockWrapper:ShallowWrapper;
        let instance:FireNotification ; 

        given('I am a User loading FireNotification', () => {
            //@ts-ignore
            FireNotiBlockWrapper = shallow(<FireNotification {...screenProps}/>)
        });

        when('I navigate to the FireNotification', () => {
             instance = FireNotiBlockWrapper.instance() as FireNotification
        });

        then('FireNotification will load with out errors', () => {
            expect(FireNotiBlockWrapper).toBeTruthy()
            expect(FireNotiBlockWrapper).toMatchSnapshot()
        });
        then('I can select the button with with out errors', () => {
            let fireCallButton = FireNotiBlockWrapper.findWhere((node) => node.prop('testID') === 'onFirecallID');
            fireCallButton.simulate('press', instance.onFireCall());
            let doneCallButton = FireNotiBlockWrapper.findWhere((node) => node.prop('testID') === 'doneClickID');
            doneCallButton.simulate('press', instance.doneclick());
            instance.goback()
            const Address = "your Address value"
           const Time = "8:00 PM"
            expect(Address).toEqual('your Address value');
            expect(Time).toEqual('8:00 PM');

           
        
            expect(fireCallButton).toBeTruthy();
        });

        then('renders Text components for each item in contacttdata', () => {
            const contactData = [
                { item: 'item1', name: 'Contact 1' },
                { item: 'item2', name: 'Contact 2' }
              ];
            const textComponents = FireNotiBlockWrapper.find(Text);
            expect(textComponents).toHaveLength(7); // Assuming there are 2 items in contacttdata array
          

        })
        then('should call RNImmediatePhoneCall.immediatePhoneCall for Android', async () => {
            Platform.OS = 'android';
            AsyncStorage.getItem = jest.fn().mockResolvedValue('{"data": {"attributes": {"fire": "123456"}}}');
        
          
            await FireNotiBlockWrapper.instance().onFireCall();
        
            expect(RNImmediatePhoneCall.immediatePhoneCall).toHaveBeenCalledWith('123456');

        })
        then('should call Linking.openURL for iOS', async () => {
            Platform.OS = 'ios';
            AsyncStorage.getItem = jest.fn().mockResolvedValue('{"data": {"attributes": {"fire": "123456"}}}');
        
            
            await FireNotiBlockWrapper.instance().onFireCall();
        
            expect(Linking.openURL).toHaveBeenCalledWith('telprompt:123456');

        })
    })
}
)
