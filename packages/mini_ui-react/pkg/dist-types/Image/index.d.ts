import { FC, HTMLAttributes, CSSProperties } from 'react';
import { ImageSize, SrcSet } from './types';
import useImgLazyLoad from './useImgLazyLoad';
interface Props extends HTMLAttributes<HTMLImageElement> {
    size: ImageSize;
    lowResSrc?: string;
    srcSets?: SrcSet[];
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
export { useImgLazyLoad };
export { default as useContentfulImage } from './useContentfulImage';
export { default as useSanityImage } from './useSanityImage';