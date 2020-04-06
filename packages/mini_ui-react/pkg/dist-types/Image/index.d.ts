import { FC, HTMLAttributes, CSSProperties } from 'react';
import { ImageSize, SrcSet } from './types';
import useImgLazyLoad from './useImgLazyLoad';
import useIEObjectFitPolyfill from './useIEObjectFitPolyfill';
interface Props extends HTMLAttributes<HTMLImageElement> {
    size: ImageSize;
    lowResSrc?: string;
    srcSets?: Array<SrcSet>;
    src: string;
    aspectRatio: number;
    style?: CSSProperties;
    imgStyle?: CSSProperties;
    alt?: string;
    className?: string;
    imgClassName?: string;
}
declare const Image: FC<Props>;
export default Image;
export { useImgLazyLoad, Image, useIEObjectFitPolyfill };
export { default as useContentfulImage } from './useContentfulImage';
export { default as useSanityImage } from './useSanityImage';
