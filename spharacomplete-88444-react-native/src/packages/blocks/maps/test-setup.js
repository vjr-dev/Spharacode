// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const PaymentRequest = require("react-native-payments").PaymentRequest;
configure({ adapter: new Adapter() });

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest
    .fn()
    .mockImplementationOnce((key) => {
      console.log("_----key", key);
      if (key === "Token") return "0";
      if (key === "User_Data")
        return JSON.stringify({
          user_data: {
            data: { attributes: { 
                location_live_tracking: "abc" , 
                share_with_emergency_contact:"asdadad",
                share_with_police: "asasa"
            } },
          }
         
        });
      return "Token";
    })
    .mockImplementation(() => null),

  setItem: jest.fn(),
}));

jest.mock("@react-native-community/geolocation", () => ({
  watchPosition: jest.fn().mockImplementation((cb, err) => {
    cb && cb({ coords: { latitude: 77, longitude: 11 } });
  }),
  clearWatch: jest.fn(),
}));

jest.mock("react-native-razorpay", () => ({
  RazorpayCheckout: {
    open: jest.fn().mockImplementation(() => Promise.resolve("data")),
  },
}));

jest.mock("react-native-google-pay", () => ({
  GooglePay: {
    setEnvironment: jest.fn(),
    isReadyToPay: jest.fn().mockImplementation(() => Promise.resolve("sne")),
    requestPayment: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve("sneha"))
      .mockImplementationOnce(() => Promise.reject("error"))
      
  },
}));



jest.mock("react-native-payments", () => ({
  PaymentRequest: jest.fn().mockImplementation(() => ({
    canMakePayments: jest.fn().mockImplementation(() => Promise.resolve(true)),
    show: jest.fn().mockImplementation(() => Promise.resolve(true)),
    complete: jest.fn()
  }))
}))

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
