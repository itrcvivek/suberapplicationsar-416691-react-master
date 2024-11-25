// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));
jest.mock("react-native-share", () => ({
  default: jest.fn(),
  Social: {},
  open: jest
    .fn()
    .mockImplementationOnce(() => Promise.reject("mock error"))
    .mockImplementation(() =>
      Promise.resolve({ message: null, success: true }),
    ),
  shareSingle: jest
    .fn()
    .mockImplementationOnce(() => Promise.reject("mock error"))
    .mockImplementation(() =>
      Promise.resolve({ message: null, success: true }),
    ),
}));

jest.mock("../../framework/src/StorageProvider", () => ({
  get: jest
    .fn()
    .mockImplementationOnce((key) => {
      if (key === "token") return "0";
      return "token";
    })
    .mockImplementation(() => null),
  set: jest.fn(),
}));
