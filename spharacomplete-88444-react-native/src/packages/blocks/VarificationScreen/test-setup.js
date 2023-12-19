// test-setup.js
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { NativeModules } from 'react-native'
NativeModules.RNCAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn().mockImplementation(() => Promise.resolve()),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  flushGetRequests: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
}
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn().mockImplementation(() => Promise.resolve(true)),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  flushGetRequests: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
}))
jest.mock('react-native-shake', () => ({
  addListener: jest.fn(),
}))
jest.mock('react-navigation', () => {
  return {
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null
      }),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest
        .fn()
        .mockImplementation((x) => ({ ...x, type: 'Navigation/PUSH' })),
      replace: jest
        .fn()
        .mockImplementation((x) => ({ ...x, type: 'Navigation/REPLACE' })),
      reset: jest.fn(),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation((x) => x),
    },
  }
})
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
      markAsRead: jest.fn(),
      init: jest
        .fn()
        .mockImplementation(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject()),
      getLoggedinUser: jest
        .fn()
        .mockImplementation(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject()),
      login: jest
        .fn()
        .mockImplementation(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject()),
      getConversation: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ conversation: { lastMessage: { text: "text" } } })
        )
        .mockImplementationOnce(() => Promise.reject()),
      sendMessage: jest
        .fn()
        .mockImplementation(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject()),
      sendMediaMessage: jest
        .fn()
        .mockImplementation(() => Promise.resolve(messages)),
      MessageListener: jest.fn().mockImplementation(),
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
      addMessageListener: jest.fn(),
      UsersRequestBuilder: jest.fn().mockImplementation(() => ({
        setLimit: jest.fn().mockImplementation(() => ({
          friendsOnly: jest.fn().mockImplementation(() => ({
            build: jest.fn().mockImplementation(() => ({
              fetchNext: jest.fn().mockImplementation(() => {
                return Promise.resolve([
                  { uid: "user1", name: "John" },
                  { uid: "user2", name: "Jane" },
                  { uid: "919999999999", name: "Bob " },
                ]);
              }),
            })),
          })),
          searchIn: jest.fn().mockImplementation(() => ({
            build: jest.fn().mockImplementation(() => ({
              fetchNext: jest.fn().mockImplementation(() => {
                return Promise.resolve([
                  { uid: "user1", name: "John" },
                  { uid: "user2", name: "Jane" },
                  { uid: "919999999999", name: "Bob " },
                ]);
              }),
            })),
          })),
        })),
      })),

      GroupsRequestBuilder: jest
        .fn()
        .mockImplementation(() => ({
          setLimit: jest.fn().mockImplementation(() => ({
            build: jest.fn().mockImplementation(() => ({
              fetchNext: jest.fn(() => {
                return Promise.resolve([
                  { uid: "user1", name: "John" },
                  { uid: "user2", name: "Jane" },
                  { uid: "919999999999", name: "Bob " },
                ]);
              }),
            })),
          })),
        }))
        .mockImplementationOnce(() => Promise.reject()),

      removeMessageListener: jest.fn(),
      TextMessage: jest.fn(),
      MESSAGE_TYPE: {
        VIDEO: "VIDEOO",
        FILE: "FILE",
      },
      MediaMessage: jest.fn(),
      AppSettingsBuilder: jest.fn().mockImplementation(() => ({
        subscribePresenceForAllUsers: jest.fn().mockImplementation(() => ({
          setRegion: jest.fn().mockImplementation(() => ({
            autoEstablishSocketConnection: jest.fn().mockImplementation(() => ({
              build: jest.fn(),
            })),
          })),
        })),
      })),
    },
  };
});
jest.mock("@react-native-firebase/messaging", () => {
  return {
    messaging :  jest.fn().mockImplementation(() => {
        return {
            requestPermission : jest.fn(),
        } 
       
    })
  };
});
configure({ adapter: new Adapter() })
