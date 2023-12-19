// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock("react-native-cloud-store", () => ({
    isICloudAvailable: jest.fn().mockImplementation(() => true),
    kvSetItem:jest.fn().mockImplementation(() => true),
    CloudStore: jest.fn(),
}));
