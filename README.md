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
    <div>
        <section className="flex-1 relative rounded-xl overflow-hidden shadow">
          <LongdoMap
            mapObj={setMap}
            zoom={10}
            apiKey='YOUR_MAP_KEY'
            baseMap='GRAY'
            location={{ lon: 100.550, lat: 13.555 }}
            height={'100%'}
          >
            <Marker position={{ lon: 100.5018, lat: 13.7563 }} title="Bangkok" />
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
      </div>
  );
}
```
