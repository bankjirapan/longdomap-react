'use client';

import { useState } from 'react';
import { LongdoMap, Marker, Geometry, Map, Popup } from 'longdomap-react';
import MapCtrl from './components/MapCtrl';
import Header from './components/Header';

export default function Home() {
  const [map, setMap] = useState<Map>();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-row gap-6 p-6">
        <MapCtrl map={map} />
        <section className="flex-1 relative rounded-xl overflow-hidden shadow text-black">
          <LongdoMap
            mapObj={(map: Map) => {
              setMap(map);
            }}
            zoom={10}
            apiKey="YOUR_MAP_KEY"
            baseMap="GRAY"
            location={{ lon: 100.55, lat: 13.555 }}
            height="100%"
          >
            <Marker
              detail='This is a marker.'
              position={{ lon: 100.5018, lat: 13.7563 }}
              title="Bangkok"
            />
            <Geometry
              type="circle"
              options={{
                title: "Circle Area",
                detail: "This is a circle area.",
              }}
              radius={0.01}
              points={[
                {
                  lat: 13.747047,
                  lon: 100.52547,
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
