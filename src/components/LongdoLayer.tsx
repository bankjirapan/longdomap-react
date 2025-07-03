import { useEffect } from "react";

export interface LongdoLayerProps {
    /** 
     * The Longdo map instance where the layer will be added.
     * This should be the map object created by the Longdo Map API.
     */
    map?: any;
    /**
     * The name of the layer to be added to the map.
     * This should match one of the predefined layers in the Longdo Map API.
     * @see https://api.longdo.com/map3/doc.html#Layer
     */
    layerName: string;
}

/**
 * 
 * @class Layer
 * The `Layer` component allows you to add a predefined layer to a Longdo map instance.
 */
export const Layer: React.FC<LongdoLayerProps> = ({ map, layerName }) => {
    useEffect(() => {
        if (map && window.longdo) {
            const layerNameUpper = layerName.toUpperCase();
            if (!window.longdo.Layers[layerNameUpper]) {
                console.warn(`Layer "${layerName}" does not exist in Longdo Layers.`);
                return;
            }
            const layer = window.longdo.Layers[layerNameUpper];
            map.Layers.add(layer);
        }
    }, [map, layerName]);

    return null;
}