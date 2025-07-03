import { useEffect } from "react";

export interface LongdoPopupProps {
    /**
     * The Longdo map instance where the popup will be displayed.
     * This is required to add the popup overlay to the map.
     */
    /**
     * The Longdo map instance where the popup will be displayed.
     * This is required to add the popup overlay to the map.
     */
    map?: any;
    /**
     * The HTML content of the popup.
     * This can be a string containing HTML markup.
     */
    html?: string;
    /**
     * The position of the popup on the map.
     * It should be an object with `lon` and `lat` properties.
     */
    position: { lon: number; lat: number };
    /**
     * The title of the popup.
     * @default 'Popup'
     * The title is displayed at the top of the popup.

     */
    title?: string;
    /**
     * The detail text of the popup.
     * This is additional information displayed in the popup.
     * @default 'This is a popup'
     */
    detail?: string;
    /**
     * 
     * This property determines whether the popup can be closed by the user.
     * If set to `true`, the popup will have a close button.
     * @default true
     * 
     * @example
     * ```tsx
     * <Popup closable={false} />
     * ```
     * 
     */
    closable?: boolean;
    /**
     * The size of the popup.
     * It should be an object with `width` and `height` properties.
     * @default { width: 200, height: 100 }
     */
    /**
     * The size of the popup.
     * It should be an object with `width` and `height` properties.
     * @default { width: 200, height: 100 }
     */
    size?: { width: number; height: number };
}


/**
 * 
 * Popup component for displaying information on a Longdo map.
 * Raedmore: https://map.longdo.com/docs3/javascript/marker/create-popup
 * @returns null
 */
export const Popup: React.FC<LongdoPopupProps> = ({
    map,
    position,
    title,
    detail,
    html,
    closable = true,
    size = { width: 200, height: 100 },
}) => {
    useEffect(() => {
        if (!map || !window.longdo) return;

        const popup = new window.longdo.Popup(position as { lon: number; lat: number },
            {
                title: title || 'Popup',
                detail: detail || 'This is a popup',
                html: html,
                closable: closable,
            });

        map.Overlays.add(popup)

        return () => {
            map.Overlays.remove(popup);
        }

    }, [map, position, title, detail, closable, size]);

    return null;
}