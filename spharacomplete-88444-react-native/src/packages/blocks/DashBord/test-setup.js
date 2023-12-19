// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules } from "react-native";
configure({ adapter: new Adapter() });

// jest.mock("@react-native-async-storage/async-storage", () => ({
//   getItem: jest
//     .fn()
//     .mockImplementationOnce((key) => {
//       console.log("_----key", key);
//       if (key === "Token") return "0";
//       return "Token";
//     })
//     .mockImplementation(() => null),
//   setItem: jest.fn(),
// }));

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


// jest.mock("react-native-get-location", () => ({}));
// jest.mock("react-native-get-location", () => ({
//   getCurrentPosition: jest
//     .fn()
//     .mockImplementation(() =>
//       Promise.resolve({  })
//     ),
// }));



jest.mock("react-native-android-location-enabler", () => ({
  RNAndroidLocationEnabler: {
    promptForEnableLocationIfNeeded: jest.fn(),
  },
}));

jest.mock("react-native-sound", () => {
  
})

jest.mock("react-native-system-setting", () => ({
  addVolumeListener : jest.fn().mockImplementation(() => Promise.resolve())
}))

jest.mock("@react-native-community/geolocation", () => ({
  getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 37.78825,
          longitude: -122.4324,
          altitude: 0,
          accuracy: 5,
          altitudeAccuracy: 5,
          heading: 0,
          speed: 0,
        },
      })
    )
  ),
}));

NativeModules.RNCAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));