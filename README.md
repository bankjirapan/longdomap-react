# longdomap-react

[![npm version](https://img.shields.io/npm/v/longdomap-react.svg)](https://www.npmjs.com/package/longdomap-react)
[![[CI]](https://github.com/bankjirapan/longdomap-react/actions/workflows/ci.yml/badge.svg)](https://github.com/bankjirapan/longdomap-react/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Easy-to-use and lightweight React components for Longdo Map, providing a simple way to integrate Longdo Map into your React applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [LongdoMap](#longdomap)
  - [Marker](#marker)
  - [Popup](#popup)
  - [Geometry](#geometry)
  - [Properties](#properties)
    - [Overlays](#overlays)
    - [Event](#event)
    - [Layers](#layers)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Declarative Components:** Use React components like `LongdoMap`, `Marker`, and `Popup` directly in your JSX.
- **Full TypeScript Support:** Written in TypeScript for a better development experience.
- **Lightweight:** Optimized for performance with a small bundle size.
- **Customizable:** Easily customize map options, markers, and other map objects.

## Installation

Install the package using your favorite package manager:

```bash
npm install longdomap-react
# or
yarn add longdomap-react
# or
pnpm add longdomap-react
```

## Quick Start

Here's a basic example of how to use `longdomap-react`:

```jsx
import React from 'react';
import { LongdoMap, Marker } from 'longdomap-react';

function App() {
  return (
    <div style={{ height: '500px' }}>
      <LongdoMap
        apiKey={"YOUR_LONGDO_MAP_API_KEY"}
        location={{ lon: 100.5018, lat: 13.7563 }}
        zoom={10}
      >
        <Marker position={{ lon: 100.5018, lat: 13.7563 }} />
      </LongdoMap>
    </div>
  );
}

export default App;
```

**Important:** You need to get an API Key from the [Longdo Map API](https://map.longdo.com/api) website.

## Components

### `LongdoMap`

The main map container. It accepts all official `longdo.MapOptions` as props.

| Prop       | Type                               | Default     | Description                                               |
|------------|------------------------------------|-------------|-----------------------------------------------------------|
| `apiKey`   | `string`                           | **Required**| Your Longdo Map API Key.                                  |
| `id`       | `string`                           | `longdo-map`| The ID for the map container element.                     |
| `location` | `{ lon: number, lat: number }`     | -           | The initial map center.                                   |
| `zoom`     | `number`                           | -           | The initial map zoom level.                               |
| `baseMap`  | `longdo.BaseMap`                   | `NORMAL`    | The initial base map layer.                               |
| `mapObj`   | `(map: longdo.Map) => void`        | -           | A callback function that returns the `longdo.Map` instance. |
| `height`   | `string \| number`                 | `100%`      | The height of the map container.                          |

### `Marker`

Creates a marker on the map. It accepts all `longdo.MarkerOptions` as props.

| Prop       | Type                               | Default     | Description                                               |
|------------|------------------------------------|-------------|-----------------------------------------------------------|
| `position` | `{ lon: number, lat: number }`     | **Required**| The position of the marker.                                 |
| `title`    | `string`                           | -           | The title of the marker (tooltip).                        |
| `detail`   | `string`                           | -           | The detail text shown in the popup.                       |
| `onClick`  | `(marker: longdo.Marker) => void`  | -           | A callback for the click event.                           |

### `Popup`

Creates a popup on the map.

| Prop       | Type                               | Default     | Description                                               |
|------------|------------------------------------|-------------|-----------------------------------------------------------|
| `position` | `{ lon: number, lat: number }`     | **Required**| The position of the popup.                                  |
| `title`    | `string`                           | -           | The title of the popup.                                   |
| `detail`   | `string`                           | -           | The detail content of the popup.                          |

### `Geometry`

Creates a geometric shape on the map (e.g., Circle, Polyline). It accepts all `longdo.GeometryOptions` as props.

| Prop      | Type                                 | Default     | Description                                                                 |
|-----------|--------------------------------------|-------------|-----------------------------------------------------------------------------|
| `type`    | `string`                             | **Required**| The geometry type (e.g., `circle`, `polyline`, `polygon`).                  |
| `points`  | `{ lon: number, lat: number }[]`     | **Required**| An array of points to draw the geometry.                                    |
| `radius`  | `number`                             | -           | The radius for a circle geometry.                                           |
| `options` | `object`                             | -           | Additional options like `title`, `detail`, `fillColor`, `lineColor`, etc. |

### Properties

#### Overlays

Overlays are used to manage additional elements on the map, such as markers, popups, and other custom objects.

- `Overlays`: Methods to manage overlays on the map.
  - `add(overlay: any)`: Adds an overlay to the map.
  - `remove(overlay: any)`: Removes an overlay from the map.

#### Event

Events allow you to bind custom actions to map events, such as clicks or drags.

- `Event`: Methods to bind events to the map.
  - `bind(eventName: string, callback: (event: any) => void)`: Binds an event to the map.

#### Layers

Layers are used to manage different map layers, such as base maps and additional layers.

**Longdo Layer example:**

```javascript
const POLITICAL = longdoLayer('political');
map?.Layers.setBase(POLITICAL);
```

**TMS/WMS/WMTS Layer example:**

```javascript
const TMS_LAYER = createTMSLayer('',{
  url: 'https://example.com'
})
map?.Layers.add(TMS_LAYER);
```

**Note:**  
For TMS/WMS/WMTS layer URLs, enter only the base URL, such as `https://example.com`.  
The system will automatically append tile parameters. For example, if you enter `https://example.com`, it will be converted to `https://example.com/z/x/y.png` according to the standard tile URL format.

#### How to add or set a layer

- `Layers`: Methods to manage layers on the map.
  - `setBase(layer: string | object | any)`: Sets the base layer of the map.
  - `add(layer: string | object | any)`: Adds a layer to the map.
  - `insert(index: number, layer: string | object | any)`: Inserts a layer at a specific index in the map's layer stack.
  - `remove(layer: string | object | any)`: Removes a layer from the map.
  - `clear()`: Clears all layers from the map. Clear layer is not effective for a base layer. This method removes all layers

## Contributing

Contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
