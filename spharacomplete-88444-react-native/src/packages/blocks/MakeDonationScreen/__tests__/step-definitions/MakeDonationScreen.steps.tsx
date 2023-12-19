//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from 'framework/src/Helpers'
import { Message } from "framework/src/Message"
import { runEngine } from 'framework/src/RunEngine'
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum"
import React from "react";
import {Alert} from 'react-native'
import MakeDonation from "../../src/MakeDonation"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
            callback();
          }),
        pop:jest.fn()
    },
    state: {
      params: {
        data: { name: 'Test Name' },
        userName: 'abc'
      }
    },
    id: "MakeDonation"
  }


const feature = loadFeature('./__tests__/features/MakeDonationScreen-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'android' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'android');
    });
    test('User navigates to MakeDonationScreen', ({ given, when, then }) => {
        let MakeDonationBlockWrapper:ShallowWrapper;
        let instance:MakeDonationScreen ; 

        given('I am a User loading MakeDonationScreen', () => {
            //@ts-ignore
            MakeDonationBlockWrapper = shallow(<MakeDonation {...screenProps}/>)
        });

        when('I navigate to the MakeDonationScreen', () => {
             instance = MakeDonationBlockWrapper.instance() as MakeDonationScreen

        });

        then('MakeDonationScreen will load with out errors', () => {

            jest.spyOn(Alert, "alert").mockImplementation(() => jest.fn());
    
            instance.componentDidMount()
            instance.setState({token: "dfsffsfsdfs"})
            instance.GetDonationlist()
            instance.flatclick(2)
            instance.donatclick()
            instance.onclick()

            expect(MakeDonationBlockWrapper).toBeTruthy()
            expect(MakeDonationBlockWrapper).toMatchSnapshot()
        });
        then('fetching donation list without error', () => {
            instance.GetDonationlist()
            const DonationListAPI: Message = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              DonationListAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                DonationListAPI.messageId
              );
              DonationListAPI.addData(
                getName(MessageEnum.RestAPIResponceErrorMessage),
                JSON.parse(JSON.stringify({}))
              );
              instance.getListId = DonationListAPI.messageId;
              runEngine.sendMessage("Unit Test", DonationListAPI);
        
        });

        then('I can select the button without errors', () => {
            let buttonComponent = MakeDonationBlockWrapper.findWhere((node) => node.prop('testID') === 'btnGoBack');
            
            buttonComponent.simulate('press',instance.goback())
            instance.goback()
            const doneClick = MakeDonationBlockWrapper.findWhere((node) => node.prop("testID") === "modaltoggleID")
             doneClick.simulate("press")
        });
        then('I can press static amount button',() => {{
            const staticClick1 = MakeDonationBlockWrapper.findWhere((node) => node.prop("testID") === "staticamount1ID")
            staticClick1.simulate("press",instance.staticamount1())

            const staticClick2 = MakeDonationBlockWrapper.findWhere((node) => node.prop("testID") === "staticamount2ID")
            staticClick2.simulate("press",instance.staticamount2())

            const staticClick3 = MakeDonationBlockWrapper.findWhere((node) => node.prop("testID") === "staticamount3ID")
            staticClick3.simulate("press",instance.staticamount3())

            const staticClick4 = MakeDonationBlockWrapper.findWhere((node) => node.prop("testID") === "staticamount4ID")
            staticClick4.simulate("press",instance.staticamount4())
          
        }});

        then('I can enter text in textbox',() => {{
            let textInputComponent1 = MakeDonationBlockWrapper.findWhere((node) => node.prop('testID') === 'customAmountID');
            textInputComponent1.simulate('changeText', instance.coustomamount("dsds"));  
               
        }});

        then('I can press donate now button',() => {{
            const doneClick = MakeDonationBlockWrapper.findWhere((node) => node.prop("testID") === "doneclickID")
            doneClick.simulate("press",instance.donatclick())
          
        }});
        
        
    })
}
)
