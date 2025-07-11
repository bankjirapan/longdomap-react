require('@testing-library/jest-dom');

const mockMap = {
  Overlays: {
    add: jest.fn(),
    remove: jest.fn(),
    clear: jest.fn(),
  },
  location: jest.fn(),
  zoom: jest.fn(),
  changeBaseMap: jest.fn(),
  Event: {
    bind: jest.fn((event, cb) => {
      // Automatically call the "ready" event callback to simulate the map being ready
      if (event === 'ready') {
        cb();
      }
    }),
    unbind: jest.fn(),
  },
};

global.longdo = {
  Map: jest.fn().mockImplementation(() => mockMap),
  Marker: jest.fn(),
  Popup: jest.fn(),
  Circle: jest.fn(),
  Polyline: jest.fn(),
  Polygon: jest.fn(),
  Layers: {
    NORMAL: 'NORMAL',
    GRAY: 'GRAY'
  },
  EventName: {
      Ready: 'ready'
  }
};
