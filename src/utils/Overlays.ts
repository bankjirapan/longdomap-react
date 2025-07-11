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
