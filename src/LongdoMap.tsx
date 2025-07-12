import React, { useEffect, useRef, useState, ReactNode, cloneElement } from "react";
import { LongdoMarkerProps } from "./interface/Marker";
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
     * The base map to use for the Longdo Map.
     * This can be set to a specific map type, such as "NORMAL", "DARK", or "hybrid".
     * If not specified, the default base map will be used.
     * @example
     * <LongdoMap baseMap="NORMAL" />
     */
    baseMap?: string;
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
 * Properties for configuring the LongdoMap component.
 * 
 * @property {string} apiKey - The API key required to use the Longdo Map service. This key is mandatory and must be provided to access the map functionalities.
 * @property {(map: any) => void} [mapObj] - A callback function that receives the Longdo map object once it is ready. This can be used to interact with the map after it has been initialized.
 * @property {{ lon: number; lat: number; }} [location] - The initial location of the map, specified by longitude and latitude. Default is set to Bangkok, Thailand.
 * @property {number} [zoom] - The initial zoom level of the map. Default is set to 10.
 * @property {string | number} [height] - The height of the map container. Can be specified as a string (e.g., "400px") or a number (e.g., 400). Default is set to 400.
 * @property {string | number} [width] - The width of the map container. Can be specified as a string (e.g., "100%") or a number (e.g., 600). Default is set to "100%".
 * @property {string} [className] - An optional CSS class name to apply to the map container. This can be used for custom styling.
 * @property {ReactNode} [children] - Optional children components to render on the map. These can include markers, geometries, or popups.
 * @property {string} [baseMap] - The base map to use for the Longdo Map. This can be set to a specific map type, such as "basic", "satellite", or "hybrid". If not specified, the default base map will be used. You can see the list of bese maps at https://api.longdo.com/map3/doc.html#Layers
 * */
export const LongdoMap: React.FC<LongdoMapProps> = ({
    apiKey,
    mapObj,
    location = { lon: 100.529248, lat: 13.672898 },
    zoom = 10,
    height = 400,
    width = "100%",
    className = "",
    baseMap = "NORMAL",
    children,
}) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        let destroyed = false;
        loadLongdoMapScript(apiKey).then(() => {
            if (mapContainer.current && window.longdo && !mapRef.current) {
                mapRef.current = new window.longdo.Map({
                    placeholder: mapContainer.current,
                    layer: [window.longdo.Layers[baseMap] || window.longdo.Layers.NORMAL],
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

    return (
        <div
            ref={mapContainer}
            data-testid="longdo-map"
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