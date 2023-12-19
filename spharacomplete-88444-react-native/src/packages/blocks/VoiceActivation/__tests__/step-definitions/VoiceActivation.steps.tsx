//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import VoiceActivation from "../../src/VoiceActivation";
import { Alert, Linking, Platform, View } from "react-native"

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    replace: jest.fn(),
    state: {
      params: {
        dt: "abc"
      }
    }
  },
  id: "OnlineBackup"
}

const feature = loadFeature('./__tests__/features/VoiceActivation-scenario.feature');

defineFeature(feature, (test) => {

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to VoiceActivation', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: VoiceActivation;

    given('I am a User loading VoiceActivation', () => {
      exampleBlockA = shallow(<VoiceActivation {...screenProps} />)
    });

    when('I navigate to the VoiceActivation', () => {
      instance = exampleBlockA.instance() as VoiceActivation
    });

    then('VoiceActivation will load with out errors', async () => {
      instance.setState({ isListening: true })
      instance.componentDidMount();
      await new Promise((resolve) => setImmediate(resolve))
      expect(exampleBlockA).toBeTruthy()
    });


    then('I can select the start voice button with with out errors', async () => {
      jest.useFakeTimers();
      instance.setState({Selectedname:"Select code"})
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'startSpeechBtn');
      Platform.OS = 'android'
      await instance._requestRecordAudioPermission();
      const mockRequestRecordAudioPermission = jest.fn().mockResolvedValue(true);
      instance._requestRecordAudioPermission = mockRequestRecordAudioPermission;

      const mockPorcupineManagerDelete = jest.fn();
      instance._porcupineManager = {
        start: mockPorcupineManagerDelete.mockResolvedValue("abc"),
      }

      const mockAlert = jest.spyOn(Alert, "alert");

      jest.spyOn(Linking, 'openSettings');
      buttonComponent.simulate('press')

      const mockRequestRecordAudioPermission1 = jest.fn().mockResolvedValue(false);
      instance._requestRecordAudioPermission = mockRequestRecordAudioPermission1;
      buttonComponent.simulate('press')

      await new Promise((resolve) => setImmediate(resolve))
      instance._porcupineManager = {
        stop: jest.fn().mockResolvedValue("abc"),
      }
      jest.advanceTimersByTime(4000);

      mockAlert.mock.calls[0][2][0].onPress();
      mockAlert.mock.calls[0][2][1].onPress();
      expect(mockAlert).toBeCalled();

      expect(buttonComponent).toBeTruthy()
    });

    then('I can select the goback button with with out errors', () => {
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnGoBack');
      buttonComponent.simulate('press')
      expect(buttonComponent).toBeTruthy()
    });

    then('I can select the activate button with with out errors', async () => {
      instance.setState({ Selectedname: "code white" })
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'activateBtn');
      buttonComponent.simulate('press')
      expect(buttonComponent).toBeTruthy()
    });

    then("Display the code list without error", () => {
      instance.setState({ buttonlist: false })
      const dummyItem = {
        item: {
          id: 2,
          name: "code white",
          sub_title: "for violent situation",
          Tested: false
        },
      };
      let codeList = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "codeList"
      );

      codeList.props().keyExtractor({ id: 1 });
      codeList.props().renderItem(dummyItem, 0);

      const item = codeList.renderProp("renderItem")({
        item: {
          attributes: {
            name: "ABC",
            phone_number: "+919999999999",
            contact_type: "emergency_contact",
          },
        },
      });
      expect(item).toBeTruthy();
      let renderItemWrapper = shallow(
        <View>
          {instance.renderItem({
            id: 2,
            name: "code white",
            sub_title: "for violent situation",
            Tested: false
          })}
        </View>
      );
      let itemBtn = renderItemWrapper.findWhere(
        (node) => node.prop("testID") === "btn_itemClick"
      );
      itemBtn.simulate("press");
      expect(itemBtn).toBeTruthy();

      let micBtn = renderItemWrapper.findWhere(
        (node) => node.prop("testID") === "btn_Mic"
      );
      micBtn.simulate("press");
      expect(micBtn).toBeTruthy();

      expect(codeList).toBeTruthy();
    });

    then('I can select the button with with out errors', () => {
      let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'cancleBtn');
      buttonComponent.simulate('press')
      expect(buttonComponent).toBeTruthy()
    });



    then('I can leave the screen with out errors', () => {
      const mockPorcupineManagerDelete = jest.fn();
      instance._porcupineManager = {
        delete: mockPorcupineManagerDelete,
      }
      instance.setState({ isListening: true })
      instance._porcupineManager = {
        stop: mockPorcupineManagerDelete.mockResolvedValue("abc"),
        delete: mockPorcupineManagerDelete,
      }
      instance.componentWillUnmount()
      expect(exampleBlockA).toBeTruthy()
    });
  });


});
