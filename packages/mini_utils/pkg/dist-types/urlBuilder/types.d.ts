export interface ImageSize {
    width?: number;
    height?: number;
}
declare type Fit = 'crop' | 'scale' | 'fill';
export declare type SanityFit = 'min' | 'max' | 'clip' | 'fillmax' | Fit;
export declare type ContentfulFit = 'pad' | Fit;
export declare type Format = 'jpg' | 'png' | 'webp' | 'original';
export interface QueryStringProps {
    size?: ImageSize;
    fit?: ContentfulFit;
    format: Format;
    quality?: number;
    resolution?: number;
}
export {};
