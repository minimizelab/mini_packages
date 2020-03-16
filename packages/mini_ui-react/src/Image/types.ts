export interface ImageSize {
  width?: number;
  height?: number;
}

export interface SrcSet {
  srcSet: string;
  type: string;
}

export interface Format {
  type: string;
  name: FormatName;
}

export type Fit = 'crop' | 'scale' | 'pad' | 'fill';

export type FormatName = 'jpg' | 'png' | 'webp' | 'original';
