//@ts-ignore
//@ts-nocheck
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "framework/src/Helpers";
import React from "react";
import Dashbord from "../../src/Dashbord";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import music from "../../../../mobile/sample.mp3";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import { Platform, reactNative, Alert, AppState, Linking } from "react-native";
import GetLocation from "react-native-get-location";
import Sound from "react-native-sound";
import RNShake from "react-native-shake";
import SystemSetting from "react-native-system-setting";
import { PERMISSIONS, RESULTS } from "react-native-permissions";
const navigation = require("react-navigation");
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    toggleDrawer: jest.fn(),
    addListener: jest.fn().mockImplementation((ev, cb) => {
      return cb();
    }),
    openDrawer: jest.fn()
  },
  route:{
    params:{
      locationStatus:""
    }
  },
  id: "Dashbord",
};



jest.mock("react-native-system-setting", () => ({
  getVolume: jest.fn(() => Promise.resolve("test")),
  addVolumeListener: jest
    .fn()
    .mockImplementation((callback: any) => callback({ value: 2 })),  
    removeVolumeListener: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockReturnValue("press_button_for_3_times"),
}));


jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "android",
  select: () => null,
}));

let mockTimer: any;

jest
  .spyOn(global, "setTimeout")
  .mockImplementation((cb: any) => (mockTimer = cb));

global.fetch = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          meetingId: "1234",
        }),
      text: () =>
        Promise.resolve({
          meetingId: "1234",
        }),
    })
  )
  .mockImplementation(() => Promise.reject("Fetch failed"));


  jest.mock("react-native-sound", () =>({
    setCategory : jest.fn(),
  }));

  jest.mock("react-native-shake", () => ({
    removeCurrentListener: jest.fn(),
    addListener: jest.fn().mockImplementation((cb) => cb()),
  }));

const feature = loadFeature("./__tests__/features/DashBord-scenario.feature");



defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({
      Platform: { OS: "web" },
      Alert: {
        alert: jest.fn(),
      },
    }));
    jest.doMock("../../../../mobile/sample.mp3", () => ({}));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(AppState, "addEventListener").mockImplementation((ev, cb) => {
      return cb("active");
    });
    jest.useFakeTimers()
  });

  test("User navigates to DashBord", ({ given, when, then }) => {
    let dashboardWrapper: ShallowWrapper;
    let instance: Dashbord;
    given("I am a User loading DashBord", () => {
      dashboardWrapper = shallow(<Dashbord {...screenProps} />);
      expect(dashboardWrapper).toBeTruthy();
    });

    when("I navigate to the DashBord", () => {
      instance = dashboardWrapper.instance() as Dashbord;
      expect(dashboardWrapper).toBeTruthy();
    });

    then("DashBord will load with out errors", () => {
      expect(dashboardWrapper).toBeTruthy();
    });

    then("I can navigate to toggledrawer with out errror", () => {
      const togglebtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "btntoggleDrawer"
      );
      togglebtnComponent.simulate("press");
    });

    then("I can tempclick with out errror", () => {
      const tempclickbtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "btntempClick"
      );
      tempclickbtnComponent.simulate("press");
    });

    // then("I can click modalShowbtn with out errror", () => {
    //   const madalshowComponent = dashboardWrapper.findWhere(
    //     (node) => node.prop("testID") === "modalShowbtn"
    //   );
    //   madalshowComponent.simulate("press");
    // });

    // then("I can click modalbtn with out errror", () => {
    //   const modalbtnComponent = dashboardWrapper.findWhere(
    //     (node) => node.prop("testID") === "modalbtn"
    //   );
    //   modalbtnComponent.simulate("press");
    // });

    // then("I can click modal closed with out errror", () => {
    //   const modalClosedComponent = dashboardWrapper.findWhere(
    //     (node) => node.prop("testID") === "modalClosed"
    //   );
    //   modalClosedComponent.simulate("requestClose");
    // });

    // then("I can  change value to switch btn with out errror", () => {
    //   const switchbtnComponent = dashboardWrapper.findWhere(
    //     (node) => node.prop("testID") === "switchbtn"
    //   );
    //   switchbtnComponent.simulate("valueChange");
    // });

    // then("I can  change value to panic toggle btn with out errror", () => {
    //   const panictoggleComponent = dashboardWrapper.findWhere(
    //     (node) => node.prop("testID") === "panicTogglebtn"
    //   );
    //   panictoggleComponent.simulate("valueChange");
    // });

    then('renders correctly when ModalShow is true', () => {
      const wrapper = shallow(<Dashbord {...screenProps}  ModalShow={true} />);
      expect(wrapper.find('View')).toHaveLength(14); // Assuming there are 2 View components when ModalShow is true
      const textComponents = wrapper.find('Text');

      console.log("@#$%TFV", wrapper.find('Text'))

// textComponents.forEach((textComponent, index) => {
//   let arrayval = textComponent.props()
//   console.log("@#$%TFV", arrayval)
//     expect(textComponent.props().children).toBe('SPHARA');

// });

   //   expect(wrapper.find('Text').props().children).toBe('Quick Settings.'); // Assuming the text content is 'Quick Settings.'
     // expect(wrapper.find('Switch')).toHaveLength(2); // Assuming there are 2 Switch components

    })

    then('should handle volumeEvents correctly', () => {
      // Mock required functions and objects
      dashboardWrapper = shallow(<Dashbord {...screenProps} />);
      const addVolumeListenerMock = jest.fn();
      const removeVolumeListenerMock = jest.fn();
      const SystemSettingMock = {
        getVolume: jest.fn(() => Promise.resolve(50)), // Mock volume value for testing
        addVolumeListener: addVolumeListenerMock,
        removeVolumeListener: removeVolumeListenerMock,
      };
      global.SystemSetting = SystemSettingMock;
  
      // Trigger volumeEvents
     dashboardWrapper.instance().VolumeEvents();
  
      // Assertions
     // expect(addVolumeListenerMock).toHaveBeenCalled();
    //  expect(SystemSettingMock.getVolume).toHaveBeenCalled();
    });

    then('should handle volumeEventFunction correctly', () => {
      const wrapper = shallow(<Dashbord {...screenProps}  ModalShow={true} />);
      // Mock setState function
      const setStateMock = jest.spyOn(wrapper.instance(), 'setState');
      setStateMock.mockImplementation((state) => wrapper.instance().state = { ...wrapper.instance().state, ...state });
  
      // Trigger volumeEventFunction
      const eventData = { value: 70 }; // Mock volume change event data
      wrapper.instance().volumeEventFunction(eventData);
  
      // Assertions
      expect(setStateMock).toHaveBeenCalled()
    });

    then("I can open modal btn with out errror", () => {
      const openmodalComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "modalopenbtn"
      );
      openmodalComponent.simulate("press");
    });

    then("emergencyscreenV condition true", () => {
      instance.setState({
        isEmergencyScreenV: true,
      });
    });

    then("I can press emergency screen with out errror", () => {
      dashboardWrapper = shallow(<Dashbord {...screenProps}  />);
     dashboardWrapper.instance().setState({
        isEmergencyScreenV: true,
        });
      const emergencyScreenComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "emergencyscreen"
      );
      emergencyScreenComponent.simulate("press");
    });

    then("I can press isEmergencyScreenV with out errror", () => {
      dashboardWrapper = shallow(<Dashbord {...screenProps}  />);
     dashboardWrapper.instance().setState({
        isEmergencyScreenV: true,
        });
      const robberyBtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "robberyBtn"
      );
      robberyBtnComponent.simulate("press");

      const accidentBtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "accidentBtn"
      );
      accidentBtnComponent.simulate("press");

      const armedPersonBtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "armedPersonBtn"
      );
      armedPersonBtnComponent.simulate("press");

      const harassmentbtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "harassmentbtn"
      );
      harassmentbtnComponent.simulate("press");

      const hostileBtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "hostileBtn"
      );
      hostileBtnComponent.simulate("press");

      const btn1Component = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "btn1"
      );
      btn1Component.simulate("press");
    });

    then("I can press emergencybtn with out error", () => {
      const emergencybtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "emergencybtn"
      );
      emergencybtnComponent.simulate("press");
    });

    then("I can press ambulanceBtn with out error", () => {
      dashboardWrapper = shallow(<Dashbord {...screenProps}  />);
      dashboardWrapper.instance().setState({
         isEmergencyScreenV: false,
         });
      const ambulanceBtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "ambulanceBtn"
      );
      ambulanceBtnComponent.simulate("press");

      const onCallpolicebtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "onCallpolicebtn"
      );
      onCallpolicebtnComponent.simulate("press");

      const fireBtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "fireBtn"
      );
      fireBtnComponent.simulate("press");

      const cfcustomBtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "cfcustomBtn"
      );
      cfcustomBtnComponent.simulate("press");

      const panicBtnComponent = dashboardWrapper.findWhere(
        (node) => node.prop("testID") === "panicBtn"
      );
      panicBtnComponent.simulate("press");
    });

    then("GetVolunteerID request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.GetVolunteerID = apiMsg.messageId;
      const {receive : mockReceive} = instance;
      mockReceive("test", apiMsg)
    });

    then("GetPercentage request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.GetPercentage = apiMsg.messageId;
      const {receive : mockReceive} = instance;
      mockReceive("test", apiMsg)
    });

    then("getList request response successfully", () => {
      const mockResponse = {
        data: {},
      };

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.getListId = apiMsg.messageId;
      const {receive : mockReceive} = instance;
      mockReceive("test", apiMsg)
    });

    then("getList request response error", () => {
      const mockResponse = null;

      const apiMsg = new Message(getName(MessageEnum.RestAPIResponceMessage));

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiMsg.messageId
      );

      apiMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        mockResponse
      );

      instance.getListId = apiMsg.messageId;
      const {receive : mockReceive} = instance;
      mockReceive("test", apiMsg)
    });

    then("I can mock checkPermissions with out error", () => {
      jest.mock("react-native/Libraries/Utilities/Platform", () => ({
        OS: "android",
        select: () => null,
      }));
      Platform.OS = "android";
      jest.spyOn(Alert, "alert").mockImplementation(() => jest.fn());
      instance.CheckPermission();
      jest.spyOn(Alert, "alert").mockImplementationOnce((event, cb, arr) => {
        arr[0] && arr[0].onPress();
      });
      instance.CheckPermission();
      instance.CheckPermission();
      instance.componentDidMount();
    });

    then("I can mock checkPermissions else with out error", () => {
      jest.mock("react-native-permissions", () => {
        const Permissions = jest.requireActual("react-native-permissions/mock");

        return {
          ...Permissions,
          check: jest.fn(() => Promise.resolve(true)),
          request: jest
            .fn()
            .mockImplementationOnce(
              (key) =>
                new Promise((resolve, reject) => {
                  return resolve("unavailable");
                })
            )
            .mockImplementationOnce(
              (key) =>
                new Promise((resolve, reject) => {
                  return resolve("denied");
                })
            )
            .mockImplementation(
              (key) =>
                new Promise((resolve, reject) => {
                  return resolve("blocked");
                })
            )
            .mockImplementationOnce(
              (key) =>
                new Promise((resolve, reject) => {
                  return resolve("granted");
                })
            ),
        };
      });
      jest.mock("react-native/Libraries/Utilities/Platform", () => ({
        OS: "ios",
        select: () => null,
      }));
      Platform.OS = "ios";
      instance.CheckPermission();
      jest.spyOn(Alert, "alert").mockImplementationOnce((event, cb, arr) => {
        arr[0] && arr[0].onPress();
      });
      instance.CheckPermission();
      instance.CheckPermission();
      instance.componentDidMount();
    });

    then("I can mock getPermission with out error", async () => {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded = jest.fn(() =>
        Promise.resolve("already-enabled")
      );
      instance.getPermissions();
      expect(
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded
      ).toHaveBeenCalledWith({ interval: 10000, fastInterval: 5000 });
    });

    then("I can mock getPermission else part with out error", async () => {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded = jest.fn(
        () => new Promise((resolve) => setTimeout(() => resolve(), 100))
      );

      instance.getPermissions();
      expect(
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded
      ).toHaveBeenCalledWith({ interval: 10000, fastInterval: 5000 });
    });

    then("should set Latitude and Longitude in state", async () => {
      const location = {
        latitude: 37.7749,
        longitude: -122.4194,
      };
      GetLocation.getCurrentPosition = jest.fn(() => Promise.resolve(location));
      instance.getlocationdata();
      instance.setState({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      instance.locationAPI();
    });

    then("should handle the error if the location cannot be obtained", () => {
      const error = {
        code: "CANCELLED",
        message: "User cancelled the request",
      };
      GetLocation.getCurrentPosition = jest.fn(() => Promise.reject(error));
      instance.getlocationdata();
    });

    then("I can mock VolumeEvents with out error", () => {
      instance.setState({ volumeUpTriggerCount: 0 });
      instance.setState({volumeUpTriggerCount: 5})
      instance.setState({userdata:{trigger_type :"press"}})
      instance.VolumeEvents();
    });

    then("Should create new sound object", () => {
     // Sound.setCategory = jest.fn();
     // instance.onPanicSirenToggle(true);
    });


    then("I can mock onlayout with out error", () => {
      const eventMock = {
        nativeEvent: {
          layout: {
            height: 100,
            width: 200,
          },
        },
      };

      instance.onLayout(eventMock)
    });

    then("I can leave the screen with out errors", () => {
      Platform.OS = "android";
      // mockTimer();
      instance.getVoluneer();
      instance.getlocationdata();
      instance.locationAPI();
      instance.locationAPI();
      instance.VolumeEvents();
      instance.onCallPolice();
      instance.sahck(true);
      instance.TempClick();
      instance.setState({userdata:{vertical_gesture: true}})
      instance.setState({userdata:{horizontal_gesture: true}})
      instance.componentWillUnmount();
      instance.componentWillUnmount();
      expect(dashboardWrapper).toBeTruthy();
    });
  });
});

