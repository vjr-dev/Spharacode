// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';
configure({ adapter: new Adapter() });


NativeModules.RNCAsyncStorage = {
  await:jest.fn(),
    async:jest.fn(),
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

jest.mock('@react-native-community/slider', () => {
    const MockedSlider = () => <></>;
    return MockedSlider;
  });

  jest.mock('@react-native-async-storage/async-storage', () => {
    
  });

jest.mock('react-native-image-crop-picker', () => {
  return {
    openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
    openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});
jest.mock('react-native-permissions', () => {
  return {
    PERMISSIONS: {
      IOS: {
        PHOTO_LIBRARY: 'photo'
      },
      ANDROID: {
        WRITE_EXTERNAL_STORAGE: 'storage'
      }
    },
    check: jest.fn(),
    request: jest.fn()
  };
});