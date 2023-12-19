// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from "react-native";

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));



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
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve("blocked");
            })
        )
  
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
        .mockImplementationOnce(
          (key) =>
            new Promise((resolve, reject) => {
              return resolve("blocked");
            })
        ),
    };
  });
  



jest.mock('react-native-element-timer', () => {
    const MockedCountdown = () => <></>;
    return MockedCountdown;
  });

jest.mock("react-native-wheel-scroll-picker", () => {

})

jest.mock("react-native-linear-gradient", () => {

})

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
