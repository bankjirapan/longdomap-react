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
  /**
   *
   * @property Event
   * @description
   * Provides methods to bind events to the map.
   * - `bind(eventName: EventName | string, callback: (event: any) => void)`: Binds an event to the map.
   * The `eventName` can be a predefined event name or a custom string.
   * The `callback` function is called when the event occurs.
   * @example
   * ```ts
   * map.Event.bind(EventName.Click, (event) => {
   *   console.log('Map clicked at:', event.location);
   *
   */
  Event: {
    bind: (
      eventName: EventName | string,
      callback: (event: any) => void
    ) => void;
  };
  /**
   * @property Layers
   * @description
   * Provides methods to manage map layers.
   * - `setBase(layer: string)`: Sets the base layer of the map.
   * - `add(layer: string)`: Adds a layer to the map.
   * - `remove(layer: string)`: Removes a layer from the map.
   * @example
   * ```ts
   * map.Layers.setBase('baseLayerName');
   * map.Layers.add('additionalLayerName');
   * map.Layers.remove('layerToRemove');
   * ```
   */
  Layers: {
    setBase: (layer: string) => void;
    add: (layer: string) => void;
    remove: (layer: string) => void;
  };
  /**
   * @property Tags
   * @description
   * Provides methods to manage tags on the map.
   * - `add(tagName: string)`: Adds a tag to the map.
   * - `remove(tagName: string)`: Removes a tag from the map.
   * @example
   * ```ts
   * map.Tags.add('hotel');
   * map.Tags.remove('hotel');
   * ```
   */
  Tags: {
    add: (tagName: string) => void;
    remove: (tagName: string) => void;
  };

  Ui: {
    /**
     * @property DPad
     * @description
     * Controls the visibility of the DPad on the map.
     * - `visible(show: boolean)`: Shows or hides the DPad.
     * @example
     * ```ts
     * map.Ui.DPad.visible(true); // Show DPad
     * map.Ui.DPad.visible(false); // Hide DPad
     * `
     * */
    DPad: {
      visible: (show: boolean) => void;
    };
    /**
     * @property Zoombar
     * @description
     * Controls the visibility of the Zoombar on the map.
     * - `visible(show: boolean)`: Shows or hides the Zoombar.
     * @example
     * ```ts
     * map.Ui.Zoombar.visible(true); // Show Zoombar
     * map.Ui.Zoombar.visible(false); // Hide Zoombar
     * ```
     */
    Zoombar: {
      visible: (show: boolean) => void;
    };
    /**
     * @property Geolocation
     * @description
     * Controls the visibility of the Geolocation button on the map.
     * - `visible(show: boolean)`: Shows or hides the Geolocation button.
     * @example
     * ```ts
     * map.Ui.Geolocation.visible(true); // Show Geolocation button
     * map.Ui.Geolocation.visible(false); // Hide Geolocation button
     * ```
     */
    Geolocation: {
      visible: (show: boolean) => void;
    };
    /**
     * @property Terrain
     * @description
     * Controls the visibility of the Terrain layer on the map.
     * - `visible(show: boolean)`: Shows or hides the Terrain layer.
     * @example
     * ```ts
     * map.Ui.Terrain.visible(true); // Show Terrain layer
     * map.Ui.Terrain.visible(false); // Hide Terrain layer
     * ```
     */
    Terrain: {
      visible: (show: boolean) => void;
    };
    LayerSelector: {
      visible: (show: boolean) => void;
    };
    Crosshair: {
      visible: (show: boolean) => void;
    };
    Scale: {
      visible: (show: boolean) => void;
    };
    ContextMenu: {
      visible: (show: boolean) => void;
    };
    FullScreen: {
      visible: (show: boolean) => void;
    };
  };
  /**
   * @property language
   * @description
   * Gets or sets the map's language.
   * - `language()`: Returns the current language code as a string.
   * - `language(lang: string)`: Sets the map's language to the specified code.
   * @example
   * ```ts
   * map.language(); // get current language
   * map.language("en"); // set language to English
   * ```
   */
  language: (lang?: string) => void | string;
  /**
   * @property lastview
   * @description
   * Indicates whether the map is in the last view state.
   * If `true`, it means the map is displaying the last viewed location and zoom level.
   * If `false`, it means the map is not in the last view state.
   * @default false
   */
  lastview?: boolean;
}
