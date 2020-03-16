import { ImageSize, Format, SrcSet } from './types';
interface UseSanityImageProps {
    baseUrl: string;
    size: ImageSize;
    formats?: Format[];
}
declare type UseSanityImage = (config: UseSanityImageProps) => {
    src: string;
    lowResSrc: string;
    srcSets: SrcSet[];
    size: ImageSize;
};
declare const useSanityImage: UseSanityImage;
export default useSanityImage;
