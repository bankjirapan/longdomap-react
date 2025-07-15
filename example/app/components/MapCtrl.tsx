'use client';

import { useEffect, useState } from "react";
import { createCircle, createLongdoMarker, createPolygon, createPolyline, createTMSLayer, createWMSLayer, EventName, LocationMode, LongdoLayer, Map, OverlaysClickEvent } from "longdomap-react";

interface MapCtrlProps {
    map?: Map;
}
export default function MapCtrl({ map }: MapCtrlProps) {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [mouseLocation, setMouseLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [overlayClick, setOverlayClick] = useState<OverlaysClickEvent | null>(null);
    const [activeButton, setActiveButton] = useState<string | null>(null);

    useEffect(() => {
        // Bind map events
        map?.Event.bind(EventName.Location, () => {
            const loc = map?.location();
            if (loc) {
                setLocation({ lat: loc.lat, lon: loc.lon });
            } else {
                setLocation(null);
            }
        });

        // Bind mouse click event
        map?.Event.bind(EventName.Click, function () {
            const mouseLocation = map?.location(LocationMode.Pointer);
            setOverlayClick(null)
            if (mouseLocation) {
                setMouseLocation({ lat: mouseLocation.lat, lon: mouseLocation.lon });
            } else {
                setMouseLocation(null);
            }
        });

        // Bind overlay click event
        map?.Event.bind(EventName.OverlayClick, function (event: OverlaysClickEvent) {
            setOverlayClick(event);

        });
    })



    return (
        <aside className="w-72 bg-white shadow p-3 flex flex-col gap-2 rounded-lg text-black">
            <h2 className="text-lg font-semibold">Map Controls</h2>
            <button
                className={`${activeButton === "goto" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm hover:cursor-pointer`}
                onClick={() => {
                    map?.location({ lat: 13.690, lon: 100.7507 });
                    setActiveButton("goto");
                }}
            >
                Go to 13.690, 100.7507
            </button>
            <button
                onClick={() => {
                    map?.zoom(12);
                    setActiveButton("zoom12");
                }}
                className={`${activeButton === "zoom12" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm text-left hover:cursor-pointer`}
                title="Zoom 12"
            >
                Zoom 12
            </button>
            <div className="flex gap-2 w-full">
                <button
                    className={`${activeButton === "zoomin" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm text-left hover:cursor-pointer w-full`}
                    onClick={() => {
                        map?.zoom(true, true);
                        setActiveButton("zoomin");
                    }}
                >
                    Zoom In
                </button>
                <button
                    className={`${activeButton === "zoomout" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm text-left hover:cursor-pointer w-full`}
                    onClick={() => {
                        map?.zoom(false, true);
                        setActiveButton("zoomout");
                    }}
                >
                    Zoom Out
                </button>
            </div>


            <h2 className="text-lg font-semibold">Map Callback</h2>
            <button
                onClick={() => {
                    if (map) {
                        const location = map.location()
                        alert(`Current location: ${location?.lat}, ${location?.lon}`);
                        setActiveButton("getlocation");
                    }
                }}
                className={`${activeButton === "getlocation" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm hover:cursor-pointer`}
            >
                Get location
            </button>
            <button
                onClick={() => {
                    alert(map?.zoom());
                    setActiveButton("getzoom");
                }}
                className={`${activeButton === "getzoom" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm hover:cursor-pointer`}

            >
                Get Zoom
            </button>

            <h2 className="text-lg font-semibold">Map Events</h2>
            <div className="bg-gray-100 rounded p-2 text-sm">
                <span className="font-medium">Current Location:</span>
                <span className="ml-2">
                    {location ? (
                        <>
                            <span className="text-blue-700">{location.lat.toFixed(5)}</span>
                            {", "}
                            <span className="text-blue-700">{location.lon.toFixed(5)}</span>
                        </>
                    ) : (
                        <span className="text-gray-500">Not set</span>
                    )}
                </span>
            </div>
            <div className="bg-gray-100 p-2 text-sm">
                <span className="font-medium">Mouse Click:</span>
                <span className="ml-2">
                    {mouseLocation ? (
                        <>
                            <span className="text-blue-700">{mouseLocation.lat.toFixed(5)}</span>
                            {", "}
                            <span className="text-blue-700">{mouseLocation.lon.toFixed(5)}</span>
                        </>
                    ) : (
                        <span className="text-gray-500">Not set</span>
                    )}
                </span>
            </div>
            <div className="bg-gray-100 p-2 text-sm">
                <span className="font-medium">Overlay Click:</span>
                <span className="ml-2">
                    {overlayClick ? (
                        <span className="text-blue-700">{overlayClick._geojson.geometry.coordinates}</span>
                    ) : (
                        <span className="text-gray-500">Not set</span>
                    )}
                </span>
            </div>


            <h2 className="text-lg font-semibold">Map Overlay</h2>
            <div className="flex gap-2">
                <button onClick={() => {
                    if (map) {
                        const randomOffset = () => (Math.random() - 0.5) * 0.05;
                        const marker = createLongdoMarker({
                            lat: 13.690 + randomOffset(),
                            lon: 100.7507 + randomOffset(),
                        }, {
                            popup: {
                                title: `Marker ${Math.floor(Math.random() * 1000)}`,
                            }
                        })
                        map.Overlays.add(marker);
                        setActiveButton("addmarker");
                    }
                }} className={`${activeButton === "addmarker" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm text-left hover:cursor-pointer w-full`}>
                    Add Marker
                </button>
                <button
                    onClick={() => {
                        if (map && overlayClick) {
                            map.Overlays.remove(overlayClick);
                            setOverlayClick(null);
                            setActiveButton("removeselected");
                        }
                    }}
                    className={`${overlayClick ? (activeButton === "removeselected" ? "bg-green-600" : "bg-blue-600") : "bg-blue-300"} text-white rounded px-2 py-1 text-sm truncate hover:cursor-pointer w-full`}
                    disabled={!overlayClick}
                >
                    Remove Selected
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    className={`${activeButton === "createcircle" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm text-left hover:cursor-pointer w-full`}
                    onClick={() => {
                        if (map) {
                            const circle = createCircle({
                                lat: 14.690,
                                lon: 100.7507
                            }, 0.1, {})
                            map.Overlays.add(circle);
                            map.location({
                                lat: 14.690,
                                lon: 100.7507
                            })
                            setActiveButton("createcircle");
                        }
                    }}
                >
                    Create Circle
                </button>
                <button
                    className={`${activeButton === "createpolygon" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm text-left hover:cursor-pointer w-full`}
                    onClick={() => {
                        if (map) {
                            const polygon = createPolygon([
                                { lat: 13.69, lon: 100.75 },
                                { lat: 13.70, lon: 100.76 },
                                { lat: 13.71, lon: 100.74 }
                            ], {
                                title: "Polygon",
                                lineWidth: 2,
                                lineColor: "#1976d2",
                                fillColor: "#FFCCFF"
                            });
                            map.Overlays.add(polygon);
                            map.location({
                                lat: 13.70,
                                lon: 100.75

                            })
                            setActiveButton("createpolygon");
                        }
                    }}
                >
                    Create Polygon
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    className={`${activeButton === "createdonut" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm text-left hover:cursor-pointer w-full`}
                    onClick={() => {
                        if (map && window.longdo?.Polygon) {
                            const donut = new window.longdo.Polygon([
                                { lon: 101, lat: 15 },
                                { lon: 105, lat: 15 },
                                { lon: 103, lat: 12 },
                                null,
                                { lon: 103, lat: 14.9 },
                                { lon: 102.1, lat: 13.5 },
                                { lon: 103.9, lat: 13.5 }
                            ], {
                                label: true,
                                clickable: true,
                                title: "Donut Example",
                                lineWidth: 2,
                                lineColor: "#1976d2",
                                fillColor: "#FFD700"
                            });
                            map.location({
                                lat: 13.5,
                                lon: 103.5
                            })
                            map.Overlays.add(donut);
                            setActiveButton("createdonut");
                        }
                    }}
                >
                    Create Donut
                </button>
                <button
                    className={`${activeButton === "createpolyline" ? "bg-green-600" : "bg-blue-600"} text-white rounded px-2 py-1 text-sm text-left hover:cursor-pointer w-full`}
                    onClick={() => {
                        if (map && window.longdo?.Polyline) {
                            const polyline = createPolyline([
                                { lat: 13.69, lon: 100.75 },
                                { lat: 13.695, lon: 100.755 },
                                { lat: 13.70, lon: 100.76 }
                            ], {
                                title: "Polyline",
                                lineWidth: 3,
                                lineColor: "#43a047"
                            });
                            map.Overlays.add(polyline);
                            map.location({
                                lat: 13.695,
                                lon: 100.755
                            })
                            setActiveButton("createpolyline");
                        }
                    }}
                >
                    Create Polyline
                </button>
            </div>
            <button
                onClick={() => {
                    map?.Overlays.clear();
                    setActiveButton("clearoverlays");
                }}
                className={`${activeButton === "clearoverlays" ? "bg-green-600" : "bg-orange-500"} text-white rounded px-2 py-1 text-sm hover:cursor-pointer`}
            >
                Clear All Overlays
            </button>


            <h2 className="text-lg font-semibold">Map Layer</h2>

            <div className="flex gap-2">

                <button
                    className={`${activeButton === "traffic" ? "bg-green-600" : "bg-blue-600"} text-white w-full rounded px-2 py-1 text-sm hover:cursor-pointer`}
                    onClick={() => {
                        if (map) {
                            const traffic = LongdoLayer('traffic')
                            map.Layers.add(traffic);
                            setActiveButton("traffic");
                        }
                    }}
                >
                    TRAFFIC
                </button>

                <button
                    onClick={() => {
                        const POLITICAL = LongdoLayer('political');
                        map?.Layers.setBase(POLITICAL);
                        setActiveButton("political");
                    }}
                    className={`${activeButton === "political" ? "bg-green-600" : "bg-blue-600"} text-white w-full rounded px-2 py-1 text-sm hover:cursor-pointer`}
                >
                    POLITICAL
                </button>
            </div>

            <div className="flex gap-2">

                <button
                    className={`${activeButton === "wms" ? "bg-green-600" : "bg-blue-600"} text-white w-full rounded px-2 py-1 text-sm hover:cursor-pointer`}
                    onClick={() => {
                        if (map) {
                            const wmsLayer = createWMSLayer("bluemarble_terrain", {
                                url: "https://ms.longdo.com/mapproxy/service",

                            })
                            map.Layers.insert(1, wmsLayer);
                            setActiveButton("wms");
                        }
                    }}
                >
                    WMS
                </button>

                <button
                    onClick={() => {
                        const tmsLayer = createTMSLayer("", {
                            url:"https://tile.openstreetmap.org",
                        })
                        map?.Layers.insert(2,tmsLayer);
                        setActiveButton("tms");
                    }}
                    className={`${activeButton === "tms" ? "bg-green-600" : "bg-blue-600"} text-white w-full rounded px-2 py-1 text-sm hover:cursor-pointer`}
                >
                    TMS
                </button>
            </div>
            <button
                onClick={() => {
                    map?.Layers.clear();
                    setActiveButton("clearlayers");
                }}
                className={`${activeButton === "clearlayers" ? "bg-green-600" : "bg-blue-600"} text-white w-full rounded px-2 py-1 text-sm hover:cursor-pointer`}
            >
                Clear Layers
            </button>



        </aside>
    );
}