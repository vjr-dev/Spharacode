//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from 'framework/src/Helpers'
import React from "react";
import RegistrationSuccessScreen from "../../src/RegistrationSuccessScreen"
import { BackHandler } from "react-native";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        replace: jest.fn(),
        goBack: jest.fn(),
        replace: jest.fn(),
        addListener: jest.fn().mockImplementation((event: any, callback: any) => {
            callback();
        }),
    },
    id: "RegistrationSuccessScreen"
}

const feature = loadFeature('./__tests__/features/RegistrationSuccessScreen-scenario.feature');
jest.mock("react-native/Libraries/Utilities/BackHandler", () => {
    return jest.requireActual(
      "react-native/Libraries/Utilities/__mocks__/BackHandler.js"
    );
  });
defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules()
        jest.doMock("react-native", () => ({
            Platform: { OS: "web" },
            BackHandler: {
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
            },
          }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });
    test('User navigates to Registration Screen', ({ given, when, then }) => {
        let registrationSuccessWrapper: ShallowWrapper;
        let instance: RegistrationSuccessScreen;

        given('I am a User loading Registration Screen', () => {
            registrationSuccessWrapper = shallow(<RegistrationSuccessScreen {...screenProps} />)
        });

        when('I navigate to the Registration Screen', () => {
            instance = registrationSuccessWrapper.instance() as RegistrationSuccessScreen
        });
        then('I can navigate to permission screen',() => {
            let onCompleteProfileButton = registrationSuccessWrapper.findWhere((node) => node.prop('testID') === 'onCompleteProfileButton');
            onCompleteProfileButton.simulate('press');
            expect(screenProps.navigation.replace).toBeCalledWith("PermissionScreen");
        })
        then("I can unmount screen without error", () => {
            BackHandler.mockPressBack();
            registrationSuccessWrapper.unmount()
        });
    })
}
)
