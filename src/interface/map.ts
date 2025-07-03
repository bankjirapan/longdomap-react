
declare global {
    interface Window {
        longdo: any;
    }
}


export interface Map {
    zoom: (zoomLevel: number) => void;
    location: (location: { lon: number; lat: number }, animate?: boolean) => void;
    Overlays: {
        add: (overlay: any) => void;
        remove: (overlay: any) => void;
    };
    Event: {
        bind: (eventName: string, callback: () => void) => void;
    };
    lastview?: boolean;
}