//@ts-nocheck
import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import IcloudSharing2 from "../../src/IcloudSharing2"
import { Platform, Alert } from "react-native"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "IcloudSharing2"
  }

const feature = loadFeature('./__tests__/features/IcloudSharing2-scenario.feature');

defineFeature(feature, (test) => {

  function waitToExecute() {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    })
  }
    beforeEach(() => {
        jest.resetModules()
        jest.mock('react-native/Libraries/Utilities/Platform', () => {
            let platform = {
              OS: 'ios',
            }
          
            const select = jest.fn().mockImplementation((obj) => {
              const value = obj[platform.OS]
              return !value ? obj.default : value
            })
          
            platform.select = select
          
            return platform
          });
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
       
    });

    test('User navigates to IcloudSharing2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:IcloudSharing2
        given('I am a User loading IcloudSharing2', () => {
            exampleBlockA = shallow(<IcloudSharing2 {...screenProps}/>)
        });

        when('I navigate to the IcloudSharing2', () => {
          instance = exampleBlockA.instance() as IcloudSharing2
        });
        
        
        then('User can not use the iCloud serves if user have android device', () => {
          Platform.OS = 'android'
          const btnExample = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "btnExample"
          );
          const spyAlert = jest.spyOn(Alert, 'alert');
          btnExample.simulate('press')
          expect(spyAlert).toHaveBeenCalledWith("Error", "ICloud serveses only available on ios devices.");
          spyAlert.mockReset();
          spyAlert.mockRestore();
        });

        then('User can use the iCloud serves if user have ios device', async () => {
          Platform.OS = 'ios'
          const btnExample = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "btnExample"
          );
          const spyAlert = jest.spyOn(Alert, 'alert');
          btnExample.simulate('press')
          await waitToExecute();
          expect(spyAlert).toHaveBeenCalledWith("Success", "ICloud backup successfully completed.")
        });
    });


});
