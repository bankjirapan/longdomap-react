import { Geometry } from "../interface/Geometry";
import { PopupOptions } from "../interface/Popup";

interface LongdoMarkerProps {
  title?: string;
  icon?: {
    url: string;
    offset?: { x: number; y: number };
    size?: { width: number; height: number };
    html?: string;
  };
  popup?: PopupOptions;
  detail?: string;
  visibleRange?: { min: number; max: number };
  draggable?: boolean;
}

/**
 * @function createLongdoMarker
 * @description Creates a Longdo marker with the specified position and options.
 * @param {Object} position - The position of the marker.
 * @param {number} position.lat - Latitude of the marker.
 * @param {number} position.lon - Longitude of the marker.
 * @param {LongdoMarkerProps} [options] - Marker options.
 * @returns {object} A Longdo Marker object.
 * @see {@link https://map.longdo.com/docs3/javascript/marker/create-marker}
 */
export function createLongdoMarker(
  {
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  },
  options?: LongdoMarkerProps
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Marker(
    {
      lon,
      lat,
    },
    options
  );
}

/**
 * @function createPopup
 * @description Creates a Longdo popup at the specified location with the given options.
 * @param {Object} position - The position of the popup.
 * @param {number} position.lat - Latitude of the popup.
 * @param {number} position.lon - Longitude of the popup.
 * @param {PopupOptions} [options] - Popup options.
 * @returns {object} A Longdo Popup object.
 * @see {@link https://map.longdo.com/docs3/javascript/popup}
 */
export function createPopup(
  { lat, lon }: { lat: number; lon: number },
  options?: PopupOptions
): any {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Popup(
    {
      lat,
      lon,
    },
    options
  );
}

/**
 * @function createPolygon
 * @description Creates a Longdo polygon with the specified points and options.
 * @param {Array} points - An array of points where each point is an object with `lat` and `lon` properties.
 * @param {Geometry} options - Options for the polygon, including title, detail, label, markerOptions, and popup.
 * @returns {object} A Longdo Polygon object.
 * @see {@link https://map.longdo.com/docs3/javascript/geometry/shapes}
 */
export function createPolygon(
  points: { lat: number; lon: number }[] = [],
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Polygon(points, options);
}

/**
 * @function createPolyline
 * @description Creates a Longdo polyline with the specified points and options.
 * @param {Array} points - An array of points where each point is an object with `lat` and `lon` properties.
 * @param {Geometry} options - Options for the polyline.
 * @returns {object} A Longdo Polyline object.
 * @see {@link https://map.longdo.com/docs3/javascript/geometry/shapes}
 */
export function createPolyline(
  points: { lat: number; lon: number }[] = [],
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Polyline(points, options);
}

/**
 * @function createCircle
 * @description Creates a Longdo circle with the specified center, radius, and options.
 * @param {Object} center - The center of the circle.
 * @param {number} center.lat - Latitude of the center.
 * @param {number} center.lon - Longitude of the center.
 * @param {number} radius - Radius of the circle in meters.
 * @param {Geometry} [options] - Options for the circle.
 * @returns {object} A Longdo Circle object.
 * @see {@link https://map.longdo.com/docs3/javascript/geometry/shapes}
 */
export function createCircle(
  center: { lat: number; lon: number },
  radius: number,
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Circle(center, radius, options);
}

/**
 * @function createRectangle
 * @description Creates a Longdo rectangle with the specified bounds and options.
 * @param {Object} bounds - The bounds of the rectangle.
 * @param {number} bounds.south - Southern latitude.
 * @param {number} bounds.west - Western longitude.
 * @param {number} bounds.north - Northern latitude.
 * @param {number} bounds.east - Eastern longitude.
 * @param {Geometry} [options] - Options for the rectangle.
 * @returns {object} A Longdo Rectangle object.
 * @see {@link https://map.longdo.com/docs3/javascript/geometry/shapes}
 */
export function createRectangle(
  bounds: { south: number; west: number; north: number; east: number },
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Rectangle(bounds, options);
}

/**
 * @function createDot
 * @description Creates a Longdo dot marker at the specified position with the given options.
 * @param {Object} position - The position of the dot.
 * @param {number} position.lat - Latitude of the dot.
 * @param {number} position.lon - Longitude of the dot.
 * @param {LongdoMarkerProps} [options] - Dot options.
 * @returns {object} A Longdo Dot object.
 * @see {@link https://map.longdo.com/docs3/javascript/marker/dot}
 */
export function createDot(
  position: { lat: number; lon: number },
  options?: LongdoMarkerProps
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Dot(position, options);
}

/**
 * @function createDonutPolygon
 * @description Creates a Longdo donut polygon with the specified points and options.
 * @param {Array} position - An array of points where each point is an object with `lat` and `lon` properties.
 * @param {Geometry} [options] - Options for the donut polygon.
 * @returns {object} A Longdo Polygon object representing a donut shape.
 * @see {@link https://map.longdo.com/docs3/javascript/geometry/shapes}
 */
export function createDonutPolygon(
  position: { lat: number; lon: number }[] = [],
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  const donut = new window.longdo.Polygon(position, options);
  return donut;
}
