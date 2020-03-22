export interface ImageSize {
  width?: number;
  height?: number;
}

type Fit = 'crop' | 'scale' | 'fill';
export type SanityFit = 'min' | 'max' | 'clip' | 'fillmax' | Fit;
export type ContentfulFit = 'pad' | Fit;

export type Format = 'jpg' | 'png' | 'webp' | 'original';
