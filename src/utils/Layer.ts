/**
 * Layer.ts
 * Provides utility functions for creating layer objects in Longdo Maps.
 * @see {@link https://api.longdo.com/map3/doc.html#LayerOptions}
 */

/** Supported layer types. */
type LayerType =
  | "Vector"
  | "WMS"
  | "WMTS"
  | "TMS"
  | "XYZ"
  | "WMTS_REST"
  | "Custom";

/** Zoom or source range as [min, max] (inclusive). */
type Range = readonly [number, number];

/** Bounding box as [minLon, minLat, maxLon, maxLat]. */
type Bound = readonly [number, number, number, number];

/** Layer options for Longdo Maps. */
export interface LayerOptions {
  type?: LayerType;
  url?: string;
  zoomRange?: Range;
  source?: Range;
  opacity?: number;
  weight?: number;
  bound?: Bound;
  attribution?: string;
  extraQuery?: string;
  id?: string;
  format?: string;
  srs?: string;
  tileMatrixPrefix?: string;
  styles?: string;
}

/**
 * Generic helper to create a LayerOptions object.
 * @param type The layer type.
 * @param layerName The layer name (used as default id).
 * @param options Additional LayerOptions to override defaults.
 */
function createLayer(
  type: LayerType,
  layerName: string,
  options: LayerOptions = {}
): any {
  try {
    if (!window.longdo || !window.longdo.Layer || !window.longdo.LayerType) {
      throw new Error("Longdo Maps API is not loaded.");
    }
    if (type === "TMS") {
      const _overrideURL = options.url;
      options.url = `${_overrideURL}/{z}/{x}/{y}.png`;
      return new window.longdo.Layer(layerName, {
        ...options,
        type: window.longdo.LayerType.Custom,
        id: options.id ?? layerName,
      });
    }
    return new window.longdo.Layer(layerName, {
      ...options,
      type: window.longdo.LayerType[type],
      id: options.id ?? layerName,
    });
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param layerName
 * Returns the Longdo Layer object for the specified layer name.
 * @returns object representing the Longdo Layer.
 * @see {@link https://api.longdo.com/map3/doc.html#Layers}
 */
export function LongdoLayer(layerName: string) {
  const layerNameUpper = layerName.toUpperCase();
  if (!window.longdo.Layers[layerNameUpper]) {
    console.warn(`Layer "${layerName}" does not exist in Longdo Layers.`);
    return;
  }
  const layer = window.longdo.Layers[layerNameUpper];
  return layer;
}

/**
 * Creates a WMS Layer options object for Longdo Maps.
 */
export function createWMSLayer(
  layerName: string,
  options: LayerOptions = {}
): LayerOptions {
  return createLayer("WMS", layerName, options);
}

/**
 * Creates a WMTS Layer options object for Longdo Maps.
 */
export function createWMTSLayer(
  layerName: string,
  options: LayerOptions = {}
): LayerOptions {
  return createLayer("WMTS", layerName, options);
}

/**
 * Creates a TMS Layer options object for Longdo Maps.
 */
export function createTMSLayer(
  layerName: string,
  options: LayerOptions = {}
): LayerOptions {
  return createLayer("TMS", layerName, options);
}

/**
 * Creates a Custom Layer options object for Longdo Maps.
 */
export function createCustomLayer(
  layerName: string,
  options: LayerOptions = {}
): LayerOptions {
  return createLayer("Custom", layerName, options);
}
