import { useEffect } from "react";
import { LongdoMarkerProps } from "../interface/Marker";


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
