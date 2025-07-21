# longdomap-react

[![npm version](https://img.shields.io/npm/v/longdomap-react.svg)](https://www.npmjs.com/package/longdomap-react)
[![[CI]](https://github.com/bankjirapan/longdomap-react/actions/workflows/ci.yml/badge.svg)](https://github.com/bankjirapan/longdomap-react/actions/workflows/ci.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Easy-to-use and lightweight React components for Longdo Map, providing a simple way to integrate Longdo Map into your React applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Components API](#components-api)
  - [LongdoMap](#longdomap)
  - [Marker](#marker)
  - [Popup](#popup)
  - [Geometry](#geometry)
  - [Layer](#layer)
  - [LongdoTag](#longdotag)
- [Map Instance API](#map-instance-api)
  - [Overlays](#overlays)
  - [Event](#event)
  - [Layers](#layers)
  - [Tags](#tags)
  - [UI Controls](#ui-controls)
- [Utilities](#utilities)
  - [Overlay Creators](#overlay-creators)
  - [Layer Creators](#layer-creators)
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

## Components API

### `LongdoMap`

The main map container component.

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | **Required** | The API key for Longdo Map service. |
| `mapObj` | `(map: any) => void` | - | Callback that receives the Longdo map object once it is ready. |
| `location` | `{ lon: number; lat: number; }` | `{ lon: 100.529248, lat: 13.672898 }` | Initial map location (Bangkok). |
| `zoom` | `number` | `10` | Initial map zoom level. |
| `baseMap` | `string` | `"NORMAL"` | The base map to use. See [Longdo Docs](https://api.longdo.com/map3/doc.html#Layers) for available layers. |
| `height` | `string \| number` | `400` | Height of the map container. |
| `width` | `string \| number` | `"100%"` | Width of the map container. |
| `className` | `string` | `""` | Optional CSS class for the container. |
| `children` | `ReactNode` | - | Child components like `Marker`, `Popup`, `Geometry`, etc. |

### `Marker`

Creates a marker on the map.

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `{ lon: number, lat: number }` | **Required** | The position of the marker. |
| `title` | `string` | - | The title of the marker (shows on hover). |
| `detail` | `string` | - | The detail text shown in the popup on click. |
| `icon` | `{ url: string; offset?: { x: number; y: number }; }` | - | Custom marker icon. |
| `visibleRange` | `{ min: number; max: number }` | - | The zoom level range where the marker is visible. |
| `draggable` | `boolean` | `false` | Allows the marker to be dragged by the user. |

### `Popup`

Creates a popup on the map.

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `{ lon: number, lat: number }` | **Required** | The position of the popup. |
| `title` | `string` | `'Popup'` | The title displayed at the top of the popup. |
| `detail` | `string` | `'This is a popup'` | Additional information displayed in the popup. |
| `html` | `string` | - | Custom HTML content to display inside the popup. |
| `closable` | `boolean` | `true` | If `true`, the popup will have a close button. |
| `size` | `{ width: number; height: number }` | `{ width: 200, height: 100 }` | The size of the popup. |

### `Geometry`

Creates various geometric shapes on the map.

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'polyline' \| 'polygon' \| 'circle' \| 'donut' \| 'rectangle'` | **Required** | The type of geometry to render. |
| `points` | `({ lon: number; lat: number } \| null)[]` | **Required** | An array of coordinate objects for the geometry's vertices. |
| `radius` | `number` | - | The radius of the geometry, used for the "circle" type. |
| `options` | `object` | - | Additional options for customizing appearance (e.g., `lineColor`, `lineWidth`, `fillColor`, `title`). |

### `Layer`

Adds a predefined layer to the map.

| Prop | Type | Default | Description |
|---|---|---|---|
| `layerName` | `string` | **Required** | The name of the layer to add. See [Longdo Docs](https://api.longdo.com/map3/doc.html#Layers) for available layers. |

### `LongdoTag`

Adds a tag overlay to the map, showing points of interest.

| Prop | Type | Default | Description |
|---|---|---|---|
| `tagName` | `string` | **Required** | The tag to apply to the map (e.g., "hotel"). See [Tag List](https://map.longdo.com/ws/tag/list). |

## Map Instance API

You can get the map instance using the `mapObj` prop on the `<LongdoMap>` component. This object provides access to the full Longdo Map API.

### Overlays

Manage elements on the map. Accessed via `map.Overlays`.
- `add(overlay: any)`: Adds an overlay (marker, geometry, etc.).
- `remove(overlay: any)`: Removes a specific overlay.
- `clear()`: Removes all overlays.
- `list()`: Returns an array of all overlays on the map.

### Event

Bind callbacks to map events. Accessed via `map.Event`.
- `bind(eventName: string, callback: (event: any) => void)`: Binds a function to a map event.
  - **Common Events:** `click`, `doubleClick`, `drag`, `drop`, `zoom`, `ready`, `overlayClick`. See `EventName` enum in `src/interface/Event.ts` for a full list.

### Layers

Manage map layers. Accessed via `map.Layers`.
- `setBase(layer: object)`: Sets the base map layer.
- `add(layer: object)`: Adds an additional layer.
- `remove(layer: object)`: Removes a layer.
- `clear()`: Clears all additional layers.

### Tags

Manage POI tags. Accessed via `map.Tags`.
- `add(tagName: string)`: Adds a tag layer.
- `remove(tagName: string)`: Removes a tag layer.

### UI Controls

Control the visibility of map UI elements. Accessed via `map.Ui`.
- `DPad.visible(boolean)`
- `Zoombar.visible(boolean)`
- `Geolocation.visible(boolean)`
- `Toolbar.visible(boolean)`
- `LayerSelector.visible(boolean)`
- `Scale.visible(boolean)`

## Utilities

The library exports several utility functions to create Longdo Map objects programmatically.

### Overlay Creators

These functions create overlay objects that can be added to the map using `map.Overlays.add()`.

- `createLongdoMarker(position, options)`
- `createPopup(position, options)`
- `createPolygon(points, options)`
- `createPolyline(points, options)`
- `createCircle(center, radius, options)`
- `createRectangle(bounds, options)`
- `createDot(position, options)`

### Layer Creators

Use these functions to create layer objects for use with `map.Layers.add()` or `map.Layers.setBase()`.

- `longdoLayer(layerName: string)`: Gets a predefined Longdo layer (e.g., `NORMAL`, `POLITICAL`).
- `createWMSLayer(layerName, options)`
- `createWMTSLayer(layerName, options)`
- `createTMSLayer(layerName, options)`

**TMS Layer Example:**
```javascript
// The system automatically formats the URL to the correct tile format (e.g., /z/x/y.png)
const tmsLayer = createTMSLayer('My TMS Layer', {
  url: 'https://mytileserver.com/tiles'
});
map?.Layers.add(tmsLayer);
```

## Contributing

Contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.