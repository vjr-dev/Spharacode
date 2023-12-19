// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('react-native-image-crop-picker', () => {
    return {
      openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
      openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
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