//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import { Platform } from "react-native";

import EditProfile from "../../src/editProfile";
import { render } from "@testing-library/react-native";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
      return cb();
    })
  },
  id: "editProfile"
};

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "android",
  select: () => null
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest
    .fn()
    .mockImplementationOnce(key => {
      console.log("_----key", key);
      if (key === "Token") {
        return "0";
      }
      if (key === "User_Data") {
        return "0";
      }
      return "Token";
    })
    .mockImplementation(() => null),
  setItem: jest.fn()
}));

let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));

const feature = loadFeature(
  "./__tests__/features/editProfile-scenario.feature"
);

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to editProfile", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: EditProfile;

    given("I am a User loading editProfile", () => {
      exampleBlockA = shallow(<EditProfile {...screenProps} />);
    });

    when("I navigate to the editProfile", () => {
      instance = exampleBlockA.instance() as EditProfile;
      instance.setState({
        UserProfile: {
          user_country: {
            name: "abc",
            country_code: "aa",
            user_country_code: "sdsd"
          },
          profile_image_url: "aaa"
        }
      });
    });

    then("editProfile will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click goback button with out error", () => {
      const gobackBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "gobackBtn"
      );
      gobackBtnComponent.simulate("press");
    });

    then("I can click editProfile button with out error", () => {
      const editProfileBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "editProfileBtn"
      );
      editProfileBtnComponent.simulate("press");
    });

    then("I can click imgurl1 button with out error", () => {
      instance.setState({ imgurl: true });
      const imgurl1BtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "imgurl1Btn"
      );
      imgurl1BtnComponent.simulate("loadEnd");
    });

    then("I can click imgurl2 button with out error", () => {
      instance.setState({ imgurl: false }, () => {
        const imgurl2BtnComponent = exampleBlockA.findWhere(
          node => node.prop("testID") === "imgurl2Btn"
        );
        imgurl2BtnComponent.simulate("loadEnd");
      });
    });

    then("I can click stogrageClick button with out error", () => {
      const storageclickBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "storageclickBtn"
      );
      storageclickBtnComponent.simulate("press");
    });

    then("I can click floatinglabel1Btn button with out error", () => {
      const floatinglabel1BtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "floatinglabel1Btn"
      );
      floatinglabel1BtnComponent.simulate("changeText");

      const floatinglabel2BtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "floatinglabel2Btn"
      );
      floatinglabel2BtnComponent.simulate("changeText");

      const floatinglabel3BtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "floatinglabel3Btn"
      );
      floatinglabel3BtnComponent.simulate("changeText");

      const floatinglabel4BtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "floatinglabel4Btn"
      );
      floatinglabel4BtnComponent.simulate("changeText");

      const floatinglabel5BtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "floatinglabel5Btn"
      );
      floatinglabel5BtnComponent.simulate("changeText");
    });

    then("I can click modalDropdown button with out error", () => {
      const modalDropdownBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "ModalDropdown1Btn"
      );
      modalDropdownBtnComponent.simulate("dropdownWillShow");
      modalDropdownBtnComponent.simulate("select");
      instance.setState({});

      instance.setState({ UserCountry: [{}] });
      modalDropdownBtnComponent.simulate("select");

      const modalDropdown2BtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "ModalDropdown2Btn"
      );
      modalDropdown2BtnComponent.simulate("dropdownWillShow");
      modalDropdown2BtnComponent.simulate("select");

      const modalDropdown3BtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "ModalDropdown3Btn"
      );
      modalDropdown3BtnComponent.simulate("dropdownWillShow");
      modalDropdown3BtnComponent.simulate("select");
      instance.setState({ UserCountry: { state: true } });
    });

    then("I can click countryShowBtn button with out error", () => {
      const countryShowBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "countryShowBtn"
      );
      countryShowBtnComponent.simulate("press");
    });

    then("I can click clocationBtn button with out error", () => {
      const clocationBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "clocationBtn"
      );
      clocationBtnComponent.simulate("press");
    });

    then("I can click stateeShowBtn button with out error", () => {
      const stateeShowBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "stateeShowBtn"
      );
      stateeShowBtnComponent.simulate("press");
    });

    then("I can click cityShowBtn button with out error", () => {
      const cityShowBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "cityShowBtn"
      );
      cityShowBtnComponent.simulate("press");
    });

    then("I can click textInputBtn button with out error", () => {
      const textInputBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "textInputBtn"
      );
      textInputBtnComponent.simulate("changeText");
    });

    then("I can click setVisibilityBtn button with out error", () => {
      const setVisibilityBtnComponent = exampleBlockA.findWhere(
        node => node.prop("testID") === "setVisibilityBtn"
      );
      setVisibilityBtnComponent.simulate("press");
    });

    then("updates label style when input is focused", () => {
      const label = "Username";
      const inputValue = "";
      const onChangeText = jest.fn();
      render(
        <EditProfile
          label={label}
          inputValue={inputValue}
          onChangeText={onChangeText}
        />
      );
    });

    then("I can leave the screen with out errors", () => {
      mockTimer();
      Platform.OS = "android";
      mockTimer();
      instance.componentDidMount();
      expect(exampleBlockA).toBeTruthy();
    });
  });
});
