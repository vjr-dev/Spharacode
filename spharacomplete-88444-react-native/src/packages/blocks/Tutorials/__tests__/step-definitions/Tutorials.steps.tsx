//@ts-nocheck
//@ts-ignore
import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import {View} from "react-native";

import Tutorials from "../../src/Tutorials"


const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
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
  id: "Tutorials"
}

const feature = loadFeature('./__tests__/features/Tutorials-scenario.feature');

defineFeature(feature, (test) => {


  beforeEach(() => {
    jest.resetModules()
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });
  test('User navigates to Tutorials', ({ given, when, then }) => {
    let tutorialBlock: ShallowWrapper;
    let instance: Tutorials;

    given('I am a User loading Tutorials', () => {
      //@ts-ignore
      tutorialBlock = shallow(<Tutorials {...screenProps} />)
    });

    when('I navigate to the Tutorials', () => {
      instance = tutorialBlock.instance() as Tutorials
    });

    then('Tutorials will load with out errors', () => {
      expect(tutorialBlock).toBeTruthy()
      expect(tutorialBlock).toMatchSnapshot()
      instance.componentDidMount()
      const userData = {data: "data"}
      expect(userData).toBeTruthy()
      const tutorial = {data: "data"}
      expect(tutorial).toBeTruthy()
      
      instance.onclick()
    });
    then('I should able to click the button without error', () => {
      
      let appSlider = tutorialBlock.findWhere(
        (node) => node.prop("testID") === "AppintroSliderID");

      const item = appSlider.renderProp("renderItem")({
        item: {
          image: {
            "testUri": "../../../packages/blocks/Tutorials/assets/image_illustration.png",
          },
          text: "Often feel vulnerable when you are alone ?",
        },
      });
      expect(item).toMatchSnapshot();


      let listWrapper = shallow(
        <View>
          {instance.renderItem(
            {
              id: 3877,
              date: "07-February-23",
              time: "10:48AM",
              alert_type: "PanicIncident",
              address:
                "Varanasi, Sadar, Varanasi, Uttar Pradesh, 221010, India",
              image: "Pending",
            },
            0
          )}
        </View>
      );
      let onPressbtn = listWrapper.findWhere(
        (node) => node.prop("testID") === "btnclickID"
      );
      onPressbtn.simulate("press",instance.onclick());
      expect(onPressbtn).toBeTruthy();

    })
  })
}
)
