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
    /**
    * 
     * The Longdo map instance where the popup will be displayed.
     * This is required to add the popup overlay to the map.
     * 
     */
    map?: any;
    /**
     * The type of geometry to render.
     * Supported types are "polyline", "polygon", "circle", "dot", "donut", and "rectangle".
     * 
     * @example
     * ```tsx
     * <Geometry type="polyline" points={[{ lon: 100.0, lat: 13.0 }, { lon: 101.0, lat: 14.0 }]} />
     * ```
     */
    type: "polyline" | "polygon" | "circle" | "dot" | "donut" | "rectangle";
    /**
     * An array of coordinate objects representing the geometry's vertices.
     *  Each point should contain `lon` (longitude) and `lat` (latitude).
     * Null values are allowed for optional points, such as in donuts.
     * @example
     * ```tsx
     * <Geometry type="polygon" points={[{ lon: 100.0, lat: 13.0 }, { lon: 101.0, lat: 14.0 }, null]} />
     * ```
     */
    points: ({ lon: number; lat: number } | null)[];
    /**
     * The radius of the geometry, used for types like "circle" or "donut".
     * This is optional and should be specified in the same units as the map's coordinate system.
     * @example
     * ```tsx
     * <Geometry type="circle" points={[{ lon: 100.0, lat: 13.0 }]} radius={500} />
     * ```
     */
    radius?: number;
    /**
     * Additional options for customizing the geometry's appearance or behavior.
     * This can include properties like color, weight, opacity, etc., depending on the geometry type.
     * @example
     * ```tsx
     * options={
     * {  
     *      lineColor: 'rgba(0, 0, 0, 1)'
     *      lineWidth: 5,
     *      title: 'My Polyline',
     *      detail: 'This is a detailed description of the polyline.',
     *      visibleRange: { min: 5, max: 15 }
     * }
     * />
     * ```
     */
    options?: any;
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