import { useEffect, useRef } from "react";

/**
 * Props for the LongdoGeometry component, which renders various geometric shapes on a map.
 *
 * @property map - (Optional) The map instance where the geometry will be rendered.
 * @property type - The type of geometry to render. Supported types are "polyline", "polygon", "circle", "dot", "donut", and "rectangle".
 * @property points - An array of coordinate objects representing the geometry's vertices. Each point contains longitude (`lon`) and latitude (`lat`). Null values are allowed for optional points.
 * @property radius - (Optional) The radius of the geometry, used for types like "circle" or "donut".
 * @property options - (Optional) Additional options for customizing the geometry's appearance or behavior.
 */

export interface LongdoGeometryProps {
    map?: any;
    type: "polyline" | "polygon" | "circle" | "dot" | "donut" | "rectangle";
    points: ({ lon: number; lat: number } | null)[];
    radius?: number;
    options?: any;
}

declare global {
    interface Window {
        longdo: any;
    }
}

function isValidPoints(points: any): points is { lon: number; lat: number }[] {
    return (
        Array.isArray(points) &&
        points.length > 0 &&
        points.every(
            (p) =>
                p &&
                typeof p.lon === "number" &&
                typeof p.lat === "number"
        )
    );
}


/**
 * LongdoGeometry component to render various geometries on a Longdo map.
 * This component supports rendering polylines, polygons, circles, donuts, and rectangles.
 * It uses the Longdo Maps API to create and manage these geometries.
 * 
 * @param {LongdoGeometryProps} props - The properties for the geometry component.
 * @returns {null} - This component does not render any visible elements, it only manages map overlays.
 */ 
export const Geometry: React.FC<LongdoGeometryProps> = ({
    map,
    type,
    points,
    radius,
    options,
}) => {
    const overlayRef = useRef<any>(null);

    useEffect(() => {
        if (!map || !window.longdo) return;

        let overlay: any;

        switch (type) {
            case "polyline":
                if (isValidPoints(points)) {
                    overlay = new window.longdo.Polyline(points, options);
                }
                break;
            case "polygon":
                if (isValidPoints(points)) {
                    overlay = new window.longdo.Polygon(points, options);
                }
                break;
            case "circle":
                if (points[0] && radius) {
                    console.log('object');
                    overlay = new window.longdo.Circle(points[0], radius, options);
                }
                break;
            case "donut": {
                if (isValidPoints(points)) {
                    let validPoints = points.filter((p): p is { lon: number; lat: number } => p !== null);
                    let donutPoints = validPoints.slice();
                    if (donutPoints.length > 0) {
                        const mid = Math.floor(donutPoints.length / 2);
                        const donutWithNull = [
                            ...donutPoints.slice(0, mid),
                            null,
                            ...donutPoints.slice(mid)
                        ];
                        overlay = new window.longdo.Polygon(donutWithNull, options);
                    }
                }
                break;
            }
            case "rectangle":
                if (isValidPoints(points) && points[0]) {
                    const rectCenter = points[0];
                    const { width = 1, height = 1, ...restOptions } = options || {};
                    overlay = new window.longdo.Rectangle(
                        rectCenter,
                        { width, height },
                        restOptions
                    );
                }
                break;
            default:
                break;
        }

        if (overlay) {
            map.Overlays.add(overlay);
            overlayRef.current = overlay;
        }

        return () => {
            if (overlayRef.current) {
                map.Overlays.remove(overlayRef.current);
                overlayRef.current = null;
            }
        };
    }, [map, type, points, radius, options]);

    return null;
};