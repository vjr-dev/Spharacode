// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';

configure({ adapter: new Adapter() });


// jest.mock("react-native-immediate-phone-call", () => ({
//     RNImmediatePhoneCall : {
//         immediatePhoneCall: jest.fn()

//     }
// }))

jest.mock('react-native-immediate-phone-call', ()=> {
    return {
        immediatePhoneCall : jest.fn().mockImplementation(() => { return {} })
    }
});

  
  

jest.mock('react-native-element-timer', () => {
    const MockedCountdown = () => <></>;
    return MockedCountdown;
  });



  NativeModules.RNCAsyncStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
  };
  jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    flushGetRequests: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
    multiMerge: jest.fn(),
  }));
  jest.mock("react-native-image-crop-picker", () => {
    return {
      openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
      openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
    };
  });
  jest.mock("react-native-get-location", () => {
    return {
      getCurrentPosition: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ longitude: 41.40338, latitude: 41.40338 })
        ),
    };
  });
  jest.mock("react-navigation", () => {
    return {
      createAppContainer: jest
        .fn()
        .mockReturnValue(function NavigationContainer(props) {
          return null;
        }),
      createDrawerNavigator: jest.fn(),
      createMaterialTopTabNavigator: jest.fn(),
      createStackNavigator: jest.fn(),
      StackActions: {
        push: jest
          .fn()
          .mockImplementation((x) => ({ ...x, type: "Navigation/PUSH" })),
        replace: jest
          .fn()
          .mockImplementation((x) => ({ ...x, type: "Navigation/REPLACE" })),
        reset: jest.fn(),
      },
      NavigationActions: {
        navigate: jest.fn().mockImplementation((x) => x),
      },
    };
  });
  jest.mock("react-native-permissions", () => {
    const Permissions = jest.requireActual("react-native-permissions/mock");
  
    return {
      ...Permissions,
      check: jest.fn(() => Promise.resolve(true)),
      requestMultiple: jest
        .fn()
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ACCESS_FINE_LOCATION": "granted",
                "ios.permission.LOCATION_ALWAYS": "granted",
                "ios.permission.LOCATION_WHEN_IN_USE": "granted",
              })
              
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ACCESS_FINE_LOCATION": "granted",
                "ios.permission.LOCATION_WHEN_IN_USE": "granted",
              })
              
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ACCESS_FINE_LOCATION": "granted",
                "ios.permission.LOCATION_WHEN_IN_USE": "granted",
              })
              
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ACCESS_FINE_LOCATION": "denied",
                "ios.permission.LOCATION_WHEN_IN_USE": "denied",
              })
              
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ANSWER_PHONE_CALLS": "granted",
                "ios.permission.CONTACTS": "granted",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ANSWER_PHONE_CALLS": "granted",
                "ios.permission.CONTACTS": "granted",
              })
            })
        )  
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ANSWER_PHONE_CALLS": "denied",
                "ios.permission.CONTACTS": "denied",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.READ_CONTACTS": "granted",
                "ios.permission.CONTACTS": "granted",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.READ_CONTACTS": "denied",
                "ios.permission.CONTACTS": "denied",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.WRITE_EXTERNAL_STORAGE": "granted",
                "PERMISSIONS.IOS.PHOTO_LIBRARY": "granted",
              })
            })
        ) .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.WRITE_EXTERNAL_STORAGE": "denied",
                "PERMISSIONS.IOS.PHOTO_LIBRARY": "denied",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.CAMERA": "granted",
                "ios.permission.CAMERA": "granted",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.CAMERA": "denied",
                "ios.permission.CAMERA": "denied",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.RECORD_AUDIO": "granted",
                "ios.permission.MICROPHONE": "granted",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.RECORD_AUDIO": "denied",
                "ios.permission.MICROPHONE": "denied",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.BODY_SENSORS": "granted",
                "ios.permission.CALENDARS": "granted",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.BODY_SENSORS": "granted",
                "ios.permission.CALENDARS": "granted",
              })
            })
        )
        .mockImplementation(
          (key) =>
            new Promise((resolve, reject) => {
              return reject({
                "android.permission.BODY_SENSORS": "denied",
                "ios.permission.CALENDARS": "denied",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ACCESS_FINE_LOCATION": "granted",
                "ios.permission.LOCATION_ALWAYS": "granted",
                "ios.permission.LOCATION_WHEN_IN_USE": "granted",
              })
              
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ACCESS_FINE_LOCATION": "denied",
                "ios.permission.LOCATION_ALWAYS": "denied",
                "ios.permission.LOCATION_WHEN_IN_USE": "denied",
              })
              
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ANSWER_PHONE_CALLS": "granted",
                "ios.permission.CONTACTS": "granted",
              })
            })
        )
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve({
                "android.permission.ANSWER_PHONE_CALLS": "denied",
                "ios.permission.CONTACTS": "denied",
              })
            })
        )
        .mockImplementationOnce(() => Promise.reject(""))
    };
  });
  configure({ adapter: new Adapter() });