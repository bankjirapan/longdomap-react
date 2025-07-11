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
 * @class createLongdoMarker
 * @description Creates a Longdo marker with the specified position and options.
 * @param {Object} position - The position of the marker.
 * @param {number} position.lat - Latitude of the marker.
 * @param {number} position.lon - Longitude of the marker.
 * @see {@link https://map.longdo.com/docs3/javascript/marker/create-marker} for more details.
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
 *
 * @class createPopup
 * @description Creates a Longdo popup at the specified location with the given options.
 * @param {Object} position - The position of the popup.
 * @param {number} position.lat - Latitude of the popup.
 * @param {number} position.lon - Longitude of the popup.
 *
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
 * @see {@link https://map.longdo.com/docs3/javascript/geometry/shapes} for more details.
 */
export function createPolygon(
  points: { lat: number; lon: number }[] = [],
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Polygon(points, options);
}

export function createPolyline(
  points: { lat: number; lon: number }[] = [],
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Polyline(points, options);
}

export function createCircle(
  center: { lat: number; lon: number },
  radius: number,
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Circle(center, radius, options);
}

export function createRectangle(
  bounds: { south: number; west: number; north: number; east: number },
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Rectangle(bounds, options);
}

export function createDot(
  position: { lat: number; lon: number },
  options?: LongdoMarkerProps
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  return new window.longdo.Dot(position, options);
}

export function createDonutPolygon(
  position: { lat: number; lon: number }[] = [],
  options?: Geometry
) {
  if (!window.longdo) throw new Error("Longdo Map script not loaded");
  const donut = new window.longdo.Polygon(position, options);
  return donut;
}
