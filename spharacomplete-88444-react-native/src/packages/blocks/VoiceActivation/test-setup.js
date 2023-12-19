// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'macos',
  select: () => null
}));

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "android", // or 'ios'
  select: () => null,
}));

jest.mock('react-native-image-crop-picker', () => {
  return {
    openPicker: jest.fn().mockImplementation(() => Promise.resolve()),
    openCamera: jest.fn().mockImplementation(() => Promise.resolve()),
  };
});

jest.mock('react-native-responsive-fontsize', () => {
  return {
    RFPercentage: jest.fn().mockReturnValue(16),
    RFValue: jest.fn().mockReturnValue(20),
  };
});


jest.mock('@picovoice/porcupine-react-native', () => {
  return {
    PorcupineManager: {
      start: jest.fn().mockImplementation(() => Promise.resolve()),
      stop: jest.fn().mockImplementation(() => Promise.resolve()),
      delete: jest.fn().mockImplementation(() => Promise.resolve()),
      fromKeywordPaths: jest.fn().mockImplementation((arg1,arg2,arg3,arg4) => { return new Promise((resolve) => { arg3(2),arg4(), resolve() }) })
    },
    BuiltInKeywords: jest.fn(),
    PorcupineErrors: jest.fn(),

  };
});

jest.mock('react-native-responsive-fontsize', () => {
  return {
    RFPercentage: jest.fn().mockReturnValue(16),
    RFValue: jest.fn().mockReturnValue(20),
  };
});