export interface ImageSize {
    width?: number;
    height?: number;
}
export interface ImageDetails {
    image: ImageSize;
}
export interface Format {
    type: string;
    name: FormatName;
}
export declare type Fit = 'crop' | 'scale' | 'pad' | 'fill';
export declare type FormatName = 'jpg' | 'png' | 'webp' | 'original';
export interface ImageProps {
    baseUrl: string;
    size?: ImageSize;
    fit?: Fit;
    quality?: number;
}
