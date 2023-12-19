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
jest.mock("react-native-immediate-phone-call", () => ({}));
jest.mock("react-native-shake", () => ({}));
jest.mock("react-native-permissions", () => ({}));
jest.mock("react-native-system-setting", () => ({}));
jest.mock("react-native-sound", () => ({}));
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
configure({ adapter: new Adapter() });
