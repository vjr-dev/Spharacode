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



jest.mock('react-native-immediate-phone-call', ()=> {
    return {
        immediatePhoneCall : jest.fn().mockImplementation(() => { return {} })
    }
});

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
    OS: "android", // or 'ios'
    select: () => null,
  }));