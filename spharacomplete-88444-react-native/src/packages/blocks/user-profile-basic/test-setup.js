// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules } from "react-native";
configure({ adapter: new Adapter() });
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
jest.mock("react-native-image-crop-picker", () => ({
  openPicker: jest.fn().mockImplementationOnce(() => Promise.resolve("snsns")),
}));

jest.mock("react-native-permissions", () => {
  const Permissions = jest.requireActual("react-native-permissions/mock");

  return {
    ...Permissions,
    check: jest.fn(() => Promise.resolve(true)),
    requestMultiple: jest
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            return resolve({
              "android.permission.WRITE_EXTERNAL_STORAGE": "granted",
              "ios.permission.PHOTO_LIBRARY": "granted",
            });
          })
      )
      .mockImplementationOnce(
        () =>
          new Promise((resolve, reject) => {
            return resolve({
              "android.permission.WRITE_EXTERNAL_STORAGE": "never_ask_again",
              "ios.permission.PHOTO_LIBRARY": "never_ask_again",
            });
          })
      ),
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest
    .fn()
    .mockImplementationOnce((key) => {
      console.log("_----key", key);
      if (key === "Token") return "0";
      if (key === "User_Data") return "0";
      return "Token";
    })
    .mockImplementation(() => null),
  setItem: jest.fn(),
}));
