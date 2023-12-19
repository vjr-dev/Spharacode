// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';
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
NativeModules.RNPermissions = {
    RNPermissions: jest.fn(),
};

jest.mock("react-native-shake", () => ({
   
    // addListener: jest.fn().mockImplementation((cb) => cb()),
  }));

  jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest
      .fn()
      .mockImplementationOnce((key) => {
        console.log("_----key", key);
        if (key === "Token") return "0";
        return "Token";
      })
      .mockImplementation(() => null),
    setItem: jest.fn(),
  }));