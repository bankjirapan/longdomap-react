# react-longdo-map

Easy-to-use React component for Longdo Map.

## Install

```bash
npm install react-longdo-map
```

## Usage

```jsx
import { useEffect, useState } from 'react';
import { LongdoMap, Marker, Geometry, Map, Popup } from 'react-longdo-map';

export default function Home() {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    if (map) {
      console.log(map);
    }
  }, [map]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Longdo Map Example</h1>
        <span className="text-gray-500">Bangkok, Thailand</span>
      </header>
      <main className="flex-1 flex flex-row gap-6 p-6">
        <aside className="w-64 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-2">Controls</h2>
          <button
            onClick={() => map?.zoom(12)}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
            title="Zoom In"
          >
            Zoom In
          </button>
        </aside>
        <section className="flex-1 relative rounded-xl overflow-hidden shadow">
          <LongdoMap
            mapObj={setMap}
            zoom={10}
            apiKey='YOUR_MAP_KEY'
            baseMap='GRAY'
            location={{ lon: 100.550, lat: 13.555 }}
            height={'100%'}
          >
            <Marker
              position={{ lon: 100.5018, lat: 13.7563 }}
              title="Bangkok"
            />
            <Geometry
              type="circle"
              options={
                {
                  title: 'Circle Area',
                  detail: "This is a circle area.",
                }
              }
              radius={0.01}
              points={[
                {
                  lat: 13.747047,
                  lon: 100.525470
                },
              ]}
            />

            <Popup
              position={{ lon: 100.555, lat: 13.666 }}

              title="Bangkok"
            />
          </LongdoMap>
        </section>
      </main>
    </div>
  );
}
```
