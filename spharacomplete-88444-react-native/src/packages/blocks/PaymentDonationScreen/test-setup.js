// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from "react-native";
const { PaymentRequest } = require('react-native-payments');

jest.mock("react-native-responsive-fontsize", () => ({
  RFValue: jest.fn(),
  RFPercentage: jest.fn(),
}));
jest.mock("react-native-responsive-screen", () => ({
  heightPercentageToDP: jest.fn(),
}));
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
jest.mock("react-native-razorpay", () => ({
    open: jest.fn().mockImplementation(() => Promise.resolve()),
    //open: jest.fn().mockImplementation(() => Promise.reject()),
}));

jest.mock("react-native-google-pay",()=>({
  GooglePay:{
  setEnvironment:jest.fn(),
  isReadyToPay:jest.fn().mockImplementation(() => Promise.resolve()),
  requestPayment:jest.fn().mockImplementation(() => Promise.resolve()),
 
  },
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
}))


jest.mock("react-native-payments", () => ({
  PaymentRequest: jest.fn().mockImplementation(() => ({
    canMakePayments: jest.fn().mockImplementation(() => Promise.resolve(true)),
    show: jest.fn().mockImplementation(() => Promise.resolve(true)),
    complete: jest.fn()
  }))
}))

const Payments = jest.genMockFromModule('react-native-payments');
const GooglePay = jest.genMockFromModule('react-native-google-pay');
Payments.requestPayment = jest.fn();
Payments.canMakePayments = jest.fn().mockImplementation(() => Promise.resolve());
GooglePay.isReadyToPay = jest.fn().mockImplementation(() => Promise.resolve());
GooglePay.setEnvironment = jest.fn().mockImplementation(() => Promise.resolve());
module.exports = Payments;
configure({ adapter: new Adapter() });

