export interface LongdoTagProps {

    /**
     * 
     * @property map - The Longdo map object to which the tag will be applied.
     * 
     */
    map?: any;
    /**
     * 
     * @property tag - The tag object that will be applied to the map.
     * Enter tag name EN, TH 
     * @example
     * ```ts
     * <Tag tagName="hotel" />
     * ```
     * @see https://map.longdo.com/ws/tag/list
     */
    tagName: string

}

/**
 * @function LongdoTag
 * @description
 * The `LongdoTag` component is used to add a tag to the Longdo map.
 * @param {LongdoTagProps} props - The properties for the LongdoTag component.
 * @param {any} props.map - The Longdo map object to which the tag will be applied.
 * @param {string} props.tagName - The name of the tag to be added to the map.
 * @returns null
 */
export const LongdoTag = ({ map, tagName }: LongdoTagProps) => {
    if (!map) {
        console.warn("LongdoTag: map is not defined");
        return null;
    }

    if (!tagName) {
        console.warn("LongdoTag: tagName is required");
        return null;
    }

    map.Tags.add(tagName);

    return null;
}