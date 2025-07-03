
import React, { useEffect, useRef, useState, ReactNode, cloneElement } from "react";
import { LongdoMarkerProps } from "./components/LongdoMarker";
import { LongdoGeometryProps } from "./components/LongdoGeometry";
import { LongdoPopupProps } from "./components/LongdoPopup";

export interface LongdoMapProps {
    /**
     *  * @property apiKey - The API key required to use the Longdo Map service.
     *  * This key is mandatory and must be provided to access the map functionalities.
     */
    apiKey: string;
    /**
     * A callback function that receives the Longdo map object once it is ready.
     * This can be used to interact with the map after it has been initialized.
     */
    mapObj?: (map: any) => void;
    /**
     * The initial location of the map, specified by longitude and latitude.
     * Default is set to Bangkok, Thailand.
     */
    location?: { lon: number; lat: number; };
    /**
     * The initial zoom level of the map.
     * Default is set to 10.
     */
    zoom?: number;
    /**
     * The height of the map container.
     * Can be specified as a string (e.g., "400px") or a number (e.g., 400).
     * Default is set to 400.
     */
    height?: string | number;
    /**
     * The width of the map container.
     * Can be specified as a string (e.g., "100%") or a number (e.g., 600).
     * Default is set to "100%".
     */
    width?: string | number;
    /**
     * An optional CSS class name to apply to the map container.
     * This can be used for custom styling.
     */
    className?: string;
    /**
     * Optional children components to render on the map.
     * These can include markers, geometries, or popups.
     */
    children?: ReactNode;
}

const LONGDO_MAP_SDK_URL = "https://api.longdo.com/map3/?key=";

function loadLongdoMapScript(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.longdo) return resolve();
        if (document.getElementById("longdo-map-sdk")) return resolve();
        const script = document.createElement("script");
        script.id = "longdo-map-sdk";
        script.src = `${LONGDO_MAP_SDK_URL}${apiKey}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
    });
}


/**
 * LongdoMap is a React component that integrates the Longdo Map JavaScript SDK into your application.
 * It handles loading the Longdo Map script, initializing the map, and providing a container for map overlays such as markers, geometries, and popups.
 * The component supports configuration of initial map location, zoom level, container dimensions, and custom class names.
 * It also provides a callback to access the underlying Longdo map object once it is ready, enabling advanced interactions.
 * 
 * @param {LongdoMapProps} props - The properties for configuring the LongdoMap component.
 * @param {string} props.apiKey - The API key required to use the Longdo Map service. This key is mandatory and must be provided to access the map functionalities.
 * @param {(map: any) => void} [props.mapObj] - A callback function that receives the Longdo map object once it is ready. This can be used to interact with the map after it has been initialized.
 * @param {{ lon: number; lat: number; }} [props.location] - The initial location of the map, specified by longitude and latitude. Default is set to Bangkok, Thailand.
 * @param {number} [props.zoom] - The initial zoom level of the map. Default is set to 10.
 * @param {string | number} [props.height] - The height of the map container. Can be specified as a string (e.g., "400px") or a number (e.g., 400). Default is set to 400.
 * @param {string | number} [props.width] - The width of the map container. Can be specified as a string (e.g., "100%") or a number (e.g., 600). Default is set to "100%".
 * @param {string} [props.className] - An optional CSS class name to apply to the map container. This can be used for custom styling.
 * @param {ReactNode} [props.children] - Optional children components to render on the map. These can include markers, geometries, or popups.

 */
export const LongdoMap: React.FC<LongdoMapProps> = ({
    apiKey,
    mapObj,
    location = { lon: 100.529248, lat: 13.672898 },
    zoom = 10,
    height = 400,
    width = "100%",
    className = "",
    children,
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let destroyed = false;
        loadLongdoMapScript(apiKey).then(() => {
            if (mapContainer.current && window.longdo && !mapRef.current) {
                mapRef.current = new window.longdo.Map({
                    placeholder: mapContainer.current,
                    lastview: false,
                    location: { lon: location.lon, lat: location.lat },
                    zoom: zoom,
                });

                mapRef.current.Event.bind(window.longdo.EventName.Ready, () => {
                    if (destroyed) return;
                    setIsReady(true);
                    if (typeof mapObj === "function") {
                        mapObj(mapRef.current);
                    }
                });
            }
        });

        return () => {
            destroyed = true;
            if (mapRef.current) {
                mapRef.current.Overlays.clear();
                mapRef.current = null;
            }
            setIsReady(false);
        };
    }, [])
    useEffect(() => {
        if (isReady && mapRef.current && typeof mapObj === "function") {
            mapObj(mapRef.current);
        }
    }, [isReady, mapObj]);

    return (
        <div
            ref={mapContainer}
            className={className}
            style={{ height, width, position: "relative" }}
        >
            {isReady && React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                const props: Partial<LongdoMarkerProps & LongdoGeometryProps & LongdoPopupProps> = { map: mapRef.current };
                return cloneElement(child, props);
            })}
        </div>
    );
};