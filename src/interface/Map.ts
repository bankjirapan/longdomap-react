import { EventName, LocationMode } from "./Event";

declare global {
  interface Window {
    longdo: any;
  }
}

export interface Map {
  /**
   * @property zoom
   * @description
   * Zooms the map to a specified level or zooms in/out based on the boolean value.
   * If zoomLevel is a number, it sets the zoom level directly.
   * If zoomLevel is true, it zooms in by one level.
   * If zoomLevel is false, it zooms out by one level.
   * If zoomLevel is not provided, it defaults to zooming in by one level.
   * @param zoomLevel - The zoom level to set, or a boolean indicating zoom in/out.
   * @param zoomIn - A boolean indicating whether to zoom in (true) or out (false).
   * If zoomLevel is not provided, it defaults to zooming in.
   * @example
   * ```ts
   * map.zoom(5);
   * map.zoom(true,true); // Zooms in by one level
   * map.zoom(false,true); // Zooms out by one level
   * ```
   * @returns
   */
  zoom: (zoomLevel?: number | boolean, zoomIn?: boolean) => void | number;
  /**
   * @property location
   * @description
   * Sets the map's location to the specified longitude and latitude.
   * If animate is `true`, it animates the transition to the new location.
   * If animate is `false` or not provided, it sets the location immediately without animation.
   * @param location - An object containing longitude (lon) and latitude (lat).
   * @param animate - A boolean indicating whether to animate the transition.
   */
  location: (
    location?: { lon: number; lat: number } | LocationMode,
    animate?: boolean
  ) => void | { lon: number; lat: number };

  /**
   * @property Overlays
   * @description
   * Provides methods to manage overlays on the map.
   * - `add(overlay: any)`: Adds an overlay to the map.
   * - `remove(overlay: any)`: Removes an overlay from the map.
   * - `clear()`: Clears all overlays from the map.
   * @example
   * ```ts
   * map.Overlays.add(marker);
   * map.Overlays.remove(marker);
   * map.Overlays.clear();
   * ```  
   */
  Overlays: {
    add: (overlay: any) => void;
    remove: (overlay: any) => void;
    clear: () => void;
  };
  Event: {
    bind: (eventName: EventName | string, callback: (event: any) => void) => void;
  };
  Layers: {
    setBase: (layer: string) => void;
    add: (layer: string) => void;
    remove: (layer: string) => void;
  };
  Tags: {
    add: (tagName: string) => void;
    remove: (tagName: string) => void;
  };
  lastview?: boolean;
}
