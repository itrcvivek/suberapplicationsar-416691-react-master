// test-setup.js
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

window.MediaRecorder = mockMediaRecorder;
global.navigator = {
  mediaDevices: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: jest.fn(() => []),
    }),
  },
};
const mockMediaStream = {
    getTracks: () => [],
    addTrack: () => {},
    removeTrack: () => {}
  };

  const mockMediaRecorder = jest.fn(() => ({
    ondataavailable: null,
    start: jest.fn(),
    stop: jest.fn(),
    isTypeSupported: jest.fn(() => true) 
  }));
  
  Object.defineProperty(window, 'MediaRecorder', {
    value: mockMediaRecorder
  });
  
  Object.defineProperty(navigator, 'mediaDevices', {
    value: {
      getUserMedia: jest.fn(() => Promise.resolve(mockMediaStream))
    }
  });