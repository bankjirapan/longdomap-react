# react-longdo-map

Easy-to-use React component for Longdo Map.

## Install

```bash
npm install react-longdo-map
```

## Usage

```jsx
import React from 'react';
import { LongdoMap } from 'react-longdo-map';

function App() {
  return (
    <LongdoMap
      apiKey="YOUR_LONGDO_MAP_API_KEY"
      center={[100.523186, 13.736717]}
      zoom={10}
      markers={[
        { lngLat: [100.523186, 13.736717], popupText: "Bangkok" }
      ]}
      height={500}
      width={"100%"}
    />
  );
}

export default App;
```

## Props

| Prop      | Type              | Default                | Description                      |
|-----------|-------------------|------------------------|----------------------------------|
| apiKey    | string            | REQUIRED               | Your Longdo Map API Key          |
| center    | [number, number]  | [100.523186, 13.736717]| Initial center of the map        |
| zoom      | number            | 10                     | Initial zoom                     |
| markers   | Array             | []                     | Markers to be placed on map      |
| height    | string \| number  | 400                    | Height of the map container      |
| width     | string \| number  | "100%"                 | Width of the map container       |

## License