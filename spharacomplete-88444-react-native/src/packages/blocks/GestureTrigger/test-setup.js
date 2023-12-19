// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest
    .fn()
    .mockImplementationOnce((key) => {
      console.log("_----key", key);
      if (key === "Token") return "0";
      if (key === "ShakeEventValue") return "0";

   
      return "Token";
    })
    .mockImplementation(() => null),
  setItem: jest.fn(),
}));

jest.mock("react-native-shake", () => ({
  addListener: jest.fn().mockImplementation((cb) => cb()),
}));
