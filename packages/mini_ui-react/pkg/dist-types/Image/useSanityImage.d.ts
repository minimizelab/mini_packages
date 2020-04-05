import { ImageSize, Format, SrcSet } from './types';
interface UseSanityImageProps {
    baseUrl: string;
    size: ImageSize;
    blurUp?: boolean;
    quality?: number;
    formats?: Array<Format>;
}
declare type UseSanityImage = (config: UseSanityImageProps) => {
    src: string;
    lowResSrc?: string;
    srcSets: Array<SrcSet>;
    size: ImageSize;
};
declare const useSanityImage: UseSanityImage;
export default useSanityImage;
