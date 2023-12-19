// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('react-native-date-picker', () => {
    const MockDatePicker = jest.fn().mockReturnValue(null);
    return MockDatePicker;
  });

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
  jest.mock("react-native-shake", () => ({
    addListener: jest.fn().mockImplementation((cb) => cb()),
  }));