// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules } from "react-native";
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
jest.mock("react-native-get-location", () => ({
  getCurrentPosition: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ longitude: 20.12345, latitude: 20.12345 })
    ),
}));

configure({ adapter: new Adapter() });
