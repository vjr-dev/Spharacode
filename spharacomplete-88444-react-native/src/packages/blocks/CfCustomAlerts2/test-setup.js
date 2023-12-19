// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NativeModules } from "react-native";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

NativeModules.RNCAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

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

jest.mock("@react-native-community/geolocation", () => ({
  watchPosition: jest.fn().mockImplementation((cb, err) => {
    cb && cb({ coords: { latitude: 77, longitude: 11 } });
  }),
  clearWatch: jest.fn(),
  stopObserving: jest.fn(),
}));

jest.mock("rn-android-keyboard-adjust", () => ({setAdjustPan:jest.fn()}));

jest.mock("react-native-pose", () => ({
  View: jest.fn(),
  Text: "Text",
  Animated: {
    View: "Animated.View",
    Text: "Animated.Text",
  },
  pose: jest.fn(() => ({
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));

jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  const AnimatedRegion = jest.fn().mockImplementation(() => {
    return {
      setNativeProps: jest.fn(),
    };
  });
  return {
    __esModule: true,
    default: View,
    AnimatedRegion,
    PROVIDER_GOOGLE: "PROVIDER_GOOGLE",
    MarkerAnimated: View,
    Callout: View,
    Polyline: View,
    Circle: View,
    AirGoogleMaps: {
      addGoogleMapsApiKey: jest.fn(),
    },
  };
});

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

jest.mock("react-native-android-location-enabler", () => ({
  RNAndroidLocationEnabler: {
    promptForEnableLocationIfNeeded: jest.fn(),
  },
}));



jest.mock("@cometchat-pro/react-native-chat", () => {

  const messages = [
    {
      id: "message1",
      text: "Hello, world!",
      sender: {
        uid: "khvas",
        name: "has",
      },
      sentAt: 231,
      category: "message",
    },
  ];

  return {
    CometChat: {
      MESSAGE_TYPE: {
        IMAGE: "mock-image-type",
        VIDEO: "mock-video-type",
        FILE: "mock-file-type",
      },
      init: jest
      .fn()
      .mockImplementation(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject()),
      getLoggedinUser: jest
      .fn()
      .mockImplementation(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject()),
      AppSettingsBuilder: jest.fn().mockImplementation(() => ({
        subscribePresenceForAllUsers: jest.fn().mockImplementation(() => ({
          setRegion: jest.fn().mockImplementation(() => ({
            autoEstablishSocketConnection: jest.fn().mockImplementation(() => ({
              build: jest.fn(),
            })),
          })),
        })),
      })),
      login: jest
        .fn()
        .mockImplementation(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject()),
      MessageListener: jest.fn().mockImplementation(),
      addMessageListener: jest.fn(),
      MessagesRequestBuilder: jest.fn().mockImplementation(() => ({
        setLimit: jest.fn().mockImplementation(() => ({
          setUID: jest.fn().mockImplementation(() => ({
            build: jest.fn().mockImplementation(() => ({
              fetchPrevious: jest
                .fn()
                .mockImplementation(() => Promise.resolve(messages)),
            })),
          })),
          setGUID: jest.fn().mockImplementation(() => ({
            build: jest.fn().mockImplementation(() => ({
              fetchPrevious: jest
                .fn()
                .mockImplementation(() => Promise.resolve(messages)),
            })),
          })),
        })),
      })),
      MediaMessage: jest
        .fn()
        .mockImplementation((receiverID, file, messageType, receiverType) => ({
          receiverID,
          file,
          messageType,
          receiverType,
        })),
      sendMediaMessage: jest
        .fn()
        .mockResolvedValue({ text: "mock-text-message" }),
      UsersRequestBuilder: jest.fn().mockImplementation(() => ({
        setLimit: jest.fn().mockReturnThis(),
        friendsOnly: jest.fn().mockReturnThis(),
        build: jest.fn().mockReturnThis(),
        fetchNext: jest.fn(() => {
          return Promise.resolve([
            { uid: "user1", name: "John" },
            { uid: "user2", name: "Jane" },
            { uid: "user3", name: "Bob " },
          ]);
        }),
      })),
      removeMessageListener: jest.fn(),
      TextMessage: jest.fn(),
      sendMessage: jest
      .fn()
      .mockImplementation(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject()),
      markAsRead: jest.fn().mockImplementation(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject())
,
      // Add more mocked functions as needed
    },
  };
});

jest.mock("react-native-image-crop-picker", () => {
  return {
    openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
    openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

jest.mock('react-native-element-timer', () => {
  return {
    Countdown: jest.fn()
  };
});
