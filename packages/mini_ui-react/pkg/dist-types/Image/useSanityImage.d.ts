import { ImageSize, Format, SrcSet } from './types';
interface UseSanityImageProps {
    baseUrl: string;
    size: ImageSize;
    blurUp?: boolean;
    fluid?: boolean;
    quality?: number;
    formats?: Array<Format>;
    sizes?: string;
    resolutions?: Array<number>;
    widths?: Array<number>;
    width?: number;
}
declare type UseSanityImage = (config: UseSanityImageProps) => {
    src: string;
    lowResSrc?: string;
    srcSets: Array<SrcSet>;
    size: ImageSize;
};
declare const useSanityImage: UseSanityImage;
export default useSanityImage;
