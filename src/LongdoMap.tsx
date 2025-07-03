import React, { useEffect, useRef, useState, ReactNode, cloneElement } from "react";
import { LongdoMarkerProps } from "./components/LongdoMarker";
import { LongdoGeometryProps } from "./components/LongdoGeometry";

declare global {
    interface Window {
        longdo: any;
    }
}

export interface LongdoMapProps {
    apiKey: string;
    mapObj?: (map: any) => void;
    location?: { lon: number; lat: number; };
    zoom?: number;
    height?: string | number;
    width?: string | number;
    className?: string;
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
                });

                mapRef.current.Event.bind(window.longdo.EventName.Ready, () => {
                    if (destroyed) return;
                    mapRef.current.lastview = false;
                    mapRef.current.location({ lon: location.lon, lat: location.lat }, true);
                    mapRef.current.zoom(zoom, true);
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
                const props: Partial<LongdoMarkerProps & LongdoGeometryProps> = { map: mapRef.current };
                return cloneElement(child, props);
            })}
        </div>
    );
};