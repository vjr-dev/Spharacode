//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import Feather from "react-native-vector-icons/Feather";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import { FlatList, Button, View ,Image, TouchableOpacity} from 'react-native';

import FirstResponderAppSetting from "../../src/FirstResponderAppSetting";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
        return cb();
      }),
  },
   id: "FirstResponderAppSetting",
};

const feature = loadFeature("./__tests__/features/FirstResponderAppSetting-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to FirstResponderAppSetting", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: FirstResponderAppSetting;

    given("I am a User loading FirstResponderAppSetting", () => {
      exampleBlockA = shallow(<FirstResponderAppSetting {...screenProps} />);
    });

    when("I navigate to the FirstResponderAppSetting", () => {
      instance = exampleBlockA.instance() as FirstResponderAppSetting;
    });

    then("FirstResponderAppSetting will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });
    
    then("I can click goBack button with out error", () => {
        const gobackBtnComponent = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "gobackBtn"
        );
        gobackBtnComponent.simulate("press");
      });
  
    then("display Global flatlist data", () => {
        let globalData = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "globalData"
        );
        expect(globalData).toBeTruthy();
        globalData.props().keyExtractor("3");
        const flat = shallow(
          globalData.props().renderItem({
            item: { icon: "abc" },
          })
        );
     

        const clickScreenComponent = flat.findWhere(
          (node) => node.prop("testID") === "clickScreen"
        );
        clickScreenComponent.simulate("press");
        expect(screenProps.navigation.navigate).toBeCalledWith("FirstResponderSetWorkingHours")

        // const data = [
        //   {
        //     id: 1,
        //     icon: (
        //       <Feather
        //         name="lock"
        //         color={"#b0b0b0"}
        //         size={scaledSize(28)}
        //         style={Styles.sectionMenuLogo1}
        //       />
        //     ),
        //     header: "Security",
        //     Screen: "SecuritySetting",
        //     content: "Control your account security with 2-step verification..",
        //     img: (
        //       <Image
        //         source={IMAGE.right_arrow}
        //         style={{ height: RFValue(28), width: RFValue(28) }}
        //       />
        //     ),
        //   },
        //   {
        //     id: 2,
        //     icon: (
        //       <Feather
        //         name="clock"
        //         color={"#b0b0b0"}
        //         size={scaledSize(28)}
        //         style={Styles.sectionMenuLogo1}
        //       />
        //     ),
        //     header: "Set Working Hours",
        //     Screen: "FirstResponderSetWorkingHours",
        //     content: "Let other know when you are available",
        //     // img: <Icon name="chevron-right" color={COLORS.skipGray} />
        //     img: (
        //       <Image
        //         source={IMAGE.right_arrow}
        //         style={{ height: RFValue(28), width: RFValue(28) }}
        //       />
        //     ),
        //   },
        // ];
    
      // const renderItem = ({ item }) => (
      //   <View key={item.id}>
      //     <TouchableOpacity title={item.text}>
      //       <View style={Styles.flatlist_main}>

      //         <View>
      //           {/* icon */}
      //           {item.icon}
      //         </View>
      //         <View style={Styles.txt_view}>
      //           <Text style={Styles.header_txt1}>{item.header}</Text>
      //           <Text style={Styles.content_txt}>{item.content}</Text>
      //         </View>
      //         <View style={{ alignSelf: 'center' }}>
      //           {/* icon */}
      //           {item.img}
      //         </View>
      //       </View>
      //     </TouchableOpacity>
      //   </View>
      // );
    
      //  const keyExtractor = (item) => item.id;
    
      //  const wrapper = shallow(<FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor} />);
    
      //  expect(wrapper).toContainMatchingElement(<Button />);
    
      });
      then("I can click on button to navigate to SecuritySetting screen", () => {
        let globalData = exampleBlockA.findWhere(
          (node) => node.prop("testID") === "globalData"
        );
        globalData.props().keyExtractor("1");
        const flat = shallow(
          globalData.props().renderItem({
            item: { icon: "xyz" },
            Screen: "SecuritySetting"
          })
        );
        const clickScreenComponent = flat.findWhere(
          (node) => node.prop("testID") === "clickScreen"
        );
        clickScreenComponent.simulate("press",instance.navigateTo("SecuritySetting"));
        expect(screenProps.navigation.navigate).toHaveBeenCalledWith("SecuritySetting")
      });

  });
});
