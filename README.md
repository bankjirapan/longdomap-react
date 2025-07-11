# longdomap-react

[![npm version](https://img.shields.io/npm/v/longdomap-react.svg)](https://www.npmjs.com/package/longdomap-react)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/longdomap-react)](https://bundlephobia.com/result?p=longdomap-react)
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

## API Reference

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

## Contributing

Contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.