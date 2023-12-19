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
jest.mock("react-native-shake", () => ({
  addListener: jest.fn(),
}));
jest.mock("react-navigation", () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),

      createBottomTabNavigator: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),
    createDrawerNavigator: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),
    createMaterialTopTabNavigator: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),
    createStackNavigator: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),
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

jest.mock("@cometchat-pro/react-native-chat", () => {
  return {
    CometChat: {
      init: jest.fn(),
    },
  };
});
jest.mock("react-native-permissions", () => {});
jest.mock("react-native-image-crop-picker", () => {
  return {
    openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
    openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});
jest.mock("react-native-file-viewer", () => ({
}));
jest.mock("react-native-fs", () => ({
}));
configure({ adapter: new Adapter() });
