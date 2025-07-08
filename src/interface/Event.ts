export interface EventName {
    Location: (callback: (location: { lon: number; lat: number }) => void) => void;
}