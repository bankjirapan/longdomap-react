import { useEffect } from "react";

export interface LongdoMarkerProps {
    map?: any;
    position: { lon: number; lat: number };
    title?: string;
    icon?: {
        url: string;
        offset?: { x: number; y: number };
    };
    detail?: string;
    visibleRange?: { min: number; max: number };
    draggable?: boolean;
}

export const Marker: React.FC<LongdoMarkerProps> = ({
    map,
    position,
    title,
    icon,
    detail,
    visibleRange,
    draggable,
}) => {
    useEffect(() => {
        if (!map || !window.longdo) return;
        const marker = new window.longdo.Marker(
            position,
            {
                title,
                icon,
                detail,
                visibleRange,
                draggable,
            }
        );
        map.Overlays.add(marker);

        return () => {
            map.Overlays.remove(marker);
        };
    }, [map, JSON.stringify(position), title, JSON.stringify(icon), detail, JSON.stringify(visibleRange), draggable]);

    return null;
};
